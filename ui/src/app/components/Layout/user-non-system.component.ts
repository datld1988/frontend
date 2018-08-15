import { UserProfile, ChangePassword } from './../../model/userinfo';
import { UserService } from 'app/services/user.service';
import { Component, OnInit } from '@angular/core';

declare var bootbox: any;

@Component({
  selector: 'app-user-non-system',
  templateUrl: './user-non-system.component.html',
  styleUrls: ['./user-non-system.component.css']
})
export class UserNonSystemComponent implements OnInit {

  step: number;
  isLoadingPage: boolean;

  private userInfo = new UserProfile();
  private token: string;
  password = new ChangePassword();
  regexPassword: string = "^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$";
  isNotValid: boolean = false;
  message: string;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.step = 1;
    this.isLoadingPage = false;
    let userInfo = this.userService.getuser();
    this.token = userInfo.token;
    this.password.oldPassword = '';
    this.password.reNewPassword = '';
    this.password.newPassword = '';
    this.userService.GetByUserName(this.token, userInfo.username).subscribe(
      result => {
        if (result.code === 0) {
          this.userInfo = result.response;
          this.isLoadingPage = true;
        }
      }
    );
  }

  capNhatThongTin() {
    this.userService.updateUserNonProfile(this.userInfo.full_name, this.token).subscribe(result => {
      console.log(result);

      if (result.code !== 0) {
        bootbox.alert("Cập nhật thông tin không thành công.");
      } else {
        bootbox.alert(result.message);
        this.step = 1;
      }
    });
  }

  changeInfo() {
    this.step = 2;
  }

  changePassWord() {
    this.step = 3;
    this.password.reNewPassword === '';
    this.password.newPassword === '';
    this.password.oldPassword === '';
  }

  changePass() {
    var rePattern = new RegExp(this.regexPassword);
    if (this.password.reNewPassword === '' &&
      this.password.newPassword === '' &&
      this.password.oldPassword === '') {
      return;
    }

    if (rePattern.exec(this.password.newPassword) === null) {
      this.isNotValid = true;
      this.message = "Mật khẩu mới phải từ 8 đến 16 ký tự. Có chữ hoa, chữ thường và ký tự đặc biệt.";
      return;
    }

    if (this.password.reNewPassword === '' && this.password.newPassword !== '') {
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
        if (result.code === 0) {
          bootbox.alert("Đổi mật khẩu thành công");
          this.step = 1;
          this.isNotValid = false;
        } else {
          this.message = result.message;
          this.isNotValid = true;
        }
      }
    );

  }

  returnA() {
    this.step = 1;
  }

}
