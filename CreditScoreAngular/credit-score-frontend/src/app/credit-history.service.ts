import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


export interface CreditHistory {
  historyId?: number;
  totalLoans: number;
  activeLoans: number;
  latePayments: number;
  defaults: number;
  creditCardUsage: number;
  customerId: number;
}
@Injectable({
  providedIn: 'root',
})
export class CreditHistoryService {
  private baseUrl = 'http://localhost:9980/customer';

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

  saveCreditHistory(customerId: number, data: any): Observable<CreditHistory> {
    return this.http.post<CreditHistory>(`${this.baseUrl}/${customerId}/history`, data,{headers: this.getAuthHeaders()});
  }

getCreditHistoryByCustomerId(customerId: number): Observable<CreditHistory>
{
  return this.http.get<CreditHistory>(`${this.baseUrl}/history/${customerId}`);
}

updateCreditHistory(customerId: number, formValue: CreditHistory): Observable<CreditHistory> {
    return this.http.put<CreditHistory>(`${this.baseUrl}/history/${customerId}`, formValue,{headers: this.getAuthHeaders()});
  }
}