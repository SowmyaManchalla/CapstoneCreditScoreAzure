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
  customerId: any;
  historyId :any ;
  isEditMode:  boolean = false;
  creditHistory: any;

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
  this.creditHistoryService.getCreditHistoryByCustomerId(this.customerId).subscribe({
    next:(res:any) =>
    {
      console.log("Raw response from server:",res);
      if(res && res.historyId) 
      {
      this.creditForm.patchValue(res);
     this.historyId = res.historyId;
      this.creditHistory = res; // Store ID from server
      this.isEditMode = true; //Switch to update mode
      console.log("Record found, History ID:",res.historyId);
    }
    else
      {
       console.warn("Server returned empty or invalid response:",res);
        alert('No record found. You can save a new one');
        this.onClear();
        this.isEditMode = false;
      }
      },
    error:(err) =>
    {
      console.error("Server error:" ,err);
      alert('No record found. You can save a new one');
      this.onClear();
      this.isEditMode = false;
    }
  });
}

onSubmit()
{
  const formData = this.creditForm.value;
if(this.creditForm.invalid)
{
  alert('Please fill in all required fields');
  return;
}
    if(this.isEditMode)

  {

    const Payload = 
    {
      activeLoans: this.creditForm.value.activeLoans,
      creditCardUsage : this.creditForm.value.creditCardUsage,
      defaults: this.creditForm.value.defaults,
      latePayments: this.creditForm.value.latePayments,
      totalLoans: this.creditForm.value.totalLoans

    };
     this.creditHistoryService.updateCreditHistory(this.historyId, Payload as any).subscribe({
      next:() => {
        alert('Profile updated successfully');
      },
      error:(err) =>alert('Error updating record')
     });
  } else
  {
   
    this.creditHistoryService.saveCreditHistory(this.customerId,this.creditForm.value).subscribe(
      {
        next:(res) =>{

         alert('Profile saved successfully');
         this.isEditMode = true;
         this.historyId = res.historyId;
        },
        error:(err) => {
          console.error("Create failed:", err);
          alert('Error creating record')
        }
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
