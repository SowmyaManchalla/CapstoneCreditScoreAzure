import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Auth {

  constructor(private http:HttpClient)
  {}
  register(user:any) : Observable<any>
  {
    return this.http.post('http://localhost:9980/auth/register', user);
  }
  login(user:any) : Observable<any>
  {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post('http://localhost:9980/auth/login', JSON.stringify(user),{headers});
  }

  }
