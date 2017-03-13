import { Injectable } from '@angular/core';
import { tokenNotExpired } from 'angular2-jwt';
import { Router } from '@angular/router';


// Avoid name not found warnings
let Auth0Lock = require('auth0-lock').default

@Injectable()
export class Auth {
    // Configure Auth0
    auth = new Auth0Lock(
        'rzNYDqk45doqq5503nxKuFdsbrHsRYYz',
        'alexesca.auth0.com',
    );

    constructor(private router: Router) {
    }

    public handleAuthentication(): void {
        this.auth.parseHash((err, authResult) => {
            if (authResult && authResult.accessToken && authResult.idToken) {
                window.location.hash = '';
                localStorage.setItem('access_token', authResult.accessToken);
                localStorage.setItem('id_token', authResult.idToken);
                this.router.navigate(['/home']);
            } else if (authResult && authResult.error) {
                alert('Error: ' + authResult.error);
            }
        });
    }

    public login(username: string, password: string): void {
        this.auth.client.login({
            realm: 'Username-Password-Authentication',
            username,
            password
        }, (err, authResult) => {
            if (err) {
                alert('Error: ' + err.description);
                return;
            }
            if (authResult && authResult.idToken && authResult.accessToken) {
                this.setUser(authResult);
                this.router.navigate(['/home']);
            }
        });
    }

    public signup(email, password): void {
        this.auth.redirect.signupAndLogin({
            connection: 'Username-Password-Authentication',
            email,
            password,
        }, function (err) {
            if (err) {
                alert('Error: ' + err.description);
            }
        });
    }

    public loginWithGoogle(): void {
        this.auth.authorize({
            connection: 'google-oauth2',
        });
    }

    public isAuthenticated(): boolean {
        // Check whether the id_token is expired or not
        return tokenNotExpired();
    }

    public logout(): void {
        // Remove token from localStorage
        localStorage.removeItem('access_token');
        localStorage.removeItem('id_token');
    }

    private setUser(authResult): void {
        localStorage.setItem('access_token', authResult.accessToken);
        localStorage.setItem('id_token', authResult.idToken);
    }
}