import { Component, Input, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-chatbot',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './chatbot.html',
  styleUrls: ['./chatbot.css']
})
export class Chatbot implements OnInit {

  @ViewChild('scrollContainer') scrollContainer!: ElementRef;
  @Input() userID!: string;
  // userID="691a40dfd4643af9391098d7"

  serverURL=environment.serverURL
  message = '';
  files: File[] = [];
  previews: any[] = [];

  chat: any[] = [];
  allMessagesData: any[] = [];

  lastIndex: number | null = null;

  waiting = false;
  scrollToBottom = false;
  numOfDayMessages = 0;

  amount = 20;

  constructor(private http: HttpClient) {}

  ngOnInit() {

    this.http.post<any>(`${this.serverURL}/chatHistory`, { userID: this.userID })
      .subscribe(res => {
        this.allMessagesData = res;
        this.getData(res);
        this.scrollToBottom = true;
        this.numOfDayMessages = this.getTodaysMessagesCount(res);
      });
  }

  ngAfterViewChecked() {
    if (this.scrollToBottom) {
      const el = this.scrollContainer.nativeElement;
      el.scrollTop = el.scrollHeight;
      this.scrollToBottom = false;
    }
  }

  getTodaysMessagesCount(messages: any[]) {
    const today = new Date();
    const start = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const end = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);

    return messages.filter(m => {
      const d = new Date(m.createdAt);
      return d >= start && d < end;
    }).length;
  }

  getData(arr: any[]) {
    if (this.lastIndex !== 0) {
      let myArr: any[] = [];
      let start, end;

      if (this.lastIndex !== null) {
        start = this.lastIndex - this.amount;
        end = this.lastIndex;
        this.lastIndex = start < 0 ? 0 : start;
      } else {
        start = arr.length - this.amount;
        end = arr.length;
        this.lastIndex = start < 0 ? 0 : start;
      }

      for (let i = start; i < end; i++) if (!!arr[i]) myArr.push(arr[i]); 
      this.chat = [...myArr, ...this.chat];
      console.log(this.chat);
    }
  }

  onScroll(e: any) {
    if (e.target.scrollTop <= 50) {
      this.getData(this.allMessagesData);
    }
  }

  onFileChange(event: any) {
    const selectedFiles = Array.from(event.target.files) as File[];
    this.files = selectedFiles;

    const promises = selectedFiles.map(file => {
      return new Promise(resolve => {
        const reader = new FileReader();
        reader.onload = () => {
          resolve({
            previewURL: reader.result,
            type: file.type.startsWith('image/') ? 'image' : 'other'
          });
        };
        reader.readAsDataURL(file);
      });
    });

    Promise.all(promises).then((res: any) => this.previews = res);
  }

  deletePreview(index: number) {
    this.files.splice(index, 1);
    this.previews.splice(index, 1);
  }

  async sendMessage() {
    if (this.numOfDayMessages > 40) {
      this.chat.push({ text: "You reached your limit", role: "bot", imagesFile: [], otherFiles: [] });
      return;
    }

    const imagesFile: any[] = [];
    const otherFiles: any[] = [];

    this.previews.forEach(p => {
      p.type === 'image' ? imagesFile.push(p.previewURL) : otherFiles.push(p.previewURL);
    });

    const el = this.scrollContainer.nativeElement;
    const bottom = el.scrollHeight - el.scrollTop <= el.clientHeight + 2;

    this.chat.push({ text: this.message, imagesFile, otherFiles, role: "user" });
    this.waiting = true;
    if (bottom) this.scrollToBottom = true;

    const formData = new FormData();
    formData.append("userID", this.userID!);
    formData.append("message", this.message);

    this.files.forEach(f => formData.append('files', f));

    this.previews = [];
    this.message = '';

    try {
      const res: any = await this.http.post(`${this.serverURL}/chatbot`, formData).toPromise();
      this.waiting = false;

      this.chat.push({ text: res.response, imagesFile: [], otherFiles: [], role: "bot" });
      if (bottom) this.scrollToBottom = true;

      this.numOfDayMessages += 2;

    } catch (err: any) {
      this.waiting = false;
      this.chat.push({ text: "Something went wrong", role: "bot", imagesFile: [], otherFiles: [] });
      if (bottom) this.scrollToBottom = true;
    }
  }
}
