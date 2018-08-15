import { Router } from '@angular/router';
import { UserService } from './../../../services/user.service';
import { WapUserInfo } from './../../../model/wapuserinfo';
import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { NgForm } from "@angular/forms";

declare var $: any;
declare var Pikaday: any;
declare var moment: any;
declare var bootbox: any;

@Component({
  selector: 'app-userinfo',
  templateUrl: './userinfo.component.html',
  styleUrls: ['./userinfo.component.css']
})
export class UserinfoComponent implements OnInit {

  public birthDayText: string;

  homepagemodel: string;
  isDisplayHomepage: boolean = false;

  @Input() wapUserInfo: WapUserInfo;
  @Input() isOwner: boolean;
  // @Output('fullname') fullname = new EventEmitter<string>();

  @ViewChild("f") form: NgForm;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
    // this.fullname = this.wapUserInfo.userprofile.full_name;

    let birthDayStr = String(this.wapUserInfo.userprofile.birthday);
    this.birthDayText = birthDayStr.substring(6, 8) + "/" + birthDayStr.substring(4, 6) + "/" + birthDayStr.substring(0, 4);
  }

  changeFullname() {
    let ho = $('input[name=familyname]').val();
    let midName = $('input[name=middle_name]').val();
    let firstName = $('input[name=first_name]').val();
    
    this.wapUserInfo.userprofile.full_name = String(ho + " " + midName + " " + firstName);
  }

  onSubmit() {
    console.log(this.form);
    var text = $('#idUpdateThongTin').find('span').text();

    if (text === "CẬP NHẬT") {
      if (this.form.value.familyname == "" ||
        this.form.value.middle_name == "") {
        return;
      } else {
        $('#idUpdateThongTin').find('span').text("CHỈNH SỬA");
        this.isDisplayHomepage = false;
        $('input[name=homepagemodel]').prop('disabled', true);

        let token = this.userService.getuser().token;
        let up = this.wapUserInfo.userprofile;
        delete up._id;
        // this.fullname = this.form.value.family_name + this.form.value.middle_name + this.form.value.first_name;
        
        up.academic_rank = this.wapUserInfo.academic_rankSelected.value;
        up.degree = this.wapUserInfo.degreeSelected.value;

        let birthDay: string[];
        
        birthDay = this.birthDayText.split("/");

        up.birthday = Number(birthDay[2] + birthDay[1] + birthDay[0]);

        this.userService.updateUserProfile(up, token).subscribe(result => {
          if (result.code !== 0) {
            bootbox.alert("Cập nhật thông tin cơ sở làm việc không thành công.");
          } else {
            bootbox.alert(result.message);
            console.log("OK");
            
            this.router.navigate(['/profile',this.userService.getuser().username,'profile']);
          }
        });

      }
    } else {
      $('#idUpdateThongTin').find('span').text("CẬP NHẬT");
      this.isDisplayHomepage = true;
      $('input[name=homepagemodel]').prop('disabled', false);
    }
    $('#idUpdateThongTin').parents('.all-main-thongtin-canhan').toggleClass('all-edit');
    $('#idUpdateThongTin').toggleClass('xanh');
    $('#idUpdateThongTin').parents('.all-main-thongtin-canhan').find('input, select').prop('disabled', function (i, v) { return !v; });

  }

  addhomepage() {
    console.log("Home pages");

    if (this.homepagemodel != "" && this.wapUserInfo.userprofile.homepage.indexOf(this.homepagemodel) < 0) {
      console.log("Vào");

      this.wapUserInfo.userprofile.homepage.push(this.homepagemodel);
      this.homepagemodel = "";
    }

    console.log(this.homepagemodel);

  }
}
