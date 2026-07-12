import { ChangeDetectorRef, Component } from '@angular/core';
import { ReportService } from '../report';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-report',
  imports: [FormsModule,CommonModule],
  templateUrl: './report.html',
  styleUrl: './report.css'
})
export class ReportComponent {
  customerId!: number;
  reportData: any;
  isLoading : boolean = false;

  errorMessage: string | null = null;

  constructor(private reportService: ReportService, private cdr:ChangeDetectorRef)
  {}

  getReport()
  {
    this.isLoading = true;
    this.errorMessage = null;
    this.reportData = null;
    console.log("Search button clicked!",this.customerId);
    this.reportService.getReportByCustomerId(this.customerId).subscribe(
    {
      next:(response) =>
      {
        console.log("Success:",response);
        this.reportData = response;
        this.errorMessage = '';
        this.isLoading = false;
        this.cdr.detectChanges();
      },
      error:(err) =>
      {
  this.reportData = null;
  this.errorMessage = 'Customer report not found';
  console.log("API error:",err);
  this.isLoading = false;
  this.cdr.detectChanges;
}    
  });
  }
}
