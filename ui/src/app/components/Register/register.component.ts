import { Router } from '@angular/router';
import { UserService } from './../../services/user.service';
import { OfficeInfo } from './../../model/officeinfo';

import { UtilService } from './../../services/utils.service';
import { UserInfo, ResearchExperience, TeachingExperience, CommendationExperience } from './../../model/userinfo';
import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import * as constants from './../../services/constants';
import { Observable } from 'rxjs/Rx';
declare var $: any;
declare var Pikaday: any;
declare var moment: any;
declare var datepicker: any;
declare var bootbox: any;

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  step: number;
  usermodel: UserInfo;
  researchExperienceModel: ResearchExperience;
  teachingExperienceModel: TeachingExperience;
  commendationExperienceModel: CommendationExperience;
  lstGroup: OfficeInfo[];
  groupSelected: OfficeInfo;
  lstDepartment: OfficeInfo[];
  departmentSelected: OfficeInfo;

  lstacademic_rank: any;
  academic_rankSelected: any;
  lstdegree: any;
  degreeSelected: any;

  lstresearch_area: any;
  research_areaSelected: any;

  RegisterError: string;
  Time: number;
  homepagemodel: string;
  scientificmodel: string;
  researchmmodel: string;

  outSys: boolean = false;


  constructor(private utilservice: UtilService, private userservice: UserService, private router: Router) {

  }

  ngOnInit() {
    if (localStorage.getItem("outSys") !== null) {
      this.outSys = Boolean(localStorage.getItem("outSys"));
      localStorage.removeItem("outSys");
    }

    this.step = 1;
    this.RegisterError = "";
    this.homepagemodel = "";
    this.scientificmodel = "";
    this.researchmmodel = "";
    this.Time = 10;
    this.usermodel = {
      _id: null,
      username: "",
      password: "",
      retypepassword: "",
      user_type: 1,
      work_roles: [
        "",
        "",
      ],
      family_name: "",
      middle_name: "",
      first_name: "",
      gender: 1,
      birthday: 0,
      sbirthday: "01/01/1990",
      academic_rank: 0,
      degree: 0,
      mobile: "",
      address: "",
      research_area: 0,
      research_topic: [],
      scientific_association: [],
      research_experience: [],
      teaching_experience: [],
      commendation_experience: [],
      homepage: []
    };
    //danh sách cơ sở
    this.groupSelected = { code: "", name: "--Chọn cơ sở--", _id: "", parent_code: "", address: "", phone: "", fax: "", email: "", website: "", departments: "" };
    this.departmentSelected = { code: "", name: "--Chọn khoa/phòng/ban--", _id: "", parent_code: "", address: "", phone: "", fax: "", email: "", website: "", departments: "" };
    this.lstGroup = [this.groupSelected];
    this.lstDepartment = [this.departmentSelected];
    this.utilservice.GetList().subscribe(
      result => {
        this.lstGroup.push.apply(this.lstGroup, result);

      }
    );

    //model khen thưởng
    this.researchExperienceModel = {
      name: "",
      work_place: "",
      date_from: "",
      date_to: "",
      address: "",
      role: ""
    };
    this.teachingExperienceModel = {
      name: "",
      work_place: "",
      date_from: "",
      date_to: "",
      address: "",
      role: ""
    };
    this.commendationExperienceModel = {
      name: "",
      decision: "",
      date: "",
      content: "",
      level: "",
    };
    //học hàm học vị
    this.lstacademic_rank = constants.academic_rankList;
    this.academic_rankSelected = this.lstacademic_rank[0];
    this.lstdegree = constants.degreeList;
    this.degreeSelected = this.lstdegree[0];
    this.lstresearch_area = constants.research_areaList;
    this.research_areaSelected = this.lstresearch_area[0];

    
  }
  backtostep(step) {
    switch (this.step) {

      case 2:
        this.step = step;
        break;
      case 3:
        this.step = step;
        //load script date picker
        setTimeout(function () {
          $('#birthday').datepicker({
            format: 'dd/mm/yyyy',
            endDate: '-'
          });
        }, 300);
        break;
      case 4:
        this.step = step;
        //load script 
        setTimeout(function () {
          $("#ModalContainer #researchModal").remove();
          $("#ModalContainer #teachingModal").remove();
          $("#ModalContainer #commendationModal").remove();

          $('#ModalContainer').append($('#researchModal'));
          $('#ModalContainer').append($('#teachingModal'));
          $('#ModalContainer').append($('#commendationModal'));
          

        }, 300);
        break;

    }

  }
  gotostep(step) {

    switch (this.step) {
      //chọn cơ sở
      case 1:
        if (this.outSys) {
          console.log("ĐÃ BỊ KICK");
          let outSysUsername = localStorage.getItem("outSys_username");
          this.userservice.rejoinSys(outSysUsername, this.groupSelected.code, this.departmentSelected.code).subscribe(
            result => {
              if (result.code === 0) {
                //this.usertokeninfo = this.userservice.getuser();
                //this.router.navigate(['/']);
                //window.location.href = '/home-profile/' + this.model.username;
                this.router.navigate(['/home-profile', outSysUsername]);
              } else {
                bootbox.alert(result.message);
              }
            }
          );

        } else {
          //lưu data
          this.usermodel.work_roles[0] = this.groupSelected.code;
          this.usermodel.work_roles[1] = this.departmentSelected.code;

          this.step = step;

          //load script date picker
          setTimeout(function () {
            $('#birthday').datepicker({
              format: 'dd/mm/yyyy',
              endDate: '31/12/1999'
            });
          }, 300);
        }


        break;

      //thông tin cá nhân
      case 2:
        //lưu data
        this.usermodel.degree = this.degreeSelected.value;
        this.usermodel.academic_rank = this.academic_rankSelected.value;
        let birthdayarr = this.usermodel.sbirthday.split("/");
        this.usermodel.birthday = Number(moment(new Date(Number(birthdayarr[2]), Number(birthdayarr[1]) - 1, Number(birthdayarr[0]))).format('YYYYMMDD'));

        this.step = step;

        //load script 
        setTimeout(function () {
          $("#ModalContainer #researchModal").remove();
          $("#ModalContainer #teachingModal").remove();
          $("#ModalContainer #commendationModal").remove();

          $('#ModalContainer').append($('#researchModal'));
          $('#ModalContainer').append($('#teachingModal'));
          $('#ModalContainer').append($('#commendationModal'));

          $('.bao-all-nhapten  input, .bao-all-nhapten .cusTa').focus(function () {
            $(this).parents('.bao-all-nhapten').addClass('show');
          }).blur(function () {
            $(this).parents('.bao-all-nhapten').removeClass('show');
          });

        }, 300);

        break;

      //khen thưởng
      case 3:
        this.usermodel.research_area = this.research_areaSelected.value;
        this.step = step;
        break;
      //email mật khẩu
      case 4:
        this.userservice.register(this.usermodel)
          .subscribe(result => {
            console.log(result);
            if (result.code !== 0) {
              this.RegisterError = result.message;
            } else {

              this.step = 5;
              //timer 10s
              let sub = Observable.interval(1000)
                .map((x) => x + 1)
                .subscribe((x) => {
                  if (x >= 10) {

                    sub.unsubscribe();
                    this.router.navigate(['/']);
                  }
                  this.Time = 10 - x;
                  console.log(x);

                });
            }
          });
        break;
    }
    console.log(this.usermodel);

  }
  //thay đổi selecbox cớ sở
  changeGroup() {
    if (this.groupSelected.code.length > 0) {
      let groupSelected = { code: "", name: "--Chọn cơ sở--", _id: "", parent_code: "", address: "", phone: "", fax: "", email: "", website: "", departments: "" };
      this.lstDepartment = [];
      this.lstDepartment = [this.departmentSelected];
      this.utilservice.GetListChild(this.groupSelected.code).subscribe(
        result => {

          this.lstDepartment.push.apply(this.lstDepartment, result);

        }
      );
    }
    else {
      this.lstDepartment = [{ code: "", name: "--Chọn khoa/phòng/ban--", _id: "", parent_code: "", address: "", phone: "", fax: "", email: "", website: "", departments: "" }];
    }

  }

  //popup khen thưởng
  showPopup(element: string) {
    $(element).modal('show');
  }
  addResearch() {

    if (this.researchExperienceModel.name === '' &&
      this.researchExperienceModel.work_place === '' &&
      this.researchExperienceModel.date_from === '' &&
      this.researchExperienceModel.date_to === '' &&
      this.researchExperienceModel.address === '' &&
      this.researchExperienceModel.role === '') {
      $('#researchModal').modal('hide');
      return;
    }

    this.usermodel.research_experience.push(this.researchExperienceModel);
    this.researchExperienceModel = {
      name: "",
      work_place: "",
      date_from: "",
      date_to: "",
      address: "",
      role: ""
    };

    $('#researchModal').modal('hide');
  }
  addTeaching() {

    if (this.teachingExperienceModel.name === '' &&
      this.teachingExperienceModel.work_place === '' &&
      this.teachingExperienceModel.date_from === '' &&
      this.teachingExperienceModel.date_to === '' &&
      this.teachingExperienceModel.address === '' &&
      this.teachingExperienceModel.role === '') {
      $('#teachingModal').modal('hide');
      return;
    }

    this.usermodel.teaching_experience.push(this.teachingExperienceModel);
    this.teachingExperienceModel = {
      name: "",
      work_place: "",
      date_from: "",
      date_to: "",
      address: "",
      role: ""
    };

    $('#teachingModal').modal('hide');
  }
  addCommendation() {

    if (this.commendationExperienceModel.name === '' &&
      this.commendationExperienceModel.decision === '' &&
      this.commendationExperienceModel.date === '' &&
      this.commendationExperienceModel.content === '' &&
      this.commendationExperienceModel.level === '' ) {
      $('#commendationModal').modal('hide');
      return;
    }

    this.usermodel.commendation_experience.push(this.commendationExperienceModel);
    this.commendationExperienceModel = {
      name: "",
      decision: "",
      date: "",
      content: "",
      level: "",
    };

    $('#commendationModal').modal('hide');
  }
  addhomepage() {

    if (this.homepagemodel != "" && this.usermodel.homepage.indexOf(this.homepagemodel) < 0) {
      this.usermodel.homepage.push(this.homepagemodel);
      this.homepagemodel = "";
    }

  }
  addscientific() {
    //console.log(this.scientificmodel);
    if (this.scientificmodel != "" && this.usermodel.scientific_association.indexOf(this.scientificmodel) < 0) {
      this.usermodel.scientific_association.push(this.scientificmodel);
      this.scientificmodel = "";
    }

  }
  addresearch() {
    //console.log(this.researchmmodel);
    if (this.researchmmodel != "" && this.usermodel.research_topic.indexOf(this.researchmmodel) < 0) {
      this.usermodel.research_topic.push(this.researchmmodel);
      this.researchmmodel = "";
      $("#researchmmodel").focus();
    }

  }
  tagfocus() {
    $("#researchmmodel").focus();
  }
}
