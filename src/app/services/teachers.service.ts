import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { AuthHttp, AuthConfig, JwtHelper } from 'angular2-jwt';
import { Url } from './url.model';

import 'rxjs'
@Injectable()
export class TeacherService {
    //Variables 
    url: string;
    //Injectables
    constructor(private http: Http, public authHttp: AuthHttp) {
        this.url = new Url().getUrl();
     }

    //Gets all the Teachers
    getAllTeachers() {
        return this.authHttp.get(this.url + '/get/teachers/all')
            .map(res => res.json());
    }

    //Search teacher by criteria
    searchTeacher(criteria: string) {
        return this.authHttp.get(this.url + '/search/teachers/criteria/' + criteria)
            .map(res => res.json());
    }

    //Gets the skills
    getSkills() {
        return this.authHttp.get(this.url + '/get/skills/all')
            .map(res => res.json());
    }

    //Search techer by skills
    searchTeacherBySkills(skills: string) {
        return this.authHttp.get(this.url + '/get/teachers/by/skills/' + skills)
            .map(res => res.json());
    }

    //Search techer by skills
    searchTeacherByCriteriaAndSkills(skills: string, criteria: string) {
        return this.authHttp.get(this.url + '/get/teachers/by/skills/' + criteria + '/' + skills)
            .map(res => res.json());
    }

    getThing() {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.authHttp.get(this.url + '/get/skills/all', { headers: headers })
            .map(res => res.json());
    }


    //Add a new teacher
    addTeacher(values: any) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.authHttp.post(this.url + '/teachers/add/new', JSON.stringify(values), { headers: headers })
            .map(res => res.json());
    }


}