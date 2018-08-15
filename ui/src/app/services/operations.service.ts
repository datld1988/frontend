import { Operation } from './../model/works';
import { FilesResponeData, OperationResponeData } from './../response/filesresponsedata';
import { Observable } from 'rxjs/Observable';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import * as constants from './constants';

@Injectable()
export class OperationsService {

    constructor(private http: Http) { }


    GetOperationById(token: string, id: string): Observable<OperationResponeData> {

        let url = `${constants.apiurl}activity/${id}?token=${token}`;
        console.log(url);

        return this.http.get(url).map((response: Response) => {

            let code = response.json() && response.json().code;
            let message = response.json() && response.json().traceMessage;


            if (code === 0) {
                let data = response.json() && response.json().response;
                let responseObject = response.json() && response.json().responseObject;

                return { response: data, message: message, code: code };
            } else {
                return { response: null, message: message, code: code };
            }
        });
    }

    EditOperation(token: string, idOperation: string, operation: Object): Observable<FilesResponeData> {

        let url = `${constants.apiurl}activity/update/${idOperation}?token=${token}`;
        console.log("Chinh sua:" + url);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        console.log(operation);


        return this.http.post(url, operation, options).map((response: Response) => {

            let code = response.json() && response.json().code;
            let message = response.json() && response.json().traceMessage;
            let responseObject = response.json() && response.json().responseObject;


            if (code === 0) {
                let data = response.json() && response.json().response;

                return { response: data, message: message, code: code };
            } else {
                return { response: responseObject, message: message, code: code };
            }
        });
    }

    DeleteOperation(token: string, idOperation: string, operation: Object): Observable<FilesResponeData> {

        let url = `${constants.apiurl}activity/delete/${idOperation}?token=${token}`;
        console.log("Chinh sua:" + url);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        console.log(operation);


        return this.http.post(url, operation, options).map((response: Response) => {

            let code = response.json() && response.json().code;
            let message = response.json() && response.json().traceMessage;
            let responseObject = response.json() && response.json().responseObject;


            if (code === 0) {
                let data = response.json() && response.json().response;

                return { response: data, message: message, code: code };
            } else {
                return { response: responseObject, message: message, code: code };
            }
        });
    }

    CreateOperation(token: string, idWork: string, operation: Object): Observable<FilesResponeData> {

        let url = `${constants.apiurl}activity/${idWork}?token=${token}`;
        console.log("Them moi:" + url);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        console.log(operation);


        return this.http.post(url, operation, options).map((response: Response) => {

            let code = response.json() && response.json().code;
            let message = response.json() && response.json().traceMessage;
            let responseObject = response.json() && response.json().responseObject;


            if (code === 0) {
                let data = response.json() && response.json().response;

                return { response: data, message: message, code: code };
            } else {
                return { response: responseObject, message: message, code: code };
            }
        });
    }
}