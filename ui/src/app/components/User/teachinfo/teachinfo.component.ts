import { academic_rankList } from './../../../services/constants';
import { UserService } from './../../../services/user.service';
import { UtilService } from './../../../services/utils.service';
import { WapUserInfo } from 'app/model/wapuserinfo';
import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { NgForm } from "@angular/forms";
import { ResearchExperience, TeachingExperience, CommendationExperience } from "app/model/userinfo";

declare var $: any;
declare var Pikaday: any;
declare var moment: any;
declare var bootbox: any;

@Component({
  selector: 'app-teachinfo',
  templateUrl: './teachinfo.component.html',
  styleUrls: ['./teachinfo.component.css']
})
export class TeachinfoComponent implements OnInit {

  scientificmodel: string;
  researchmmodel: string;
  @Input() wapUserInfo: WapUserInfo;
  @Input() isOwner: boolean;
  researchExperienceModel: ResearchExperience;
  teachingExperienceModel: TeachingExperience;
  commendationExperienceModel: CommendationExperience;

  @ViewChild("f4") form: NgForm;

  constructor(private utilservice: UtilService,
    private userService: UserService) { }

  ngOnInit() {

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


    setTimeout(function () {
      $('#ModalContainer').append($('#researchModal'));
      $('#ModalContainer').append($('#teachingModal'));
      $('#ModalContainer').append($('#commendationModal'));
      $('div[name=btnAdd]').hide();
      $('input[name=scientificmodel]').hide();
      $('a[name=chudenghiencuu]').hide();
    }, 300);
  }

  addResearch() {

    this.wapUserInfo.userprofile.research_experience.push(this.researchExperienceModel);
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

    this.wapUserInfo.userprofile.teaching_experience.push(this.teachingExperienceModel);
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

    this.wapUserInfo.userprofile.commendation_experience.push(this.commendationExperienceModel);
    this.commendationExperienceModel = {
      name: "",
      decision: "",
      date: "",
      content: "",
      level: "",
    };

    $('#commendationModal').modal('hide');
  }

  showPopup(element: string) {
    $(element).modal('show');
  }

  addscientific() {
    console.log(this.scientificmodel);
    if (this.scientificmodel != "" && this.wapUserInfo.scientific_association.indexOf(this.scientificmodel) < 0) {
      this.wapUserInfo.scientific_association.push(this.scientificmodel);
      this.scientificmodel = "";
    }
  }

  addresearch() {
    $('a[name=chudenghiencuu]').removeClass("not-active");
    console.log(this.researchmmodel);
    if (this.researchmmodel != "" && this.wapUserInfo.research_topic.indexOf(this.researchmmodel) < 0) {
      this.wapUserInfo.research_topic.push(this.researchmmodel);
      this.researchmmodel = "";
      $("#researchmmodel").focus();
    }

  }

  onSubmit() {
    console.log(this.form);
    var text = $('#idUpdateKinhNghiem').find('span').text();

    if (text === "CẬP NHẬT") {
      $('#idUpdateKinhNghiem').find('span').text("CHỈNH SỬA");
      $('div[name=btnAdd]').hide();
      $('input[name=scientificmodel]').hide();
      $('a[name=chudenghiencuu]').hide();

      let token = this.userService.getuser().token;
      let userinfo = this.wapUserInfo.userprofile;

      userinfo.research_area = this.wapUserInfo.research_areaSelected.value;

      console.log(this.wapUserInfo);

      this.userService.updateUserProfile(userinfo, token).subscribe(result => {
        // console.log(result);
        // if (result.code !== 0) {
        //   this.RegisterError = result.message;
        // }
        $('a[name=chudenghiencuu]').addClass("not-active");
        $('input[name=researchmmodel]').addClass("not-active");
        $('div[name=chudenghiencuu]').addClass("not-active");
        $('i[name=chudenghiencuu]').addClass("not-active");

        if (result.code !== 0) {
          bootbox.alert("Cập nhật thông tin cơ sở làm việc không thành công.");
        } else {
          bootbox.alert(result.message);
        }

      });

    } else {
      $('#idUpdateKinhNghiem').find('span').text("CẬP NHẬT");
      $('a[name=chudenghiencuu]').removeClass("not-active");
      $('input[name=researchmmodel]').removeClass("not-active");
      $('div[name=chudenghiencuu]').removeClass("not-active");
      $('i[name=chudenghiencuu]').removeClass("not-active");

      $('div[name=btnAdd]').show();
      $('input[name=scientificmodel]').show();
      $('a[name=chudenghiencuu]').show();

    }
    $('#idUpdateKinhNghiem').parents('.all-main-thongtin-canhan').toggleClass('all-edit');
    $('#idUpdateKinhNghiem').toggleClass('xanh');
    $('#idUpdateKinhNghiem').parents('.all-main-thongtin-canhan').find('input, select').prop('disabled', function (i, v) { return !v; });
    $('input[name=researchmmodel]').prop('disabled', false);
    $('input[name=scientificmodel]').prop('disabled', false);
  }
}
