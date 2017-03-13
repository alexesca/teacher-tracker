import { Http, Headers } from '@angular/http'
import { Injectable } from '@angular/core';
import { Url } from './url.model';
import { tokenNotExpired } from 'angular2-jwt';


@Injectable()
export class LoginService{

    private url: string;

    constructor(private http: Http) {
        this.url = new Url().getUrl();
    }

    isAuthenticated() {

    }

    login(username: string, password: string) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.post(this.url + '/login', JSON.stringify({ 'username': username, 'password': password }), { headers: headers })
            .map(res => res.json());
    }

    logOut(){
        localStorage.removeItem('token');
    }

    isLoggedIn(){
        return tokenNotExpired('token');
    }
}