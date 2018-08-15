import { UserService } from './../services/user.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
declare var $: any;
@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  constructor(private router: Router,
  private userservice: UserService) { }

  ngOnInit() {

    let userInfo = localStorage.getItem('currentUser');

    console.log(userInfo);
    

    if(userInfo !== null) {
      this.router.navigate(['/home-profile', this.userservice.getuser().username]);
      return;
    }

    $(document).ready(() => {

      $('body').addClass('bg-index');
    });
  }

}
