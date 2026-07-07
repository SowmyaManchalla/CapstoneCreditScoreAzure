import { HttpClient } from '@angular/common/http';
import { Component, Injectable, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Observable } from 'rxjs/internal/Observable';
import { Customer } from '../customer';

@Component({
  selector: 'app-customer-profile',
  imports: [ReactiveFormsModule],
  templateUrl: './customer-profile.html',
  styleUrl: './customer-profile.css'
})
export class CustomerProfile implements OnInit{
  profileForm! : FormGroup;

  constructor(private fb: FormBuilder, private service: Customer) {}
  

  ngOnInit():void
  {
    this.profileForm = this.fb.group({
      customerId: [''],
      firstName: ['',Validators.required],
      lastName: ['', Validators.required],
      email:['', [Validators.required,Validators.email]],
      mobile:[''],
      occupation:[''],
      monthlyIncome:[''],
      employmentYears:[''],
  });
}
getProfile()
{
  const id = this.profileForm.get('customerId')?.value;
  if(!id) {
    alert('Please enter a valid customer ID to fetch the profile.');
    return;
  }
  this.service.getProfile(id).subscribe({
    next: (data) => {
      this.profileForm.patchValue(data);
    },
    error: (err) => {
      console.error('Error fetching profile:', err);
      alert(`Failed to fetch profile. Please check the customer ID and try again. Status: ${err.status}`);
    }
  });
}
createProfile()
{
  if(this.profileForm.invalid)
  {
    alert('Please fill in all required fields before creating a profile.');
    return;
  }
const payload = {...this.profileForm.value};
delete payload.customerId; // Remove customerId for creation

  this.service.createProfile(payload).subscribe({
    next: (response) => {
      alert('Profile created successfully');
    },
    error: (err) => {
      console.error('Error creating profile:', err);
      alert(`Failed to create profile. Status: ${err.status}`);
    }
  });
}

updateProfile()
{
  const id = this.profileForm.get('customerId')?.value;
  if(!id)
  {
    alert('Customer ID is required to update a profile');
    return;
  }
  this.service.updateProfile(id, this.profileForm.value).subscribe({
    next: (response) => {
      alert('Profile updated successfully');
    },
    error: (err) => {
      console.error('Error updating profile:', err);
      alert(`Failed to update profile. Status: ${err.status}`);
    }
  });
}

deleteProfile()
{
  const id = this.profileForm.get('customerId')?.value;
  if(!id)
  {
    alert('Customer ID is required to delete a profile');
    return;
  }
  this.service.deleteProfile(id).subscribe({
    next: (response) => {
      alert('Profile deleted successfully');
      this.profileForm.reset();
    },
    error: (err) => {
      console.error('Error deleting profile:', err);
      alert(`Failed to delete profile. Status: ${err.status}`);
    }
  });
}
}

