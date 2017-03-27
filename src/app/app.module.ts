import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { HttpModule, Http, RequestOptions } from '@angular/http';
import { AuthHttp, AuthConfig } from 'angular2-jwt';

import { AppComponent } from './app.component';
import { TeacherComponent } from './teachers/teachers.component';
import { TeacherRouting } from './routing.module';
import { Login } from './login/login.component';
//Services
import { TeacherService } from './services/teachers.service';
import { Auth } from './services/auth.service';
import { LoginService } from './services/login.service';
import { LogoutComponent } from './logout/logout.component';
import { ValidatorsService } from './services/validators.service';


//PrimeNG 
import {MenubarModule,MenuItem} from 'primeng/primeng';
import { MenuBarComponent } from './menu-bar/menu-bar.component';
import { AddTeacherComponent } from './add-teacher/add-teacher.component';

export function authHttpServiceFactory(http: Http, options: RequestOptions) {
  return new AuthHttp(new AuthConfig({
    tokenName: 'token',
        tokenGetter: (() => localStorage.getItem('token')),
        globalHeaders: [{'Content-Type':'application/json'}],
    }), http, options);
}


@NgModule({
  declarations: [
    AppComponent,
    TeacherComponent,
    Login,
    LogoutComponent,
    MenuBarComponent,
    AddTeacherComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule, 
    HttpModule,
    TeacherRouting,
    MenubarModule,
  ],
  providers: [TeacherService, Auth, {
      provide: AuthHttp,
      useFactory: authHttpServiceFactory,
      deps: [Http, RequestOptions]
    }, ValidatorsService,
    LoginService
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
