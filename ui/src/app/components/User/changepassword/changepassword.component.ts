import { WapUserInfo } from 'app/model/wapuserinfo';
import { ActivatedRoute, Router } from '@angular/router';
import { UtilService } from './../../../services/utils.service';
import { UserService } from './../../../services/user.service';
import { NgForm } from '@angular/forms';
import { ChangePassword } from './../../../model/userinfo';
import { Component, OnInit, ViewChild, Input } from '@angular/core';

declare var $: any;
declare var Pikaday: any;
declare var moment: any;
declare var bootbox: any;

@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.css']
})
export class ChangepasswordComponent implements OnInit {

  @Input() wapUserInfo: WapUserInfo;
  @Input() isOwner: boolean;

  password = new ChangePassword();

  @ViewChild("f9") form: NgForm;

  isDuplicatePassword: boolean = false;
  isValidRegex: boolean = false;
  isValidRegexRePass: boolean = false;

  regexPassword: string = "^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$";

  isNotValid: boolean = false;
  message: string;

  changeSuccess: boolean = false;

  onSubmit() {
    var text = $('#idDoiMatKhau').find('span').text();
    this.isNotValid = false;
    var rePattern = new RegExp(this.regexPassword);

    if (text === "CẬP NHẬT") {

      if (this.password.reNewPassword === '' &&
        this.password.newPassword === '' &&
        this.password.oldPassword === '') {
        $('#idDoiMatKhau').parents('.all-main-thongtin-canhan').toggleClass('all-edit');
        $('#idDoiMatKhau').toggleClass('xanh');
        $('#idDoiMatKhau').parents('.all-main-thongtin-canhan').find('input').prop('disabled', function (i, v) { return !v; });
        $('#idDoiMatKhau').find('span').text('CHỈNH SỬA');
        this.isNotValid = false;
        return;
      }

      if (rePattern.exec(this.password.newPassword) === null) {
        this.isNotValid = true;
        this.message = "Mật khẩu mới phải từ 8 đến 16 ký tự. Có chữ hoa, chữ thường và ký tự đặc biệt.";
        return;
      }

      if(this.password.reNewPassword === '' && this.password.newPassword !== '') {
        this.isNotValid = true;
        this.message = "Nhập lại mật khẩu mới.";
        return;
      }
      

      if (this.password.newPassword !== '' && !this.password.newPassword.includes(this.password.reNewPassword)) {
        this.isNotValid = true;
        this.message = "Mật khẩu mới không trùng nhau";
        return;
      }

      this.isNotValid = false;

      let susss: boolean = false;

      this.userService.changePassword(this.userService.getuser().token, this.password).subscribe(
        result => {
          console.log(result);
          $('#idDoiMatKhau').find('span').text("CHỈNH SỬA");
          if (result.code === 0) {
            bootbox.alert("Đổi mật khẩu thành công");
            
            this.isNotValid = false;
          } else {
            this.message = result.message;
            this.isNotValid = true;
          }
        }
      );
    } else {
      $('#idDoiMatKhau').find('span').text("CẬP NHẬT");
    }

    $('#idDoiMatKhau').parents('.all-main-thongtin-canhan').toggleClass('all-edit');
    $('#idDoiMatKhau').toggleClass('xanh');
    $('#idDoiMatKhau').parents('.all-main-thongtin-canhan').find('input').prop('disabled', function (i, v) { return !v; });
    this.password.oldPassword = '';
    this.password.newPassword = '';
    this.password.reNewPassword = '';

    
  }

  constructor(private utilservice: UtilService,
    private route: ActivatedRoute,
    private userService: UserService,
    private router: Router, ) { }

  ngOnInit() {
    this.password.newPassword = '';
    this.password.oldPassword = '';
    this.password.reNewPassword = '';

  }

}
