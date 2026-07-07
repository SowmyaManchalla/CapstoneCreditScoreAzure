import { Component,OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CreditHistoryService } from '../credit-history.service';

@Component({
  selector: 'app-credit-history',
  standalone:true,
  imports: [ReactiveFormsModule],
  templateUrl: './credit-history.html',
  styleUrl: './credit-history.css',
})
export class CreditHistoryComponent implements OnInit{
  creditForm!: FormGroup;
  customerId: number = 14;
  historyId :number | null = null;

  constructor(private fb: FormBuilder,
    private creditHistoryService: CreditHistoryService) {}

ngOnInit():void{

  this.creditForm = this.fb.group({
    totalLoans:['',[Validators.required,Validators.min(0)]],
    activeLoans:['',[Validators.required,Validators.min(0)]],
    latePayments:['',[Validators.required,Validators.min(0)]],
    defaults:['',[Validators.required,Validators.min(0)]],
    creditCardUsage:['',[Validators.required,Validators.min(0),Validators.max(100)]]
  });
}
  onSubmit(): void
  {
    if(this.creditForm.invalid)
    {
      this.creditForm.markAllAsTouched();
      alert('Please fill in all required fields correctly before submitting.');
      return;
    }
     console.log("Crucial check - current customer ID being sent:", this.customerId);
    const formData = this.creditForm.value;

    if(this.historyId)
    {
      this.creditHistoryService.updateCreditHistory(this.historyId,{historyId:this.historyId,...formData})
      .subscribe({
        next:(res:any) => alert('Credit history updated successfully'),
        error:(err: any)=>console.error('Update failed:',err)
      });
    }else
    {
      console.log("Form data being sent to the service", formData);
      if(!formData || Object.keys(formData). length===0)
      {
        alert("Cannot save : Form data is empty.Please fill out all the fields");
        console.error("Save aborted: formData is null or empty");
          return;
      }
      this.creditHistoryService.saveCreditHistory(this.customerId,formData)
      .subscribe({
        next:(res: any) => {
          alert('Credit history saved successfully');
          if(res && res.historyId)
          {
            this.historyId = res.historyId;
          }
      
        },
        error:(err: any)=>
          {console.error('Save failed:',err);
        alert('Save failed ! Check the console ');
          }
      });
    }
  }
  onLoadHistory(searchId:string):void
  {
    const id = parseInt(searchId,10);
    if(!id) {
      alert('Please enter a valid numeric ID');
      return;
    }

    this.creditHistoryService.getCreditHistory(id).subscribe({
      next:(res: any) =>{

        console.log('Database payload received:',res);

        if(res && (res.history!==undefined || res.historyId!==undefined))
        {
          
    this.historyId = res.historyId ?? res.historyId ?? null;
    this.creditForm.patchValue({
      totalLoans: res.totalLoans,
      activeLoans: res.activeLoans,
      latePayments: res.latePayments,
      defaults: res.defaults,
      creditCardUsage: res.creditCardUsage
    });
    alert('Success: Credit history record loaded for ID ${id}!');

  }else{
    console.warn('Backend returned an empty response for ID:${id}');
    alert('Notice: Server processed request, but no matching credit history fields are populated for ID: ${id}');
    this.creditForm.reset();
    this.historyId=null;
  }
},
  error:(err: any) => alert('Could not find credit history record')
    });
  }
  }