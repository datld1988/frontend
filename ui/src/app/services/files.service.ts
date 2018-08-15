import { ResponeData } from './../model/responedata';
import { FilesResponeData, FileResponeData } from './../response/filesresponsedata';
import { Observable } from 'rxjs/Observable';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import * as constants from './constants';
@Injectable()
export class FilesService {

    constructor(private http: Http) { }

    DownloadFileById(token: string, id: string, workId: string): string {

        let url = `${constants.apiurlfile}io/download/${workId}/${id}?token=${token}`;
        return url;
    }

    DownloadFileAdminById(token: string, id: string, workId: string): string {

        let url = `${constants.apiurlfile}io/decision/download/${workId}/${id}?token=${token}`;
        return url;
    }

    DeleteFileById(token: string, id: string, workId: string): Observable<ResponeData> {

        let url = `${constants.apiurl}file/delete/${workId}/${id}?token=${token}`;
        //console.log(url);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this.http.post(url, null, options).map((response: Response) => {

            let code = response.json() && response.json().code;
            let message = response.json() && response.json().traceMessage;


            if (code === 0) {
                //let data = response.json() && response.json().response;
                //let responseObject = response.json() && response.json().responseObject;

                return { message: "Success", code: code };
            } else {
                return { message: message, code: code };
            }
        });
    }

    GetFileById(token: string, id: string): Observable<FilesResponeData> {

        let url = `${constants.apiurl}file/all/${id}?token=${token}`;
        //console.log(url);

        return this.http.get(url).map((response: Response) => {

            let code = response.json() && response.json().code;
            let message = response.json() && response.json().traceMessage;


            if (code === 0) {
                let data = response.json() && response.json().response;
                //let responseObject = response.json() && response.json().responseObject;

                return { response: data, message: message, code: code };
            } else {
                return { message: message, code: code, response: [] };
            }
        });
    }

    GetFileByType(token: string, id: string, type: number): Observable<FilesResponeData> {

        let url = `${constants.apiurl}file/all/${id}?token=${token}&type=${type}`;
        //console.log(url);

        return this.http.get(url).map((response: Response) => {

            let code = response.json() && response.json().code;
            let message = response.json() && response.json().traceMessage;


            if (code === 0) {
                let data = response.json() && response.json().response;
                //let responseObject = response.json() && response.json().responseObject;

                return { response: data, message: message, code: code };
            } else {
                return { message: message, code: code, response: [] };
            }
        });
    }


    UploadFile(token: string, description: string, inputValue: any, id: string): Observable<FileResponeData> {

        let url = `${constants.apiurlfile}io/upload/${id}?description=${description}&token=${token}`;
        // console.log(token);
        // console.log(id);

        // console.log(url);
        let headers = new Headers();
        let options = new RequestOptions({ headers: headers });

        var formData = new FormData();
        formData.append("file", inputValue.files[0]);

        console.log(formData);


        return this.http.post(url, formData, options).map((response: Response) => {


            let code = response.json() && response.json().code;
            let message = response.json() && response.json().traceMessage;

            console.log(response.json());



            if (code === 0) {

                let data = response.json() && response.json().response;
                //let responseObject = response.json() && response.json().responseObject;

                return { message: "succes", code: code, response: data };
            } else {
                return { message: message, code: code, response: null };
            }
        });
    }
    UploadAvatar(token: string, username: string, inputValue: any): Observable<FileResponeData> {

        let url = `${constants.apiurlfile}io/upload_ava/${username}?token=${token}`;
        // console.log(token);
        // console.log(id);

        // console.log(url);
        let headers = new Headers();
        let options = new RequestOptions({ headers: headers });

        var formData = new FormData();
        formData.append("avatar", inputValue.files[0]);

        return this.http.post(url, formData, options).map((response: Response) => {


            let code = response.json() && response.json().code;
            let message = response.json() && response.json().traceMessage;


            if (code === 0) {

                let data = response.json() && response.json().response;
                //let responseObject = response.json() && response.json().responseObject;

                return { message: "succes", code: code, response: data };
            } else {
                return { message: message, code: code, response: null };
            }
        });
    }
    GetAvatar(username: string, size: string): string {

        return `${constants.apiurlfile}io/get_ava/${size}/${username}`;

    }
}