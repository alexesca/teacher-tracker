import { Component, OnInit } from '@angular/core';
//Services
import { TeacherService } from '../services/teachers.service';
import { Auth } from '../services/auth.service';
import { Headers } from '@angular/http'

@Component({
    selector: 'teachers',
    templateUrl: './teachers.component.html',
    styleUrls: ['./teachers.component.scss']
})

export class TeacherComponent implements OnInit {

    teachers: any;
    criteria: string;
    skills: Array<any>;
    selectedSkills: Array<any>;
    skill: any;

    constructor(private teacherService: TeacherService, private auth: Auth) {
        this.selectedSkills = [];
    }

    signup(user, password) {
        this.auth.signup(user, password);
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

    getSkills() {
        this.teacherService.getSkills()
            .subscribe(data => {
                this.skills = data;
            });
    }

    //Search teachers by criteria or skills
    searchTeachersFactory(criteria: string) {
        console.log(this.selectedSkills, "test");
        if (this.selectedSkills.length <= 0) {
            this.searchTeachers(criteria);
        } else {
            this.searchTeacherByCriteriaAndSkills();
        }
    }

    //Search teacher by criteria
    searchTeachers(criteria: string) {
        if (criteria) {
            this.teacherService.searchTeacher(criteria).subscribe(data => {
                this.teachers = data;
            });
        } else {
            this.ngOnInit();
        }
    }

    //Search teacher by criteria and skills
    searchTeachersByCriteriaAndSkills() {

    }

    //Search teachers and add skills
    onDropDownChange(skill: string) {
        this.addSkill(skill);
        this.searchTeacherBySkill();
    }


    //add selected skills
    addSkill(skill: string) {
        let newSkill = JSON.parse(skill);
        let isInArray: boolean = false;
        this.selectedSkills.forEach(item => {
            if (item.name === newSkill.name) {
                isInArray = true;
            }
        });
        if (!isInArray) {
            this.selectedSkills.push(newSkill);
        }
    }

    removeSkill(index: number) {
        try {
            if (index < 0) {
                this.selectedSkills.splice(0, this.selectedSkills.length);
            } else {
                this.selectedSkills.splice(index, 1);
            }
        } catch (error) {
            console.log(error);
        }
    }

    //convertsArray to a parsable string
    arrayToString(array: any): string {
        let newString = "";

        array.forEach(element => {
            newString += element.name + "-"
        });

        return newString;
    }


    //search Teachers by skills
    searchTeacherBySkill() {
        let newString: string = this.arrayToString(this.selectedSkills);
        this.teacherService.searchTeacherBySkills(newString)
            .subscribe(response => {
                this.teachers = response;
            }, error => {
                this.teachers = [];
            })
    }


    //search Teachers by skills
    searchTeacherByCriteriaAndSkills() {
        let newString: string = this.arrayToString(this.selectedSkills);
        let criteria = this.criteria;
        this.teacherService.searchTeacherByCriteriaAndSkills(newString, criteria)
            .subscribe(response => {
                this.teachers = response;
            }, error => {
                this.teachers = [];
            })
    }

    getThing() {
        this.teacherService.getThing()
            .subscribe(data => {
                console.log(data);
            }, error =>{
                console.log(error);
            })
    }
}