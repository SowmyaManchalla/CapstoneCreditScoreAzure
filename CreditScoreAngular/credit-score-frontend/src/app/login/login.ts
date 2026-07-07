import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
import { Auth } from '../auth';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login implements OnInit {
  
loginForm!: FormGroup;
constructor(private fb:FormBuilder,private auth: Auth){}

ngOnInit():void{
  this.loginForm = this.fb.group({
    username: ['',Validators.required],
    password:['',Validators.required]
  });
}

  login():void
  {
   if(this.loginForm.valid)
   {
    console.log("Submitting:",this.loginForm.value);
    this.auth.login(this.loginForm.value).subscribe({
      next: (res: any) =>
        {console.log("Login SUCCESS:",res);
      alert( "Login successful");
    },
    error:(err: any) =>
    {
      console.log(" LOGIN ERROR:",err);
      alert(err.error?.message || "Login failed");
    }
  });
   } 
  }
}