import {Component, OnInit} from '@angular/core';
import {ReactiveFormsModule, FormArrayName, FormArray, FormBuilder} from '@angular/forms';
import {FormControl, FormControlName, FormGroup, FormGroupName} from '@angular/forms';
import {Validators} from '@angular/forms';
import {TeacherService} from '../services/teachers.service';
import {ValidatorsService} from '../services/validators.service';
import {LoginService} from '../services/login.service';
import {Router} from '@angular/router';
import {reduce} from "rxjs/operator/reduce";


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
  blockUpload: boolean = true;

  constructor(private formBuilder: FormBuilder, private teacherService: TeacherService, private validatorsService: ValidatorsService, private loginService: LoginService, private router: Router) {
    if (!loginService.isLoggedIn()) {
      router.navigate(['/']);
    }
    this.initAddTeacherForm();
    this.selectedSkills = [];
    this.successfulMessage = false;
    this.errorMessage = false;
    this.blockUpload = true;
  }

  ngOnInit() {
    this.getSkills();
    this.mainForm.valueChanges.subscribe(data => {
      this.blockUpload = this.mainForm.invalid;
    });
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
          this.mainForm.reset();
          this.selectedSkills = [];
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

  //format string to be appended to the reques
  formatSkillsToXML() {
    const skills = this.selectedSkills;
    var mapedSkills = skills.map(skill => skill.id + "*" + skill.name);
    var reducedSkills = mapedSkills.reduce((acc, skill) => acc += '--' + skill);
    return reducedSkills;
  }

  //Appends form info to hmlrequest
  appendFormInfo(event: any) {
    const skills = this.formatSkillsToXML();
    event.formData.append("firstname", this.mainForm.controls['firstname'].value);
    event.formData.append("lastname", this.mainForm.controls['lastname'].value);
    event.formData.append("phonenumber", this.mainForm.controls['phonenumber'].value);
    event.formData.append("email", this.mainForm.controls['email'].value);
    event.formData.append("address1", this.mainForm.controls['address1'].value);
    event.formData.append("address2", this.mainForm.controls['address2'].value);
    event.formData.append("city", this.mainForm.controls['city'].value);
    event.formData.append("state", this.mainForm.controls['state'].value);
    event.formData.append("zipCode", this.mainForm.controls['zipCode'].value);
    event.formData.append("skills", skills);
  }


  wasApplicantEnrolled(event) {
    this.mainForm.reset();
    this.selectedSkills = [];
    this.showInvalidForm = false;
    this.errorMessage = false;
    this.successfulMessage = true;
  }

  hasUploadError(event) {
    this.successfulMessage = false;
    this.showInvalidForm = false;
    this.errorMessage = true;
  }

}
