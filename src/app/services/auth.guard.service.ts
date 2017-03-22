import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CanActivate } from '@angular/router';
import { LoginService } from './login.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private loginService: LoginService, private router: Router) {}

  canActivate() {
    if(this.loginService.isLoggedIn()) {
      return true;
    } else {
      this.router.navigate(['unauthorized']);
      return false;
    }
  }
}