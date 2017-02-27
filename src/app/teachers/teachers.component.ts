import { Component, OnInit } from '@angular/core';
//Services
import { TeacherService } from '../services/teachers.service';

@Component({
    selector: 'teachers',
    templateUrl: './teachers.component.html'
})

export class TeacherComponent implements OnInit {

    teachers: any;
    criteria: string;

    constructor(private teacherService: TeacherService) { }

    ngOnInit() {
        let response = this.teacherService.getAllTeachers().subscribe(data => {
            this.teachers = data;
            console.log(data);
        }, error => {
            console.log(error);
        });;
    }

    searchTeacher(criteria: string) {
        if (criteria) {
            this.teacherService.searchTeacher(criteria).subscribe(data => {
                this.teachers = data;
            });
        }
    }
}