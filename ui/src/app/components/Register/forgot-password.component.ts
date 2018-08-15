import { Router } from '@angular/router';
import { UserService } from './../../services/user.service';
import { OfficeInfo } from './../../model/officeinfo';
import { UtilService } from './../../services/utils.service';
import { UserInfo, ResearchExperience, TeachingExperience, CommendationExperience } from './../../model/userinfo';
import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import * as constants from './../../services/constants';
import { Observable } from 'rxjs/Rx';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  step: number;
  ModelUsername: string;
  ForgotError: string;
  
  constructor(private utilservice: UtilService, private userservice: UserService, private router: Router) {

  }
  ngOnInit() {

    this.step = 4;
    this.ForgotError = "";
   this.ModelUsername = "";
   
  }
  gotostep(step) {

    switch (this.step) {
      //email mật khẩu
      case 4:
        this.userservice.forgotpassword(this.ModelUsername)
          .subscribe(result => {
            //console.log(result);
            if (result.code !== 0) {
              this.ForgotError = result.message;
            } else {

              this.step = 5;
             
            }
          });
        break;
    }

  }

}
