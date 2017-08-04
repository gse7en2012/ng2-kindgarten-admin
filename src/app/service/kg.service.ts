import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { CookieService } from 'ngx-cookie';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/catch';


@Injectable()
export class KgService {

  constructor(
    private cookieService: CookieService,
    private http: Http
  ) { }

  public getkgList(page?: number, size?: number, keyword?: string, addTime?: string) {
    const token = this.cookieService.get('kg_gm_token');
    const params: URLSearchParams = new URLSearchParams();
    params.set('gm_id', this.cookieService.getObject('kg_gm_info')['kindergartengm_id']);
    params.set('user_id', this.cookieService.getObject('kg_gm_info')['user_id']);
    // params.set('access_token',  token);

    if (page) params.set('page', page.toString());
    if (size) params.set('size', size.toString());
    if (keyword) params.set('keyword', keyword);
    if (addTime) params.set('add_time', addTime);


    return this.http.get(`/gmapi/kindergarten_list?access_token=${encodeURIComponent(token)}`, { search: params })
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

  public getKgDetails(kgId) {
   const token = this.cookieService.get('kg_gm_token');
    const params: URLSearchParams = new URLSearchParams();
    params.set('gm_id', this.cookieService.getObject('kg_gm_info')['kindergartengm_id']);
    params.set('user_id', this.cookieService.getObject('kg_gm_info')['user_id']);
    params.set('kindergarten_id', kgId);

    return this.http.get(`/gmapi/kindergarten?access_token=${encodeURIComponent(token)}`, { search: params })
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

  public addKg(kgInfo) {
    const token = this.cookieService.get('kg_gm_token');
    const postData = {
      gm_id: this.cookieService.getObject('kg_gm_info')['kindergartengm_id'],
      user_id: this.cookieService.getObject('kg_gm_info')['user_id'],
      access_token: token,
      kindergarten_info: kgInfo
    }
    return this.http.post(`/gmapi/kindergarten`, postData)
      .map(res => res.json()).toPromise()
      .then((data) => {
        if (data.err_code === 200) {
          return data.result;
        } else {
          return Promise.reject(data.msg || '返回数据格式出错！');
        }
      })
  }

  public editKgDetails(kgInfo) {
    const token = this.cookieService.get('kg_gm_token');
    const postData = {
      gm_id: this.cookieService.getObject('kg_gm_info')['kindergartengm_id'],
      user_id: this.cookieService.getObject('kg_gm_info')['user_id'],
      access_token: token,
      kindergarten_info: kgInfo
    }
    return this.http.put(`/sgmapi/kindergarten`, postData)
      .map(res => res.json()).toPromise()
      .then((data) => {
        if (data.err_code === 200) {
          return data.result;
        } else {
          return Promise.reject(data.msg || '返回数据格式出错！');
        }
      })
  }

  public deleteKg(kgId) {

    const token = this.cookieService.get('kg_gm_token');
    const postData = {
      gm_id: this.cookieService.getObject('kg_gm_info')['kindergartengm_id'],
      user_id: this.cookieService.getObject('kg_gm_info')['user_id'],
      access_token: token,
      kindergarten_id_array: [kgId]
    }


    return this.http.delete(`/gmapi/kindergarten`, new RequestOptions({body: postData}))
      .map(res => res.json()).toPromise()
      .then((data) => {
        if (data.err_code === 200) {
          return data.result;
        } else {
          return Promise.reject(data.msg || '返回数据格式出错！');
        }
      })
  }

  

}
