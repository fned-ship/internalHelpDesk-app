import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../environments/environment';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = environment.serverURL;

  constructor(private http: HttpClient) {}

  // GET all employees
  async getAllEmployees(): Promise<{ status: number; data: User[]; message?: string }> {
    try {
      const data = await firstValueFrom(this.http.get<User[]>(`${this.apiUrl}/getallemployees`));
      return { status: 200, data };
    } catch (error: any) {
      return { status: error.status || 500, data: [], message: error.message || 'Failed to fetch employees' };
    }
  }

  // GET all managers
  async getAllManagers(): Promise<{ status: number; data: User[]; message?: string }> {
    try {
      const data = await firstValueFrom(this.http.get<User[]>(`${this.apiUrl}/getallmanagers`));
      return { status: 200, data };
    } catch (error: any) {
      return { status: error.status || 500, data: [], message: error.message || 'Failed to fetch managers' };
    }
  }

  // POST upgrade user to manager
  async upgradeToManager(id: string): Promise<{ status: number; data?: User; message?: string }> {
    try {
      const data = await firstValueFrom(this.http.post<{ message: string; user: User }>(`${this.apiUrl}/upgrade/${id}/manager`, {}));
      return { status: 200, data: data.user, message: data.message };
    } catch (error: any) {
      return { status: error.status || 500, message: error.error?.message || 'Failed to upgrade user' };
    }
  }

  // GET pending users
  async getPendingUsers(): Promise<{ status: number; data: User[]; message?: string }> {
    try {
      const data = await firstValueFrom(this.http.get<User[]>(`${this.apiUrl}/pendingusers`));
      return { status: 200, data };
    } catch (error: any) {
      return { status: error.status || 500, data: [], message: error.message || 'Failed to fetch pending users' };
    }
  }

  // POST accept user
  async acceptUser(id: string): Promise<{ status: number; data?: User; message?: string }> {
    try {
      const data = await firstValueFrom(this.http.post<{ message: string; user: User }>(`${this.apiUrl}/acceptuser/${id}`, {}));
      return { status: 200, data: data.user, message: data.message };
    } catch (error: any) {
      return { status: error.status || 500, message: error.error?.message || 'Failed to accept user' };
    }
  }

  // DELETE user
  async deleteUser(id: string): Promise<{ status: number; message: string }> {
    try {
      const data = await firstValueFrom(this.http.delete<{ message: string }>(`${this.apiUrl}/${id}`));
      return { status: 200, message: data.message };
    } catch (error: any) {
      return { status: error.status || 500, message: error.error?.message || 'Failed to delete user' };
    }
  }
}
