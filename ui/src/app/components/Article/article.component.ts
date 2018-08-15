import { FilesService } from './../../services/files.service';
import { UserProfile } from 'app/model/userinfo';
import { UserService } from './../../services/user.service';
import { UtilService } from './../../services/utils.service';
import { Router, ActivatedRoute } from '@angular/router';
import { WorksService } from './../../services/works.service';
import { Combobox } from './../../model/combobox';
import { Work, Member, Cochair } from './../../model/works';
import { Component, OnInit } from '@angular/core';
import * as constants from './../../services/constants';

declare var $: any;
declare var Pikaday: any;
declare var moment: any;
declare var datepicker: any;
declare var bootbox: any;
declare var buttons: any;

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {

  articleRegister = new Work();

  responseObj = new Work();

  primary_author: string;
  vice_author: string;
  summary: string;
  keyword: string;

  dataDump = new Array<Member>();
  cochairSuggest = new Array<Cochair>();
  memberSuggest = new Array<Member>();

  cocharCurr = new Cochair();
  memberCurr = new Member();

  lstArticleType: any;
  articleTypeSelected: Combobox;

  lstShareWorks: any;
  shareWorksSelected: Combobox;

  userInfo: UserProfile;

  isCochair: boolean = false;
  cocharMess: string;
  cochairTemp = new Array<Cochair>();

  idCocharMax: number = 0;
  idMemberMax: number = 0;

  username: string;
  token: string;

  constructor(private workService: WorksService,
    private router: Router,
    private utilservice: UtilService,
    private userservice: UserService,
    private route: ActivatedRoute,
    private fileService: FilesService) { }

  ngAfterViewInit() {
    $(window).bind('beforeunload', function () {
      return 'Bạn có muốn chắc chắn không tiếp tục?';
    });
  }

  ngOnInit() {

    this.lstArticleType = constants.article_type;
    this.articleTypeSelected = this.lstArticleType[0];

    this.lstShareWorks = constants.share_works;

    this.shareWorksSelected = this.lstShareWorks[0]

    this.articleRegister.keyword = [];

    this.articleRegister.name = '';
    this.articleRegister.summary = '';
    this.articleRegister.issn = '';
    this.articleRegister.magazine_name = '';
    this.articleRegister.number = null;
    this.articleRegister.chapter = null;
    this.articleRegister.page = null;
    this.articleRegister.publish_date = null;
    this.articleRegister.impact_factor = null;
    this.articleRegister.isi_scopus = [];
    this.articleRegister.doi = '';
    this.articleRegister.keyword = [];
    this.articleRegister.url = '';

    let userTokenInfo = this.userservice.getuser();
    this.token = userTokenInfo.token;
    this.username = userTokenInfo.username;

    let users = this.userservice.GetUserNameByType(this.token, 1).subscribe(
      result => {
        let lstUser: UserProfile[];
        lstUser = result;
        for (let user of lstUser) {
          let member = new Member();
          member.fullname = user.full_name;
          member.username = user.username;
          member.linkAvar = this.fileService.GetAvatar(user.username, 'small');
          this.dataDump.push(member);
        }

        let info = this.userservice.GetByUserName(this.token, this.username).subscribe(
          result => {
            this.userInfo = result.response;
          });

        setTimeout(function () {
          $('.bao-all-nhapten .head .ten + input, .bao-all-nhapten .head .input input').focus(function () {
            $(this).parents('.bao-all-nhapten').addClass('show');
          }).blur(function () {
            $(this).parents('.bao-all-nhapten').removeClass('show');

          });
        }, 300);
      });
  }

  onSubmit() {
    if (this.cochairTemp.length > 0) {
      this.articleRegister.cochair = new Array<Cochair>();
      for (let mem of this.cochairTemp) {
        this.articleRegister.cochair.push(mem);
      }
    }

    let favorite = [];
    $.each($("input[name='isi_scopus']:checked"), function () {
      favorite.push($(this).val());
    });

    this.articleRegister.isi_scopus = favorite;

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


    this.articleRegister.article_kind = this.articleTypeSelected.value;

    this.articleRegister.roles = obj;
    this.articleRegister.type = 2;
    this.articleRegister.author = this.userInfo.username;
    this.articleRegister.statitics = { view_number: 0, update_number: 0 };
    this.cochairTemp = new Array<Cochair>();
    for (let mem of this.articleRegister.cochair) {
      this.cochairTemp.push(mem);
    }


    if (this.articleRegister.cochair.length === 0) {
      this.isCochair = true;
      this.cocharMess = "Hãy nhập tác giả chính";
      this.articleRegister.cochair = this.cochairTemp;
      return;
    }
    this.isCochair = false;

    for (let mem of this.articleRegister.members) {
      this.articleRegister.cochair.push(mem);
    }

    let cochar = this.articleRegister.cochair.filter(x => x.username === this.userservice.getuser().username)[0];

    if (cochar === undefined) {
      this.isCochair = true;
      this.cocharMess = "Hãy nhập người khởi tạo bài báo";
      this.articleRegister.cochair = this.cochairTemp;
      return;
    }
    this.isCochair = false;



    this.workService.CreateArticle(this.userservice.getuser().token, this.shareWorksSelected.value === 1 ? 'public' : 'private', this.articleRegister).subscribe(
      result => {
        console.log(result);

        if (result.code === 0) {
          let idWork = result.response._id;
          bootbox.alert("Khởi tạo thông tin bài báo thành công. Vui lòng hoàn thiện & gửi yêu cầu duyệt đề tài");
          this.router.navigate(['/chi-tiet-bai-bao', idWork]);
        } else {
          this.responseObj = result.response;
          console.log(this.responseObj);

          this.articleRegister.cochair = this.cochairTemp;
        }
      });
  }

  iconAddPrimaryAuthor() {
    var alt = $("input[name=primary_author]").val()

    if (alt === "") return;

    this.cocharCurr = new Cochair();
    this.cocharCurr.fullname = alt;
    this.cocharCurr.type = 0;
    this.cocharCurr.point = 0;

    this.articleRegister.cochair.push(this.cocharCurr);
    this.articleRegister.cochairNonInSystem.push(this.cocharCurr);
    $("input[name=primary_author]").focus();
    $("input[name=primary_author]").val("");
    this.articleRegister.number_author = this.articleRegister.cochair.length + this.articleRegister.members.length;
  }

  saveCochairEvent(event) {
    console.log("BLUR");

    var target = event.target || event.srcElement || event.currentTarget;
    var alt = $(target).val()

    if (alt === "") return;

    this.cocharCurr = new Cochair();
    this.cocharCurr.fullname = alt;
    this.cocharCurr.type = 0;
    this.cocharCurr.point = 0;
    this.cocharCurr.id = this.idCocharMax;
    this.idCocharMax++;

    this.articleRegister.cochair.push(this.cocharCurr);
    this.articleRegister.cochairNonInSystem.push(this.cocharCurr);
    $(target).val("");
    $(target).focus();
    $("input[name=primary_author]").val("");
    this.articleRegister.number_author = this.articleRegister.cochair.length + this.articleRegister.members.length;
    console.log(this.articleRegister.cochair);

  }

  saveChange(event) {
    var target = event.target || event.srcElement || event.currentTarget;
    this.cochairSuggest = new Array<Cochair>();
    if (event.keyCode == 13 || event.keyCode == undefined) {
      this.saveCochairEvent(event);
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
    console.log("ADDD");

    let cochar = this.articleRegister.cochair.filter(x => x.username === co.username && x.fullname === co.fullname)[0];
    let mem = this.articleRegister.members.filter(x => x.username === co.username && x.fullname === co.fullname)[0];

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
    this.articleRegister.cochair.push(this.cocharCurr);
    $("input[name=primary_author]").val("");
    this.articleRegister.number_author = this.articleRegister.cochair.length + this.articleRegister.members.length;

  }

  removeCochair(ir) {
    this.articleRegister.cochairNonInSystem = this.articleRegister.cochairNonInSystem.filter(x => x.id !== ir.id);
    this.articleRegister.cochair = this.articleRegister.cochair.filter(x => x.id !== ir.id);
    this.articleRegister.number_author = this.articleRegister.cochair.length + this.articleRegister.members.length;

    this.cochairTemp = new Array<Cochair>();
    for (let mem of this.articleRegister.cochair) {
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

    this.articleRegister.members.push(this.memberCurr);
    this.articleRegister.memberNonInSystem.push(this.memberCurr);
    $("input[name=vice_author]").focus();
    $("input[name=vice_author]").val("");
    this.articleRegister.number_author = this.articleRegister.cochair.length + this.articleRegister.members.length;
  }

  saveMemEvent(event) {
    var target = event.target || event.srcElement || event.currentTarget;
    var alt = $(target).val()

    if (alt === "") return;

    this.memberCurr = new Member();
    this.memberCurr.fullname = alt;
    this.memberCurr.type = 1;
    this.memberCurr.point = 0;
    this.memberCurr.id = this.idMemberMax;
    this.idMemberMax++;

    this.articleRegister.members.push(this.memberCurr);
    this.articleRegister.memberNonInSystem.push(this.memberCurr);
    $(target).val("");
    $(target).focus();
    $("input[name=vice_author]").val("");
    this.articleRegister.number_author = this.articleRegister.cochair.length + this.articleRegister.members.length;
  }

  saveChangeMem(event) {
    this.memberSuggest = new Array<Member>();
    var target = event.target || event.srcElement || event.currentTarget;

    if (event.keyCode == 13 || event.keyCode == undefined) {
      this.saveMemEvent(event);
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

  addMember(co) {
    let cochar = this.articleRegister.cochair.filter(x => x.username === co.username && x.fullname === co.fullname)[0];
    let mem = this.articleRegister.members.filter(x => x.username === co.username && x.fullname === co.fullname)[0];

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
    this.articleRegister.members.push(this.memberCurr);

    $("input[name=vice_author]").val("");
    this.articleRegister.number_author = this.articleRegister.cochair.length + this.articleRegister.members.length;
  }

  removeMem(ir) {
    this.articleRegister.memberNonInSystem = this.articleRegister.memberNonInSystem.filter(x => x.id !== ir.id);
    this.articleRegister.members = this.articleRegister.members.filter(x => x.id !== ir.id);
    this.articleRegister.number_author = this.articleRegister.cochair.length + this.articleRegister.members.length;
  }

  addKeyword() {

    let dup = this.articleRegister.keyword.filter(x => x === this.keyword);
    $('input[name=keyword]').focus();

    if (dup.length > 0) {
      bootbox.alert("Từ khóa đã tồn tại. Nhập từ khác");
      return
    }


    if (this.keyword != "" && this.articleRegister.keyword.indexOf(this.keyword) < 0) {

      this.articleRegister.keyword.push(this.keyword);
      this.keyword = "";
    }

  }

}
