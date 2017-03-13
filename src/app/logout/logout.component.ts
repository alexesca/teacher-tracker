import { Component, OnInit } from '@angular/core';
import { LoginService  } from '../services/login.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  message: string;

  constructor(public LoginService: LoginService, private router: Router) { }

  ngOnInit() {
    this.logOut();
  }

  logOut(){
    this.message = "Logging you out...";
    this.LoginService.logOut();
    this.message = "Completed. Redirecting you out...";
    this.router.navigate(['/login']);
  }


}
