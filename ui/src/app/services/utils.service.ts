import { OfficeInfo } from './../model/officeinfo';
import { UserInfo } from './../model/userinfo';
import { ResponeData } from './../model/responedata';
import { Injectable } from '@angular/core';
import * as constants from './constants';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'

@Injectable()
export class UtilService {


  constructor(private http: Http) {

  }

  CheckRoleDisplay(username: string, author: string): boolean {
    if (author === username) {
      return true;
    }
    return false;
  }

  GetList(): Observable<OfficeInfo[]> {

    let url = `${constants.apiurl}office`;
    //console.log(url);
    return this.http.get(url).map((response: Response) => {


      let code = response.json() && response.json().code;
      let message = response.json() && response.json().traceMessage;
      ;

      if (code === 0) {
        return response.json() && response.json().response.offices;

      } else {

        // return false to indicate failed login
        return [];
      }

    });

  }

  GetParent(): Observable<OfficeInfo> {
    let url = `${constants.apiurl}office`;

    return this.http.get(url).map((response: Response) => {


      let code = response.json() && response.json().code;
      let message = response.json() && response.json().traceMessage;


      if (code === 0) {
        return response.json() && response.json().response.offices[0];

      } else {

        // return false to indicate failed login
        return [];
      }

    });
  }

  GetListChild(code: string): Observable<OfficeInfo[]> {

    let url = `${constants.apiurl}office/${code}`;
    //console.log(url);
    return this.http.get(url).map((response: Response) => {


      let code = response.json() && response.json().code;
      let message = response.json() && response.json().traceMessage;


      if (code === 0) {
        return response.json() && response.json().response.offices;

      } else {

        // return false to indicate failed login
        return [];
      }

    });

  }
  replaceAll(str: string, find: string, replace: string): string {

    return str.replace(new RegExp(find, 'g'), replace);
  }
}