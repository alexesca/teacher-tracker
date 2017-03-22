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

  constructor(private formBuilder: FormBuilder, private teacherService: TeacherService, private validatorsService: ValidatorsService, private loginService: LoginService,  private router: Router) {
    if (!loginService.isLoggedIn()) {
      router.navigate(['/']);
    }
    this.initAddTeacherForm();
  }

  ngOnInit() {

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
    const mainForm = this.mainForm;
    if (mainForm.valid) {
      this.teacherService.addTeacher(mainForm.value)
        .subscribe(data => {
          console.log(data);
        }, error => {
          console.log(error);
        });
      console.log(this.mainForm.value);
      this.showInvalidForm = false;
    } else {
      this.showInvalidForm = true;
    }

  }

}
