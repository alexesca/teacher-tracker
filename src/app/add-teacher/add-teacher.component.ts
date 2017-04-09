import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormArrayName, FormArray, FormBuilder } from '@angular/forms';
import { FormControl, FormControlName, FormGroup, FormGroupName } from '@angular/forms';
import { Validators } from '@angular/forms';
import { TeacherService } from '../services/teachers.service';
import { ValidatorsService } from '../services/validators.service';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-add-teacher',
  templateUrl: './add-teacher.component.html',
  styleUrls: ['./add-teacher.component.css']
})
export class AddTeacherComponent implements OnInit {

  mainForm: FormGroup;
  showInvalidForm: boolean;
  skills: any;
  selectedSkills: Array<any>;
  successfulMessage: boolean;
  errorMessage: boolean;


  constructor(private formBuilder: FormBuilder, private teacherService: TeacherService, private validatorsService: ValidatorsService, private loginService: LoginService, private router: Router) {
    if (!loginService.isLoggedIn()) {
      router.navigate(['/']);
    }
    this.initAddTeacherForm();
    this.selectedSkills = [];
    this.successfulMessage = false;
    this.errorMessage = false;
  }

  ngOnInit() {
    this.getSkills();
  }

  //Get skills
  getSkills() {
    this.teacherService.getSkills()
      .subscribe(data => {
        this.skills = data;
      });
  }

  initAddTeacherForm() {
    this.mainForm = this.formBuilder.group({
      firstname: ['', [Validators.required, this.validatorsService.onlyLettersValidator]],
      lastname: ['', [Validators.required, this.validatorsService.onlyLettersValidator]],
      phonenumber: ['', [Validators.required, this.validatorsService.onlyNumbersValidator]],
      email: ['', [Validators.required, this.validatorsService.emailValidator]],
      address1: ['', [Validators.required]],
      address2: ['', []],
      city: ['', [Validators.required, , this.validatorsService.onlyLettersValidator]],
      state: ['', [Validators.required]],
      zipCode: ['', [Validators.required]],
    });
  }

  addTeacher() {
    const mainForm: any = this.mainForm;
    if (mainForm.valid) {
      const values = mainForm.value;
      values.skills = this.selectedSkills;
      this.teacherService.addTeacher(values)
        .subscribe(data => {
          this.successfulMessage = true;
          this.errorMessage = false;
        }, error => {
          this.successfulMessage = false;
          this.errorMessage = true;
        });
      this.showInvalidForm = false;
    } else {
      this.showInvalidForm = true;
    }

  }

  //Search teachers and add skills
  onDropDownChange(skill: string) {
    this.addSkill(skill);
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
            if (index < 0) {//If remove all is click
                this.selectedSkills.splice(0, this.selectedSkills.length);
            } else {//If a skill is removed
                this.selectedSkills.splice(index, 1);
            }
        } catch (error) {
            console.log(error);
        }
    }

}
