import { Router } from '@angular/router';
import { UserService } from './../../services/user.service';
import { OfficeInfo } from './../../model/officeinfo';
import { UtilService } from './../../services/utils.service';
import { UserInfo, ResearchExperience, TeachingExperience, CommendationExperience } from './../../model/userinfo';
import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import * as constants from './../../services/constants';
import { Observable } from 'rxjs/Rx';
declare var $: any;

@Component({
  selector: 'app-register-quick',
  templateUrl: './register-quick.component.html',
  styleUrls: ['./register-quick.component.css']
})
export class RegisterQuickComponent implements OnInit {
  step: number;
  usermodel: any;
  RegisterError: string;
  Time: number;
  constructor(private utilservice: UtilService, private userservice: UserService, private router: Router) {

  }
  ngOnInit() {

    this.step = 4;
    this.RegisterError = "";
    this.Time = 10;
    this.usermodel = {
      
      username: "",
      password: "",
      retypepassword: "",
      full_name: "",

    };
  }
  gotostep(step) {

    switch (this.step) {
      //email mật khẩu
      case 4:
        this.userservice.registerquick(this.usermodel.username,this.usermodel.password,this.usermodel.full_name)
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

  }

}
