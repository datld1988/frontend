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
  selector: 'app-work-detail',
  templateUrl: './work-detail.component.html',
  styleUrls: ['./work-detail.component.css']
})
export class WorkDetailComponent implements OnInit {

  isDisableTab: boolean;
  username: string;
  fullname: string;
  isLoadingPage: boolean;
  hasWork = false;
  maxOperation: number;
  idWorks: string;
  work = new Work();
  files = new Array<Files>();
  administrativeFiles = new Array<Files>();
  operations = new Array<Operation>();
  articleAdd: Work[];
  articleAdded = new Array<Work>();
  articleTemp = new Array<Work>();

  token: string;
  inputValue: any;
  uploadimgLoading: boolean = false;

  totalWork: number;
  limitWork: number = 4;
  pageWork: number;

  linkAva: string;

  status: number;
  workNewEdit: boolean = false;

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
    this.token = this.userservice.getuser().token;
    this.username = this.userservice.getuser().username;
    this.linkAva = String(constants.apiurlfile + "io/get_ava/normal/" + this.username);
    this.route.params.subscribe(params => {
      this.idWorks = String(params['id']); // (+) converts string 'id' to a number

      let work = this.worksService.GetWorkById(this.token, this.idWorks).subscribe(
        result => {
          console.log(result);

          this.work = result.response;

          // if(this.work.status === -1 && this.work.work_status === 3) this.status = 1;
          // else if(this.work.status === -1 && this.work.work_status === 2) this.status = 1;
          // else if(this.work.status === 0 && this.work.work_status === 3) this.status = 1;
          // else if(this.work.status === 0 && this.work.work_status === 2) {
          //   this.status = 1;
          //   this.workNewEdit = true;
          // }
          // else if(this.work.work_status === 1) this.status = 5;
          // else if(this.work.work_status === 3) this.status = 6;
          // else if(this.work.work_status === 2) this.status = 7;
          // else if(this.work.work_status === -1) this.status = 8;

          if (this.work.status === -1 && this.work.work_status === 1) {
            this.isEdit = true;
            this.workNewEdit = true;
            this.thongBaoDeTai = "Đề tài chưa gửi duyệt tới quản trị viên.";
          } else if (this.work.status === -1 && this.work.work_status === 3) {
            this.isEdit = false;
            this.thongBaoDeTai = "Đề tài đang chờ duyệt quyết định";
          }
          else if (this.work.status === -1 && this.work.work_status === 2) {
            this.isEdit = false;
            this.thongBaoDeTai = "Đề tài bị từ chối duyệt quyết định";
          }
          else if (this.work.status === 0 && this.work.work_status === 3) {
            this.isEdit = false;
            this.thongBaoDeTai = "Đề tài đang chờ duyệt đề cương";
          }
          else if (this.work.status === 0 && this.work.work_status === 2) {
            this.isEdit = true;
            this.workNewEdit = true;
            this.thongBaoDeTai = "Đề tài bị từ chối duyệt đề cương. Hãy cập nhật.";
          }
          else if (this.work.work_status === 1) {
            this.isEdit = true;
            this.workNewEdit = false;
            this.thongBaoDeTai = "Đề tài được chỉnh sửa";
          }
          else if (this.work.work_status === 3) {
            this.isEdit = false;
            this.thongBaoDeTai = "Đề tài đang chờ duyệt";
          }
          else if (this.work.work_status === 2) {
            this.isEdit = true;
            this.thongBaoDeTai = "Đề tài bị từ chối duyệt cập nhật/nghiệm thu. Hãy cập nhật";
          }
          else if (this.work.work_status === -1) {
            this.isEdit = false;
            this.thongBaoDeTai = "Đề tài bị quản trị viên khóa";
          }
          else if (this.work.work_status === 0 && this.work.status >= 1 && !this.work.is_opened) {
            this.isWorkPublic = true;
          }else if (this.work.work_status === 0 && this.work.status >= 1 && this.work.is_opened) {
            this.isWorkPublic = false;
            this.isEdit = false;
            this.thongBaoDeTai = "Đề tài đã yêu cầu quyền chỉnh sửa. Vui lòng chờ phản hồi.";
          } 
          if (this.isEdit === undefined) {
            this.thongBaoDeTai = "Đề tài đã công bố. Để chỉnh sửa vui lòng liên hệ quản trị viên mở quyền";
            // this.thongBaoDeTai = "Đề tài đã công bố.";
            this.isEdit = false;

            // this.isWorkPublic = true;
          }

          this.memberSearch = this.work.members;
          this.hasWork = true;
          this.maxOperation = 1;

          // this.articlesTemp = this.work.articles;

          this.userservice.GetByToken(this.token).subscribe(
            result => {
              this.fullname = result.response.full_name;
            }
          );

          this.worksService.GetArticleInWorkById(this.token, this.work._id).subscribe(
            result => {
              console.log(result.response);
              this.articleAdded = result.response;

            }
          );
          this.getFiles();

          this.filesService.GetFileByType(this.token, this.idWorks, 1).subscribe(
            result => {
              if (result.code === 0) {

                this.administrativeFiles = result.response;
              }
            }
          );
          this.operationService.GetOperationById(this.token, this.idWorks).subscribe(
            result => {
              this.operations = result.response;
            }
          );

          let sub = this.userservice.GetByUserName(this.token, this.username).subscribe(
            result => {
              this.userActive = result.response.isActived;
            }
          );

          this.work.cochair.forEach(element => {
            element.linkAvar = this.filesService.GetAvatar(element.username, 'small');
          });


          setTimeout(function () {
            $('#ModalContainer').append($('#operation'));
            $('#ModalContainer').append($('#addPointMember'));
            $('#ModalContainer').append($('#addFile'));
            $('#ModalContainer').append($('#addBaibao'));

          }, 300);

          this.isDisableTab = this.utilservice.CheckRoleDisplay(this.username, this.work.author);
          this.isLoadingPage = true;
        });
    });


  }

  requestOpenWork() {
    
        this.worksService.RequestOpenWork(this.token, this.idWorks).subscribe(
          result => {
            console.log(result);
            if (result.code === 0) {
              this.router.navigate(['/profile', this.username, 'dsdetai']);
              bootbox.alert("Yêu cầu duyệt đề tài đã được chuyển tới quản trị viên")
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
          bootbox.alert("Yêu cầu duyệt đề tài đã được chuyển tới quản trị viên")
        } else {
          bootbox.alert("Có lỗi trong quá trình gửi yêu cầu.")
        }
      }
    );
  }

  showAlert() {

    if (!this.userActive) {
      bootbox.alert("Tài khoản không nằm trong hệ thống.");
      return true;
    }

    if (!this.isEdit) {

      bootbox.alert(this.thongBaoDeTai);
      return true;
    }

    return false;
  }

  getFiles() {
    this.filesService.GetFileById(this.token, this.idWorks).subscribe(
      result => {
        this.files = result.response;
        //console.log(result);

      }
    );

  }
  deleteWork() {

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



    // bootbox.confirm({
    //   message: "Dữ liệu xóa đi sẽ không thể khôi phục lại. <br> Bạn chắc chắn muốn xóa đề tài này?",
    //   buttons: {
    //     confirm: {
    //       label: 'Đồng ý',
    //       className: 'btn-primary'
    //     },
    //     cancel: {
    //       label: 'Bỏ qua',
    //       className: 'btn-default'
    //     }
    //   },
    //   callback: function (result) {

    //     let aa = FooModule.FooInstance;

    //     console.log(aa);


    //     // this.

    //     // if (result) {
    //     //   this.(this.token, this.work._id, this.work).subscribe(
    //     //     result => {
    //     //       $(element).modal('hide');
    //     //     }
    //     //   );
    //     // }
    //   }
    // });
  }

  editWork() {
    if (this.showAlert()) return;

    this.router.navigate(['/chinh-sua-de-tai', this.idWorks]);
  }
  editNewWork() {

    if (this.showAlert()) return;
    this.router.navigate(['/chinh-sua-de-tai-moi', this.idWorks]);
  }
  changeListener($event) {
    this.inputValue = $event.target;
  }

  uploadFile(event) {
    let target = event.target || event.srcElement || event.currentTarget;

    let comment = $("textarea[name=comment]").val();
    let up = $("input[id=fileUpload]").val().replace(/^.*[\\\/]/, '');
    let fileType = up.split(".")[1];

    console.log(this.work.files);

    let duplicate = this.files.filter(x => x.filename.includes(up.trim()));
    console.log(fileType.toLowerCase());
    if (!constants.file_type.includes(fileType.toLowerCase())) {
      bootbox.alert("Chọn đúng định dạng tải lên");
    } else if (up === "") {
      bootbox.alert("Chọn tài liệu muốn tải lên.");
    } else if (duplicate.length >= 1) {
      bootbox.alert("Trùng tên tài liệu. Vui lòng thử lại.");
    } else {
      this.uploadimgLoading = true;
      this.filesService.UploadFile(this.token, comment, this.inputValue, this.idWorks).subscribe(
        result => {
          this.uploadimgLoading = false;
          if (result.code === 0) {
            this.files.push(result.response);
          }
        }
      );

      $("#addFile").modal("hide");

    }
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

  downloadFile(fileId) {

    window.location.href = this.filesService.DownloadFileById(this.token, fileId, this.idWorks);
  }

  downloadFileAdmin(fileId) {

    window.location.href = this.filesService.DownloadFileAdminById(this.token, fileId, this.idWorks);
  }

  closeAddFile() {
    $("#addFile").modal('hide');
  }

  showPopup(element: string) {

    if (this.showAlert()) return;

    $(element).find("textarea[name=comment]").val("");
    $(element).find("#fileUpload").value = "";
    let $file = $("#fileUpload");
    $file.wrap('<form>').closest('form').get(0).reset();
    $file.unwrap();

    $(element).modal('show');
  }

  showAddPointMemberPopup(element: string) {
    this.memberSearch = new Array<Member>();
    this.memberSearch = this.work.members;

    $(element).modal('show');
  }

  showAddOperationPopup(element: string) {

    if (this.showAlert()) return;

    $(element).find("textarea[name=contentOperation]").val("");
    $(element).modal('show');
  }

  showAddpointPopup(element: string) {

    if (this.showAlert()) return;

    for (let ele of $(element).find("div[name=aaaaaaa]")) {
      let point = $(ele).find("input[name=point]").val("");
    }
    $(element).modal('show');
  }

  closePopup(element: string) {
    $(element).modal('hide');
  }

  addOperation(event) {
    let detail = $("textarea[name=contentOperation]").val().trim();
    let id = $("input[name=idEditOperation]").val();

    console.log(id);

    if (id) {
      let obj = { "description": detail }

      this.operationService.EditOperation(this.token, id, obj).subscribe(
        result => {
          this.operationService.GetOperationById(this.token, this.idWorks).subscribe(
            result => {
              this.operations = result.response;
            }
          );
        }
      );
    } else {
      console.log("THEM MOI");

      // let operation: Operation = { created: new Date(), fullname: this.fullname, description: detail, _id: "", work_id: "", username: "" };

      let obj = { "description": detail }

      this.operationService.CreateOperation(this.token, this.idWorks, obj).subscribe(
        result => {
          this.operationService.GetOperationById(this.token, this.idWorks).subscribe(
            result => {
              this.operations = result.response;
            }
          );
        }
      );
    }
    $("input[name=idEditOperation]").val("");
    $("#operation").modal('hide');
  }

  removeOperation(id) {

    if (this.showAlert()) return;

    this.operationService.DeleteOperation(this.token, id, { "description": "" }).subscribe(
      result => {
        this.operationService.GetOperationById(this.token, this.idWorks).subscribe(
          result => {
            this.operations = result.response;
          }
        );
      }
    );

  }

  editOperation(id) {

    if (this.showAlert()) return;

    $("input[name=idEditOperation]").val(id)
    let operation: Operation = this.operations.filter(x => x._id == id)[0];
    $('#operation').find("textarea[name=contentOperation]").val(operation.description);
    $("#operation").modal('show');
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

    this.worksService.UpdateWork(this.token, 'default', this.work._id, this.work).subscribe(
      result => {
        $(element).modal('hide');
      }
    );

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

  showAddBaibaoPopup(element: string) {

    if (this.showAlert()) return;

    this.pageWork = (0 / this.limitWork) + 1;
    this.worksService.GetWorkByType(this.token, this.userservice.getuser().username, 2, this.limitWork, this.pageWork).subscribe(
      result => {
        this.articleAdd = result.response;
        this.totalWork = result.total;
        $(element).modal('show');
      });
  }

  searchingArrticle() {
    this.pageWork = (0 / this.limitWork) + 1;
    let condition = $('input[name=articleCondition]').val();
    this.worksService.SearchingWorkByUsername(this.token, this.userservice.getuser().username, 2, this.limitWork, this.pageWork, condition).subscribe(
      result => {
        this.articleAdd = result.response;
        this.totalWork = result.total;
        $('#addBaibao').modal('show');
      });
  }

  getWorks(offset: number) {
    this.pageWork = (offset / this.limitWork) + 1;

    this.worksService.GetWorkByType(this.token, this.userservice.getuser().username, 2, this.limitWork, this.pageWork).subscribe(
      result => {
        this.articleAdd = result.response;
        this.totalWork = result.total;
      });
  }

  addTemArticle(ar, event) {

    if (!this.isEdit) {
      this.showAlert();
      return;
    }

    var target = event.target || event.srcElement || event.currentTarget;
    let btn = $(target).closest('div').parent('div');

    let flag: boolean = false;

    let arTem = this.articleAdded.filter(x => x._id === ar._id);

    console.log(arTem);

    if (arTem.length === 0) {
      this.articleTemp.push(ar)
    }
    $(btn).hide();
  }

  close() {
    $("#addBaibao").modal('hide');
  }

  addArticleToWork() {
    if (this.articleAdded.length === 0) {
      this.articleAdded = this.articleTemp;
      $('#addBaibao').modal('hide');
      this.saveAddArticleToDb();
      return;
    }
    this.articleTemp.forEach(element => {
      this.articleAdded.forEach(ele => {
        console.log(ele._id);
        console.log(element._id);

        console.log(ele._id !== element._id);

        if (ele._id !== element._id) this.articleAdded.push(element);
      });
    });

    this.saveAddArticleToDb();
    
  }

  saveAddArticleToDb() {
    this.work.articles = [];
    this.articleAdded.forEach(element => {
      this.work.articles.push(element._id);
    });

    console.log(this.work);
    

    this.worksService.UpdateWork(this.token, 'default', this.work._id, this.work).subscribe(
      result => {
        this.worksService.GetArticleInWorkById(this.token, this.work._id).subscribe(
          result => {
            this.articleAdded = result.response;
            $('#addBaibao').modal('hide');
          }
        );
      }
    );
  }

  // addArticleToWork() {
  //   this.work.articles = this.articlesTemp;
  //   console.log(this.work);



  //   this.worksService.UpdateWork(this.token, 'default', this.work._id, this.work).subscribe(
  //     result => {
  //       this.worksService.GetArticleInWorkById(this.token, this.work._id).subscribe(
  //         result => {
  //           this.articleAdded = result.response;

  //         }
  //       );
  //     }
  //   );
  //   $("#addBaibao").modal('hide');
  // }

  removeArticleFromWork(id) {

    this.articleAdded.splice(id, 1);

    this.work.articles = [];

    this.articleAdded.forEach(element => {
      this.work.articles.push(element._id);
    });

    this.worksService.UpdateWork(this.token, 'default', this.work._id, this.work).subscribe(
      result => {
        this.worksService.GetArticleInWorkById(this.token, this.work._id).subscribe(
          result => {
            this.articleAdded = result.response;
            $('#addBaibao').modal('hide');
          }
        );
      }
    );

  }
}
