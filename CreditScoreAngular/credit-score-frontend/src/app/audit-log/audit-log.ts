import { Component, Injectable } from '@angular/core';

@Component({
  selector: 'app-audit-log',
  imports: [],
  templateUrl: './audit-log.html',
  styleUrl: './audit-log.css',
})
export interface AuditLog {
  logId: number;
  action: string;
  actionTime: string;
  customer: any;
}

@Injectable{
  providedIn: 'root'
})




