import { FilesService } from './../../services/files.service';
import { UserTokenInfo } from './../../model/usertokeninfo';
import { UserService } from './../../services/user.service';

import { Router } from '@angular/router';

import { Component, OnInit, AfterViewInit } from '@angular/core';
declare var bootbox: any;
declare var $: any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, AfterViewInit {
  error = '';
  model: any = {};
  usertokeninfo: UserTokenInfo;
  isActive: boolean = false;
  userType: number;
  isLoadingPage: boolean;
  loginPage: boolean = false;
  constructor(private router: Router, private userservice: UserService, private filesService: FilesService, ) { }

  ngOnInit() {
    this.isLoadingPage = false;
    this.usertokeninfo = this.userservice.getuser();

    console.log(this.usertokeninfo);
    

    if(this.usertokeninfo.username !==null) {
      this.userservice.GetByUserName(this.usertokeninfo.token, this.usertokeninfo.username).subscribe(
        result => {
          if (result.code === 0) {
            console.log("LOGIN");
            
            this.isActive = result.response.isActived;
            this.userType = result.response.user_type;
            this.isLoadingPage = true;
            this.loginPage = true;
          }
        }
      );
    }else {
      this.isLoadingPage = true;
    }
  }
  ngAfterViewInit() {
    $(document).ready(() => {

      $('select.custom-select').each(function () {
        var $this = $(this), numberOfOptions = $(this).children('option').length;

        $this.addClass('select-hidden');
        $this.wrap('<div class="select"></div>');
        $this.after('<div class="select-styled"></div>');

        var $styledSelect = $this.next('div.select-styled');
        $styledSelect.html("<img src='assets/images/icon-tag.png' />");

        var $list = $('<ul />', {
          'class': 'select-options'
        }).insertAfter($styledSelect);

        for (var i = 0; i < numberOfOptions; i++) {
          $('<li />', {
            text: $this.children('option').eq(i).text(),
            rel: $this.children('option').eq(i).val()
          }).appendTo($list);
        }

        var $listItems = $list.children('li');

        $styledSelect.click(function (e) {
          e.stopPropagation();
          $('div.select-styled.active').not(this).each(function () {
            $(this).removeClass('active').next('ul.select-options').hide();
          });
          $(this).toggleClass('active').next('ul.select-options').toggle();
        });

        $listItems.click(function (e) {
          e.stopPropagation();
          if ($(this).index() == 0) {
            $styledSelect.html("<img src='assets/images/icon-tag.png' />").removeClass('active');
          } else {
            $styledSelect.html("<img src='assets/images/icon-tag_active.png' />").removeClass('active');
          }
          $this.val($(this).attr('rel'));
          $list.hide();
          //console.log($this.val());
        });

        $(document).click(function () {
          $styledSelect.removeClass('active');
          $list.hide();
        });

      });
      if ($('.selectpicker').length) {
        $('.selectpicker').selectpicker();
      }
    });
  }
  login() {
    this.loginPage = false;
    this.userservice.login(this.model.username, this.model.password)
      .subscribe(result => {
        console.log(result);

        if (result.code === 0) {

          this.usertokeninfo = this.userservice.getuser();

          this.userservice.GetByUserName(this.usertokeninfo.token, this.usertokeninfo.username).subscribe(
            result => {
              if (result.code === 0) {
                this.isActive = result.response.isActived;
                this.userType = result.response.user_type;
                if (result.response.user_type === 1) {
                  this.loginPage = true;
                  this.router.navigate(['/home-profile', this.model.username]);

                } else if (result.response.user_type === 0) {
                  this.router.navigate(['/news']);
                }
              }
            }
          );

        } else if (result.code === 1005) {

          localStorage.setItem("outSys", "true");
          localStorage.setItem("outSys_username", this.model.username);
          this.router.navigate(['/dang-ky']);
        } else {
          this.error = result.message;
          bootbox.alert(this.error);
        }
      });
  }
  logout() {
    // reset login status
    //this.usertokeninfo = { username: null, token: null };
    this.userservice.logout();
    this.router.navigate(['/']);
    //window.location.href = '/';
  }

  searching(event) {
    let target = event.target || event.srcElement || event.currentTarget;
    this.router.navigate(['/search', $(target).val()]);
  }

  changeGroup(event) {
    console.log(this.isActive);

    if (!this.isActive) {
      bootbox.alert("Tài khoản đang không có trong hệ thống.")
      return;
    }
    let target = event.target || event.srcElement || event.currentTarget;

    let selected = $(target).find(':selected').text();

    if (selected === 'Đề tài') {
      this.router.navigate(['/dang-ky-de-tai']);
    } else if (selected === 'Bài báo') {
      this.router.navigate(['/dang-ky-bai-bao']);
    } else if (selected === 'Đề tài mới') {
      this.router.navigate(['/dang-ky-de-tai-moi']);
    }
  }

  GetAvatar(username: string, size: string): string {
    return this.filesService.GetAvatar(username, size);
  }
}
