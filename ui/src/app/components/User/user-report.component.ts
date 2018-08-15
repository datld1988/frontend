import { UserService } from './../../services/user.service';
import { ReportUserInfo } from './../../model/reportuserinfo';
import { UserTokenInfo } from './../../model/usertokeninfo';
import { Component, OnInit, Input } from '@angular/core';
declare var $: any;
declare var moment: any;
@Component({
  selector: 'app-user-report',
  templateUrl: './user-report.component.html',
  styleUrls: ['./user-report.component.css']
})
export class UserReportComponent implements OnInit {
  @Input() fullname: string;
  @Input() username: string;
  @Input() officename: string;

  fromdate: string;
  todate: string;
  showreport:boolean;
  usertokeninfo: UserTokenInfo;
  userreport = new ReportUserInfo();
  constructor(private userservice: UserService, ) { }

  ngOnInit() {
    this.showreport=false;
    let today = new Date();
    let _todate = today.setDate(today.getDate());
    let _fromdate = today.setDate(today.getDate() - 30);
    this.todate = moment(_todate).format('MM/YYYY');
    this.fromdate = moment(_fromdate).format('MM/YYYY');

    this.usertokeninfo = this.userservice.getuser();
    this.getdata();
    setTimeout(function () {
      $('#fromdate').datepicker({
        //autoclose: true,
        minViewMode: 1,
        format: 'mm/yyyy'
      });
      $('#todate').datepicker({
        //autoclose: true,
        minViewMode: 1,
        format: 'mm/yyyy'
      });
    }, 300);


  }
  getdata() {
    //console.log(this.fromdate);
    this.showreport=false;
    let sub = this.userservice.GetReport(this.usertokeninfo.token, this.fromdate, this.todate).subscribe(
      result => {
        if(result.code==0)
        {
          this.showreport=true;
        }
        this.userreport = result.response;
      });
  }
  exportexcel() {
    $("#dataTables").table2excel({
      exclude: ".noExl",
      name: "userReport",
      filename: "userReport",
      fileext: ".xls",
      exclude_img: true,
      exclude_links: true,
      exclude_inputs: true
    });
  }
}
