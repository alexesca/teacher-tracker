import { Component, OnInit } from '@angular/core';
//Services
import { TeacherService } from '../services/teachers.service';

@Component({
    selector: 'teachers',
    templateUrl: './teachers.component.html',
    styleUrls:['./teachers.component.scss']
})

export class TeacherComponent implements OnInit {

    teachers: any;
    criteria: string;
    skills: Array<any>;
    selectedSkills: Array<any>;
    skill: any;

    constructor(private teacherService: TeacherService) { 
        this.selectedSkills = [];
    }

    ngOnInit() {
        let response = this.teacherService.getAllTeachers().subscribe(data => {
            this.teachers = data;
            console.log(data);
        }, error => {
            console.log(error);
        });

        //Get skills
        this.getSkills();
    }

    searchTeacher(criteria: string) {
        if (criteria) {
            this.teacherService.searchTeacher(criteria).subscribe(data => {
                this.teachers = data;
            });
        }else{
            this.ngOnInit();
        }
    }

    getSkills(){
        this.teacherService.getSkills()
            .subscribe(data => {
                this.skills = data;
            });
    }

    //add selected skills
    addSkill(skill: string){
        let newSkill = JSON.parse(skill);
        let isInArray: boolean = false;
        this.selectedSkills.forEach(item => {
            if(item.name === newSkill.name ){
                isInArray = true;
            }
        });
        if(!isInArray){
            this.selectedSkills.push(newSkill);
        }
    }
}