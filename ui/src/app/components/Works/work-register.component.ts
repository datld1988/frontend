import { FilesService } from './../../services/files.service';
import { WorksService } from './../../services/works.service';
import { UserProfile } from 'app/model/userinfo';
import { UserTokenInfo } from './../../model/usertokeninfo';
import { NgForm } from '@angular/forms';
import { UserResponeData } from './../../model/userresponedata';
import { UtilService } from './../../services/utils.service';
import { UserService } from './../../services/user.service';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { Combobox } from 'app/model/combobox';
import { Work, Cochair, Member, RolesContent, Files } from './../../model/works';
import { RegisterWorksLabel } from './../../constants/label-constant';
import { Component, OnInit, ViewChild } from '@angular/core';
import * as constants from './../../services/constants';

declare var $: any;
declare var Pikaday: any;
declare var moment: any;
declare var datepicker: any;
declare var bootbox: any;
declare var buttons: any;

@Component({
  selector: 'app-work-register',
  templateUrl: './work-register.component.html',
  styleUrls: ['./work-register.component.css']
})
export class WorkRegisterComponent implements OnInit {

  idWork: string;
  isDuplicateWorkName: boolean = false;
  workNameDump: string = 'Nghiên cứu';
  form1Valid: boolean = false;
  temp = new Array<Cochair>();

  @ViewChild("formRegisterWork1") form: NgForm;
  @ViewChild("formRegisterWork2") form2: NgForm;
  @ViewChild("formRegisterWork3") form3: NgForm;
  @ViewChild("formRegisterWork4") form4: NgForm;
  @ViewChild("formRegisterWork5") form5: NgForm;

  registerWorksLabel = new RegisterWorksLabel();
  dataDump = new Array<Member>();
  cochairSuggest = new Array<Cochair>();
  memberSuggest = new Array<Member>();

  username: string;
  token: string;
  isIncludeUsername: boolean = true;
  userInfo: UserProfile;

  // Validate Thời gian thực hiện

  member: Member[];

  workRegister = new Work();

  cocharCurr = new Cochair();
  memberCurr = new Member();

  step: number;
  isLoadingPage: boolean;

  inputValue = new Array<any>();

  validateFile: boolean = false;
  fileMess: string;
  files = new Array<Files>();
  fileTemp = new Files();

  expected_date: string = '';
  review_date: string = '';
  start_date: string = '';
  end_date: string = '';
  over_date: string = '';

  ethical_assembly_date_meeting: string = '';
  ethical_assembly_date_summary: string = '';
  decided_works_approval_date: string = '';
  decided_works_acceptance_date: string = '';
  decided_works_acceptance_off_date: string = '';

  lstBudgetSource: any;
  budgetSourceSelected: Combobox;

  lstUnitMoney: any;
  unitMoneySelected: Combobox;

  lstresearchArea: any;
  researchAreaSelected: Combobox;

  lstEthicalAssembly: any;
  ethicalAssemblySelected: Combobox;

  lstLevelWorks: any;
  levelWorksSelected: Combobox;

  lstRankWorks: any;
  rankWorksSelected: Combobox;

  lstTechnologyTransfer: any;
  technologyTransferSelected: Combobox;

  lstDecidedWorks: any;
  decidedWorksSelected: Combobox;

  lstShareWorks: any;
  shareWorksSelected: Combobox;

  isCochair: boolean = false;
  cocharMess: string;

  lstWorks = new Array<Work>();
  totalWork: number;
  limitWork: number;
  pageWork: number;

  popupType: number;

  articleAdded = new Array<Work>();
  articleTemp: string[];

  constructor(private filesService: FilesService, private workService: WorksService, private router: Router, private utilservice: UtilService, private userservice: UserService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.isLoadingPage = false;
    this.step = 1;
    this.limitWork = constants.LIMIT_PAGE_POPUP;
    this.lstBudgetSource = constants.budget_source;
    this.budgetSourceSelected = this.lstBudgetSource[0];

    this.lstUnitMoney = constants.unit_money;
    this.unitMoneySelected = this.lstUnitMoney[0];

    this.lstresearchArea = constants.research_areaList;
    this.researchAreaSelected = this.lstresearchArea[0];

    this.lstEthicalAssembly = constants.ethical_assembly;
    this.ethicalAssemblySelected = this.lstEthicalAssembly[0];

    this.lstLevelWorks = constants.level_works;
    this.levelWorksSelected = this.lstLevelWorks[0];

    this.lstRankWorks = constants.rank_works;
    this.rankWorksSelected = this.lstRankWorks[0];

    this.lstTechnologyTransfer = constants.technology_transfer;
    this.technologyTransferSelected = this.lstTechnologyTransfer[0];

    this.lstDecidedWorks = constants.decided_works;
    this.decidedWorksSelected = this.lstDecidedWorks[0];

    this.lstShareWorks = constants.share_works;
    this.shareWorksSelected = this.lstShareWorks[0]

    this.workRegister.name = '';
    this.workRegister.goal_completion = '';
    this.workRegister.masoDeTai = '';
    this.workRegister.org_impl = '';
    this.workRegister.org_coo_impl = '';
    this.workRegister.country_impl = '';
    this.workRegister.technology_transfer = '';
    this.workRegister.work_parent = [];
    this.workRegister.articles = [];
    this.articleTemp = [];

    let userInfo: UserTokenInfo = this.userservice.getuser();
    this.username = userInfo.username;
    this.token = userInfo.token;

    this.route.params.subscribe(params => {

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
            this.workRegister.status = 1;
            this.workRegister.total_cost = null;
            this.workRegister.operating_amount = null;
            this.workRegister.receive_amount = null;
          }

          var workStep2: Object = localStorage.getItem("createWork");

          let name = localStorage.getItem("createWork_Name");
          let target = localStorage.getItem("createWork_Target");
          let step = localStorage.getItem("createWork_Step");

          if (name !== null && target !== null && step !== null) {
            this.workRegister.name = name;
            this.workRegister.goal_completion = target;
            this.step = Number(step);

            localStorage.removeItem("createWork_Name");
            localStorage.removeItem("createWork_Target");
            localStorage.removeItem("createWork_Step");
          }
          setTimeout(function () {

            $('#ModalContainer').append($('#addBaibao'));

            $('#ethicalassemblydatemeeting').datepicker({
              format: 'dd/mm/yyyy'
            });
            $('#ethicalassemblydatesummary').datepicker({
              format: 'dd/mm/yyyy'
            });
            $('#decidedworksapprovaldate').datepicker({
              format: 'dd/mm/yyyy'
            });
            $('#decidedworksacceptancedate').datepicker({
              format: 'dd/mm/yyyy'
            });
            $('#decidedworksacceptanceoffdate').datepicker({
              format: 'dd/mm/yyyy'
            });
          }, 300);
        });
      this.getWorks(0);
      this.isLoadingPage = true;
    });

  }

  ngAfterViewInit() {
    $(window).bind('beforeunload', function () {
      return 'Bạn có muốn chắc chắn không tiếp tục?';
    });
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


  changeStatus(status) {
    if (Number(status) === 7 || Number(status) === 4) {
      setTimeout(function () {

        $('#overdate').datepicker({
          format: 'dd/mm/yyyy'
        });
      }, 300);
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

  onBack() {

    if (!this.hasNonSys(this.workRegister)) {
      this.step = 2;

    } else {
      this.step = 3;
    }
  }

  onSubmit(step) {

    switch (this.step) {
      case 1:
        console.log(this.form);
        if (!this.form.valid) return;


        console.log("Bước tiếp " + step);
        this.step = step;
        console.log(this.workRegister);

        setTimeout(function () {
          console.log("Init xong");
          $('.bao-all-nhapten .ten + input,.bao-all-nhapten .cusTa').focus(function () {
            $(this).parents('.bao-all-nhapten').addClass('show');
          }).blur(function () {
            $(this).parents('.bao-all-nhapten').removeClass('show');
          });
        }, 300);
        console.log("Step 1: " + this.workRegister);
        break;
      case 2:
        console.log(this.form2);
        if (step == 1) {
          this.step = step;
          return;
        }

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

        if (!this.hasNonSys(this.workRegister)) {
          console.log("Bước tiếp " + 4);
          this.step = 4;
          setTimeout(function () {
            console.log("Over date");

            $('#overdate').datepicker({
              format: 'dd/mm/yyyy'
            });
          }, 30);
          return;
        }
        console.log("Bước tiếp " + step);
        this.step = step;
        console.log("Step 2: " + this.workRegister);
        let id = 0;

        this.temp = new Array<Cochair>();

        for (let co of this.workRegister.cochair) {
          if (co.username === undefined) this.temp.push(co);
        }

        for (let co of this.workRegister.members) {
          if (co.username === undefined) this.temp.push(co);
        }

        this.temp.forEach(element => {
          element.id = id;
          id++;
        });
        break;

      case 3:
        console.log(this.form3);

        if (step === 2) {
          setTimeout(function () {
            console.log("Init xong");
            $('.bao-all-nhapten .head .ten + input').focus(function () {
              $(this).parents('.bao-all-nhapten').addClass('show');
            }).blur(function () {
              $(this).parents('.bao-all-nhapten').removeClass('show');
            });
          }, 300);
          this.step = step;
          return;
        }

        if (this.form3.valid) {
          setTimeout(function () {

            $('#overdate').datepicker({
              format: 'dd/mm/yyyy'
            });
          }, 300);
          this.step = step;
          console.log(this.temp);

        }
        break;
      case 4:
        setTimeout(function () {
          $('#startdate').datepicker({
            minViewMode: 1,
            format: 'mm/yyyy'
          });

          $('#expecteddate').datepicker({
            minViewMode: 1,
            format: 'mm/yyyy'
          });

          $('#enddate').datepicker({
            minViewMode: 1,
            format: 'mm/yyyy'
          });
        }, 300);

        if (this.workRegister.status === 4 || this.workRegister.status === 7) {
          if (!this.form4.valid) return;
        }

        this.step = step;
        break;
      case 5:
        setTimeout(function () {

          $('#startdate').datepicker({
            minViewMode: 1,
            format: 'mm/yyyy'
          });

          $('#expecteddate').datepicker({
            minViewMode: 1,
            format: 'mm/yyyy'
          });

          $('#enddate').datepicker({
            minViewMode: 1,
            format: 'mm/yyyy'
          });

          $('#overdate').datepicker({
            format: 'dd/mm/yyyy'
          });
        }, 300);


        if (!this.form5.valid && step !== 4) return;

        if (this.review_date === '' && step !== 4) return;

        this.step = step;

        this.workRegister.review_date = Number.parseInt(this.review_date);
        this.workRegister.expected_date = this.convertDateMMYYYY(this.expected_date);
        this.workRegister.start_date = this.convertDateMMYYYY(this.start_date);
        this.workRegister.end_date = this.convertDateMMYYYY(this.end_date);
        this.workRegister.over_date = this.convertDate(this.over_date);
        break;
      case 6:
        console.log(this.workRegister);
        console.log(step);

        setTimeout(function () {

          $('#startdate').datepicker({
            minViewMode: 1,
            format: 'mm/yyyy'
          });

          $('#expecteddate').datepicker({
            minViewMode: 1,
            format: 'mm/yyyy'
          });

          $('#enddate').datepicker({
            minViewMode: 1,
            format: 'mm/yyyy'
          });

          $('#overdate').datepicker({
            format: 'dd/mm/yyyy'
          });
        }, 300);


        this.workRegister.budget_source = this.budgetSourceSelected.value;
        this.workRegister.unit_money = this.unitMoneySelected.value;

        if ((
          // this.workRegister.budget_source === 0 ||
          // this.workRegister.total_cost == null ||
          // this.workRegister.receive_amount == null ||
          // this.workRegister.operating_amount == null ||
          // this.workRegister.unit_money == 0 ||
          // this.workRegister.receive_amount_year == null ||
          this.workRegister.receive_amount > this.workRegister.total_cost) && step === 7) return;

        this.step = step;
        console.log("Step 6: " + this.workRegister);
        break;
      case 7:

        setTimeout(function () {

          $('#ethicalassemblydatemeeting').datepicker({
            format: 'dd/mm/yyyy'
          });
          $('#ethicalassemblydatesummary').datepicker({
            format: 'dd/mm/yyyy'
          });
          $('#decidedworksapprovaldate').datepicker({
            format: 'dd/mm/yyyy'
          });
          $('#decidedworksacceptancedate').datepicker({
            format: 'dd/mm/yyyy'
          });
          $('#decidedworksacceptanceoffdate').datepicker({
            format: 'dd/mm/yyyy'
          });
        }, 300);

        if (step === 6) {
          this.step = step;
          return;
        }

        this.workRegister.research_area = this.researchAreaSelected.value
        this.workRegister.level = this.levelWorksSelected.value;
        this.workRegister.rank = this.rankWorksSelected.value;
        this.workRegister.share_works = this.shareWorksSelected.value;

        if ((this.workRegister.research_area === 0 ||
          this.workRegister.level === 0 ||
          this.workRegister.rank === 0 ||
          // this.workRegister.technology_transfer === '' ||
          (this.workRegister.level === 4 && this.workRegister.work_parent.length === 0)) && step === 8) return;


        console.log("Step 7: " + this.workRegister);
        console.log(this.workRegister);

        var obj: { [k: string]: any } = {};

        // let pub = "public";
        // let pri = "private";


        if (this.workRegister.share_works === 1) {
          obj.public = true;
          obj.private = false;
        } else {
          obj.public = false;
          obj.public = true;
        }

        for (let role of this.userInfo.work_roles) {
          obj[role] = false;
        }

        console.log(obj);


        this.workRegister.roles = obj;
        this.workRegister.type = 1;
        this.workRegister.author = this.username;
        this.workRegister.statitics = { view_number: 0, update_number: 0 };


        this.step = step;
        console.log(this.workRegister);
        break;
      case 8:

        if (step === 7) {
          this.step = step;
          return;
        }

        if (this.ethicalAssemblySelected.value === 0) return;


        this.step = step;
        break;

      case 9:
        if (step === 8) {
          this.step = step;

          setTimeout(function () {

            $('#ethicalassemblydatemeeting').datepicker({
              format: 'dd/mm/yyyy'
            });
            $('#ethicalassemblydatesummary').datepicker({
              format: 'dd/mm/yyyy'
            });
            $('#decidedworksapprovaldate').datepicker({
              format: 'dd/mm/yyyy'
            });
            $('#decidedworksacceptancedate').datepicker({
              format: 'dd/mm/yyyy'
            });
            $('#decidedworksacceptanceoffdate').datepicker({
              format: 'dd/mm/yyyy'
            });
          }, 300);
          return;
        }

        // this.step = step;
        this.workRegister.ethical_assembly_date_meeting = this.convertDate(this.ethical_assembly_date_meeting);
        this.workRegister.ethical_assembly_date_summary = this.convertDate(this.ethical_assembly_date_summary);

        this.workRegister.decided_works_approval_date = this.convertDate(this.decided_works_approval_date);
        this.workRegister.decided_works_acceptance_date = this.convertDate(this.decided_works_acceptance_date);
        this.workRegister.decided_works_acceptance_off_date = this.convertDate(this.decided_works_acceptance_off_date);

        this.workRegister.ethical_assembly = this.ethicalAssemblySelected.value;

        this.workService.CreateWork(this.userservice.getuser().token, this.workRegister.share_works === 1 ? 'public' : 'private', this.workRegister).subscribe(
          result => {
            console.log(result);
            if (result.code === 0) {
              this.temp.forEach(element => {
                if (element.email !== null) {
                  this.workService.SendEmail(element.email).subscribe(
                    result => {

                    }
                  );
                }
              });
              this.idWork = result.response._id;
              bootbox.alert("Khởi tạo thông tin đề tài thành công. Vui lòng hoàn thiện & gửi yêu cầu duyệt đề tài");
              this.router.navigate(['/chi-tiet-de-tai', this.idWork]);
            } else {
              bootbox.alert(result.response);
            }
          });

        break;
      case 10:

        if (step === 8) {
          this.step = step;
          return;
        }

        if (this.files.length === 0) return;

        this.step = step;
        console.log(this.workRegister);
        console.log(JSON.stringify(this.workRegister));


        break;
    }

  }

  checkDuplicate() {
    console.log(this.workRegister.name);
    console.log(this.workNameDump);


    console.log(this.workRegister.name === this.workNameDump);

    if (this.workRegister.name === this.workNameDump) {
      bootbox.confirm(
        "Hệ thống đã có đề tài tương tự <a href='/chi-tiet-de-tai/" + this.idWork + "'>Contact</a> <br><br>Bạn có muốn tiếp tục tạo đề tài?",

        function (result) {
          console.log('This was logged in the callback: ' + result);
        });
      this.isDuplicateWorkName = true;
      return;
    }

    this.isDuplicateWorkName = false;
  }

  convertDate(dateStr: string) {
    if (dateStr === '') return 0;

    let birthDay: string[];
    birthDay = dateStr.split("/");
    return Number(birthDay[2] + birthDay[1] + birthDay[0]);
  }

  convertDateMMYYYY(dateStr: string) {
    if (dateStr === '') return 0;

    let birthDay: string[];
    birthDay = dateStr.split("/");
    return Number(birthDay[1] + birthDay[0]);
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

  addTemWork(work) {
    this.workRegister.work_parent = [];
    this.workRegister.work_parent.push(work._id);
    this.workRegister.work_parent.push(work.name);
    $('#addBaibao').modal('hide');
  }

  addTemArticle(ar) {
    let id = $.inArray(ar._id, this.articleTemp);
    if (id === -1) this.articleTemp.push(ar._id);

  }

  removeArticleFromWork(id) {
    this.articleAdded = this.articleAdded.filter(x => !x._id.includes(id));
    this.workRegister.articles.splice(id, 1);
    console.log(this.workRegister.articles);
  }

  addArticleToWork() {
    this.articleTemp.forEach(element => {
      if ($.inArray(element, this.workRegister.articles) === -1) {
        this.workRegister.articles.push(element);
        this.articleAdded.push(this.lstWorks.filter(x => x._id.includes(element))[0]);
      }
    });

    console.log(this.workRegister.articles);


    $('#addBaibao').modal('hide');
  }

  close() {
    $('#addBaibao').modal('hide');
  }

  compactSummary(work: Work) {
    let count: number = 100;
    if (work.type === 1) {
      if (work.goal_completion.length > count) {
        let str = work.goal_completion.substring(0, count);
        work.goal_completion = String(str + "[...]");
      }
    } if (work.type === 2) {
      if (work.summary.length > count) {
        let str = work.summary.substring(0, count);
        work.summary = String(str + "[...]");
      }
    }
  }


  changeListener($event) {
    console.log(this.inputValue);
    this.inputValue.push($event.target);


  }

  saveFile() {

    let dataInput = this.inputValue[this.inputValue.length - 1];

    // if (this.inputValue === null) {
    //   this.validateFile = true;
    //   this.fileMess = "Chưa chọn file muôn tải lên.";
    //   return;
    // }

    this.validateFile = false;
    let comment = $("textarea[name=comment]").val();
    let up = $("input[id=fileUpload]").val().replace(/^.*[\\\/]/, '');
    console.log(up);

    let fileType = up.split(".")[1];
    console.log(fileType);

    // let duplicate = this.files.filter(x => x.filename.includes(up.trim()));

    // if (!constants.file_type.includes(fileType.toLowerCase())) {
    //   this.fileMess = "Chọn đúng định dạng tải lên";
    //   this.validateFile = true;
    //   return;
    // } else if (up === "") {
    //   this.fileMess = "Chọn tài liệu muốn tải lên.";
    //   this.validateFile = true;
    //   return;
    // } else if (duplicate.length >= 1) {
    //   this.fileMess = "Trùng tên tài liệu. Vui lòng thử lại.";
    //   this.validateFile = true;
    //   return;
    // }

    this.validateFile = false;

    this.fileTemp = new Files();
    // let data = this.inputValue;

    this.fileTemp.description = comment;
    this.fileTemp.filename = up
    this.fileTemp.data = dataInput;
    this.fileTemp.created = new Date();

    this.files.push(this.fileTemp);
  }

  removeFile(ir) {
    this.files.splice(ir, 1);
  }

}
