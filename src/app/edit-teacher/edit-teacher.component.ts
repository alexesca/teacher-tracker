import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Route, Router} from "@angular/router";
import {TeacherService} from '../services/teachers.service';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ValidatorsService} from "../services/validators.service";
import {LoginService} from '../services/login.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-edit-teacher',
  templateUrl: './edit-teacher.component.html',
  styleUrls: ['./edit-teacher.component.css']
})
export class EditTeacherComponent implements OnInit {

  info: any;
  mainForm: FormGroup;
  showInvalidForm: boolean;
  skills: any;
  selectedSkills: Array<any>;
  successfulMessage: boolean;
  errorMessage: boolean;
  deletedTeacherSuccessfulMessage: boolean;
  closeResult: string;

  constructor(public activatedRoute: ActivatedRoute, public teacherService: TeacherService, private formBuilder: FormBuilder, private validatorsService: ValidatorsService,
              private loginService: LoginService, private router: Router, private modalService: NgbModal) {
    if (!loginService.isLoggedIn()) {
      router.navigate(['/']);
    }
    this.initAddTeacherForm();
    this.selectedSkills = [];
    this.successfulMessage = false;
    this.errorMessage = false;
    this.deletedTeacherSuccessfulMessage = false;
  }

  ngOnInit() {
    this.activatedRoute.params.map((params: Params) => params['id']).switchMap(id =>
      this.teacherService.getSingleTeacherInformation(id)
    ).subscribe(info => {
      this.info = info;
      this.setFormValues();
      console.log(this.info);
    });
    this.getSkills();
  }

  // Get skills
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

  // Set form values
  setFormValues() {
    this.mainForm.patchValue(this.info);
    this.selectedSkills = this.info.skills;
  }

  // Search teachers and add skills
  onDropDownChange(skill: string) {
    this.addSkill(skill);
  }

  // add selected skills
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
      if (index < 0) {// If remove all is click
        this.selectedSkills.splice(0, this.selectedSkills.length);
      } else {// If a skill is removed
        this.selectedSkills.splice(index, 1);
      }
    } catch (error) {
      console.log(error);
    }
  }

  // Modal code

  open(content) {
    this.modalService.open(content).result.then((result) => {
      if (result === true) {
        this.teacherService.deleteTeacher(this.info._id)
          .subscribe(data => {
            this.deletedTeacherSuccessfulMessage = true;
            this.errorMessage = false;
            this.successfulMessage = false;
            this.showInvalidForm = false;
          }, error => {
            console.log('errrororooror');
          });
      }
    });
  }
}
