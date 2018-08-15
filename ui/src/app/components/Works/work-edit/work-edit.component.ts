import { FilesService } from './../../../services/files.service';
import { UserTokenInfo } from 'app/model/usertokeninfo';
import { NgForm } from '@angular/forms';
import { UserProfile } from 'app/model/userinfo';
import { Combobox } from './../../../model/combobox';
import { Work, Member, Cochair } from './../../../model/works';
import { WorksService } from './../../../services/works.service';
import { UserService } from './../../../services/user.service';
import { UtilService } from './../../../services/utils.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import * as constants from './../../../services/constants';

declare var $: any;
declare var Pikaday: any;
declare var moment: any;
declare var bootbox: any;

@Component({
  selector: 'app-work-edit',
  templateUrl: './work-edit.component.html',
  styleUrls: ['./work-edit.component.css']
})
export class WorkEditComponent implements OnInit {

  @ViewChild("formEditWork") form: NgForm;


  username: string;
  token: string;
  workEdit = new Work();
  isLoadingPage: boolean;
  idWorks: string;

  dataDump = new Array<Member>();
  cochairSuggest = new Array<Cochair>();
  memberSuggest = new Array<Member>();

  member: Member[];

  cocharCurr = new Cochair();
  memberCurr = new Member();

  lstShareWorks = new Array<Combobox>();
  shareWorksSelected: Combobox;

  lstBudgetSource = new Array<Combobox>();
  budgetSourceSelected: Combobox;

  lstStatus = new Array<Combobox>();
  statusSelected: Combobox;

  lstresearchArea = new Array<Combobox>();
  researchAreaSelected: Combobox;

  lstEthicalAssembly = new Array<Combobox>();
  ethicalAssemblySelected: Combobox;

  lstLevelWorks = new Array<Combobox>();
  levelWorksSelected: Combobox;

  lstRankWorks = new Array<Combobox>();
  rankWorksSelected: Combobox;

  lstTechnologyTransfer = new Array<Combobox>();
  technologyTransferSelected: Combobox;

  lstDecidedWorks = new Array<Combobox>();
  decidedWorksSelected: Combobox;

  lstUnit = new Array<Combobox>();
  unitSelected: Combobox;

  expected_date: string = '';
  start_date: string = '';
  end_date: string = '';

  ethical_assembly_date_meeting: string = '';
  ethical_assembly_date_summary: string = '';
  decided_works_approval_date: string = '';
  decided_works_acceptance_date: string = '';
  decided_works_acceptance_off_date: string = '';

  idCocharMax: number = 0;
  idMemberMax: number = 0;

  isCochair: boolean = false;
  cocharMess: string;

  temp = new Array<Cochair>();

  id: number;

  constructor(private router: Router,
    private utilservice: UtilService,
    private userservice: UserService,
    private route: ActivatedRoute,
    private worksService: WorksService,
    private filesService: FilesService) { }

  ngOnInit() {
    this.isLoadingPage = false;

    this.lstShareWorks = constants.share_works;
    this.lstBudgetSource = constants.budget_source;
    this.lstStatus = constants.status_works;
    this.lstresearchArea = constants.research_areaList;
    this.lstLevelWorks = constants.level_works;
    this.lstRankWorks = constants.rank_works;
    this.lstTechnologyTransfer = constants.technology_transfer;
    this.lstDecidedWorks = constants.decided_works;
    this.lstUnit = constants.unit_money;
    this.lstEthicalAssembly = constants.ethical_assembly;

    let userToken = this.userservice.getuser();
    this.username = userToken.username;
    this.token = userToken.token;
    this.route.params.subscribe(params => {
      this.idWorks = String(params['id']); // (+) converts string 'id' to a number

      let work = this.worksService.GetWorkById(this.token, this.idWorks).subscribe(
        result => {
          this.workEdit = result.response;

          this.workEdit.roles.constructor()

          for (var property in this.workEdit.roles) {
            if (this.workEdit.roles.hasOwnProperty(property)) {
              if (property === "public") {
                if (this.workEdit.roles[property]) {
                  this.workEdit.share_works = 1;
                } else {
                  this.workEdit.share_works = 2;
                }
              }
            }
          }

          let idxCochair: number = 0;
          let idxMem: number = 0;
          this.workEdit.members.forEach(element => {
            element.id = idxMem;
            element.linkAvar = this.filesService.GetAvatar(element.username, "normal");
            idxMem++;
          });
          this.idMemberMax = idxMem;

          this.workEdit.cochair.forEach(element => {
            element.id = idxCochair;
            element.linkAvar = this.filesService.GetAvatar(element.username, "normal");
            idxCochair++;
          });
          this.idCocharMax = idxCochair;


          this.shareWorksSelected = this.lstShareWorks.filter(x => x.value === this.workEdit.share_works)[0];
          this.budgetSourceSelected = this.lstBudgetSource.filter(x => x.value === this.workEdit.budget_source)[0];
          this.statusSelected = this.lstStatus.filter(x => x.value === this.workEdit.status)[0];
          this.researchAreaSelected = this.lstresearchArea.filter(x => x.value === Number(this.workEdit.research_area))[0];
          this.ethicalAssemblySelected = this.lstEthicalAssembly.filter(x => x.value === Number(this.workEdit.ethical_assembly))[0];
          this.levelWorksSelected = this.lstLevelWorks.filter(x => x.value === Number(this.workEdit.level))[0];
          this.rankWorksSelected = this.lstRankWorks.filter(x => x.value === Number(this.workEdit.rank))[0];
          this.technologyTransferSelected = this.lstTechnologyTransfer.filter(x => x.value === Number(this.workEdit.technology_transfer))[0];
          this.decidedWorksSelected = this.lstDecidedWorks.filter(x => x.value === Number(this.workEdit.decided_works))[0];
          this.unitSelected = this.lstUnit.filter(x => x.value === Number(this.workEdit.unit_money))[0];

          this.expected_date = this.workEdit.expected_date === undefined ? '' : this.convertFromMMYYYY(this.workEdit.expected_date);
          this.start_date = this.workEdit.start_date === undefined ? '' : this.convertFromMMYYYY(this.workEdit.start_date);
          this.end_date = this.workEdit.end_date === undefined ? '' : this.convertFromMMYYYY(this.workEdit.end_date);

          this.ethical_assembly_date_meeting = this.workEdit.ethical_assembly_date_meeting === null || this.workEdit.ethical_assembly_date_meeting === 0 ? '' : this.convertFromDDMMYYYY(this.workEdit.ethical_assembly_date_meeting);
          this.ethical_assembly_date_summary = this.workEdit.ethical_assembly_date_summary === null || this.workEdit.ethical_assembly_date_summary === 0 ? '' : this.convertFromDDMMYYYY(this.workEdit.ethical_assembly_date_summary);

          this.decided_works_acceptance_date = this.workEdit.decided_works_acceptance_date === null || this.workEdit.decided_works_acceptance_date === 0 ? '' : this.convertFromDDMMYYYY(this.workEdit.decided_works_acceptance_date);
          this.decided_works_acceptance_off_date = this.workEdit.decided_works_acceptance_off_date === null || this.workEdit.decided_works_acceptance_off_date === 0 ? '' : this.convertFromDDMMYYYY(this.workEdit.decided_works_acceptance_off_date);
          this.decided_works_approval_date = this.workEdit.decided_works_approval_date === null || this.workEdit.decided_works_approval_date === 0 ? '' : this.convertFromDDMMYYYY(this.workEdit.decided_works_approval_date);

          this.workEdit.technology_transfer = this.workEdit.technology_transfer === undefined ? '' : this.workEdit.technology_transfer;

          this.route.params.subscribe(params => {

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
          });

          this.workEdit.cochairNonInSystem = new Array<Cochair>();
          this.workEdit.memberNonInSystem = new Array<Member>();

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

            $('.bao-all-nhapten .ten + input,.bao-all-nhapten .cusTa').focus(function () {
              $(this).parents('.bao-all-nhapten').addClass('show');
            }).blur(function () {
              $(this).parents('.bao-all-nhapten').removeClass('show');
            });
          }, 300);
          console.log(this.workEdit);

          this.isLoadingPage = true;
        });
    });
  }

  removeCochair(ir) {
    this.workEdit.cochair.splice(ir, 1);

    this.temp = new Array<Member>();

    for (let co of this.workEdit.cochair) {
      if (co.username === undefined) this.temp.push(co);
    }

    for (let co of this.workEdit.members) {
      if (co.username === undefined) this.temp.push(co);
    }
  }

  removeMem(ir) {
    this.workEdit.members.splice(ir, 1);
    this.temp = new Array<Member>();
    for (let co of this.workEdit.cochair) {
      if (co.username === undefined) this.temp.push(co);
    }

    for (let co of this.workEdit.members) {
      if (co.username === undefined) this.temp.push(co);
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

      this.workEdit.members.push(this.memberCurr);
      this.temp.push(this.memberCurr);
      $(target).val("");
      $(target).focus();
      this.temp.forEach(element => {
        element.id = this.id;
        this.id++;
      });
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
      cochair.id = 0;
      this.workEdit.cochair.push(cochair);
      this.temp.push(cochair);
      $(target).val("");
      $(target).focus();
      this.temp.forEach(element => {
        element.id = this.id;
        this.id++;
      });
      console.log(this.temp);

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
    let cochar = this.workEdit.cochair.filter(x => x.username === co.username && x.fullname === co.fullname)[0];
    let mem = this.workEdit.members.filter(x => x.username === co.username && x.fullname === co.fullname)[0];

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
    this.workEdit.cochair.push(cocharCurr);
  }

  addMember(co) {
    let cochar = this.workEdit.cochair.filter(x => x.username === co.username && x.fullname === co.fullname)[0];
    let mem = this.workEdit.members.filter(x => x.username === co.username && x.fullname === co.fullname)[0];

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
    this.workEdit.members.push(this.memberCurr);
  }

  updateCancel() {
    this.router.navigate(['/chi-tiet-de-tai', this.idWorks]);
  }

  onSubmit() {

    console.log(this.form);


    if (!this.form.valid) return;

    if (this.workEdit.cochair.length == 0) {
      this.isCochair = true;
      this.cocharMess = "Hãy nhập ít nhất một Chủ nhiệm";
      return;
    }
    this.isCochair = false;

    let cochair = this.workEdit.cochair.filter(x => x.username === this.username || x.fullname === this.username)[0];
    let member = this.workEdit.members.filter(x => x.username === this.username || x.fullname === this.username)[0];
    console.log(cochair === undefined && member === undefined);

    if (cochair === undefined && member === undefined) {
      this.isCochair = true;
      this.cocharMess = "Vui lòng nhập tài khoản của bạn vào mục Chủ nhiệm hoặc Thành viên đề tài";
      return;
    }
    this.isCochair = false;

    console.log("OK");


    this.workEdit.budget_source = this.budgetSourceSelected.value;
    this.workEdit.status = this.statusSelected.value;
    this.workEdit.research_area = this.researchAreaSelected.value;
    this.workEdit.ethical_assembly = this.ethicalAssemblySelected.value;
    this.workEdit.level = this.levelWorksSelected.value;
    this.workEdit.rank = this.rankWorksSelected.value;

    this.workEdit.expected_date = this.convertToMMYYY(this.expected_date);
    this.workEdit.start_date = this.convertToMMYYY(this.start_date);
    this.workEdit.end_date = this.convertToMMYYY(this.end_date);

    this.workEdit.ethical_assembly_date_meeting = this.convertToDDMMYYY(this.ethical_assembly_date_meeting);
    this.workEdit.ethical_assembly_date_summary = this.convertToDDMMYYY(this.ethical_assembly_date_summary);

    this.workEdit.decided_works_acceptance_date = this.convertToDDMMYYY(this.decided_works_acceptance_date);
    this.workEdit.decided_works_acceptance_off_date = this.convertToDDMMYYY(this.decided_works_acceptance_off_date);
    this.workEdit.decided_works_approval_date = this.convertToDDMMYYY(this.decided_works_approval_date);


    let user: UserTokenInfo = this.userservice.getuser();

    console.log(this.workEdit);


    this.worksService.UpdateWork(user.token, 'default', this.workEdit._id, this.workEdit).subscribe(
      result => {
        console.log(result);

        if (result.code === 0) {
          this.temp.forEach(element => {
            if (element.email !== null) {
              this.worksService.SendEmail(element.email).subscribe(
                result => {

                }
              );
            }
          });
          this.router.navigate(['/chi-tiet-de-tai', this.workEdit._id]);
        } else {
          bootbox.alert(result.message);
        }
      }
    );
  }

  convertFromMMYYYY(date: number) {
    let startDateStr = String(date);
    return startDateStr.substring(4, 6) + "/" + startDateStr.substring(0, 4);
  }

  convertFromDDMMYYYY(date: number) {
    let startDateStr = String(date);
    return startDateStr.substring(6, 8) + "/" + startDateStr.substring(4, 6) + "/" + startDateStr.substring(0, 4);
  }

  convertToMMYYY(date: string) {
    let dateArr: string[];
    dateArr = date.split("/");
    return Number(dateArr[1] + dateArr[0]);
  }

  convertToDDMMYYY(date: string) {
    let dateArr: string[];
    dateArr = date.split("/");
    return Number(dateArr[2] + dateArr[1] + dateArr[0]);
  }

  addToTemp(obj) {
    let id = 0;

    this.temp.push(obj);

    this.temp.forEach(element => {
      element.id = id;
      id++;
    });
  }
}
