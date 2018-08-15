import { WapUserInfo } from './../../model/wapuserinfo';
import { OfficeInfo } from './../../model/officeinfo';
import { Combobox } from 'app/model/combobox';
import { UserProfile } from 'app/model/userinfo';
import { WorksService } from './../../services/works.service';
import { UtilService } from './../../services/utils.service';
import { UserService } from './../../services/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import * as constants from './../../services/constants';

declare var $: any;
declare var bootbox: any;

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  isDisableTab: boolean;
  isLoadingPage: boolean;
  userprofile = new UserProfile();
  public wapUserInfo = new WapUserInfo();
  username: string;
  token: string;
  //profile: string;

  lstGroup: OfficeInfo[];
  groupSelected = new OfficeInfo();

  lstDepartment = new Array<OfficeInfo>();
  departmentSelected = new OfficeInfo();

  lstacademic_rank = new Array<Combobox>();
  academic_rankSelected = new Combobox();
  lstdegree = new Array<Combobox>();
  degreeSelected = new Combobox();

  lstresearch_area = new Array<Combobox>();
  research_areaSelected = new Combobox();

  research_topic: any;

  outSys: boolean;

  constructor(private utilservice: UtilService,
    private route: ActivatedRoute,
    private userservice: UserService,
    private router: Router,
    private workService: WorksService) { }

  ngOnInit() {
    this.isLoadingPage = false;

    this.wapUserInfo.lstacademic_rank = constants.academic_rankList;
    this.wapUserInfo.isloadpage = false;
    this.wapUserInfo.academic_rankSelected = this.wapUserInfo.lstacademic_rank[0];


    this.wapUserInfo.userprofile = new UserProfile();
    this.wapUserInfo.lstacademic_rank = constants.academic_rankList
    this.wapUserInfo.lstdegree = constants.degreeList;
    this.wapUserInfo.lstresearch_area = constants.research_areaList;

    this.route.params.subscribe((params) => {
      this.username = params['username'];
      this.token = this.userservice.getuser().token;
      let sub = this.userservice.GetByUserName(this.token, this.username).subscribe(
        result => {

          if (result.code !== 0) {
            sub.unsubscribe();
            this.router.navigate(['/error', result.message]);
            return;
          }

          this.userprofile = result.response;
          console.log(this.userprofile);

          this.wapUserInfo.username = this.username;
          this.wapUserInfo.userprofile = this.userprofile;

          this.wapUserInfo.academic_rankSelected = this.wapUserInfo.lstacademic_rank.filter(x => x.value == this.wapUserInfo.userprofile.academic_rank)[0];
          this.wapUserInfo.degreeSelected = this.wapUserInfo.lstdegree.filter(x => x.value == this.wapUserInfo.userprofile.degree)[0];
          this.wapUserInfo.research_areaSelected = this.wapUserInfo.lstresearch_area.filter(x => x.value == this.wapUserInfo.userprofile.research_area)[0];
          this.isDisableTab = this.utilservice.CheckRoleDisplay(this.username, this.userprofile.username);



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

            }
          );
          // this.profile = this.username + '&profile';
          // console.log(this.profile);

          this.isLoadingPage = true;
        });
    });
  }

  changeGroup() {
    let valueChange = $('#createWork').val();

    if (valueChange == 1) {
      this.router.navigate(['/dang-ky-de-tai']);
    } else if (valueChange == 2) {
      this.router.navigate(['/dang-ky-bai-bao']);
    }
  }

  alertFunction(menu) {


    switch (menu) {
      case 1:
        this.router.navigate(['/profile', this.username, 'profile'])
        break;

      case 2:
        this.router.navigate(['/profile', this.username, 'dsdetai'])
        break;
      case 3:
        if (this.wapUserInfo.userprofile.isActived) {
          bootbox.alert("Tính năng này chưa được hỗ trợ");
        } else {
          bootbox.alert("Tài khoản của bạn không nằm trong hệ thống");
        }
        break;
      case 4:
        if (this.wapUserInfo.userprofile.isActived) {
          bootbox.alert("Tính năng này chưa được hỗ trợ");
        } else {
          bootbox.alert("Tài khoản của bạn không nằm trong hệ thống");
        }
        break;
      case 5:
        if (this.wapUserInfo.userprofile.isActived) {
          bootbox.alert("Tính năng này chưa được hỗ trợ");
        } else {
          bootbox.alert("Tài khoản của bạn không nằm trong hệ thống");
        }
        break;
      case 6:
        if (this.wapUserInfo.userprofile.isActived) {
          this.router.navigate(['/profile', this.username, 'report'])
        } else {
          bootbox.alert("Tài khoản của bạn không nằm trong hệ thống");
        }
        break;
    }
  }
}
