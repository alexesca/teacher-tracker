import {NgModule} from '@angular/core'

import {RouterModule, Routes} from '@angular/router';
import {TeacherComponent} from './teachers/teachers.component';
import {Login} from './login/login.component';
import {LogoutComponent} from './logout/logout.component';
import {AddTeacherComponent} from './add-teacher/add-teacher.component'

import {AuthGuard} from './services/auth.guard.service';
import {EditTeacherComponent} from './edit-teacher/edit-teacher.component';

const appRoutes = [
  {path: 'login', component: Login},
  {path: 'teachers', component: TeacherComponent, pathMatch: 'full'},
  {path: 'teachers/edit/:id', component: EditTeacherComponent},
  {path: 'login', component: Login},
  {path: 'logout', component: LogoutComponent},
  {path: 'add-teacher', component: AddTeacherComponent},
  {path: 'unauthorized', component: Login},
  {path: '', redirectTo: '/login', pathMatch: 'full'}

];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
  providers: []
})

export class TeacherRouting {
}

