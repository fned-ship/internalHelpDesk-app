import { Component, OnInit , Input } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Document } from '../../models/docs.model';

@Component({
  selector: 'app-documents',
  templateUrl: './docs.html',
  imports:[CommonModule,FormsModule],
  styleUrls: ['./docs.css']
})
export class DocumentsComponent implements OnInit {
  @Input() currentUserId!: string;
  @Input() role!: string;


  documents: Document[] = [];
  filteredDocuments: Document[] = [];
  searchTerm: string = '';
  selectedFilter: string = 'recents';
  selectedDocument: any = null;
  showUploadModal: boolean = false;
  // currentUserId: string = '691cb3518be8df6fae1199a4';
  
  uploadFile: File | null = null;
  uploadComment: string = '';
  uploadError: string = '';
  // role:string="manager";

  private apiUrl = `${environment.serverURL}/documents`;

  constructor(private http: HttpClient) {


  }

  ngOnInit(): void {
    this.loadDocuments();
  }

  loadDocuments(): void {
    this.http.get<Document[]>(this.apiUrl).subscribe({  
      next: (docs) => {
        this.documents = docs;
        this.applyFilters();
        console.log(this.documents);
      },
      error: (error) => console.error('Error loading documents:', error)
    });
  }

  applyFilters(): void {
    let filtered = [...this.documents];


    if (this.searchTerm) {
      filtered = filtered.filter(doc => 
        doc.fileName.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }


    if (this.selectedFilter === 'recents') {
      filtered.sort((a, b) => 
        new Date(b.uploadDate || '').getTime() - new Date(a.uploadDate || '').getTime()
      );
    }

    this.filteredDocuments = filtered;
  }

  onSearch(event: any): void {
    this.searchTerm = event.target.value;
    this.applyFilters();
  }

  onFilterChange(filter: string): void {
    this.selectedFilter = filter;
    this.applyFilters();
  }

  selectDocument(doc: Document): void {
    this.selectedDocument = doc;
  }

  downloadDocument(doc: Document): void {
    this.http.get(`${this.apiUrl}/download/${doc._id}`, { 
      responseType: 'blob' 
    }).subscribe({
      next: (blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = doc.fileName;
        a.click();
        window.URL.revokeObjectURL(url);
      },
      error: (error) => console.error('Error downloading document:', error)
    });
  }

  deleteDocument(doc: Document): void {
    if (!this.canDelete(doc)) {
      alert('You do not have permission to delete this document');
      return;
    }

    if (confirm(`Are you sure you want to delete ${doc.fileName}?`)) {
      this.http.delete(`${this.apiUrl}/${doc._id}`,{body:{role:this.role,userId:this.currentUserId}}).subscribe({
        next: () => {
          this.loadDocuments();
          if (this.selectedDocument?._id === doc._id) {
            this.selectedDocument = null;
          }
        },
        error: (error) => console.error('Error deleting document:', error)
      });
    }
  }

  canDelete(doc: Document): boolean {

    return this.role === 'admin' || doc.userId?._id === this.currentUserId;
  }

  openUploadModal(): void {
    this.showUploadModal = true;
    this.uploadFile = null;
    this.uploadComment = '';
    this.uploadError = '';
  }

  closeUploadModal(): void {
    this.showUploadModal = false;
    this.uploadFile = null;
    this.uploadComment = '';
    this.uploadError = '';
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.uploadFile = file;
    }
  }

  uploadDocument(): void {
    if (!this.uploadFile) {
      this.uploadError = 'Please select a file';
      return;
    }

    if (!this.uploadComment.trim()) {
      this.uploadError = 'Please add a comment';
      return;
    }

    const formData = new FormData();
    formData.append('file', this.uploadFile);
    formData.append('comment', this.uploadComment);
    formData.append('userId', this.currentUserId);

    this.http.post(this.apiUrl, formData).subscribe({
      next: () => {
        this.closeUploadModal();
        this.loadDocuments();
      },
      error: (error) => {
        this.uploadError = error.error?.message || 'Error uploading file';
      }
    });
  }

  getFileIcon(fileName: string): string {
    const ext = fileName.split('.').pop()?.toLowerCase();
    return ext??"file";








  }

  formatFileSize(bytes: number): string {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(0) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: '2-digit', 
      day: '2-digit' 
    });
  }
}