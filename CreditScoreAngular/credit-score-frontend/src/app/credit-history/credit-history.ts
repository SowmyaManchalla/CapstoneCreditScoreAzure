import { Component,OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CreditHistoryService } from '../credit-history.service';

@Component({
  selector: 'app-credit-history',
  standalone:true,
  imports: [ReactiveFormsModule,FormsModule],
  templateUrl: './credit-history.html',
  styleUrl: './credit-history.css',
})
export class CreditHistoryComponent {
  creditForm!: FormGroup;
  customerId: number | null = null;
  historyId :number | null = null;
  isEditMode:  boolean = false;

  constructor(private fb: FormBuilder,
    private creditHistoryService: CreditHistoryService) {



  this.creditForm = this.fb.group({
    totalLoans:['',[Validators.required]],
    activeLoans:['',[Validators.required]],
    latePayments:['',[Validators.required]],
    defaults:['',[Validators.required]],
    creditCardUsage:['',[Validators.required]]
  });
}

onLoadHistory()
{
  console.log(" Value of customerID inside component:",this.customerId);
  if(!this.customerId) 
  {
    alert("Error: The customer ID is empty. Did you type it in the box?");
  return;
}
  this.creditHistoryService.getCreditHistory(this.customerId).subscribe({
    next:(res:any) =>
    {
      this.creditForm.patchValue(res);
      this.historyId = res.id; // Store ID from server
      this.isEditMode = true; //Switch to update mode
      console.log("Record found, History ID:",this.historyId);
    },
    error:() =>
    {
      alert('No record found. You can save a new one');
      this.onClear();
  
    }
  });
}

onSubmit()
{
  if(this.creditForm.invalid )
    {
      alert("Please alert all the fields");
    return;
    }

  if(this.isEditMode && this.historyId)

  {
     this.creditHistoryService.updateCreditHistory(this.historyId,this.creditForm.value).subscribe({
      next:() => alert('Profile updated successfully'),
      error:(err) =>console.error("Update failed:",err)
     });
  } else
  {
    if(!this.customerId)
    {
      alert("Enter a customer ID first!");
      return;
    }
    this.creditHistoryService.saveCreditHistory(this.customerId,this.creditForm.value).subscribe(
      {
        next:() =>{

         alert('Profile saved successfully');
         this.isEditMode = true;
        },
        error:(err) => console.error("Save failed:",err)
      });
  }
  }

  onClear()
  {
    this.creditForm.reset();
    this.customerId = null;
    this.historyId = null;
    this.isEditMode = false;
  }
}
