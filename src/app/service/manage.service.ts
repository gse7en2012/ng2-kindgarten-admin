import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { CookieService } from 'ngx-cookie';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/catch';
@Injectable()
export class ManageService {

  private typeHash: object = {
    'edu': 'educationalbackground',
    'cert': 'certification',
    'class': 'class',
    'department': 'department',
    'position': 'position',
    'skill': 'skill'
  }

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


  public getList(type: string, page?: number, size?: number) {
    const param = this.generateHttpGetSearchParams({ page: page, size: size })
    return this.http.get(`/gmapi/${this.typeHash[type]}_list?access_token=${param.token}`, { search: param.search }).map(res => res.json()).toPromise()
      .then((data) => {
        if (data.err_code === 200) {
          return data.result;
        } else {
          return Promise.reject(data.msg || '返回数据格式出错！');
        }
      })
  }

  public getDetails(type: string, eId) {
    const paramObject: object = {};
    paramObject[`${this.typeHash[type]}_id`] = eId;
    const param = this.generateHttpGetSearchParams(paramObject);
    return this.http.get(`/gmapi/${this.typeHash[type]}?access_token=${param.token}`, { search: param.search })
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

  public addDetails(type: string, detailsInfo: object) {
    const paramObject: object = {};
    paramObject[`${this.typeHash[type]}_detail`] = detailsInfo;
    const postData = this.generateHttpPostSearchParams(paramObject)
    return this.http.post(`/gmapi/${this.typeHash[type]}`, postData)
      .map(res => res.json()).toPromise()
      .then((data) => {
        if (data.err_code === 200) {
          return data.result;
        } else {
          return Promise.reject(data.msg || '返回数据格式出错！');
        }
      })
  }

  public editDetails(type: string, detailsInfo: object) {
    const paramObject: object = {};
    paramObject[`${this.typeHash[type]}_detail`] = detailsInfo;
    const postData = this.generateHttpPostSearchParams(paramObject)
    return this.http.put(`/gmapi/${this.typeHash[type]}`, postData)
      .map(res => res.json()).toPromise()
      .then((data) => {
        if (data.err_code === 200) {
          return data.result;
        } else {
          return Promise.reject(data.msg || '返回数据格式出错！');
        }
      })
  }

  public deleteDetails(type: string, eId) {
    const paramObject: object = {};
    paramObject[`${this.typeHash[type]}_id_list`] = [eId];
    const postData = this.generateHttpPostSearchParams(paramObject)
    return this.http.delete(`/gmapi/${this.typeHash[type]}`, new RequestOptions({ body: postData }))
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
