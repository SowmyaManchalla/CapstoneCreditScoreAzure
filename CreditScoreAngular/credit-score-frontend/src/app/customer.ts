import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Customer {
  private baseUrl = 'http://localhost:9980/customer/profile';
  
  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {

    const username = 'admin';
    const password = 'admin123';
    const encodedCredentials = btoa(`${username}:${password}`);

    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Basic ${encodedCredentials}`
    });
  }

  getProfile(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`, { headers: this.getAuthHeaders() });
  }

  createProfile(data: any): Observable<any> {

  
    return this.http.post(this.baseUrl, JSON.stringify(data), { headers: this.getAuthHeaders() });
  }

  updateProfile(id: number, data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, data, {headers: this.getAuthHeaders()});
  }

  deleteProfile(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, {headers: this.getAuthHeaders()});
  }

}
