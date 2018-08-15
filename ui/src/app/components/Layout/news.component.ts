import { WorksService } from './../../services/works.service';
import { UserService } from './../../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UtilService } from './../../services/utils.service';
import { Work } from './../../model/works';
import { Component, OnInit } from '@angular/core';
import * as constants from './../../services/constants';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {

  isLoadingPage: boolean;

  lstAll: Work[];

  token: string;
  username: string;
  fullname: string;

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

    this.userservice.GetByUserName(this.token, this.username).subscribe(
      result => {
        this.typeFilter = 0;
        this.getAll(0);
        this.fullname = result.response.full_name;
        this.isLoadingPage = true;
      }
    );

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

  fillterWorkResearch(researchArea) {
    this.pageAll = (0 / this.limitAll) + 1;
    this.workService.GetWorkByReaearchNews(this.token, 1, researchArea, this.limitAll, this.pageAll).subscribe(
      result => {
        this.lstAll = result.response;
      }
    );
  }

  findFullNameAuthor(work: Work) {
    
    work.cochair.forEach(cochair => {
      if (cochair.username === work.author) work.author_fullname = cochair.fullname;
    });

    work.members.forEach(cochair => {
      if (cochair.username === work.author) work.author_fullname = cochair.fullname;
    });
  }
  getAll(offset: number) {
    this.pageAll = (offset / this.limitAll) + 1;

    switch (this.typeFilter) {
      //lấy tất
      case 0:
        this.workService.GetAllWorkAndArticleNews(this.token, this.limitAll, this.pageAll).subscribe(
          result => {
            this.lstAll = result.response;

            this.lstAll.forEach(element => {
              this.findFullNameAuthor(element);
            });

            this.totalAll = result.total;
          });
        break;
      //lấy đề tài theo level
      case 1:
        this.workService.GetWorkByLevelNews(this.token, 1, this.level, this.limitAll, this.pageAll).subscribe(
          result => {
            this.lstAll = result.response;
            this.lstAll.forEach(element => {
              this.findFullNameAuthor(element);
            });
            this.totalAll = result.total;
          }
        );
        break;
      //lấy bài báo theo loại
      case 2:
        this.workService.GetArticleByTypeNews(this.token, this.articleType, this.limitAll, this.pageAll).subscribe(
          result => {
            this.lstAll = result.response;
            this.lstAll.forEach(element => {
              this.findFullNameAuthor(element);
            });
            this.totalAll = result.total;

          }
        );
        break;
    }
  }

}
