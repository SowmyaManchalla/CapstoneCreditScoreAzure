import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CustomerProfile } from './customer-profile/customer-profile';
import { CreditHistory } from './credit-history.service';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {

  private apiUrl = 'http://localhost:9980/api/dashboard';

  constructor(private http:HttpClient)
  {}

  getDashboardData():Observable<any>
  {
    console.log('Attempting to fetch from:', this.apiUrl);
    return this.http.get<any>(this.apiUrl);

  }
  getAllCustomers(): Observable<CustomerProfile[]>
  {
    return this.http.get<CustomerProfile[]>(`http://localhost:9980/customer/customers`);
  }
  getCreditHistory(): Observable<CreditHistory[]>
  {
    return this.http.get<CreditHistory[]>(`http://localhost:9980/customer/credit-history`);
  }
  getAllCreditScores(): Observable<any[]>
  {
    return this.http.get<any[]>(`http://localhost:9980/customer/all-scores`);
  }

}
