import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule,CommonModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class NavbarComponent implements OnInit{
  isLoggedIn = false;

  constructor(private router: Router)
  {}
  ngOnInit(): void{
    this.checkLoginStatus();
  }
  checkLoginStatus():void{
    this.isLoggedIn = localStorage.getItem('loggedIn') === 'true';
    console.log("Navbar login status:",this.isLoggedIn);
  }
  logout(): void{
    localStorage.removeItem('loggedIn');
    this.isLoggedIn = false;
    this.router.navigate(['/login']);
  }
}
