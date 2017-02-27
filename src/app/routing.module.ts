import { NgModule } from '@angular/core'

import { RouterModule, Routes } from '@angular/router';
import { TeacherComponent } from './teachers/teachers.component';
const appRoutes = [
    {path: 'teachers', component: TeacherComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports:[RouterModule],
    providers: []
})

export class TeacherRouting {}

