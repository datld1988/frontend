import { ResponeData } from './../model/responedata';
import { WorksResponeData, ListWorksResponeData } from './../response/worksresponse';
import { Work } from './../model/works';
import { Observable } from 'rxjs';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Injectable } from '@angular/core';
import * as constants from './constants';

@Injectable()
export class WorksService {

    headers = new Headers({ 'Content-Type': 'application/json' });
    options = new RequestOptions({ headers: this.headers });


    constructor(private http: Http) { }

    GetWorkByWorkStatus(token: string, username: string, type: number, limit: number, page: number, status: number, work_status: number): Observable<ListWorksResponeData> {


        let url: string;

        if (status === null) {
            url = `${constants.apiurl}work/one/${username}?token=${token}&limit=${limit}&page=${page}&type=${type}&work_status=${work_status}`;
        } else {
            url = `${constants.apiurl}work/one/${username}?token=${token}&limit=${limit}&page=${page}&type=${type}&status=${status}&work_status=${work_status}`;
        }

        console.log(url);


        return this.http.get(url).map((response: Response) => {
            let code = response.json() && response.json().code;
            let message = response.json() && response.json().traceMessage;
            if (code === 0) {
                let data = response.json() && response.json().response.works;
                let total = response.json() && response.json().response.total;


                return { response: data, total: total, code: code, message: "succes", };
            } else {

                // return false to indicate failed login
                return { response: null, total: 0, code: code, message: message, };
            }
        });
    }

    SearchingWorkByUsername(token: string, username: string, type: number, limit: number, page: number, condition: string): Observable<ListWorksResponeData> {
        //console.log(token);

        let url = `${constants.apiurl}work/one/${username}?token=${token}&limit=${limit}&page=${page}&type=${type}&search=${condition}`;
        console.log(url);

        return this.http.get(url).map((response: Response) => {
            let code = response.json() && response.json().code;
            let message = response.json() && response.json().traceMessage;
            if (code === 0) {
                let data = response.json() && response.json().response.works;
                let total = response.json() && response.json().response.total;


                return { response: data, total: total, code: code, message: "succes", };
            } else {

                // return false to indicate failed login
                return { response: null, total: 0, code: code, message: message, };
            }
        });
    }

    SearchingWork(token: string, limit: number, page: number, condition: string): Observable<ListWorksResponeData> {
        //console.log(token);

        let url = `${constants.apiurl}work/all?token=${token}&limit=${limit}&page=${page}&search=${condition}`;
        console.log(url);

        return this.http.get(url).map((response: Response) => {
            let code = response.json() && response.json().code;
            let message = response.json() && response.json().traceMessage;
            if (code === 0) {
                let data = response.json() && response.json().response.works;
                let total = response.json() && response.json().response.total;


                return { response: data, total: total, code: code, message: "succes", };
            } else {

                // return false to indicate failed login
                return { response: null, total: 0, code: code, message: message, };
            }
        });
    }

    GetArticleByTypeNews(token: string, type: number, limit: number, page: number): Observable<ListWorksResponeData> {

        let url = `${constants.apiurl}work/all?token=${token}&type=2&article_kind=${type}&limit=${limit}&page=${page}`;
        console.log(url);

        return this.http.get(url).map((response: Response) => {
            let code = response.json() && response.json().code;
            let message = response.json() && response.json().traceMessage;
            if (code === 0) {
                let data = response.json() && response.json().response.works;
                let total = response.json() && response.json().response.total;


                return { response: data, total: total, code: code, message: "succes", };
            } else {

                // return false to indicate failed login
                return { response: null, total: 0, code: code, message: message, };
            }
        });
    }

    GetArticleByType(token: string, username: string, type: number, limit: number, page: number): Observable<ListWorksResponeData> {

        let url = `${constants.apiurl}work/one/${username}?token=${token}&type=2&article_kind=${type}&limit=${limit}&page=${page}`;
        console.log(url);

        return this.http.get(url).map((response: Response) => {
            let code = response.json() && response.json().code;
            let message = response.json() && response.json().traceMessage;
            if (code === 0) {
                let data = response.json() && response.json().response.works;
                let total = response.json() && response.json().response.total;


                return { response: data, total: total, code: code, message: "succes", };
            } else {

                // return false to indicate failed login
                return { response: null, total: 0, code: code, message: message, };
            }
        });

    }

    GetAllWorkByLevel(token: string, username: string, type: number, level: number, limit: number, page: number): Observable<ListWorksResponeData> {

        let url = `${constants.apiurl}work/all?token=${token}&type=${type}&level=${level}&limit=${limit}&page=${page}`;
        //console.log(url);

        return this.http.get(url).map((response: Response) => {
            let code = response.json() && response.json().code;
            let message = response.json() && response.json().traceMessage;
            if (code === 0) {
                let data = response.json() && response.json().response.works;
                let total = response.json() && response.json().response.total;


                return { response: data, total: total, code: code, message: "succes", };
            } else {

                // return false to indicate failed login
                return { response: [], total: 0, code: code, message: message, };
            }
        });
    }

    GetWorkByLevel(token: string, username: string, type: number, level: number, limit: number, page: number): Observable<ListWorksResponeData> {

        let url = `${constants.apiurl}work/one/${username}?token=${token}&type=${type}&level=${level}&limit=${limit}&page=${page}`;
        //console.log(url);

        return this.http.get(url).map((response: Response) => {
            let code = response.json() && response.json().code;
            let message = response.json() && response.json().traceMessage;
            if (code === 0) {
                let data = response.json() && response.json().response.works;
                let total = response.json() && response.json().response.total;


                return { response: data, total: total, code: code, message: "succes", };
            } else {

                // return false to indicate failed login
                return { response: [], total: 0, code: code, message: message, };
            }
        });
    }

    GetWorkByReaearchNews(token: string, type: number, researchArea: number, limit: number, page: number): Observable<ListWorksResponeData> {

        let url = `${constants.apiurl}work/all?token=${token}&type=${type}&research_area=${researchArea}&limit=${limit}&page=${page}`;
        //console.log(url);

        return this.http.get(url).map((response: Response) => {
            let code = response.json() && response.json().code;
            let message = response.json() && response.json().traceMessage;
            if (code === 0) {
                let data = response.json() && response.json().response.works;
                let total = response.json() && response.json().response.total;


                return { response: data, total: total, code: code, message: "succes", };
            } else {

                // return false to indicate failed login
                return { response: [], total: 0, code: code, message: message, };
            }
        });
    }

    GetWorkByLevelNews(token: string, type: number, level: number, limit: number, page: number): Observable<ListWorksResponeData> {

        let url = `${constants.apiurl}work/all?token=${token}&type=${type}&level=${level}&limit=${limit}&page=${page}`;
        //console.log(url);

        return this.http.get(url).map((response: Response) => {
            let code = response.json() && response.json().code;
            let message = response.json() && response.json().traceMessage;
            if (code === 0) {
                let data = response.json() && response.json().response.works;
                let total = response.json() && response.json().response.total;


                return { response: data, total: total, code: code, message: "succes", };
            } else {

                // return false to indicate failed login
                return { response: [], total: 0, code: code, message: message, };
            }
        });
    }

    GetAllWorkAndArticle(token: string, username: string, limit: number, page: number): Observable<ListWorksResponeData> {
        //console.log(token);

        let url = `${constants.apiurl}work/one/${username}?token=${token}&limit=${limit}&page=${page}`;

        return this.http.get(url).map((response: Response) => {
            let code = response.json() && response.json().code;
            let message = response.json() && response.json().traceMessage;
            if (code === 0) {
                let data = response.json() && response.json().response.works;

                let total = response.json() && response.json().response.total;


                return { response: data, total: total, code: code, message: "succes", };
            } else {

                // return false to indicate failed login
                return { response: [], total: 0, code: code, message: message, };
            }
        });

    }

    GetAllArticle(token: string, username: string, limit: number, page: number): Observable<ListWorksResponeData> {

        let url = `${constants.apiurl}work/one/${username}?token=${token}&type=2&limit=${limit}&page=${page}`;
        console.log(token);
        console.log(url);


        return this.http.get(url).map((response: Response) => {
            let code = response.json() && response.json().code;
            let message = response.json() && response.json().traceMessage;
            if (code === 0) {
                let data = response.json() && response.json().response.works;

                let total = response.json() && response.json().response.total;


                return { response: data, total: total, code: code, message: "succes", };
            } else {

                // return false to indicate failed login
                return { response: [], total: 0, code: code, message: message, };
            }
        });

    }

    GetAllWorkAndArticleNews(token: string, limit: number, page: number): Observable<ListWorksResponeData> {
        //console.log(token);

        let url = `${constants.apiurl}work/all?token=${token}&limit=${limit}&page=${page}`;

        console.log(url);


        return this.http.get(url).map((response: Response) => {
            let code = response.json() && response.json().code;
            let message = response.json() && response.json().traceMessage;
            if (code === 0) {
                let data = response.json() && response.json().response.works;

                let total = response.json() && response.json().response.total;


                return { response: data, total: total, code: code, message: "succes", };
            } else {

                // return false to indicate failed login
                return { response: [], total: 0, code: code, message: message, };
            }
        });

    }


    GetWorkByType(token: string, username: string, type: number, limit: number, page: number): Observable<ListWorksResponeData> {
        //console.log(token);

        let url = `${constants.apiurl}work/one/${username}?token=${token}&type=${type}&limit=${limit}&page=${page}`;

        return this.http.get(url).map((response: Response) => {
            let code = response.json() && response.json().code;
            let message = response.json() && response.json().traceMessage;
            if (code === 0) {
                let data = response.json() && response.json().response.works;
                //let limit = response.json() && response.json().response.limit;
                //let offset = response.json() && response.json().response.offset;
                let total = response.json() && response.json().response.total;


                return { response: data, total: total, code: code, message: "succes", };
            } else {

                // return false to indicate failed login
                return { response: [], total: 0, code: code, message: message, };

            }
        });

    }

    GetWorkById(token: string, id: string): Observable<WorksResponeData> {
        //console.log(token);

        let url = `${constants.apiurl}work/detail/${id}?token=${token}`;

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

    GetArticleInWorkById(token: string, id: string): Observable<ListWorksResponeData> {
        //console.log(token);

        let url = `${constants.apiurl}work/get/${id}?token=${token}`;

        //console.log(url);


        return this.http.get(url).map((response: Response) => {
            let code = response.json() && response.json().code;
            let message = response.json() && response.json().traceMessage;
            console.log(response.json());

            if (code === 0) {
                let data = response.json() && response.json().response;
                let total = response.json() && response.json().response.total;


                return { response: data, total: total, code: code, message: "succes", };
            } else {

                // return false to indicate failed login
                return { response: [], total: 0, code: code, message: message, };

            }
        });

    }

    CreateWork(token: string, share: string, work: Work): Observable<WorksResponeData> {

        //console.log(work);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.post(`${constants.apiurl}work/topic/${share}?token=${token}`, JSON.stringify(work), options)
            .map((response: Response) => {
                // login successful if there's a jwt token in the response
                let code = response.json() && response.json().code;
                let message = response.json() && response.json().traceMessage;
                let responseObject = response.json() && response.json().responseObject;
                let data = response.json() && response.json().response;
                //let token = response.json() && response.json().response.token;

                if (code === 0) {

                    return { code: code, message: "Cập nhật thông tin đề tài thành công. Vui lòng hoàn thiện & gửi yêu cầu duyệt quyết định đề tài", response: data };
                } else {

                    // return false to indicate failed login
                    return { code: code, message: message, response: responseObject };
                }
            });
    }

    CreateNewWork(token: string, share: string, work: Work): Observable<WorksResponeData> {

        //console.log(work);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this.http.post(`${constants.apiurl}work/new/topic/${share}?token=${token}`, JSON.stringify(work), options)
            .map((response: Response) => {
                // login successful if there's a jwt token in the response
                let code = response.json() && response.json().code;
                let message = response.json() && response.json().traceMessage;
                let responseObject = response.json() && response.json().responseObject;
                let data = response.json() && response.json().response;
                //let token = response.json() && response.json().response.token;

                if (code === 0) {

                    return { code: code, message: "Cập nhật thông tin đề tài thành công. Vui lòng hoàn thiện & gửi yêu cầu duyệt quyết định đề tài", response: data };
                } else {

                    // return false to indicate failed login
                    return { code: code, message: message, response: responseObject };
                }
            });
    }

    UpdateNewWork(token: string, share: string, workId: string, work: Work): Observable<WorksResponeData> {
        //console.log(work);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        let url = `${constants.apiurl}work/topic/${workId}/${share}?token=${token}`;

        console.log(url);


        return this.http.post(url, JSON.stringify(work), options)
            .map((response: Response) => {
                // login successful if there's a jwt token in the response
                let code = response.json() && response.json().code;
                let message = response.json() && response.json().traceMessage;
                let data = response.json() && response.json().response;
                let responseObject = response.json() && response.json().responseObject;

                if (code === 0) {

                    return { code: code, message: "Cập nhật đề tài thành công", response: data };
                } else {

                    // return false to indicate failed login
                    return { code: code, message: message, response: responseObject };
                }
            });
    }

    UpdateWork(token: string, share: string, workId: string, work: Work): Observable<WorksResponeData> {
        //console.log(work);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this.http.post(`${constants.apiurl}work/topic/${workId}/${share}?token=${token}`, JSON.stringify(work), options)
            .map((response: Response) => {
                // login successful if there's a jwt token in the response
                let code = response.json() && response.json().code;
                let message = response.json() && response.json().traceMessage;
                let data = response.json() && response.json().response;
                let responseObject = response.json() && response.json().responseObject;

                if (code === 0) {

                    return { code: code, message: "Cập nhật đề tài thành công", response: data };
                } else {

                    // return false to indicate failed login
                    return { code: code, message: message, response: responseObject };
                }
            });
    }

    DeleteWork(token: string, workId: string, work: Work): Observable<WorksResponeData> {
        //console.log(work);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this.http.post(`${constants.apiurl}work/${workId}?token=${token}`, JSON.stringify(work), options)
            .map((response: Response) => {
                // login successful if there's a jwt token in the response
                let code = response.json() && response.json().code;
                let message = response.json() && response.json().traceMessage;
                let data = response.json() && response.json().response;
                //let token = response.json() && response.json().response.token;

                if (code === 0) {

                    return { code: code, message: "Xóa đề tài thành công", response: data };
                } else {

                    // return false to indicate failed login
                    return { code: code, message: message, response: null };
                }
            });
    }

    CreateArticle(token: string, share: string, work: Work): Observable<WorksResponeData> {

        console.log(work);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this.http.post(`${constants.apiurl}work/article/${share}?token=${token}`, JSON.stringify(work), options)
            .map((response: Response) => {
                // login successful if there's a jwt token in the response
                let code = response.json() && response.json().code;
                let message = response.json() && response.json().traceMessage;
                let responseObject = response.json() && response.json().responseObject;
                let data = response.json() && response.json().response;
                //let token = response.json() && response.json().response.token;

                if (code === 0) {

                    return { code: code, message: "Đăng ký bài báo thành công", response: data };
                } else {

                    // return false to indicate failed login
                    return { code: code, message: message, response: responseObject };
                }
            });
    }

    UpdateArticle(token: string, share: string, idWork: string, work: Work): Observable<WorksResponeData> {

        console.log(work);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this.http.post(`${constants.apiurl}work/article/${idWork}/${share}?token=${token}`, JSON.stringify(work), options)
            .map((response: Response) => {
                // login successful if there's a jwt token in the response
                let code = response.json() && response.json().code;
                let message = response.json() && response.json().traceMessage;
                let responseObject = response.json() && response.json().responseObject;
                let data = response.json() && response.json().response;
                //let token = response.json() && response.json().response.token;

                if (code === 0) {

                    return { code: code, message: "Cập nhật bài báo thành công", response: data };
                } else {

                    // return false to indicate failed login
                    return { code: code, message: message, response: responseObject };
                }
            });
    }

    RequestOpenWork(token: string, idWork: string): Observable<ResponeData> {
        
                let headers = new Headers({ 'Content-Type': 'application/json' });
                let options = new RequestOptions({ headers: headers });
        
                return this.http.post(`${constants.apiurl}work/open/${idWork}?token=${token}`, JSON.stringify({}), options)
                    .map((response: Response) => {
                        // login successful if there's a jwt token in the response
                        let code = response.json() && response.json().code;
                        let message = response.json() && response.json().traceMessage;
        
                        if (code === 0) {
        
                            return { code: code, message: "Cập nhật bài báo thành công" };
                        } else {
        
                            // return false to indicate failed login
                            return { code: code, message: message };
                        }
                    });
            }

    RequestUpdateWork(token: string, idWork: string): Observable<ResponeData> {

        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this.http.post(`${constants.apiurl}work/submit/${idWork}?token=${token}`, JSON.stringify({}), options)
            .map((response: Response) => {
                // login successful if there's a jwt token in the response
                let code = response.json() && response.json().code;
                let message = response.json() && response.json().traceMessage;

                if (code === 0) {

                    return { code: code, message: "Cập nhật bài báo thành công" };
                } else {

                    // return false to indicate failed login
                    return { code: code, message: message };
                }
            });
    }

    SendEmail(email: string): Observable<ResponeData> {
        return this.http.post(`${constants.apiurl}guest/invite/${email}`, this.options)
            .map((response: Response) => {
                // login successful if there's a jwt token in the response
                let code = response.json() && response.json().code;
                let message = response.json() && response.json().traceMessage;
                let data = response.json() && response.json().response;

                if (code === 0) {

                    return { code: code, message: "Gửi email thành công" };
                } else {

                    // return false to indicate failed login
                    return { code: code, message: message };
                }
            });
    }

}