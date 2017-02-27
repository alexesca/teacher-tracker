import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { TeacherComponent } from './teachers/teachers.component';
import { TeacherRouting } from './routing.module';
//Services
import { TeacherService } from './services/teachers.service';

@NgModule({
  declarations: [
    AppComponent,
    TeacherComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    TeacherRouting
  ],
  providers: [TeacherService],
  bootstrap: [AppComponent]
})
export class AppModule { }
