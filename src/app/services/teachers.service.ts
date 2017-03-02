import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import 'rxjs'
@Injectable()
export class TeacherService {
    //Variables 
    url: string = "http://localhost:8080";
    //Injectables
    constructor(private http: Http) { }

    //Gets all the Teachers
    getAllTeachers() {
        return this.http.get(this.url + '/get/teachers/all')
            .map(res => res.json());
    }

    //Search teacher by criteria
    searchTeacher(criteria: string){
        return this.http.get(this.url + '/search/teachers/criteria/' + criteria)
        .map(res => res.json());
    }

    //Gets the skills
    getSkills(){
        return this.http.get(this.url + '/get/skills/all')
            .map(res => res.json());
    }
}