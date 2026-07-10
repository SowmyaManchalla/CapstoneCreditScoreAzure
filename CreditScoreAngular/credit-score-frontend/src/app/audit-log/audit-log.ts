import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { AuditLogService } from '../audit-log';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-audit-log',
  standalone:true,
  imports: [CommonModule, ReactiveFormsModule,FormsModule],
  templateUrl: './audit-log.html',
  styleUrl: './audit-log.css',
})
export class AuditLogComponent{

  auditForm: FormGroup;
   auditLogs: any[] = [];
   hasLoadedLogs = false;
   isLoadingLogs = false;
   searchId!:number;


  constructor(private fb: FormBuilder,
              private auditLogService: AuditLogService,
              private cdr:ChangeDetectorRef ) {
    this.auditForm = this.fb.group({
      customerId: [''],
      action:[''],
      actionTime: ['']
    });
  }
saveAuditLog()
{
  const auditLogRequest = {
    action: this.auditForm.value.action,
    actionTime: this.auditForm.value.actionTime,

    customer:{
      customerId: this.auditForm.value.customerId
  }
  };
  this.auditLogService.saveAuditLog(auditLogRequest)
  .subscribe({
    next:(response) =>
    {
      console.log("Audit log saved", response);
    alert("Audit log saved successfully");
   this.cdr.detectChanges();
  },
  error:(error) =>
  {
    console.error("Error saving audit log", error);
    this.cdr.detectChanges;
  }
  });
}
loadAuditLogs()
{
  this.hasLoadedLogs = true;
  this.isLoadingLogs = true;
  console.log("Calling:","http://localhost:9980/customer/audit-logs");
  this.auditLogService.getAuditLogs()
  .subscribe({
    next: (data) =>
    {
      console.log("Received audit logs:",data);
      this.auditLogs = data;
      this.isLoadingLogs = false;
      this.cdr.detectChanges();
    },
    error:(error) =>
    {
      console.error(error);
      this.isLoadingLogs = false;
      this.cdr.detectChanges();
    }
  });
}
fetchAuditLogsByCustomerId()
{
  if(!this.searchId)
  {
    alert('Please enter a customer ID first');
    return;
  }

this.hasLoadedLogs = true;
this.isLoadingLogs = true;
this.auditLogs=[];

this.auditLogService.getAuditLogsByCustomerId(this.searchId).subscribe({
  next:(data) =>
  {
    this.auditLogs = data;
    this.isLoadingLogs = false;
    this.cdr.detectChanges();
  },
  error:(error) =>
  {
    console.error("Error fetching filtered logs",error);
    this.isLoadingLogs = false;
    this.cdr.detectChanges();
    alert('Failed to retrieve logs for Customer ID'+this.searchId);
  }
});
}
}
