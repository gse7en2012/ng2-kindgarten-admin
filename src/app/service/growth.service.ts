import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { CookieService } from 'ngx-cookie';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/catch';

@Injectable()
export class GrowthService {

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


  public getGrowthValueList(page?: number, size?: number, keyword?: string, start_time?: string, end_time?: string) {

    const param = this.generateHttpGetSearchParams({
      page: page, size: size, keyword: keyword, start_time: start_time, end_time: end_time
    })

    return this.http.get(`/gmapi/growthvalue_record?access_token=${param.token}`, { search: param.search }).map(res => res.json()).toPromise()
      .then((data) => {
        if (data.err_code === 200) {
          return data.result;
        } else {
          return Promise.reject(data.msg || '返回数据格式出错！');
        }
      })
  }

  public getGrowthValueTplList(page?: number, size?: number, keyword?: string, start_time?: string, end_time?: string) {
    const param = this.generateHttpGetSearchParams({
      page: page, size: size, keyword: keyword, start_time: start_time, end_time: end_time
    })

    return this.http.get(`/gmapi/growthvalueitem_list?access_token=${param.token}`, { search: param.search }).map(res => res.json()).toPromise()
      .then((data) => {
        if (data.err_code === 200) {
          return data.result;
        } else {
          return Promise.reject(data.msg || '返回数据格式出错！');
        }
      })
  }

  public getGrowthValueTplDetails(eId) {
    const paramObject: object = {};
    paramObject['kgsgrowthvalueitem_id'] = eId;
    const param = this.generateHttpGetSearchParams(paramObject);
    return this.http.get(`/gmapi/growthvalueitem?access_token=${param.token}`, { search: param.search })
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

  public addGrowthValueTplDetails( detailsInfo: object) {
    const paramObject: object = {};
    paramObject[`growthvalueitem_info`] = detailsInfo;
    const postData = this.generateHttpPostSearchParams(paramObject)
    return this.http.post(`/gmapi/growthvalueitem`, postData)
      .map(res => res.json()).toPromise()
      .then((data) => {
        if (data.err_code === 200) {
          return data.result;
        } else {
          return Promise.reject(data.msg || '返回数据格式出错！');
        }
      })
  }

  public editGrowthValueTplDetails(detailsInfo: object) {
    const paramObject: object = {};
    paramObject[`growthvalueitem_info`] = detailsInfo;
    const postData = this.generateHttpPostSearchParams(paramObject)
    return this.http.put(`/gmapi/growthvalueitem`, postData)
      .map(res => res.json()).toPromise()
      .then((data) => {
        if (data.err_code === 200) {
          return data.result;
        } else {
          return Promise.reject(data.msg || '返回数据格式出错！');
        }
      })
  }

  public deleteGrowthValueTplDetails(eId) {
    const paramObject: object = {};
    paramObject[`growthvalueitem_list`] = [eId];
    const postData = this.generateHttpPostSearchParams(paramObject)
    return this.http.delete(`/gmapi/growthvalueitem`, new RequestOptions({ body: postData }))
      .map(res => res.json()).toPromise()
      .then((data) => {
        if (data.err_code === 200) {
          return data.result;
        } else {
          return Promise.reject(data.msg || '返回数据格式出错！');
        }
      })
  }



  public getRankList(page?: number, size?: number, keyword?: string, start_time?: string, end_time?: string) {

    const param = this.generateHttpGetSearchParams({
      page: page, size: size, keyword: keyword, start_time: start_time, end_time: end_time
    })

    return this.http.get(`/gmapi/ranking?access_token=${param.token}`, { search: param.search }).map(res => res.json()).toPromise()
      .then((data) => {
        if (data.err_code === 200) {
          return data.result;
        } else {
          return Promise.reject(data.msg || '返回数据格式出错！');
        }
      })
  }


}
