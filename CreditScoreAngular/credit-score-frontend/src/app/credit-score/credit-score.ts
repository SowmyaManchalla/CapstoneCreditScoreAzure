import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CreditScoreService } from '../credit-score';


@Component({
  selector: 'app-credit-score',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './credit-score.html',
  styleUrl: './credit-score.css',
})
export class CreditScore {

  generateScoreForm!: FormGroup;
  getScoreForm!: FormGroup;
  creditScore: any = null;
  isProcessing: boolean = false;
  isGettingScore = false;

  
  constructor(
    private fb: FormBuilder,  
    private service : CreditScoreService,
    private cdr: ChangeDetectorRef  
  )
  {
    this.generateScoreForm = this.fb.group
    ({
      customerId: ['']
    });
    this.getScoreForm = this.fb.group({
      searchCustomerId:['']
    });
  }
  generateScore()
  {

    this.isProcessing = true;
    this.creditScore = null;

    const id = this.generateScoreForm.value.customerId;
    console.log("Attempting to generate score for customer ID:",id);

    this.service.generateScore(id).subscribe({
      next: (data : any) =>
      {
        console.log("Successfully received data from backend:", data);
        this.creditScore = data;
        this.isProcessing = false;
        this.cdr.detectChanges();
      },

      error: (err : any)=>
      {
        console.log("Full error object received from backend:", err);
        alert("Unable to generate credit score");
        this.isProcessing = false;
         this.cdr.detectChanges();
      }
    });
  }

  getScore()
  {

    this.isGettingScore = true;
    const id = this.getScoreForm.value.searchCustomerId;
    console.log("Attempting to get score for customer ID:",id);
    
     
    this.service.getScore(id).subscribe({
      next: (data : any) =>
      {
        console.log("Successfully received data from backend:", data);
        this.creditScore = data;
        this.isGettingScore = false;
        this.cdr.detectChanges();
      },

      error: (err : any)=>
      {
        console.log("Full error object received from backend:", err);
        alert("Unable to fetch credit score");
        this.isGettingScore = false;
         this.cdr.detectChanges();
      }
    });
  }

  
}
