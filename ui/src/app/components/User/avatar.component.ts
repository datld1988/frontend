import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from 'app/services/user.service';
import { FilesService } from './../../services/files.service';
import { WapUserInfo } from './../../model/wapuserinfo';
import * as constants from './../../services/constants';
import { Component, OnInit, ViewChild, Input, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { NgForm } from "@angular/forms";
declare var $: any;
declare var bootbox: any
@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.css']
})
export class AvatarComponent implements OnInit, AfterViewInit {
  @Input() wapUserInfo: WapUserInfo;
  @Input() isOwner: boolean;
  inputValue: any;
  token: string;
  username: string;
  avatarUrl: string;
  isActive: boolean = false;
  constructor(private filesService: FilesService, private userservice: UserService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      let usertoken = this.userservice.getuser();
      let userparam = params['username'];
      this.token = usertoken.token;
      this.username = usertoken.username;
      this.avatarUrl = this.filesService.GetAvatar(userparam, "big");

      this.userservice.GetByUserName(this.token, this.username).subscribe(
        result => {
          if (result.code === 0) {
            this.isActive = result.response.isActived;
          }
        }
      );

    });
  }
  ngAfterViewInit() {
    setTimeout(function () {

      $('#ModalContainer').append($('#addFile'));

    }, 300);
  }
  showPopup(element: string) {

    $(element).find("a[name=file-name]").text("");
    $(element).modal('show');
  }
  changeListener($event) {
    this.inputValue = $event.target;
  }
  uploadFile() {
    console.log("UPLOAD");

    let up = $("input[id=fileUpload]").val().replace(/^.*[\\\/]/, '');
    let fileType = up.split(".")[1];


    if (!constants.file_type.includes(fileType.toLowerCase())) {
      bootbox.alert("Chọn đúng định dạng tải lên");
    } else if (up === "") {
      bootbox.alert("Chọn tài liệu muốn tải lên.");
    } else {
      console.log(this.inputValue);

      this.filesService.UploadAvatar(this.token, this.username, this.inputValue).subscribe(
        result => {
          //console.log(result);

          if (result.code === 0) {

            this.avatarUrl = this.filesService.GetAvatar(this.username, "big") + "?vs=" + Math.random() * 1000000;
          }

        }
      );


      $("#addFile").modal("hide");

    }
  }

  changeGroup(event) {
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
}
