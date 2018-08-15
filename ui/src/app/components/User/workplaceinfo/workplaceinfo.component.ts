import { UserService } from './../../../services/user.service';
import { UtilService } from './../../../services/utils.service';

import { Component, OnInit, Input, ViewChild } from '@angular/core';

import { WapUserInfo } from "app/model/wapuserinfo";
import { NgForm } from "@angular/forms";

declare var $: any;
declare var Pikaday: any;
declare var moment: any;
declare var bootbox: any;

@Component({
  selector: 'app-workplaceinfo',
  templateUrl: './workplaceinfo.component.html',
  styleUrls: ['./workplaceinfo.component.css']
})
export class WorkplaceinfoComponent implements OnInit {

  RegisterError: string;

  isLoading: boolean;

  @Input() wapUserInfo: WapUserInfo;
  @Input() isOwner: boolean;
  @ViewChild("f3") form: NgForm;

  constructor(private utilservice: UtilService,
    private userService: UserService) { }

  ngOnInit() {

    this.utilservice.GetList().subscribe(
      result => {
        this.wapUserInfo.lstGroup = result;
        
        this.wapUserInfo.groupSelected = this.wapUserInfo.lstGroup.filter(x => x.code == this.wapUserInfo.userprofile.work_roles[0])[0];
        console.log(this.wapUserInfo.userprofile.isActived);
      }
    );

  }

  onSubmit() {
    console.log(this.form);
    var text = $('#idUpdateNoiLamViec').find('span').text();

    if (text === "CẬP NHẬT") {
      $('#idUpdateNoiLamViec').find('span').text("CHỈNH SỬA");

      let token = this.userService.getuser().token;
      let userinfo = this.wapUserInfo.userprofile;

      // userinfo.work_roles[0] = $('select[name=group-select]').find(":selected").val();
      userinfo.work_roles[1] = $('select[name=department]').find(":selected").val();
      console.log(userinfo);

      this.userService.updateUserProfile(userinfo, token).subscribe(result => {
        
        if (result.code !== 0) {
          bootbox.alert("Cập nhật thông tin cơ sở làm việc không thành công.");
        } else {
          bootbox.alert(result.message);
        }
      });
    } else {
      $('#idUpdateNoiLamViec').find('span').text("CẬP NHẬT");
    }
    $('#idUpdateNoiLamViec').parents('.all-main-thongtin-canhan').toggleClass('all-edit');
    $('#idUpdateNoiLamViec').toggleClass('xanh');
    $('#idUpdateNoiLamViec').parents('.all-main-thongtin-canhan').find('select').prop('disabled', function (i, v) { return !v; });
    $('select[name=group-select]').prop("disabled", true);
  }

  changeGroup() {
    let selectedWorkPlace = $('select[name=group-select]').find(":selected").val();
    let officeInfo = this.wapUserInfo.lstGroup.filter(x => x.code == selectedWorkPlace)[0];

    $('input[name=groupaddress]').val(officeInfo.address);
    $('input[name=groupphone]').val(officeInfo.phone);
    $('input[name=groupfax]').val(officeInfo.fax);
    $('input[name=groupemail]').val(officeInfo.email);
    $('input[name=groupwebsite]').val(officeInfo.website);

    this.utilservice.GetListChild(selectedWorkPlace).subscribe(
      result => {
        this.wapUserInfo.lstDepartment = result;
        this.wapUserInfo.departmentSelected = this.wapUserInfo.lstDepartment[0];
        $('select[name=department]').find('option:eq(0)').prop('selected', true);
      }
    );
  }
}
