import { UserService } from './../../../services/user.service';
import { UtilService } from './../../../services/utils.service';
import { Router, ActivatedRoute } from '@angular/router';
import { WorksService } from './../../../services/works.service';
import { UserProfile } from 'app/model/userinfo';
import { Combobox, CheckBox } from './../../../model/combobox';
import { Work, Member, Cochair } from './../../../model/works';
import { Component, OnInit } from '@angular/core';
import * as constants from './../../../services/constants';

declare var $: any;
declare var Pikaday: any;
declare var moment: any;
declare var datepicker: any;
declare var bootbox: any;
declare var buttons: any;

@Component({
  selector: 'app-article-edit',
  templateUrl: './article-edit.component.html',
  styleUrls: ['./article-edit.component.css']
})
export class ArticleEditComponent implements OnInit {

  articleEdit = new Work();
  isLoadingPage: boolean;
  primary_author: string;
  vice_author: string;
  summary: string;
  keyword: string;

  dataDump = new Array<Member>();
  cochairSuggest = new Array<Cochair>();
  memberSuggest = new Array<Member>();

  cocharCurr = new Cochair();
  memberCurr = new Member();

  lstArticleType = new Array<Combobox>();
  articleTypeSelected: Combobox;

  lstShareWorks = new Array<Combobox>();
  shareWorksSelected: Combobox;

  userInfo: UserProfile;

  idWorks: string;
  token: string;
  username: string;

  isCochair: boolean = false;
  cocharMess: string;
  cochairTemp = new Array<Cochair>();

  idCocharMax: number = 0;
  idMemberMax: number = 0;

  responseObj = new Work();
  lstISI = new Array<CheckBox>();

  constructor(private workService: WorksService,
    private router: Router,
    private utilservice: UtilService,
    private userservice: UserService,
    private route: ActivatedRoute,
    private worksService: WorksService) { }

  ngOnInit() {

    this.isLoadingPage = false;

    this.lstArticleType = constants.article_type;
    this.articleTypeSelected = this.lstArticleType[0];

    this.lstShareWorks = constants.share_works;
    this.shareWorksSelected = this.lstShareWorks[0]

    this.articleEdit.keyword = [];

    this.route.params.subscribe(
      params => {
        let userToken = this.userservice.getuser();
        this.token = userToken.token;
        this.username = userToken.username;
        this.idWorks = String(params['id']);

        let users = this.userservice.GetUserNameByType(this.token, 1).subscribe(
          result => {

            let work = this.worksService.GetWorkById(this.token, this.idWorks).subscribe(
              result => {
                this.articleEdit = result.response;

                let idxCochair: number = 0;
                let idxMem: number = 0;
                this.articleEdit.members = this.articleEdit.cochair.filter(x => x.type === 1);
                this.articleEdit.cochair = this.articleEdit.cochair.filter(x => x.type === 0);

                this.articleEdit.members.forEach(element => {
                  element.id = idxMem;
                  idxMem++;
                });
                this.idMemberMax = idxMem;

                this.articleEdit.cochair.forEach(element => {
                  element.id = idxCochair;
                  idxCochair++;
                });
                this.idCocharMax = idxCochair;

                this.articleEdit.number_author = this.articleEdit.cochair.length + this.articleEdit.members.length;
                this.articleTypeSelected = this.lstArticleType.filter(x => x.value === this.articleEdit.article_kind)[0];
                this.articleEdit.cochairNonInSystem = this.articleEdit.cochair.filter(x => x.username === null);
                this.articleEdit.memberNonInSystem = this.articleEdit.members.filter(x => x.username === null);

                for (var property in this.articleEdit.roles) {
                  if (this.articleEdit.roles.hasOwnProperty(property)) {
                    if (property === "public") {
                      if (this.articleEdit.roles[property]) {
                        this.articleEdit.share_works = 1;
                      } else {
                        this.articleEdit.share_works = 2;
                      }
                    }
                  }
                }

                this.shareWorksSelected = this.lstShareWorks.filter(x => x.value === this.articleEdit.share_works)[0];

                constants.isi.forEach(element => {
                  console.log(this.articleEdit.isi_scopus);

                  console.log(this.articleEdit.isi_scopus.includes(element));

                  if (this.articleEdit.isi_scopus.includes(element)) {
                    this.lstISI.push({ "name": element, "value": "checked" });
                  } else {
                    this.lstISI.push({ "name": element, value: "" });
                  }
                });

              });

            let lstUser: UserProfile[];
            lstUser = result;
            for (let user of lstUser) {
              let member = new Member();
              member.fullname = user.full_name;
              member.username = user.username;
              this.dataDump.push(member);
            }
            let info = this.userservice.GetByUserName(this.userservice.getuser().token, this.userservice.getuser().username).subscribe(
              result => {
                this.userInfo = result.response;
              });

            setTimeout(function () {
              console.log("Init xong");
              $('.bao-all-nhapten .head .ten + input, .bao-all-nhapten .head .input input').focus(function () {
                $(this).parents('.bao-all-nhapten').addClass('show');
              }).blur(function () {
                $(this).parents('.bao-all-nhapten').removeClass('show');

              });
            }, 300);
            this.isLoadingPage = true;
          });
      });
  }

  onSubmit() {

    if (this.cochairTemp.length > 0) {
      this.articleEdit.cochair = new Array<Cochair>();
      for (let mem of this.cochairTemp) {
        this.articleEdit.cochair.push(mem);
      }
    }

    let favorite = [];
    $.each($("input[name='isi_scopus']:checked"), function () {
      favorite.push($(this).val());
    });

    this.articleEdit.isi_scopus = favorite;

    var obj: { [k: string]: any } = {};

    let pub = "public";
    let pri = "private";


    if (this.shareWorksSelected.value === 1) {
      obj.public = true;
      obj.private = false;
    } else {
      obj.public = false;
      obj.private = true;
    }

    for (let role of this.userInfo.work_roles) {
      obj[role] = false;
    }

    this.articleEdit.article_kind = this.articleTypeSelected.value;

    this.articleEdit.roles = obj;
    this.articleEdit.type = 2;
    this.articleEdit.author = this.userInfo.username;
    this.articleEdit.statitics = { view_number: 0, update_number: 0 };

    this.cochairTemp = new Array<Cochair>();
    for (let mem of this.articleEdit.cochair) {
      this.cochairTemp.push(mem);
    }

    if (this.articleEdit.cochair.length === 0) {
      this.isCochair = true;
      this.cocharMess = "Hãy nhập tác giả chính";
      this.articleEdit.cochair = this.cochairTemp;
      return;
    }
    this.isCochair = false;

    for (let mem of this.articleEdit.members) {
      this.articleEdit.cochair.push(mem);
    }

    let cochar = this.articleEdit.cochair.filter(x => x.username === this.userservice.getuser().username)[0];

    if (cochar === undefined) {
      this.isCochair = true;
      this.cocharMess = "Hãy nhập người khởi tạo bài báo";
      this.articleEdit.cochair = this.cochairTemp;
      return;
    }
    this.isCochair = false;

    this.workService.UpdateArticle(this.userservice.getuser().token, this.shareWorksSelected.value === 1 ? 'public' : 'private', this.articleEdit._id, this.articleEdit).subscribe(
      result => {
        console.log(result);

        if (result.code === 0) {
          let idWork = result.response._id;
          this.router.navigate(['/chi-tiet-bai-bao', idWork]);

        } else {
          this.responseObj = result.response;
          this.articleEdit.cochair = this.cochairTemp;
        }
      });
  }

  saveChange(event) {
    var target = event.target || event.srcElement || event.currentTarget;
    this.cochairSuggest = new Array<Cochair>();
    if (event.keyCode == 13 || event.keyCode == undefined) {
      var alt = $(target).val()

      if (alt === "") return;

      this.cocharCurr = new Cochair();
      this.cocharCurr.fullname = alt;
      this.cocharCurr.type = 0;
      this.cocharCurr.point = 0;
      this.cocharCurr.id = this.idCocharMax;
      this.idCocharMax++;

      this.articleEdit.cochair.push(this.cocharCurr);
      this.articleEdit.cochairNonInSystem.push(this.cocharCurr);
      $(target).val("");
      $(target).focus();
      $("input[name=primary_author]").val("");
      this.articleEdit.number_author = this.articleEdit.cochair.length + this.articleEdit.members.length;
    } else {
      this.cochairSuggest = new Array<Cochair>();
      var alt = $(target).val().toLowerCase();
      if (alt === "") return;

      for (let co of this.dataDump) {
        if (co.fullname.toLowerCase().includes(alt)) {
          let cochair: Cochair = { username: co.username, fullname: co.fullname, email: co.email, point: co.point, type: 0, id: 0, gender:0, linkAvar: co.linkAvar };
          this.cochairSuggest.push(cochair);
        }
      }
    }
  }

  addCochair(co) {
    let cochar = this.articleEdit.cochair.filter(x => x.username === co.username && x.fullname === co.fullname)[0];
    let mem = this.articleEdit.members.filter(x => x.username === co.username && x.fullname === co.fullname)[0];

    if (cochar !== undefined || mem !== undefined) {
      this.isCochair = true;
      this.cocharMess = "Tác giả đã được chọn";
      return;
    }
    this.isCochair = false;

    this.cocharCurr = this.cochairSuggest.filter(x => x.username == co.username)[0];
    this.cocharCurr.point = 0;
    this.cocharCurr.type = 0;
    this.cocharCurr.id = this.idCocharMax;
    this.idCocharMax++;
    this.articleEdit.cochair.push(this.cocharCurr);
    $("input[name=primary_author]").val("");
    this.articleEdit.number_author = this.articleEdit.cochair.length + this.articleEdit.members.length;
  }

  removeCochair(ir) {
    this.articleEdit.cochairNonInSystem = this.articleEdit.cochairNonInSystem.filter(x => x.id !== ir.id);
    this.articleEdit.cochair = this.articleEdit.cochair.filter(x => x.id !== ir.id);
    this.articleEdit.number_author = this.articleEdit.cochair.length + this.articleEdit.members.length;

    this.cochairTemp = new Array<Cochair>();
    for (let mem of this.articleEdit.cochair) {
      this.cochairTemp.push(mem);
    }
  }

  iconAddViceAuthor() {
    var alt = $("input[name=vice_author]").val()

    if (alt === "") return;

    this.memberCurr = new Member();
    this.memberCurr.fullname = alt;
    this.memberCurr.type = 1;
    this.memberCurr.point = 0;

    this.articleEdit.members.push(this.memberCurr);
    this.articleEdit.memberNonInSystem.push(this.memberCurr);
    $("input[name=vice_author]").focus();
    $("input[name=vice_author]").val("");
    this.articleEdit.number_author = this.articleEdit.cochair.length + this.articleEdit.members.length;
  }

  iconAddPrimaryAuthor() {
    var alt = $("input[name=primary_author]").val()

    if (alt === "") return;

    this.cocharCurr = new Cochair();
    this.cocharCurr.fullname = alt;
    this.cocharCurr.type = 0;
    this.cocharCurr.point = 0;

    this.articleEdit.cochair.push(this.cocharCurr);
    this.articleEdit.cochairNonInSystem.push(this.cocharCurr);
    $("input[name=primary_author]").focus();
    $("input[name=primary_author]").val("");
    this.articleEdit.number_author = this.articleEdit.cochair.length + this.articleEdit.members.length;
  }

  saveChangeMem(event) {
    console.log(event.keyCode);
    this.memberSuggest = new Array<Member>();
    var target = event.target || event.srcElement || event.currentTarget;

    if (event.keyCode == 13 || event.keyCode == undefined) {
      var alt = $(target).val()

      if (alt === "") return;

      this.memberCurr = new Member();
      this.memberCurr.fullname = alt;
      this.memberCurr.type = 1;
      this.memberCurr.point = 0;
      this.memberCurr.id = this.idMemberMax;
      this.idMemberMax++;

      this.articleEdit.members.push(this.memberCurr);
      this.articleEdit.memberNonInSystem.push(this.memberCurr);
      $(target).val("");
      $(target).focus();
      $("input[name=vice_author]").val("");
      this.articleEdit.number_author = this.articleEdit.cochair.length + this.articleEdit.members.length;
    } else {
      this.memberSuggest = new Array<Member>();
      var alt = $(target).val().toLowerCase();
      if (alt === "") return;
      console.log(alt);

      for (let co of this.dataDump) {
        if (co.fullname.toLowerCase().includes(alt)) {
          co.type = 0;
          this.memberSuggest.push(co);
        }
      }
    }
  }

  addMember(co) {
    let cochar = this.articleEdit.cochair.filter(x => x.username === co.username && x.fullname === co.fullname)[0];
    let mem = this.articleEdit.members.filter(x => x.username === co.username && x.fullname === co.fullname)[0];

    if (cochar !== undefined || mem !== undefined) {
      this.isCochair = true;
      this.cocharMess = "Tác giả đã được chọn";
      return;
    }
    this.isCochair = false;

    this.memberCurr = this.memberSuggest.filter(x => x.username == co.username)[0];
    this.memberCurr.type = 1;
    this.memberCurr.id = this.idMemberMax;
    this.idMemberMax++;
    this.articleEdit.members.push(this.memberCurr);

    $("input[name=vice_author]").val("");
    this.articleEdit.number_author = this.articleEdit.cochair.length + this.articleEdit.members.length;
  }

  removeMem(ir) {
    console.log(ir);
    this.articleEdit.memberNonInSystem = this.articleEdit.memberNonInSystem.filter(x => x.id !== ir.id);
    this.articleEdit.members = this.articleEdit.members.filter(x => x.id !== ir.id);
    this.articleEdit.number_author = this.articleEdit.cochair.length + this.articleEdit.members.length;
  }

  changeArticleType() {
    let conceptName = $('select[name=article_type]').find(":selected").val();
    console.log(Number(conceptName.charAt(0)));
    console.log(this.articleTypeSelected);

    if (this.articleTypeSelected.value === 1) {
      $("div[name=article-point]").text("Impact Factor");
    } else {
      $("div[name=article-point]").text("Điểm");
    }
  }

  addKeyword() {

    console.log(this.keyword);


    if (this.keyword != "" && this.articleEdit.keyword.indexOf(this.keyword) < 0) {
      console.log("Vào");

      this.articleEdit.keyword.push(this.keyword);
      this.keyword = "";
    }

  }

}
