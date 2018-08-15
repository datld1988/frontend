import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from './../../services/user.service';
import { OfficeInfo } from './../../model/officeinfo';
import { UtilService } from './../../services/utils.service';
import { UserInfo, ResearchExperience, TeachingExperience, CommendationExperience } from './../../model/userinfo';
import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import * as constants from './../../services/constants';
import { Observable } from 'rxjs/Rx';
declare var $: any;

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  step: number;
  usermodel: any;
  ResetError: string;
  code: string;
  constructor(private utilservice: UtilService, private userservice: UserService, private router: Router, private route: ActivatedRoute) {

  }
  ngOnInit() {

    this.step = 4;
    this.ResetError = "";
    this.usermodel = {

      password: "",
      retypepassword: "",

    };
    this.route.params.subscribe((params) => {

      this.usermodel.username = params['username'];
      this.code = params['code'];

      //check validate
    });
  }
  gotostep(step) {

    switch (this.step) {
      //email mật khẩu
      case 4:
        this.userservice.resetpassword(this.usermodel.username, this.code, this.usermodel.password)
          .subscribe(result => {
            //console.log(result);
            if (result.code !== 0) {
              this.ResetError = result.message;
            } else {

              this.step = 5;

            }
          });
        break;

    }

  }

}
