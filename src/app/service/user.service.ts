import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { CookieService } from 'ngx-cookie';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/catch';

@Injectable()
export class UserService {

  private serviceUrl: object = {
    login: '/gmapi/gm_login'
  };

  constructor(
    private cookieService: CookieService,
    private http: Http
  ) { }

  public adminLogin(username: string, pass: string) {
    return this.http.post(this.serviceUrl['login'], {
      account: username,
      token: pass
    }).map(res => res.json()).toPromise()
      .then((data) => {
        if (data.err_code === 200) {
          this.cookieService.put('kg_gm_token', data.result.access_token);
          this.cookieService.putObject('kg_gm_info', data.result);
          return data.result;
        }else{
          return Promise.reject(data.msg);
        }
      })
  }

  public logOut(){
    this.cookieService.remove('kg_gm_token');
    this.cookieService.remove('kg_gm_info');
  }

  public checkAdminLogin() {
    return !!this.cookieService.get('kg_gm_token');
  }

   public getAdminInfo(){
    return this.cookieService.getObject('kg_gm_info')
  }

}
