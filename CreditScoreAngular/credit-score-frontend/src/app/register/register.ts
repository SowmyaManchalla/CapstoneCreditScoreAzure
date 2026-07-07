import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Auth } from '../auth';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {
registerForm: FormGroup;

 constructor(
  private auth:Auth,
  private router: Router ,
  private fb: FormBuilder
 ){
  this.registerForm = this.fb.group({
    username: ['' ,Validators.required],
    password:['',Validators.required],
    role:['USER']
  });
 }
 register(): void{
  if(this.registerForm.invalid)
  {
    alert("Please enter username and password");
    return;
  }
  const user = this.registerForm.value;
  this.auth.register(user).subscribe({
    next: (response: any) => 
    {
      console.log("Registration successful:",response);
      alert("Registration successful");
      this.registerForm.reset({role: 'USER'})
      this.router.navigate(['/login']);
    },
    error:(err: any) =>{
      console.error('Registration failed',err);

    if(err.status === 0)
    {
      alert('Cannot connect to Spring boot backend');
    } else if(err.status === 400)
      {
        alert('Invalid registration details');

      }else if(err.status === 403)
      {
        alert('Access denied');
      }
      else if(err.status!==200){
        alert('Registration failed');
      }
      else
        alert('Registration success');
    }
    });
  }
 }
