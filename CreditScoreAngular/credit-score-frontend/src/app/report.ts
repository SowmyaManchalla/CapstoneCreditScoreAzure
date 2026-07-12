import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ReportService {

  private apiUrl = 'http://localhost:9980/api/reports';


  constructor(private http:HttpClient)
  {}
  getReportByCustomerId(id:number): Observable<any>
  {
    return this.http.get<any>(`${this.apiUrl}/customer/${id}`);
    
  }
}
