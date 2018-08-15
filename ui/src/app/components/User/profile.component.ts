import { FilesService } from './../../services/files.service';
import { Response } from '@angular/http';
import { WorksService } from './../../services/works.service';
import { Work } from './../../model/works';
import { Combobox } from 'app/model/combobox';
import { WapUserInfo } from './../../model/wapuserinfo';
import { UtilService } from './../../services/utils.service';
import { OfficeInfo } from './../../model/officeinfo';
import { UserInfo, UserProfile } from './../../model/userinfo';
import { UserService } from './../../services/user.service';
import { UserTokenInfo } from './../../model/usertokeninfo';
import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import * as constants from './../../services/constants';
import * as _ from "lodash";

declare var $: any;
declare var Pikaday: any;
declare var moment: any;
declare var bootbox: any;

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  isDisableTab: boolean;

  public wapUserInfo = new WapUserInfo();

  usertokeninfo: UserTokenInfo;
  userprofile = new UserProfile();
  username: string;

  lstGroup: OfficeInfo[];
  groupSelected = new OfficeInfo();
  lstDepartment = new Array<OfficeInfo>();
  departmentSelected = new OfficeInfo();
  research_areaSelected: any;
  lstacademic_rank: any;
  academic_rankSelected: any;
  lstdegree: any;
  degreeSelected: any;
  lstresearch_area: any;



  isloadpage: boolean;
  research_topic: any;

  lstWorks = new Array<Work>();
  lstArticle = new Array<Work>();
  lstAll = new Array<Work>();

  totalWork: number;
  totalArticle: number;
  limitWork: number;
  limitArticle: number;
  pageWork: number;
  pageArticle: number;
  pageAll: number;
  totalAll: number;
  limitAll: number;
  typeFilter: number;
  level: number;
  articleType: number;

  isAll: boolean;
  validAddWork: boolean;
  tabStr: string;

  status: number;
  works_status: number;
  token: string;


  constructor(
    private utilservice: UtilService,
    private route: ActivatedRoute,
    private userservice: UserService,
    private router: Router,
    private workService: WorksService,
    private filesService: FilesService) { }

  ngOnInit() {
    let usertokeninfo = this.userservice.getuser();
    this.username = usertokeninfo.username;
    this.token = usertokeninfo.token;
    this.limitWork = constants.LIMIT_PAGE;
    this.limitArticle = constants.LIMIT_PAGE;
    this.limitAll = constants.LIMIT_PAGE;
    this.wapUserInfo.lstacademic_rank = constants.academic_rankList;
    this.wapUserInfo.isloadpage = false;
    this.wapUserInfo.academic_rankSelected = this.wapUserInfo.lstacademic_rank[0];


    this.wapUserInfo.userprofile = new UserProfile();
    this.wapUserInfo.lstacademic_rank = constants.academic_rankList
    this.wapUserInfo.lstdegree = constants.degreeList;
    this.wapUserInfo.lstresearch_area = constants.research_areaList;



    this.wapUserInfo.usertokeninfo = this.userservice.getuser();
    this.route.params.subscribe((params) => {

      this.wapUserInfo.username = params['username'];

      let tab = params['tab'];

      if (tab === undefined) {
        this.tabStr = 'home';
      } else {
        this.tabStr = params['tab'];
      }

      let sub = this.userservice.GetByUserName(this.wapUserInfo.usertokeninfo.token, this.wapUserInfo.username).subscribe(
        result => {

          //console.log(result);


          if (result.code == 0) {
            this.wapUserInfo.userprofile = result.response;
            // user ngoài nganh
            if (this.wapUserInfo.userprofile.work_roles == undefined) {
              sub.unsubscribe();
              this.router.navigate(['/']);
            }
            this.wapUserInfo.academic_rankSelected = this.wapUserInfo.lstacademic_rank.filter(x => x.value == this.wapUserInfo.userprofile.academic_rank)[0];
            this.wapUserInfo.degreeSelected = this.wapUserInfo.lstdegree.filter(x => x.value == this.wapUserInfo.userprofile.degree)[0];
            this.wapUserInfo.research_areaSelected = this.wapUserInfo.lstresearch_area.filter(x => x.value == this.wapUserInfo.userprofile.research_area)[0];
            this.utilservice.GetList().subscribe(
              result => {
                this.wapUserInfo.lstGroup = result;
                this.wapUserInfo.groupSelected = this.wapUserInfo.lstGroup.filter(x => x.code == this.wapUserInfo.userprofile.work_roles[0])[0];

              }
            );
            this.wapUserInfo.research_topic = this.wapUserInfo.userprofile.research_topic;
            this.wapUserInfo.scientific_association = this.wapUserInfo.userprofile.scientific_association;
            this.utilservice.GetParent().subscribe(result => {

              this.wapUserInfo.groupSelected = result;
            });

            this.utilservice.GetListChild(this.wapUserInfo.userprofile.work_roles[0]).subscribe(
              result => {
                this.wapUserInfo.lstDepartment = result;
                this.wapUserInfo.departmentSelected = this.wapUserInfo.lstDepartment.filter(x => x.code == this.wapUserInfo.userprofile.work_roles[1])[0];
                console.log(this.wapUserInfo.departmentSelected);

              }
            );
            this.isDisableTab = this.utilservice.CheckRoleDisplay(this.username, this.wapUserInfo.userprofile.username);
            // GET Đề tài
            this.getWorks(0);
            //get bài báo   
            this.getArticle(0);

            //get alll
            this.typeFilter = 0;
            this.getAll(0);

            $(document).ready(() => {
              setTimeout(function () {
                $('#birthday').datepicker({
                  format: 'dd/mm/yyyy',
                  endDate: '31/12/1999'
                });
              }, 300);
            });
            this.wapUserInfo.isloadpage = true;
          }
          else {
            sub.unsubscribe();
            this.router.navigate(['/']);
          }

          for (let te of this.wapUserInfo.userprofile.teaching_experience) {

            if (te.address.length > 20) {
              let b = te.address.substring(0, 19);
              te.address = b + '...';

            }

          }

          for (let te of this.wapUserInfo.userprofile.research_experience) {
            if (te.address.length > 20) {
              let a = te.address.substring(0, 19);
              te.address = a + '...';

            }
          }

          for (let te of this.wapUserInfo.userprofile.commendation_experience) {
            if (te.content.length > 20) {
              let c = te.content.substring(0, 19);
              te.content = c + '...';
            }
          }
        });
    });

  }

  fillterWork(level) {
    this.level = level;
    this.typeFilter = 1;
    this.getAll(0);

  }

  fillterArticle(articleType) {
    this.articleType = articleType;
    this.typeFilter = 2;
    this.getAll(0);

  }

  fillterWorkStatus(status, w_s) {
    this.status = status;
    this.works_status = w_s;
    this.typeFilter = 3;
    this.getAll(0);
  }

  fillterArticleStatus(status, w_s) {
    this.status = status;
    this.works_status = w_s;
    this.typeFilter = 4;
    this.getAll(0);
  }


  getAll(offset: number) {
    this.pageAll = (offset / this.limitAll) + 1;

    switch (this.typeFilter) {
      //lấy tất
      case 0:
        this.workService.GetAllWorkAndArticle(this.wapUserInfo.usertokeninfo.token, this.wapUserInfo.usertokeninfo.username, this.limitAll, this.pageAll).subscribe(
          result => {
            this.lstAll = result.response;
            this.lstAll.forEach(element => {
              this.compactSummary(element);
            });
            this.totalAll = result.total;
          });
        break;
      //lấy đề tài theo level
      case 1:
        this.workService.GetWorkByLevel(this.token, this.wapUserInfo.usertokeninfo.username, 1, this.level, this.limitAll, this.pageAll).subscribe(
          result => {
            this.lstAll = result.response;
            this.lstAll.forEach(element => {
              this.compactSummary(element);
            });
            this.totalAll = result.total;
          }
        );
        break;
      //lấy bài báo theo loại
      case 2:
        this.workService.GetArticleByType(this.token, this.wapUserInfo.usertokeninfo.username, this.articleType, this.limitAll, this.pageAll).subscribe(
          result => {
            this.lstAll = result.response;
            this.lstAll.forEach(element => {
              this.compactSummary(element);
            });
            this.totalAll = result.total;
          }
        );
        break;
      case 3:
        this.workService.GetWorkByWorkStatus(this.token, this.wapUserInfo.usertokeninfo.username, 1, this.limitAll, this.pageAll, this.status, this.works_status).subscribe(
          result => {
            this.lstAll = result.response;
            this.lstAll.forEach(element => {
              this.compactSummary(element);
            });
            this.totalAll = result.total;
          }
        );
        break;
      case 4:
        this.workService.GetWorkByWorkStatus(this.token, this.wapUserInfo.usertokeninfo.username, 2, this.limitAll, this.pageAll, this.status, this.works_status).subscribe(
          result => {
            this.lstAll = result.response;
            this.lstAll.forEach(element => {
              this.compactSummary(element);
            });
            this.totalAll = result.total;
          }
        );
        break;
    }
  }

  getArticle(offset: number) {
    this.pageArticle = (offset / this.limitArticle) + 1;
    this.workService.GetWorkByType(this.wapUserInfo.usertokeninfo.token, this.wapUserInfo.usertokeninfo.username, 2, this.limitArticle, this.pageArticle).subscribe(
      result => {
        this.lstArticle = result.response;
        this.lstArticle.forEach(element => {
          this.compactSummary(element);
        });
        this.totalArticle = result.total;

      });
  }
  getWorks(offset: number) {
    this.pageWork = (offset / this.limitWork) + 1;
    this.workService.GetWorkByType(this.wapUserInfo.usertokeninfo.token, this.wapUserInfo.usertokeninfo.username, 1, this.limitWork, this.pageWork).subscribe(
      result => {
        this.lstWorks = result.response;
        this.lstWorks.forEach(element => {
          this.compactSummary(element);
        });
        this.totalWork = result.total;

      });
  }


  addWork() {

    if(this.userprofile.username !== this.username) {
      bootbox.alert("Tài khoản đang không có trong hệ thống.")
      return;
    }

    let works = new Work();

    works.name = $("input[name=workName]").val();
    works.goal_completion = $("textarea[name=workTarget]").val();

    if (works.name === '' || works.goal_completion === '') {
      this.validAddWork = true;
      return;
    }
    this.validAddWork = false;
    var test = { name: $("input[name=workName]").val(), target: $("textarea[name=workTarget]").val(), step: 2 }​​​​​​​;

    localStorage.setItem("createWork_Name", $("input[name=workName]").val());
    localStorage.setItem("createWork_Target", $("textarea[name=workTarget]").val());
    localStorage.setItem("createWork_Step", "1");


    this.router.navigate(['/dang-ky-de-tai']);
  }

  compactSummary(work: Work) {
    work.cochair.forEach(element => {
      element.linkAvar = this.filesService.GetAvatar(element.username, "small");
    });
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
}