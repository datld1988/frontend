import { ReportUserResponeData } from './../model/reportuserinfo';
import { UserInfo, ChangePassword } from './../model/userinfo';
import { UserProfile } from 'app/model/userinfo';
import { Cochair } from './../model/works';
import { UserResponeData } from './../model/userresponedata';
import { ResponeData } from './../model/responedata';
import { UserTokenInfo } from './../model/usertokeninfo';
import { Injectable } from '@angular/core';
import * as constants from './constants';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'
@Injectable()
export class UserService {

  public token: string;
  public username: string;
  constructor(private http: Http) {
    // set token if saved in local storage
    var currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.token = currentUser && currentUser.token;
    this.username = currentUser && currentUser.username;
  }
  getuser(): UserTokenInfo {
    //var currentUser = JSON.parse(localStorage.getItem('currentUser'));
    var currentUser = JSON.parse(this.getStorage('currentUser'));
    this.token = currentUser && currentUser.token;
    this.username = currentUser && currentUser.username;
    return { username: this.username, token: this.token };
  }
  login(username: string, password: string): Observable<ResponeData> {

    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    console.log(`${constants.apiurl}guest/login`);
    
    return this.http.post(`${constants.apiurl}guest/login`, JSON.stringify({ username: username, password: password }), options)
      .map((response: Response) => {

        // login successful if there's a jwt token in the response
        let code = response.json() && response.json().code;
        let message = response.json() && response.json().traceMessage;

        if (code === 0) {
          // set token property
          let token = response.json() && response.json().response.token;
          this.token = token;

          // store username and jwt token in local storage to keep user logged in between page refreshes
          //localStorage.setItem();
          this.setStorage('currentUser', JSON.stringify({ username: username, token: token }), 30 * 24 * 60 * 60)
          // return true to indicate successful login
          return { code: code, message: "Đăng nhập thành công" };
        } else {

          // return false to indicate failed login
          return { code: code, message: message };
        }
      });
  }
  registerquick(username: string, password: string, full_name: string): Observable<ResponeData> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(`${constants.apiurl}guest/register/none_researcher`, JSON.stringify({ username: username, password: password, full_name: full_name }), options)
      .map((response: Response) => {
        // login successful if there's a jwt token in the response
        let code = response.json() && response.json().code;
        let message = response.json() && response.json().traceMessage;
        //let token = response.json() && response.json().response.token;

        if (code === 0) {

          return { code: code, message: "Đăng ký thành công" };
        } else {

          // return false to indicate failed login
          return { code: code, message: message };
        }
      });
  }

  rejoinSys(username: string, office: string, department: string): Observable<ResponeData> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    let work_roles_temp: string[];
    work_roles_temp = [];
    work_roles_temp.push(office);
    work_roles_temp.push(department);

    let w_t = {work_roles_temp: work_roles_temp}

    let url = `${constants.apiurl}guest/join/${username}`;

    console.log(url);
    
    console.log(work_roles_temp);
    
    return this.http.post(`${constants.apiurl}guest/join/${username}`, JSON.stringify(w_t), options)
      .map((response: Response) => {
        // login successful if there's a jwt token in the response
        let code = response.json() && response.json().code;
        let message = response.json() && response.json().traceMessage;
        //let token = response.json() && response.json().response.token;
        let token = response.json() && response.json().response.token;
        this.token = token;
        if (code === 0) {
          this.setStorage('currentUser', JSON.stringify({ username: username, token: token }), 30 * 24 * 60 * 60)
          return { code: code, message: "Vào hệ thống thành công" };
        } else {

          // return false to indicate failed login
          return { code: code, message: message };
        }
      });
  }

  updateUserNonProfile(fullName: string, token: string): Observable<ResponeData> {

    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.post(`${constants.apiurl}user/none_researcher?token=${token}`, JSON.stringify({full_name: fullName}), options)
      .map((response: Response) => {
        console.log(response.json());
        
        // login successful if there's a jwt token in the response
        let code = response.json() && response.json().code;
        let message = response.json() && response.json().traceMessage;
        //let token = response.json() && response.json().response.token;

        console.log(response.json());


        if (code === 0) {

          return { code: code, message: "Cập nhật thành công" };
        } else {

          // return false to indicate failed login
          return { code: code, message: message };
        }
      });
  }

  updateUserProfile(userinfo: UserProfile, token: string): Observable<ResponeData> {
    console.log(userinfo);
    console.log(token);

    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.post(`${constants.apiurl}user/researcher?token=${token}`, JSON.stringify(userinfo), options)
      .map((response: Response) => {
        console.log(response.json());
        
        // login successful if there's a jwt token in the response
        let code = response.json() && response.json().code;
        let message = response.json() && response.json().traceMessage;
        //let token = response.json() && response.json().response.token;

        console.log(response.json());


        if (code === 0) {

          return { code: code, message: "Cập nhật thành công" };
        } else {

          // return false to indicate failed login
          return { code: code, message: message };
        }
      });
  }

  changePassword(token: string, pass: ChangePassword): Observable<ResponeData> {

    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(`${constants.apiurl}user/change_pass?token=${token}`, JSON.stringify(pass), options)
      .map((response: Response) => {
        // login successful if there's a jwt token in the response
        let code = response.json() && response.json().code;
        let message = response.json() && response.json().traceMessage;
        let errObj = response.json() && response.json().responseObject;
        //let token = response.json() && response.json().response.token;

        if (code === 0) {

          return { code: code, message: "Đổi mật khẩu thành công" };
        } else {

          // return false to indicate failed login
          return { code: code, message: message, errObj: errObj };
        }
      });
  }

  register(userinfo: UserInfo): Observable<ResponeData> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(`${constants.apiurl}guest/register/researcher`, JSON.stringify(userinfo), options)
      .map((response: Response) => {
        // login successful if there's a jwt token in the response
        let code = response.json() && response.json().code;
        let message = response.json() && response.json().traceMessage;
        //let token = response.json() && response.json().response.token;

        if (code === 0) {

          return { code: code, message: "Đăng ký thành công" };
        } else {

          // return false to indicate failed login
          return { code: code, message: message };
        }
      });
  }
  GetByToken(token: string): Observable<UserResponeData> {

    let url = `${constants.apiurl}user/one?token=${token}`;
    //console.log(url);
    return this.http.get(url).map((response: Response) => {


      let code = response.json() && response.json().code;
      let message = response.json() && response.json().traceMessage;


      if (code === 0) {
        let data = response.json() && response.json().response;
        return { code: code, message: "Thành công", response: data };
      } else {

        // return false to indicate failed login
        return { code: code, message: message, response: null };
      }

    });

  }

  GetByUserId(token: string, userid: string): Observable<UserResponeData> {

    let url = `${constants.apiurl}user/one?token=${token}&_id=${userid}`;
    //console.log(url);
    return this.http.get(url).map((response: Response) => {


      let code = response.json() && response.json().code;
      let message = response.json() && response.json().traceMessage;

      if (code === 0) {
        let data = response.json() && response.json().response;

        return { code: code, message: "Thành công", response: data };
      } else {

        // return false to indicate failed login
        return { code: code, message: message, response: null };
      }

    });

  }
  GetByUserName(token: string, username: string): Observable<UserResponeData> {

    let url = `${constants.apiurl}user/one?token=${token}&username=${username}`;
    return this.http.get(url).map((response: Response) => {
      let code = response.json() && response.json().code;
      let message = response.json() && response.json().traceMessage;


      if (code === 0) {
        let data = response.json() && response.json().response;
        return { code: code, message: "Thành công", response: data };
      } else {

        // return false to indicate failed login
        return { code: code, message: message, response: null };
      }

    });

  }

  GetAllUserName(token: string): Observable<UserProfile[]> {

    let url = `${constants.apiurl}user/all?token=${token}`;

    return this.http.get(url).map((response: Response) => {
      let code = response.json() && response.json().code;
      let message = response.json() && response.json().traceMessage;
      if (code === 0) {
        return response.json() && response.json().response;
      } else {
        return [];
      }
    });
  }

  GetUserNameByType(token: string, type: number): Observable<UserProfile[]> {
    
        let url = `${constants.apiurl}user/all?token=${token}&user_type=${type}`;
    
        return this.http.get(url).map((response: Response) => {
          let code = response.json() && response.json().code;
          let message = response.json() && response.json().traceMessage;
          if (code === 0) {
            return response.json() && response.json().response;
          } else {
            return [];
          }
        });
      }

  logout(): void {
    // clear token remove user from local storage to log user out
    this.token = null;
    localStorage.removeItem('currentUser');
  }

  removeStorage(name: string): boolean {
    try {
      localStorage.removeItem(name);
      localStorage.removeItem(name + '_expiresIn');
    } catch (e) {
      console.log('removeStorage: Error removing key [' + name + '] from localStorage: ' + JSON.stringify(e));
      return false;
    }
    return true;
  }
  getStorage(key: string): any {

    let now = Date.now();  //epoch time, lets deal only with integer
    // set expiration for storage
    let expiresIn: number;
    expiresIn = Number(localStorage.getItem(key + '_expiresIn'));
    if (expiresIn === undefined || expiresIn === null) { expiresIn = 0; }

    if (expiresIn < now) {// Expired
      this.removeStorage(key);
      return null;
    } else {
      try {
        var value = localStorage.getItem(key);
        return value;
      } catch (e) {
        console.log('getStorage: Error reading key [' + key + '] from localStorage: ' + JSON.stringify(e));
        return null;
      }
    }
  }

  setStorage(key: string, value: any, expires: number): boolean {

    if (expires === undefined || expires === null) {
      expires = (24 * 60 * 60);  // default: seconds for 1 day
    } else {
      expires = Math.abs(expires); //make sure it's positive
    }

    let now = Date.now();  //millisecs since epoch time, lets deal only with integer
    let schedule = now + expires * 1000;
    try {
      localStorage.setItem(key, value);
      localStorage.setItem(key + '_expiresIn', schedule.toString());
    } catch (e) {
      console.log('setStorage: Error setting key [' + key + '] in localStorage: ' + JSON.stringify(e));
      return false;
    }
    return true;
  }
  GetReport(token: string, from: string, to: string): Observable<ReportUserResponeData> {

    let url = `${constants.apiurl}work/statistic?token=${token}&from_date=${from}&to_date=${to}`;
    //console.log(url);
    return this.http.get(url).map((response: Response) => {


      let code = response.json() && response.json().code;
      let message = response.json() && response.json().traceMessage;

      if (code === 0) {
        let data = response.json() && response.json().response;

        return { code: code, message: "Thành công", response: data };
      } else {

        // return false to indicate failed login
        return { code: code, message: message, response: null };
      }

    });

  }
  forgotpassword(username: string): Observable<ResponeData> {

    //let url = `${constants.rooturl}reset-mat-khau/`;
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(`${constants.apiurl}guest/forgot/${username}`, { link: `${constants.rooturl}/reset-mat-khau` }, options)
      .map((response: Response) => {
        // login successful if there's a jwt token in the response
        let code = response.json() && response.json().code;
        let message = response.json() && response.json().traceMessage;
        //let token = response.json() && response.json().response.token;

        if (code === 0) {

          return { code: code, message: "Success" };
        } else {

          // return false to indicate failed login
          return { code: code, message: message };
        }
      });
  }
  resetpassword(username: string, code: string, newPass: string): Observable<ResponeData> {

    //let url = `${constants.rooturl}reset-mat-khau/`;
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(`${constants.apiurl}guest/changePass/${username}`, { code: code, newPass: newPass }, options)
      .map((response: Response) => {
        // login successful if there's a jwt token in the response
        let code = response.json() && response.json().code;
        let message = response.json() && response.json().traceMessage;
        //let token = response.json() && response.json().response.token;

        if (code === 0) {

          return { code: code, message: "Success" };
        } else {

          // return false to indicate failed login
          return { code: code, message: message };
        }
      });
  }

}
