import { OperationsService } from './../../../services/operations.service';
import { FilesService } from './../../../services/files.service';
import { file_type } from './../../../services/constants';
import { Work, Member, Cochair, Files, Operation } from './../../../model/works';
import { WorksService } from './../../../services/works.service';
import { UserService } from './../../../services/user.service';
import { UtilService } from './../../../services/utils.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import * as constants from './../../../services/constants';

declare var $: any;
declare var Pikaday: any;
declare var moment: any;
declare var bootbox: any;

@Component({

  selector: 'app-article-detail',
  templateUrl: './article-detail.component.html',
  styleUrls: ['./article-detail.component.css']
})
export class ArticleDetailComponent implements OnInit {

  work = new Work();
  fullname: string;
  isLoadingPage: boolean;
  hasWork = false;
  maxOperation: number;
  idWorks: string;
  token: string;
  username: string;
  isDisableTab: boolean;

  inputValue: any;
  files = new Array<Files>();

  memberSearch = new Array<Member>();

  isEdit: boolean;
  thongBaoDeTai: string = '';

  userActive: boolean = false;

  isWorkPublic: boolean;

  constructor(private router: Router,
    private utilservice: UtilService,
    private userservice: UserService,
    private route: ActivatedRoute,
    private worksService: WorksService,
    private filesService: FilesService,
    private operationService: OperationsService) { }

  ngOnInit() {

    this.isLoadingPage = false;
    let usertoken = this.userservice.getuser();
    this.token = usertoken.token;
    this.username = usertoken.username;

    this.route.params.subscribe(
      params => {
        this.idWorks = String(params['id']);

        let work = this.worksService.GetWorkById(this.token, this.idWorks).subscribe(
          result => {

            this.work = result.response;
            this.memberSearch = this.work.members;
            this.hasWork = true;

            this.userservice.GetByToken(this.token).subscribe(
              result => {
                this.fullname = result.response.full_name;
              }
            );
            this.getFiles();

            setTimeout(function () {
              $('#ModalContainer').append($('#operation'));
              $('#ModalContainer').append($('#addPointMember'));
              $('#ModalContainer').append($('#addFile'));
              $('#ModalContainer').append($('#addBaibao'));

            }, 300);
            let sub = this.userservice.GetByUserName(this.token, this.username).subscribe(
              result => {
                this.userActive = result.response.isActived;
              }
            );
            this.isDisableTab = this.utilservice.CheckRoleDisplay(this.username, this.work.author);

            if (this.work.work_status === 2) {
              this.isEdit = true;
              this.thongBaoDeTai = "Bài báo bị từ chối duyệt. Hãy cập nhật thông tin bài báo";
            }
            else if (this.work.work_status === 1) {
              this.isEdit = true;
              this.thongBaoDeTai = "Hãy hoàn thiện & gửi yêu cầu duyệt bài báo.";
            }
            else if (this.work.work_status === 3) {
              this.isEdit = false;
              this.thongBaoDeTai = "Bài báo đang chờ duyệt.";
            } else if (this.work.work_status === 0 && this.work.status >= 1 && !this.work.is_opened) {
              this.isWorkPublic = true;
            } else if (this.work.work_status === 0 && this.work.status >= 1 && this.work.is_opened) {
              this.isWorkPublic = false;
              this.isEdit = false;
              this.thongBaoDeTai = "Đề tài đã yêu cầu quyền chỉnh sửa. Vui lòng chờ phản hồi.";
            } else if (this.isEdit === undefined) {
              this.thongBaoDeTai = "Đề tài đã được public. Vui lòng liên hệ quản trị viên nếu muốn chỉnh sửa.";
            }

            this.isLoadingPage = true;
          });

      });
  }

  showAlert() {
    if (!this.userActive) {
      bootbox.alert("Tài khoản không nằm trong hệ thống.");
      return true;
    }

    if (!this.isEdit || this.isEdit === undefined) {

      bootbox.alert(this.thongBaoDeTai);
      return true;
    }

    return false;
  }

  showAddpointPopup(element: string) {

    for (let ele of $(element).find("div[name=aaaaaaa]")) {
      let point = $(ele).find("input[name=point]").val("");
    }
    $(element).modal('show');
  }

  keyupSearchMember(event) {
    this.memberSearch = new Array<Member>();
    var target = event.target || event.srcElement || event.currentTarget;
    var alt = $(target).val();

    if (alt === "") {
      this.memberSearch = this.work.members;
      return;
    }

    this.memberSearch = this.work.members.filter(a => a.fullname.toLowerCase().includes(alt.toLowerCase()));
  }

  closePopup(element: string) {
    $(element).modal('hide');
  }

  addPointPopup(element: string) {
    for (let ele of $(element).find("div[name=aaaaaaa]")) {

      let fullname = $(ele).find("label[name=fullname]").text();
      let point = $(ele).find("input[name=point]").val();

      for (let mem of this.work.members) {

        if (mem.fullname.includes(fullname.trim())) {
          mem.point += Number(point);
        }
      }

    }

    $(element).modal('hide');
  }

  showPopup(element: string) {

    if (this.showAlert()) return;

    $(element).find("textarea[name=comment]").val("");
    $(element).find("a[name=file-name]").text("");
    $(element).modal('show');
  }

  changeListener($event) {
    this.inputValue = $event.target;
  }

  uploadFile(event) {
    console.log("OK");

    let target = event.target || event.srcElement || event.currentTarget;

    let comment = $("textarea[name=comment]").val();
    let up = $("input[id=fileUpload]").val().replace(/^.*[\\\/]/, '');
    let fileType = up.split(".")[1];

    let duplicate = this.files.filter(x => x.filename.includes(up.trim()));

    if (up === "") {
      bootbox.alert("Chọn tài liệu muốn tải lên.");
    } else if (!constants.file_type.includes(fileType.toLowerCase())) {
      bootbox.alert("Chọn đúng định dạng tải lên");
    } else if (duplicate.length >= 1) {
      bootbox.alert("Trùng tên tài liệu. Vui lòng thử lại.");
    } else {
      console.log(this.inputValue);

      this.filesService.UploadFile(this.token, comment, this.inputValue, this.idWorks).subscribe(
        result => {
          console.log(result);

          if (result.code === 0) {

            this.files.push(result.response);
          }

        }
      );

      $("#addFile").modal("hide");

    }
  }

  deleteArticle() {
    if (this.showAlert()) return;
    this.worksService.DeleteWork(this.token, this.work._id, this.work).subscribe(
      result => {
        if (result.code === 0) {
          this.router.navigate(['/profile', this.username, 'dsdetai']);
        } else {
          bootbox.alert(result.message);
        }
      }
    );
  }

  editArticle() {

    if (this.showAlert()) return;
    this.router.navigate(['/chinh-sua-bai-bao', this.idWorks]);
  }

  removeFile(fileId, index) {

    if (this.showAlert()) return;

    this.filesService.DeleteFileById(this.token, fileId, this.idWorks).subscribe(
      result => {
        console.log(result.code);
        if (result.code == 0) {
          this.files.splice(index, 1)
        }
        this.getFiles();
      }
    );
  }

  requestOpenWork() {

    this.worksService.RequestOpenWork(this.token, this.idWorks).subscribe(
      result => {
        console.log(result);
        if (result.code === 0) {
          this.router.navigate(['/profile', this.username, 'dsdetai']);
          bootbox.alert("Yêu cầu duyệt bài báo đã được chuyển tới quản trị viên")
        } else {
          bootbox.alert("Có lỗi trong quá trình gửi yêu cầu.")
        }
      }
    );
  }

  requestUpdateWork() {

    this.worksService.RequestUpdateWork(this.token, this.idWorks).subscribe(
      result => {
        console.log(result);
        if (result.code === 0) {
          this.router.navigate(['/profile', this.username, 'dsdetai']);
          bootbox.alert("Yêu cầu duyệt bài báo đã được chuyển tới quản trị viên")
        } else {
          bootbox.alert("Có lỗi trong quá trình gửi yêu cầu.")
        }
      }
    );
  }

  downloadFile(fileId) {

    window.location.href = this.filesService.DownloadFileById(this.token, fileId, this.idWorks);
  }

  getFiles() {
    this.filesService.GetFileById(this.token, this.idWorks).subscribe(
      result => {
        this.files = result.response;

      }
    );

  }

}
