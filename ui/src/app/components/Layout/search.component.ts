import { Component, OnInit } from '@angular/core';
import * as constants from './../../services/constants';
import { UtilService } from "app/services/utils.service";
import { UserService } from "app/services/user.service";
import { ActivatedRoute, Router } from '@angular/router';
import { WorksService } from "app/services/works.service";
import { Work } from "app/model/works";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  isLoadingPage: boolean;
  limitAll: number;
  pageAll: number;
  token: string;
  username: string;
  fullname: string;
  lstAll: Work[];

  constructor(private utilservice: UtilService,
    private route: ActivatedRoute,
    private userservice: UserService,
    private router: Router,
    private workService: WorksService) { }

  ngOnInit() {
    this.isLoadingPage = false;
    this.limitAll = constants.LIMIT_PAGE;
    this.token = this.userservice.getuser().token;
    this.username = this.userservice.getuser().username;
    this.route.params.subscribe(params => {
      this.userservice.GetByUserName(this.token, this.username).subscribe(
        result => {
          this.pageAll = (0 / this.limitAll) + 1;
          this.workService.SearchingWork(this.token, this.limitAll, this.pageAll, String(params['condition'])).subscribe(
            result => {
              this.lstAll = result.response;
            });
          this.fullname = result.response.full_name;
          this.isLoadingPage = true;
        }
      );
    });
  }
}
