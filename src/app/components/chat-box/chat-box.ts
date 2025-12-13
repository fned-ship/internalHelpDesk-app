import { Component, Input, OnInit, OnDestroy, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { io, Socket } from 'socket.io-client';
import { environment } from '../../../environments/environment';
import { UserService } from '../../services/user.service';
import { TicketService } from '../../services/ticket.service';

//e.g <app-chat-box [chatId]="'chat1'" [userId]="'emp10'"></app-chat-box>

interface Message {
  sender: string;
  text: string;
  imagesFiles: string[];
  otherFiles: string[];
  timestamp: Date;
}

interface Chat {
  id: string;
  emp_id: string;
  chef_id: string;
  messages: Message[];
}

@Component({
  selector: 'app-chat-box',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './chat-box.html',
  styleUrls: ['./chat-box.css']
})

export class ChatBox implements OnInit, OnDestroy, AfterViewChecked {
  @Input() chatId!: string;
  // chatId="chat1"
  // userId="emp10"
  @Input() userId!: string;
  
  @ViewChild('messageContainer') private messageContainer!: ElementRef;
  @ViewChild('fileInput') private fileInput!: ElementRef;
  
  private socket!: Socket;
  backendUrl = environment.serverURL;
  
  messages: Message[] = [];
  newMessage: string = '';
  selectedFiles: File[] = [];
  
  isLoading = false;
  hasMoreMessages = true;
  currentPage = 0;
  messagesPerPage = 20;
  
  private shouldScrollToBottom = true;
  private previousScrollHeight = 0;

  constructor(private http: HttpClient,private userService:UserService,private ticketService:TicketService) {}

  async ngOnInit() {

    this.initializeSocket();
    this.loadInitialMessages();

    //test
    // const res=await this.userService.acceptUser("17644512368350.07012060306315537");
    // console.log(res);
    this.ticketService.getLastTicket("691cb3518be8df6fae1199a4").subscribe({
        next: (response) => console.log('data :', response.data),
        error: (err) => console.error('Error:', err)  
    });
    // this.ticketService.createTicket({emp:"691cb3518be8df6fae1199a4",chef:"692afee0fd44fa94a1bbf58d",emp_id:"17634885939710.8416665112738031",chef_id:"17644254400790.12280462051869123",status:"In Progress",priority:"Low",deadline:new Date("2026-1-1"),description:"gg"}).subscribe({
    //     next: (response) => console.log('data :', response.data),
    //     error: (err) => console.error('Error:', err)
    // });
    // const res = await this.userService.updateUserProfile("17633282237400.7755279409271736",{password:"123456789",newPassword:'123456789'});
    // console.log(res);
  }

  ngAfterViewChecked(): void {
    if (this.shouldScrollToBottom) {
      this.scrollToBottom();
      this.shouldScrollToBottom = false;
    }
  }

  ngOnDestroy(): void {
    if (this.socket) {
      this.socket.disconnect();
    }
  }

  private initializeSocket(): void {
    this.socket = io(this.backendUrl);
    
    this.socket.on('connect', () => {
      console.log('Connected to socket');
      this.socket.emit('joinChat', this.chatId);
    });

    this.socket.on('newMessage', (message: Message) => {
      this.messages.push(message);
      this.shouldScrollToBottom = true;
    });

    this.socket.on('disconnect', () => {
      console.log('Disconnected from socket');
    });
  }

  private loadInitialMessages(): void {
    this.isLoading = true;
    this.http.get<Chat>(`${this.backendUrl}/getchat/${this.chatId}`).subscribe({
      next: (chat) => {
        const allMessages = chat.messages || [];
        const startIndex = Math.max(0, allMessages.length - this.messagesPerPage);
        this.messages = allMessages.slice(startIndex);
        this.hasMoreMessages = allMessages.length > this.messagesPerPage;
        this.isLoading = false;
        this.shouldScrollToBottom = true;
      },
      error: (err) => {
        console.error('Error loading messages:', err);
        this.isLoading = false;
      }
    });
  }

  onScroll(event: any): void {
    const element = event.target;
    if (element.scrollTop === 0 && this.hasMoreMessages && !this.isLoading) {
      this.loadMoreMessages();
    }
  }

  private loadMoreMessages(): void {
    this.isLoading = true;
    this.shouldScrollToBottom = false;
    this.previousScrollHeight = this.messageContainer.nativeElement.scrollHeight;

    this.http.get<Chat>(`${this.backendUrl}/getchat/${this.chatId}`).subscribe({
      next: (chat) => {
        const allMessages = chat.messages || [];
        const currentLength = this.messages.length;
        const newStartIndex = Math.max(0, allMessages.length - currentLength - this.messagesPerPage);
        const newEndIndex = allMessages.length - currentLength;
        
        if (newStartIndex < newEndIndex) {
          const olderMessages = allMessages.slice(newStartIndex, newEndIndex);
          this.messages = [...olderMessages, ...this.messages];
          
          setTimeout(() => {
            const newScrollHeight = this.messageContainer.nativeElement.scrollHeight;
            this.messageContainer.nativeElement.scrollTop = newScrollHeight - this.previousScrollHeight;
          }, 0);
        } else {
          this.hasMoreMessages = false;
        }
        
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error loading more messages:', err);
        this.isLoading = false;
      }
    });
  }

  onFileSelected(event: any): void {
    const files = Array.from(event.target.files) as File[];
    this.selectedFiles = [...this.selectedFiles, ...files];
  }

  removeFile(index: number): void {
    this.selectedFiles.splice(index, 1);
  }

  openFilePicker(): void {
    this.fileInput.nativeElement.click();
  }

  sendMessage(): void {
    if (!this.newMessage.trim() && this.selectedFiles.length === 0) return;

    const formData = new FormData();
    formData.append('sender', this.userId);
    formData.append('text', this.newMessage);

    this.selectedFiles.forEach((file) => {
      formData.append('files', file);
    });

    this.http.post(`${this.backendUrl}/send/${this.chatId}`, formData).subscribe({
      next: (response) => {
        console.log('Message sent:', response);
        this.newMessage = '';
        this.selectedFiles = [];
        this.shouldScrollToBottom = true;
      },
      error: (err) => {
        console.error('Error sending message:', err);
      }
    });
  }

  isMyMessage(message: Message): boolean {
    return message.sender === this.userId;
  }

  formatTime(timestamp: Date): string {
    const date = new Date(timestamp);
    const day = String(date.getDate()).padStart(2, '0');
    const month = date.toLocaleString('en-US', { month: 'long' });
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    
    return `${day} ${month} ${year}, ${hours}:${minutes}`;
  }

  getFileName(filePath: string): string {
    return filePath.split('/').pop() || filePath;
  }

  downloadFile(filePath: string): void {
    window.open(this.backendUrl + filePath, '_blank');
  }

   private scrollToBottom(): void {
    try {
      setTimeout(() => {
        this.messageContainer.nativeElement.scrollTop = this.messageContainer.nativeElement.scrollHeight;
        this.shouldScrollToBottom = false;
      }, 0);
    } catch (err) {
      console.error('Error scrolling to bottom:', err);
    }
  }

  sanitizeUrl(file: File): string {
    return URL.createObjectURL(file);
  }

  get apiUrl(): string {
    return this.backendUrl;
  }
}