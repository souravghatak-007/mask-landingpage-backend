import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import {environment } from '../../environments/environment.prod';
@Injectable({
  providedIn: 'root'
})

export class HttpServiceService {
  public resetPassword =  environment["RESET_PASSWORD_URL"];
  private environment: any = "dev";
  private siteSettingData: any;
  public baseUrl: any = environment["API_URL"];

  constructor(private http: HttpClient, public CookieService: CookieService) {
    // this.getSiteSettingData().subscribe(responce => {
    //   this.siteSettingData = responce;
    // });
   
  }
  /* read site setting data */
  public getSiteSettingData(url): Observable<any> {
    return this.http.get(url);
  }

  /* call api via post method */
  httpViaPost(endpoint, jsonData): Observable<any> {
    /* set common header */
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        // 'Authorization': this.CookieService.get('jwtToken')
      })
    };

    return this.http.post(this.baseUrl + endpoint, jsonData,httpOptions);
  }

  /* call api via get method */
  httpViaGet(endpoint, jsonData): Observable<any> {
    /* set common header */
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': this.CookieService.get('jwtToken')
      })
    };

    return this.http.get(this.baseUrl + endpoint, jsonData);
  }



  /* Resolve service */
  ResolveViaPost(requestdata: any, endpoint: any): Observable<any> {
    console.log(endpoint,requestdata);
    /* set common header */
    const returnedTarget = Object.assign(requestdata,{'secret':this.CookieService.get('secret')});
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': this.CookieService.get('jwtToken')
      })
    };

    return this.http.post(this.baseUrl + endpoint, JSON.stringify(requestdata), httpOptions).pipe(map(res => res));
  }

  getJsonObject(path:any){
    var result = this.http.get(path).pipe(map(res => res));
    return result;
}



 postDataWithoutToken(endpoint:any, data:any) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    //console.log('endpoint');
    //console.log(endpoint);
    var result = this.http.post(this.baseUrl+endpoint, JSON.stringify(data), httpOptions).pipe(map(res => res));
    return result;
  }

  serviceViaPost(requestdata: any, endpoint: any): Observable<any> {
    // console.log(endpoint,requestdata);
     /* set common header */
     const returnedTarget = Object.assign(requestdata,{'secret':this.CookieService.get('secret')});
     const httpOptions = {
       headers: new HttpHeaders({
         'Content-Type': 'application/json',
        //  'Authorization': this.cookieService.get('jwtToken'),
         
       })
     };
     return this.http.post(this.baseUrl + endpoint, JSON.stringify(requestdata),httpOptions).pipe(map(res => res));
   }


}


