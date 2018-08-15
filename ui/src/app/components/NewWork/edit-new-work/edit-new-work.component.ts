import { FilesService } from './../../../services/files.service';
import { UserTokenInfo } from 'app/model/usertokeninfo';
import { UserService } from 'app/services/user.service';
import { UtilService } from 'app/services/utils.service';
import { Router, ActivatedRoute } from '@angular/router';
import { WorksService } from 'app/services/works.service';
import { UserProfile } from 'app/model/userinfo';
import { Combobox } from './../../../model/combobox';
import { Work, Member, Cochair, Files } from './../../../model/works';
import { RegisterWorksLabel } from './../../../constants/label-constant';
import { Component, OnInit } from '@angular/core';
import * as constants from './../../../services/constants';

declare var $: any;
declare var Pikaday: any;
declare var moment: any;
declare var datepicker: any;
declare var bootbox: any;
declare var buttons: any;

@Component({
  selector: 'app-edit-new-work',
  templateUrl: './edit-new-work.component.html',
  styleUrls: ['./edit-new-work.component.css']
})
export class EditNewWorkComponent implements OnInit {

  isLoadingPage: boolean;
  step: number;
  registerWorksLabel = new RegisterWorksLabel();
  workRegister = new Work();

  token: string;
  username: string;

  dataDump = new Array<Member>();
  cochairSuggest = new Array<Cochair>();
  memberSuggest = new Array<Member>();
  member: Member[];
  cocharCurr = new Cochair();
  memberCurr = new Member();

  isCochair: boolean = false;
  cocharMess: string;


  lstBudgetSource: any;
  budgetSourceSelected: Combobox;

  lstUnitMoney: any;
  unitMoneySelected: Combobox;

  lstresearchArea: any;
  researchAreaSelected: Combobox;

  lstLevelWorks: any;
  levelWorksSelected: Combobox;

  inputValue: any = null;

  validateFile: boolean = false;
  fileMess: string;
  files = new Array<Files>();
  fileTemp = new Files();

  temp = new Array<Cochair>();

  lstWorks = new Array<Work>();
  totalWork: number;
  limitWork: number;
  pageWork: number;

  idWorks: string;

  articleAdded = new Array<Work>();
  articleTemp = new Array<Work>();

  popupType: number;

  userInfo: UserProfile;
  constructor(private filesService: FilesService,
    private workService: WorksService,
    private router: Router,
    private utilservice: UtilService,
    private userservice: UserService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.isLoadingPage = false;
    this.limitWork = constants.LIMIT_PAGE_POPUP;

    this.lstBudgetSource = constants.budget_source;
    this.budgetSourceSelected = this.lstBudgetSource[0];

    this.lstUnitMoney = constants.unit_money;
    this.unitMoneySelected = this.lstUnitMoney[0];

    this.lstresearchArea = constants.research_areaList;
    this.researchAreaSelected = this.lstresearchArea[0];

    this.lstLevelWorks = constants.level_works;
    this.levelWorksSelected = this.lstLevelWorks[0];

    this.workRegister.name = '';
    this.workRegister.org_impl = '';
    this.workRegister.org_coo_impl = '';
    this.workRegister.country_impl = '';
    this.workRegister.goal_completion = '';
    this.workRegister.work_parent = [];
    this.workRegister.articles = [];
    this.articleTemp = [];

    let usertokeninfo: UserTokenInfo = this.userservice.getuser();
    this.token = usertokeninfo.token;
    this.username = usertokeninfo.username;

    this.route.params.subscribe(params => {
      this.idWorks = String(params['id']);
      let work = this.workService.GetWorkById(this.userservice.getuser().token, this.idWorks).subscribe(
        result => {
          this.workRegister = result.response;

          this.budgetSourceSelected = this.lstBudgetSource.filter(x => x.value === this.workRegister.budget_source)[0];
          this.researchAreaSelected = this.lstresearchArea.filter(x => x.value === Number(this.workRegister.research_area))[0];
          this.levelWorksSelected = this.lstLevelWorks.filter(x => x.value === Number(this.workRegister.level))[0];
          this.unitMoneySelected = this.lstUnitMoney.filter(x => x.value === Number(this.workRegister.unit_money))[0];

          let info = this.userservice.GetByUserName(this.token, this.username).subscribe(
            result => {
              this.userInfo = result.response;
            });


          let users = this.userservice.GetUserNameByType(this.token, 1).subscribe(
            result => {
              let lstUser: UserProfile[];
              lstUser = result;
              console.log(lstUser);
              for (let user of lstUser) {
                let member = new Member();
                member.fullname = user.full_name;
                member.username = user.username;
                member.linkAvar = this.filesService.GetAvatar(user.username, "normal");
                this.dataDump.push(member);
              }
            });

          setTimeout(function () {
            $('#ModalContainer').append($('#addBaibao'));
            $('.bao-all-nhapten .ten + input,.bao-all-nhapten .cusTa').focus(function () {
              $(this).parents('.bao-all-nhapten').addClass('show');
            }).blur(function () {
              $(this).parents('.bao-all-nhapten').removeClass('show');
            });
          }, 300);
          this.isLoadingPage = true;
        });

    });
  }

  onSubmit(step) {

    // Validate Member
    if (this.workRegister.cochair.length == 0) {
      this.isCochair = true;
      this.cocharMess = "Hãy nhập ít nhất một Chủ nhiệm";
      return;
    }
    this.isCochair = false;

    let cochair = this.workRegister.cochair.filter(x => x.username === this.username || x.fullname === this.username)[0];
    let member = this.workRegister.members.filter(x => x.username === this.username || x.fullname === this.username)[0];
    console.log(cochair === undefined && member === undefined);

    if (cochair === undefined && member === undefined) {
      this.isCochair = true;
      this.cocharMess = "Vui lòng nhập tài khoản của bạn vào mục Chủ nhiệm hoặc Thành viên đề tài";
      return;
    }
    this.isCochair = false;

    this.articleAdded.forEach(element => {
      this.workRegister.articles.push(element._id);
    });

    console.log(this.workRegister);

    this.workService.UpdateNewWork(this.token, 'default', this.idWorks, this.workRegister).subscribe(
      result => {
        console.log(result);
        let idWork = result.response._id;

        if (result.code === 0) {
          // this.temp.forEach(element => {
          //   if (element.email !== null) {
          //     this.workService.SendEmail(element.email).subscribe(
          //       result => {
          //         console.log("SUCCESS EMAIL: " + result.message);
          //       }
          //     );
          //   }
          // });

          this.router.navigate(['/chi-tiet-de-tai', this.workRegister._id]);
        } else {
          bootbox.alert(result.response);
        }
      });

  }

  changeListener($event) {
    this.inputValue = $event.target;
  }

  saveFile() {

    if (this.inputValue === null) {
      this.validateFile = true;
      this.fileMess = "Chưa chọn file muôn tải lên.";
      return;
    }

    this.validateFile = false;



    let comment = $("textarea[name=comment]").val();
    let up = $("input[id=fileUpload]").val().replace(/^.*[\\\/]/, '');
    console.log(up);

    let fileType = up.split(".")[1];
    console.log(fileType);

    let duplicate = this.files.filter(x => x.filename.includes(up.trim()));

    if (!constants.file_type.includes(fileType.toLowerCase())) {
      this.fileMess = "Chọn đúng định dạng tải lên";
      this.validateFile = true;
      return;
    } else if (up === "") {
      this.fileMess = "Chọn tài liệu muốn tải lên.";
      this.validateFile = true;
      return;
    } else if (duplicate.length >= 1) {
      this.fileMess = "Trùng tên tài liệu. Vui lòng thử lại.";
      this.validateFile = true;
      return;
    }

    this.validateFile = false;

    this.fileTemp = new Files();

    this.fileTemp.description = comment;
    this.fileTemp.filename = up
    this.fileTemp.data = this.inputValue;
    this.fileTemp.created = new Date();

    this.files.push(this.fileTemp);

    let $file = $("#fileUpload");
    $file.wrap('<form>').closest('form').get(0).reset();
    $file.unwrap();

    this.inputValue = null;
    $("textarea[name=comment]").val("");
    console.log(this.files);
  }

  removeFile(ir) {
    this.files.splice(ir, 1);
  }

  addTemWork(work) {
    this.workRegister.work_parent = [];
    this.workRegister.work_parent.push(work._id);
    this.workRegister.work_parent.push(work.name);
    $('#addBaibao').modal('hide');
  }

  addTemArticle(ar, event) {

    var target = event.target || event.srcElement || event.currentTarget;
    let btn = $(target).closest('div').parent('div');

    let flag: boolean = false;

    let arTem = this.articleAdded.filter(x => x._id === ar._id);

    if (arTem.length === 0) {
      this.articleTemp.push(ar)
    }

    $(btn).hide();

  }

  removeArticleFromWork(id) {

    this.articleAdded.splice(id, 1);

  }

  addArticleToWork() {
    if (this.articleAdded.length === 0) {
      this.articleAdded = this.articleTemp;
      $('#addBaibao').modal('hide');
      console.log(this.articleAdded);
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
    $('#addBaibao').modal('hide');
  }

  close() {
    $('#addBaibao').modal('hide');
  }

  addWorkParent(typeOpen) {
    this.popupType = typeOpen;
    this.pageWork = (0 / this.limitWork) + 1;

    switch (typeOpen) {
      case 1:
        this.workService.GetAllWorkByLevel(this.token, this.username, 1, 1, this.limitWork, this.pageWork).subscribe(
          result => {
            this.lstWorks = result.response;
            this.lstWorks.forEach(element => {
              this.compactSummary(element);
            });
            this.totalWork = result.total;

            $('#addBaibao').modal('show');
          });
        break;

      case 2:
        this.articleTemp = new Array<Work>();

        this.workService.GetAllArticle(this.token, this.username, this.limitWork, this.pageWork).subscribe(
          result => {
            console.log(result);

            this.lstWorks = result.response;
            this.lstWorks.forEach(element => {
              this.compactSummary(element);
            });
            this.totalWork = result.total;

            $('#addBaibao').modal('show');
          });
        break;
    }
  }

  searchingArrticle() {
    this.pageWork = (0 / this.limitWork) + 1;
    let name = $('input[name=articleCondition]').val();
    this.lstWorks = this.lstWorks.filter(a => a.name.toLowerCase().includes(name.toLowerCase()));
    this.lstWorks.forEach(element => {
      this.compactSummary(element);
    });
    this.totalWork = this.lstWorks.length;

    if (this.lstWorks.length > constants.LIMIT_PAGE_POPUP) {
      this.lstWorks.slice(0, 5);
    }
  }

  getWorks(offset: number) {
    this.pageWork = (offset / this.limitWork) + 1;

    switch (this.popupType) {
      case 1:
        this.workService.GetAllWorkByLevel(this.token, this.username, 1, 1, this.limitWork, this.pageWork).subscribe(
          result => {
            this.lstWorks = result.response;
            this.lstWorks.forEach(element => {
              this.compactSummary(element);
            });
            this.totalWork = result.total;

          });

        break;

      case 2:
        this.workService.GetAllArticle(this.token, this.username, this.limitWork, this.pageWork).subscribe(
          result => {
            console.log(result);

            this.lstWorks = result.response;
            this.lstWorks.forEach(element => {
              this.compactSummary(element);
            });
            this.totalWork = result.total;
          });
        break;
    }
  }

  saveChangeMem(event) {
    console.log(event.keyCode);

    var target = event.target || event.srcElement || event.currentTarget;

    if (event.keyCode == 13 || event.keyCode == undefined) {
      var alt = $(target).val()

      if (alt === "") return;

      this.memberCurr = new Member();
      this.memberCurr.fullname = alt;
      this.memberCurr.type = 1;
      this.memberCurr.point = 0;

      this.workRegister.members.push(this.memberCurr);
      $(target).val("");
      $(target).focus();
    } else {
      this.memberSuggest = new Array<Member>();
      var alt = $(target).val().toLowerCase();
      if (alt === "") return;

      for (let co of this.dataDump) {
        if (co.fullname.toLowerCase().includes(alt)) {
          co.type = 0;
          this.memberSuggest.push(co);
        }
      }
    }
  }

  saveChange(event) {
    var target = event.target || event.srcElement || event.currentTarget;

    if (event.keyCode == 13 || event.keyCode == undefined) {
      var alt = $(target).val()

      if (alt === "") return;

      let cochair = new Cochair();
      cochair.fullname = alt;
      cochair.type = 0;
      cochair.point = 0;
      this.workRegister.cochair.push(cochair);

      $(target).val("");
      $(target).focus();

    } else {
      this.cochairSuggest = new Array<Cochair>();
      var alt = $(target).val().toLowerCase();
      if (alt === "") return;

      for (let co of this.dataDump) {
        if (co.fullname.toLowerCase().includes(alt)) {
          let cochair: Cochair = { username: co.username, fullname: co.fullname, email: co.email, point: co.point, type: 0, id: 0, gender: 0, linkAvar: co.linkAvar };
          this.cochairSuggest.push(cochair);
        }
      }
    }
  }

  addCochair(co) {
    let cochar = this.workRegister.cochair.filter(x => x.username === co.username && x.fullname === co.fullname)[0];
    let mem = this.workRegister.members.filter(x => x.username === co.username && x.fullname === co.fullname)[0];

    if (cochar !== undefined || mem !== undefined) {
      this.isCochair = true;
      this.cocharMess = "Tác giả đã được chọn";
      return;
    }
    this.isCochair = false;

    let cocharCurr = this.cochairSuggest.filter(x => x.username == co.username)[0];
    cocharCurr.point = 0;
    cocharCurr.type = 0;
    $("input[name=cocharCurr]").val("");
    $("input[name=cocharCurr]").focus();
    this.workRegister.cochair.push(cocharCurr);
  }

  addMember(co) {
    let cochar = this.workRegister.cochair.filter(x => x.username === co.username && x.fullname === co.fullname)[0];
    let mem = this.workRegister.members.filter(x => x.username === co.username && x.fullname === co.fullname)[0];

    if (cochar !== undefined || mem !== undefined) {
      this.isCochair = true;
      this.cocharMess = "Tác giả đã được chọn";
      return;
    }
    this.isCochair = false;

    this.memberCurr = this.memberSuggest.filter(x => x.username == co.username)[0];
    this.memberCurr.type = 1;
    this.memberCurr.point = 0;
    $("input[name=memCurr]").val("");
    $("input[name=memCurr]").focus();
    this.workRegister.members.push(this.memberCurr);
  }

  removeCochair(ir) {
    this.workRegister.cochair.splice(ir, 1);
  }

  removeMem(ir) {
    this.workRegister.members.splice(ir, 1);
  }

  hasNonSys(workRegister: Work) {

    let hasNonSys: boolean = false

    for (let co of workRegister.cochair) {
      if (co.username === undefined) hasNonSys = true;
    }

    for (let co of workRegister.members) {
      if (co.username === undefined) hasNonSys = true;
    }

    return hasNonSys;
  }

  compactSummary(work: Work) {
    let count: number = 100;
    if (work.type === 1) {

      if (this.workRegister.work_parent[0] === work._id) work.status = 1; else work.status = 0;

      if (work.goal_completion.length > count) {
        let str = work.goal_completion.substring(0, count);
        work.goal_completion = String(str + "[...]");
      }
    } if (work.type === 2) {
      let workTemp = this.articleAdded.filter(x => x._id === work._id);

      if (workTemp.length === 1) work.status = 1; else work.status = 0;

      if (work.summary.length > count) {
        let str = work.summary.substring(0, count);
        work.summary = String(str + "[...]");
      }
    }
  }

}
