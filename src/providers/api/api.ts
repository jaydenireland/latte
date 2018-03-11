import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

/**
 * Api is a generic REST Api handler. Set your API url first.
 */
@Injectable()
export class Api {
  url: string = 'https:/videos-api.jaydenireland.com';
  jwt: string = '';
  constructor(public http: HttpClient) {
  }

  get(endpoint: string, params?: any, reqOpts?: any) {
    if (reqOpts == null) reqOpts = {};
    if (!reqOpts) {
      reqOpts = {
        params: new HttpParams()
      };
    }

    // Support easy query params for GET requests
    if (params) {
      reqOpts.params = new HttpParams();
      for (let k in params) {
        reqOpts.params = reqOpts.params.set(k, params[k]);
      }
    }

    return this.http.get(this.url + '/' + endpoint, Object.assign(reqOpts,
    {headers: { 'Authorization': 'Bearer ' + this.jwt}}));
  }

  post(endpoint: string, body: any, reqOpts?: any) {
    if (reqOpts == null) reqOpts = {};
    return this.http.post(this.url + '/' + endpoint, body,
    {headers: { 'Authorization': 'Bearer ' + this.jwt}});
  }

  put(endpoint: string, body: any, reqOpts?: any) {
    if (reqOpts == null) reqOpts = {};
    return this.http.put(this.url + '/' + endpoint, body,
    {headers: { 'Authorization': 'Bearer ' + this.jwt}});
  }

  delete(endpoint: string, reqOpts?: any) {
    if (reqOpts == null) reqOpts = {};
    return this.http.delete(this.url + '/' + endpoint,
    {headers: { 'Authorization': 'Bearer ' + this.jwt}});
  }

  patch(endpoint: string, body: any, reqOpts?: any) {
    if (reqOpts == null) reqOpts = {};
    return this.http.patch(this.url + '/' + endpoint,
    {headers: { 'Authorization': 'Bearer ' + this.jwt}});
  }
}
