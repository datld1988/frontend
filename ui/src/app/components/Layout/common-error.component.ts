import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'common-error',
  templateUrl: './common-error.component.html',
  styleUrls: ['./common-error.component.css']
})
export class CommonErrorComponent implements OnInit {

  messageDetail: string;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.messageDetail = String(params['detail']);
    });
  }
}
