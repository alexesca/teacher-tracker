import { Component } from '@angular/core';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';

@Component({
    moduleId: module.id,
    selector: 'login',
    templateUrl: 'login.html',
    styleUrls:['main.scss']
})
export class Login{

    username: string;
    password: string;  
    showError: boolean;

    constructor(private loginService: LoginService,  private router: Router){
        if(loginService.isLoggedIn()){
            router.navigate(['/teachers']);
        }
    }

    login(){
        this.loginService.login(this.username, this.password)
            .subscribe(response => {
                localStorage.setItem('token', response);
                this.router.navigate(['/teachers']);
                this.showError = false;
            },
            error => {
                this.showError = true;
            });
    }
}