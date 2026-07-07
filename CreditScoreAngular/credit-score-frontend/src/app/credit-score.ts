import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CreditScoreService {
  private baseUrl = 'http://localhost:9980/customer';

  constructor(private http:HttpClient)

  {}
   private getAuthHeaders(): HttpHeaders {

    const username = 'admin';
    const password = 'admin123';
    const encodedCredentials = btoa(`${username}:${password}`);

    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Basic ${encodedCredentials}`
    });
  }

  generateScore(customerId: number): Observable<any>
  {
    console.log("Passing ID:", customerId);
    const headers = this.getAuthHeaders();
    return this.http.post<any>(`${this.baseUrl}/generate-score/${customerId}`,
     {},
     { headers:this.getAuthHeaders() }
    );
  }
  getScore(customerId: number): Observable<any>
  {
    return this.http.get<any>
    (`{this.baseUrl}/all`);
  }
}
