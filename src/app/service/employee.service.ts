import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { CookieService } from 'ngx-cookie';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/catch';

@Injectable()
export class EmployeeService {


  constructor(
    private cookieService: CookieService,
    private http: Http
  ) { }


  private generateHttpGetSearchParams(opts) {
    const params: URLSearchParams = new URLSearchParams();
    params.set('gm_id', this.cookieService.getObject('kg_gm_info')['kindergartengm_id']);
    params.set('user_id', this.cookieService.getObject('kg_gm_info')['user_id']);
    Object.keys(opts).forEach((key) => {
      if (opts[key]) params.set(key, opts[key].toString());
    });
    return {
      token: encodeURIComponent(this.cookieService.get('kg_gm_token')),
      search: params
    }
  }

  private generateHttpPostSearchParams(opts) {
    const token = this.cookieService.get('kg_gm_token');
    const postData = Object.assign({
      gm_id: this.cookieService.getObject('kg_gm_info')['kindergartengm_id'],
      user_id: this.cookieService.getObject('kg_gm_info')['user_id'],
      access_token: token
    }, opts)
    return postData;
  }

  public getEmployeeList(page?: number, size?: number, keyword?: string) {

    const param = this.generateHttpGetSearchParams({
      page: page, size: size, keyword: keyword
    })


    return this.http.get(`/gmapi/employee_list?access_token=${param.token}`, { search: param.search }).map(res => res.json()).toPromise()
      .then((data) => {
        if (data.err_code === 200) {
          return data.result;
        } else {
          return Promise.reject(data.msg || '返回数据格式出错！');
        }
      })
  }


  public getEmployeeDetails(eId) {
    const param = this.generateHttpGetSearchParams({
      employee_id: eId
    })

    return this.http.get(`/gmapi/employee?access_token=${param.token}`, { search: param.search })
      .map(res => res.json())
      .toPromise()
      .then((data) => {
        if (data.err_code === 200) {
          return data.result;
        } else {
          return Promise.reject(data.msg || '返回数据格式出错！');
        }
      })
  }

  public addEmployee(epInfo) {

    const postData = this.generateHttpPostSearchParams({ employee_info: epInfo })
    return this.http.post(`/gmapi/employee`, postData)
      .map(res => res.json()).toPromise()
      .then((data) => {
        if (data.err_code === 200) {
          return data.result;
        } else {
          return Promise.reject(data.msg || '返回数据格式出错！');
        }
      })
  }

  public editEmployeeDetails(employeeInfo) {

    const postData = this.generateHttpPostSearchParams({ employee_info: employeeInfo })
    return this.http.put(`/gmapi/employee`, postData)
      .map(res => res.json()).toPromise()
      .then((data) => {
        if (data.err_code === 200) {
          return data.result;
        } else {
          return Promise.reject(data.msg || '返回数据格式出错！');
        }
      })
  }

  public deleteEmployee(eId) {

    const postData = this.generateHttpPostSearchParams({ employee_id_array: [eId] })
    return this.http.delete(`/gmapi/employee`, new RequestOptions({ body: postData }))
      .map(res => res.json()).toPromise()
      .then((data) => {
        if (data.err_code === 200) {
          return data.result;
        } else {
          return Promise.reject(data.msg || '返回数据格式出错！');
        }
      })
  }

  public getWechatQrcodeTicket(eId) {

    const postData = this.generateHttpPostSearchParams({ employee_id: eId })
    return this.http.post(`/wxapi/qrcode_ticket`, postData)
      .map(res => res.json()).toPromise()
      .then((data) => {
        return data.ticket;
      })
  }


}
