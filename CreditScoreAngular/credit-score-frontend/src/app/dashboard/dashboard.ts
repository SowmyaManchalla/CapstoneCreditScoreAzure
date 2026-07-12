import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { DashboardService } from '../dashboard';
import { CommonModule } from '@angular/common';
import { AuditLogService } from '../audit-log';


export interface CustomerProfile
{
  customerId: string;
  firstName: string;
  lastName: string;
  email:string;
  mobile:string;
  occupation: string;
  monthlyIncome: string;
  employmentYears: string;
}

export interface CreditHistory
{
   historyId: number;
   activeLoans: number;
   creditCardUsage : number;
   defaults: number;
   latePayments: number;
   totalLoans: number;
 
}

export interface CreditScore
{
  scoreId: number;
  score: number;
  riskCategory: number;
  generatedDate: number;
}



@Component({
  selector: 'app-dashboard',
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})


export class DashboardComponent implements OnInit {

  customerList: CustomerProfile[] = [];
  displayList: any[] = [];
 
  displayCreditList: CreditHistory[] = [];
  displayCreditScores: CreditScore[] = [];

   dashboard:any = {};

  showCustomerList: boolean = false;
  showHistoryTable: boolean=false;
  showAuditTable: boolean = false;
  showScoreList: boolean = false;

  constructor(private dashboardService: DashboardService, private auditLogService: AuditLogService,private cdr:ChangeDetectorRef)
  {}
  ngOnInit():void{
    this.loadDashboard();
  }
  viewAllCustomers()
  {
    this.dashboardService.getAllCustomers().subscribe(data =>{
      console.log("Raw data from backend:" ,data);
      this.customerList = data as any;
      this.showCustomerList = true;
      this.showHistoryTable = false;
      this.showAuditTable = false;
       this.showScoreList = false;
       this.cdr.detectChanges();
    })
  }
  viewAuditLogs()
    {
      this.auditLogService.getAuditLogs().subscribe(data =>
      {
       this.displayList = data as any[];
        this.showAuditTable = true;
        this.showCustomerList = false;
        this.showHistoryTable = false;
         this.showScoreList = false;
         this.cdr.detectChanges();
      });
    }

    viewHistory()
    {
      console.log("View history button clicked!");
      this.dashboardService.getCreditHistory().subscribe(data =>
      {
        console.log("Data received:",data);
        this.displayCreditList = data as any[];
        this.showHistoryTable = true;
        this.showAuditTable = false;
        this.showCustomerList = false;
        this.showScoreList = false;
        this.cdr.detectChanges();
      }
      );
    }

    viewCreditScores()
    {
      this.dashboardService.getAllCreditScores().subscribe({
        next:(data) =>
        {
          this.displayCreditScores = data;
          this.showHistoryTable = false;
        this.showAuditTable = false;
        this.showCustomerList = false;
        this.showScoreList = true;
        this.cdr.detectChanges();
          console.log('Credit scores loaded:',this.displayCreditScores);
        },
        error: (err)=>
        {
          console.error('Error fetching scores:',err);
        }
      });
    }



  loadDashboard():void{
    this.dashboardService.getDashboardData().subscribe({
      next:(data) =>
      {
        this.dashboard = data;
        console.log("Dashboard loaded:", data);
      },
      error:(error) =>

      {
        console.error('Error loading dashboard',error);
      }
    });
  }
}
