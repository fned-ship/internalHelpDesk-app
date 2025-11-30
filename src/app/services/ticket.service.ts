import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Ticket } from '../models/ticekt.module';
import { ApiResponse } from '../models/apiRes.module';
import { firstValueFrom } from 'rxjs';

export interface UpdateProfileData {
  firstName?: string;
  lastName?: string;
  number?: string;
  birthDay?: Date | string;
  job?: string;
  password?: string;
  newPassword?: string;
}

@Injectable({
  providedIn: 'root'
})
export class TicketService {
  private apiUrl = environment.serverURL; 

  constructor(private http: HttpClient) { }

  getAllTickets(): Observable<ApiResponse<Ticket[]>> {
    return this.http.get<ApiResponse<Ticket[]>>(`${this.apiUrl}/getalltickets`);
  }


  createTicket(ticket: Omit<Ticket, 'rating'>): Observable<ApiResponse<Ticket>> {
    return this.http.post<ApiResponse<Ticket>>(`${this.apiUrl}/createticket`, ticket);
  }


  updateTicketStatus(ticketId: string, status: 'In Progress' | 'Closed' | 'Pending'): Observable<ApiResponse<Ticket>> {
    return this.http.patch<ApiResponse<Ticket>>(
      `${this.apiUrl}/updateticketstatus/${ticketId}`,
      { status }
    );
  }


  rateTicket(ticketId: string, rating: number, closeTicket: boolean = false): Observable<ApiResponse<Ticket>> {
    return this.http.patch<ApiResponse<Ticket>>(
      `${this.apiUrl}/rateticket/${ticketId}`,
      { rating, closeTicket }
    );
  }


  updateTicketDescription(ticketId: string, description: string): Observable<ApiResponse<Ticket>> {
    return this.http.put<ApiResponse<Ticket>>(
      `${this.apiUrl}/updateticket/${ticketId}`,
      { description }
    );
  }

  deleteTicket(ticketId: string): Observable<ApiResponse<any>> {
    return this.http.delete<ApiResponse<any>>(`${this.apiUrl}/deleteticket/${ticketId}`);
  }







  // new functions : 
  getLastTicket(userId: string): Observable<ApiResponse<Ticket>> {
    return this.http.get<ApiResponse<Ticket>>(`${this.apiUrl}/ticket/last/${userId}`);
  }

  getTicketById(ticketId: string): Observable<ApiResponse<Ticket>> {
    return this.http.get<ApiResponse<Ticket>>(`${this.apiUrl}/ticket/${ticketId}`);
  }

  getTicketsByUserId(userId: string): Observable<ApiResponse<Ticket[]>> {
    return this.http.get<ApiResponse<Ticket[]>>(`${this.apiUrl}/tickets/user/${userId}`);
  }
}

/* 
des exemples :

this.ticketService.createTicket(newTicket).subscribe({
    next: (response) => console.log('Ticket created:', response.data),
    error: (err) => console.error('Error:', err)
});

this.ticketService.rateTicket(ticketId, 4, true).subscribe({
    next: (response) => console.log('Ticket rated and closed:', response.data)
});


*/