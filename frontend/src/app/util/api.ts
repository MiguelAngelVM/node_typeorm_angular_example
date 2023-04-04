import {environment} from '../../environments/environment';
import { Router, ActivatedRoute, Params } from '@angular/router';

class Api {
  public apiUrl: string = environment.apiServer;
  constructor(
		public route: ActivatedRoute,
		public router: Router){
  }
  static headers = async function(contentType) {
    const options = {
      sharedPreferencesName: '',
      keychainService: ''
    };
    let token = await localStorage.getItem('token');
    let auth_header = 'Bearer ' + token;

    return {
      Authorization: auth_header,
      'Content-Type': 'application/json'
    };
  };

  // Todas las llamadas pasan por aquĂ­
  static xhr = async function(route, params, verb) {
    const host = environment.apiServer; 
    const url = `${host}${route}`;
    const headers = await this.headers();
    const options = {
      method: verb,
      headers: headers,
      body: params ? JSON.stringify(params.datos ?  params.datos  : params) : null

    };
    let xFetch = await fetch(url, options);
    if(xFetch.status == 401){
      window.location.href = environment.apiHost;
    }
    return xFetch.json().then(response => {
      return response
    });
  };

  static get(route) {
    return this.xhr(route, null, 'GET');
  }

  static patch(route, params) {
    return this.xhr(route, params, 'PATCH');
  }

  static post(route, params) {
    return this.xhr(route, params, 'POST');
  }

  static put(route, params) {
    return this.xhr(route, params, 'PUT');
  }

  static delete(route, params) {
    return this.xhr(route, params, 'DELETE');
  }

  static getUrl(modelo){
    const url = environment.apiServer; 
    return url+modelo;
  }
  static getBase(modelo){
    const url = environment.apiServer; 
    return url+modelo;
  }

  static futch = (url, opts:any={}, onProgress) => {
    return new Promise( (res, rej)=>{
        var xhr = new XMLHttpRequest();
        xhr.open(opts.method || 'get', url);
        for (var k in opts.headers||{})
            xhr.setRequestHeader(k, opts.headers[k]);
        xhr.onload = e => res(e.target);
        xhr.onerror = rej;
        if (xhr.upload && onProgress)
            xhr.upload.onprogress = onProgress; // event.loaded / event.total * 100 ; //event.lengthComputable
        xhr.send(opts.body);
    });
  }
}
export default Api;