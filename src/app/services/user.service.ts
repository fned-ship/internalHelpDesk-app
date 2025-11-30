import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../environments/environment';
import { User } from '../models/user.model';
import { UpdateProfileData } from './ticket.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = environment.serverURL;

  constructor(private http: HttpClient) {}


  async getAllEmployees(): Promise<{ status: number; data: User[]; message?: string }> {
    try {
      const data = await firstValueFrom(this.http.get<User[]>(`${this.apiUrl}/getallemployees`));
      return { status: 200, data };
    } catch (error: any) {
      return { status: error.status || 500, data: [], message: error.message || 'Failed to fetch employees' };
    }
  }


  async getAllManagers(): Promise<{ status: number; data: User[]; message?: string }> {
    try {
      const data = await firstValueFrom(this.http.get<User[]>(`${this.apiUrl}/getallmanagers`));
      return { status: 200, data };
    } catch (error: any) {
      return { status: error.status || 500, data: [], message: error.message || 'Failed to fetch managers' };
    }
  }


  async upgradeToManager(id: string): Promise<{ status: number; data?: User; message?: string }> {
    try {
      const data = await firstValueFrom(this.http.post<{ message: string; user: User }>(`${this.apiUrl}/upgrade/${id}/manager`, {}));
      return { status: 200, data: data.user, message: data.message };
    } catch (error: any) {
      return { status: error.status || 500, message: error.error?.message || 'Failed to upgrade user' };
    }
  }


  async getPendingUsers(): Promise<{ status: number; data: User[]; message?: string }> {
    try {
      const data = await firstValueFrom(this.http.get<User[]>(`${this.apiUrl}/pendingusers`));
      return { status: 200, data };
    } catch (error: any) {
      return { status: error.status || 500, data: [], message: error.message || 'Failed to fetch pending users' };
    }
  }


  async acceptUser(id: string): Promise<{ status: number; data?: User; message?: string }> {
    try {
      const data = await firstValueFrom(this.http.post<{ message: string; user: User }>(`${this.apiUrl}/acceptuser/${id}`, {}));
      return { status: 200, data: data.user, message: data.message };
    } catch (error: any) {
      return { status: error.status || 500, message: error.error?.message || 'Failed to accept user' };
    }
  }


  async deleteUser(id: string): Promise<{ status: number; message: string }> {
    try {
      const data = await firstValueFrom(this.http.delete<{ message: string }>(`${this.apiUrl}/${id}`));
      return { status: 200, message: data.message };
    } catch (error: any) {
      return { status: error.status || 500, message: error.error?.message || 'Failed to delete user' };
    }
  }


  
  // new func
  async updateUserProfile(
    userId: string, 
    profileData: UpdateProfileData, 
    imageFile?: File
    ): Promise<{ status: number; data?: { message: string; user: User }; message?: string }> {
      try {
        const formData = new FormData();
        formData.append('data', JSON.stringify(profileData));
        
        if (imageFile) {
          formData.append('image', imageFile);
        }

        const data = await firstValueFrom(
          this.http.put<{ message: string; user: User }>(
            `${this.apiUrl}/user/profile/${userId}`, 
            formData
          )
        );
        return { status: 200, data };
      } catch (error: any) {
        return { 
          status: error.status || 500, 
          message: error.error?.message || error.message || 'Failed to update profile' 
        };
      }
    }
}
