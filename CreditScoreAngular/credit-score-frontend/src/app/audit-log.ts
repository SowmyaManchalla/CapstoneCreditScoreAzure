import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class AuditLogService {
  private baseUrl = 'http://localhost:9980/customer';

  constructor(private http: HttpClient) {}

  saveAuditLog(auditLog: any): Observable<any>
  {
    return this.http.post<any>
    (`${this.baseUrl}/audit-log`,auditLog);
  }

getAuditLogs(): Observable<any[]>
{

  //console.log("Base URL:", this.baseUrl);
  const testUrl = `http://localhost:9980/customer/audit-logs`;
   console.log(testUrl);
   console.log("AUDIT SERVICE UPDATED");
  return this.http.get<any[]>(testUrl);
  
 // (`{this.baseUrl}/audit-logs`);
}
getAuditLogsByCustomerId(id: number) : Observable<any[]>
{
  const testUrl = `http://localhost:9980/customer/${id}/logs`;
  console.log(testUrl);
  return this.http.get<any[]>(testUrl);
}
}
