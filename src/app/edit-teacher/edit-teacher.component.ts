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
  teacherId: string;
  mainForm: FormGroup;
  showInvalidForm: boolean;
  skills: any;
  selectedSkills: Array<any>;
  successfulMessage: boolean;
  errorMessage: boolean;
  deletedTeacherSuccessfulMessage: boolean;
  closeResult: string;
  blockUpload: boolean = true;

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
    this.blockUpload = true;
  }

  ngOnInit() {
    this.activatedRoute.params.map((params: Params) => params['id']).switchMap(id => {
      this.teacherId = id;
      return this.teacherService.getSingleTeacherInformation(id);
    }).subscribe(info => {
      this.info = info;
      this.setFormValues();
      console.log(this.info);
    });
    this.getSkills();

    this.mainForm.valueChanges.subscribe(data => {
      this.blockUpload = this.mainForm.invalid;
    });

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


  // Edit teacher
  updateTeacher() {
    if (this.mainForm.valid) {
      const data = this.mainForm.value;
      data.skills = this.selectedSkills;
      this.teacherService.updateTeacher(this.teacherId, data)
        .subscribe(response => {
          this.successfulMessage = true;
          this.showInvalidForm = false;
          this.errorMessage = false;
        }, error => {
          this.successfulMessage = false;
          this.showInvalidForm = false;
          this.errorMessage = true;
        });
    } else {
      this.successfulMessage = false;
      this.showInvalidForm = true;
      this.errorMessage = false;
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
    event.formData.append("id", this.teacherId);
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
