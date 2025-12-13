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


  //must provide id and _id for both of manager and employee
  createTicket(ticket: Omit<Ticket, 'rating'>): Observable<ApiResponse<Ticket>> {
    return this.http.post<ApiResponse<Ticket>>(`${this.apiUrl}/createticket`, ticket);
  }


  // ticket id ( not _id )
  updateTicketStatus(ticketId: string, status: 'In Progress' | 'Closed' | 'Pending'): Observable<ApiResponse<Ticket>> {
    return this.http.patch<ApiResponse<Ticket>>(
      `${this.apiUrl}/updateticketstatus/${ticketId}`,
      { status }
    );
  }


  // ticket id ( not _id )
  rateTicket(ticketId: string, rating: number, closeTicket: boolean = false): Observable<ApiResponse<Ticket>> {
    return this.http.patch<ApiResponse<Ticket>>(
      `${this.apiUrl}/rateticket/${ticketId}`,
      { rating, closeTicket }
    );
  }


  // ticket id ( not _id )
  updateTicket(ticketId: string, data : any): Observable<ApiResponse<Ticket>> {
    return this.http.put<ApiResponse<Ticket>>(
      `${this.apiUrl}/updateticket/${ticketId}`,
      { data }
    );
  }

  // ticket id ( not _id )
  deleteTicket(ticketId: string): Observable<ApiResponse<any>> {
    return this.http.delete<ApiResponse<any>>(`${this.apiUrl}/deleteticket/${ticketId}`);
  }







  // new functions : 

  // userId : _id and not id
  getLastTicket(userId: string): Observable<ApiResponse<Ticket>> {
    return this.http.get<ApiResponse<Ticket>>(`${this.apiUrl}/ticket/last/${userId}`);
  }


  // ticket id ( not _id )
  getTicketById(ticketId: string): Observable<ApiResponse<Ticket>> {
    return this.http.get<ApiResponse<Ticket>>(`${this.apiUrl}/ticket/${ticketId}`);
  }

  // userId : _id and not id
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