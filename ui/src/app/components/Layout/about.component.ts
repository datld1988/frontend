import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

declare var $: any;
declare var bootbox: any;

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  tabStr: string;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.tabStr = params['tab'];
      $(document).ready(() => {
        $('.main-toggle').mikenCollapse({
          child: ".item",
          head: ".head",
          content: ".content",
          activeClass: "active",
          speed: 250,
          multi: true
        });
      });
    });
  }

  sendFAQ() {
    bootbox.alert("Chức năng đang hoàn thiện.")
  }
}
