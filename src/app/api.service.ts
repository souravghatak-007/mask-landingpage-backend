import { ElementRef, EventEmitter, Injectable, Input, ViewChild } from '@angular/core';
import { switchMap, map, takeWhile } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// for setting observables to get serverurl and endpointurl from app
import { Observable, Subject, Subscription } from 'rxjs';
import{CookieService} from 'ngx-cookie-service';
import {environment } from '../environments/environment';


@Injectable({   
  providedIn: 'root'
})
export class ApiService {

  public serverUrl:any =  environment["API_URL"];
  public nodesslurl =  environment["nodesslurl"];
  public uploadurl =  environment["uploadurl"];
  public base64encode =  environment["base64encode"];
  public uploadsslurl: any= environment["download_url"];

  public fileimgsslurl: any;
  
  public lengthis;
  public percentageis;
  public inprogress;
  public progress: any = [];
  public uploadtype;
  public uploaderror: any = '';
  public accesstoken:any = this.cookieService.get('jwtToken');
  fileservername: any = [];
  // serverUrl: any;
  addendpointUrl: any;
  uploadEndpointUrl:any; //souresh
  updateendpointUrl: any;
  deletesingle_endpointUrl: any;
  updatestatus_single_endpointUrl: any;
  deletemultiple_endpointUrl: any;
  updatestatus_multiple_endpointUrl: any;
  getdata_endpointUrl: any;
  private subjectForServerUrl = new Subject<any>();
  private subjectForaddEndpointUrl = new Subject<any>();
  private subjectForuploadEndpointUrl = new Subject<any>();  //added by souresh
  private subjectForupdateEndpointUrl = new Subject<any>();
  private subjectFordeletesingleEndpointUrl = new Subject<any>();
  private subjectForupdatestatusSingleEndpointUrl = new Subject<any>();
  private subjectForGetdataEndpointUrl = new Subject<any>();
  public subscriptionServer: Subscription;
  public subscriptionaddEndpoint: Subscription;
  public subscriptionuploadEndpoint: Subscription;   //added by souresh
  public subscriptionupdateEndpoint: Subscription;
  public subscriptiondeletesingleEndpoint: Subscription;
  public subscriptionupdatestatusSingleEndpoint: Subscription;
  public subscriptionGetdataEndpoint: Subscription;
  public tokenVal: any;
  constructor(private _http: HttpClient, private cookieService :CookieService) {


      // this._http.get(this.serverUrl + 'gettemptoken').subscribe((res: any)=>{
      //   this.tokenVal = res;
      //   // console.log('token',res)
      //   // console.log(this.tokenVal)
      //   // console.log(this.tokenVal.token.length)
      // });

      this.fileimgsslurl = 'http://api.nexgentesting.com/';


    this.subscriptionServer = this.getServerUrl().subscribe(message => {
     let result: any;
      result = message;
      if (result != null) {
        this.serverUrl = result;
      } else {
        this.serverUrl = null;
      }
    });
    this.subscriptionaddEndpoint = this.getaddEndpoint().subscribe(message => {
      let result: any;
      result = message;
      if (result != null) {
        this.addendpointUrl = result;
      } else {
        this.addendpointUrl = null;
      }
    });
    /*********added by souresh***********/
    this.subscriptionuploadEndpoint=this.getuploadEndpoint().subscribe(message=>{
      let result:any;
      result=message;
        if(result!=null){
          this.uploadEndpointUrl = result;
        } else{
          this.uploadEndpointUrl = null;
        }
    })
    /************souresh end here**************/
    this.subscriptionupdateEndpoint = this.getupdateEndpoint().subscribe(message => {
      let result: any;
      result = message;
      if (result != null) {
        this.updateendpointUrl = result;
      } else {
        this.updateendpointUrl = null;
      }
    });
    this.subscriptiondeletesingleEndpoint = this.getdeletesingleEndpoint().subscribe(message => {
      let result: any;
      result = message;
      if (result != null) {
        this.deletesingle_endpointUrl = result;
      } else {
        this.deletesingle_endpointUrl = null;
      }
    });
    this.subscriptionupdatestatusSingleEndpoint = this.getupdatestatus_singleEndpoint().subscribe(message => {
      let result: any;
      result = message;
      if (result != null) {
        this.updatestatus_single_endpointUrl = result;
      } else {
        this.updatestatus_single_endpointUrl = null;
      }
    });
    this.subscriptionGetdataEndpoint = this.getdataEndpoint().subscribe(message => {
      let result: any;
      result = message;
      if (result != null) {
        this.getdata_endpointUrl = result;
      } else {
        this.getdata_endpointUrl = null;
      }
    });

    
  }
  public getcitystate(value : any): Observable<any> {
    return this._http.get(value);
  }

  setServerUrl(value: any) {
    this.subjectForServerUrl.next(value);
  }
  public clearServerUrl() {
    this.subjectForServerUrl.next(null);
  }
  public getServerUrl(): Observable<any> {
    return this.subjectForServerUrl.asObservable();
  }

  setaddEndpoint(value: any) {
    this.subjectForaddEndpointUrl.next(value);
  }
  public clearaddEndpoint() {
    this.subjectForaddEndpointUrl.next(null);
  }
  public getaddEndpoint(): Observable<any> {
    return this.subjectForaddEndpointUrl.asObservable();
  }
/*****added by souresh******/
  setuploadEndpont(value:any){
    this.subjectForuploadEndpointUrl.next(value);
  }
  public clearuploadEndpoint(){
    this.subjectForuploadEndpointUrl.next(null);
  }
  public getuploadEndpoint(): Observable <any> {
    return this.subjectForuploadEndpointUrl.asObservable();
  }
   /********souresh end here********/


  setupdateEndpoint(value: any) {
    this.subjectForupdateEndpointUrl.next(value);
  }
  public clearupdateEndpoint() {
    this.subjectForupdateEndpointUrl.next(null);
  }
  public getupdateEndpoint(): Observable<any> {
    return this.subjectForupdateEndpointUrl.asObservable();
  }

  setdeletesingleEndpoint(value: any) {
    this.subjectFordeletesingleEndpointUrl.next(value);
  }
  public cleardeletesingleEndpoint() {
    this.subjectFordeletesingleEndpointUrl.next(null);
  }
  public getdeletesingleEndpoint(): Observable<any> {
    return this.subjectFordeletesingleEndpointUrl.asObservable();
  }

  setupdatestatus_singleEndpoint(value: any) {
    this.subjectForupdatestatusSingleEndpointUrl.next(value);
  }
  public clearupdatestatus_singleEndpoint() {
    this.subjectForupdatestatusSingleEndpointUrl.next(null);
  }
  public getupdatestatus_singleEndpoint(): Observable<any> {
    return this.subjectForupdatestatusSingleEndpointUrl.asObservable();
  }

  setgetdataEndpoint(value: any) {
    this.subjectForGetdataEndpointUrl.next(value);
  }
  public cleargetdataEndpoint() {
    this.subjectForGetdataEndpointUrl.next(null);
  }
  public getdataEndpoint(): Observable<any> {
    return this.subjectForGetdataEndpointUrl.asObservable();
  }



  isTokenExpired() {

    // const helper = new JwtHelperService();
    // const decodedToken = helper.decodeToken(localStorage.getItem('id_token'));
    // var isIdTokenExpired = helper.isTokenExpired(localStorage.getItem('id_token'));
    // console.log('refresh_token',localStorage.getItem('refresh_token'))
    // const isRefreshTokenExpired = helper.isTokenExpired(localStorage.getItem('refresh_token'));
    // console.log('id_token isExpired:',isIdTokenExpired)
    // console.log('refresh_token isExpired:',isRefreshTokenExpired)
  }

  addData(requestdata: any) {
    console.log('in adddata apiservice');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': this.accesstoken          //hard code written access-token(temp)
      })
    };

    console.log('httpoptions',httpOptions,this.serverUrl,requestdata);
    var result = this._http.post(this.serverUrl + this.addendpointUrl, JSON.stringify(requestdata), httpOptions).pipe(map(res => res));
    return result;
  }
  
  /*******added by souresh************/
  uploadFile(requestdata:any){
    const httpOptions={
        headers: new HttpHeaders({
          'Content-Type':'application/json',
          'access-token':this.accesstoken          //hard code written access-token(temp)
        })
    };
    var result=this._http.post(this.serverUrl + this.uploadEndpointUrl,JSON.stringify(requestdata),httpOptions).pipe(map(res=>res));
    return result;
  }
  /*******souresh end here********/
  UpdateData(requestdata: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'access-token': this.accesstoken          //hard code written access-token(temp)
      })
    };
    var result = this._http.post(this.serverUrl + this.updateendpointUrl, JSON.stringify(requestdata), httpOptions).pipe(map(res => res));
    return result;
  }

  getData(requestdata: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': this.accesstoken
      })
    };
    var result = this._http.post(this.serverUrl + this.getdata_endpointUrl, JSON.stringify(requestdata), httpOptions).pipe(map(res => res));
    return result;

  }
/*************** Added by himadri start here ***************/ 


getDataForDatalist(endpoint: any) {

  const httpOptions = {
      headers: new HttpHeaders({
          'Content-Type':  'application/json',
          'Authorization': this.accesstoken
      })
  };

  // this.isTokenExpired()
  var result = this._http.post(this.serverUrl + 'datalist', endpoint, httpOptions).pipe(map(res => res));

  return result;
}
// getData end
/*************** Added by himadri using for datalist start here ***************/ 

getDatalist(requestdata: any) {
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.accesstoken
    })
  };
  var result = this._http.post(this.serverUrl + requestdata.endpoint, JSON.stringify(requestdata), httpOptions).pipe(map(res => res));
  return result;


}
getDatalistWithToken(requestdata: any, newdata: any){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': newdata.token
      })
    };
    var result = this._http.post(this.serverUrl + requestdata.endpoint, JSON.stringify(requestdata), httpOptions).pipe(map(res => res));
    return result;
}

getTempToken() {
  var result = this._http.get(this.serverUrl + 'gettemptoken').pipe(map(res => res));
  return result;
}
/*************** Added by himadri end here ***************/ 

getDatalistForResolve(requestdata: any) {
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.accesstoken
    })
  };
  console.log(requestdata)
  
  var result = this._http.post(this.serverUrl + requestdata.endpoint, JSON.stringify(requestdata.requestcondition), httpOptions).pipe(map(res => res));
  return result;


}




  addLogin(requestdata: any) {
    console.log('in addLogin apiservice');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
        // 'Authorization': this.accesstoken          //hard code written access-token(temp)
      })
    };

    console.log(this.serverUrl,requestdata);
    var result = this._http.post(this.serverUrl + this.addendpointUrl, JSON.stringify(requestdata), httpOptions).pipe(map(res => res));
    return result;
  }
  /*************** Added by himadri end here ***************/ 

/*************** Added by himadri start here ***************/ 
forgetPassword(requestdata: any) {
  console.log('in forgetPassword apiservice');
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
      // 'Authorization': this.accesstoken          //hard code written access-token(temp)
    })
  };

  console.log(this.serverUrl,requestdata);
  var result = this._http.post(this.serverUrl + this.addendpointUrl, JSON.stringify(requestdata), httpOptions).pipe(map(res => res));
  return result;
}
/*************** Added by himadri end here ***************/ 


  deleteSingleData(requestdata: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': this.accesstoken
      })
    };
    var result = this._http.post(this.serverUrl + this.deletesingle_endpointUrl, JSON.stringify(requestdata), httpOptions).pipe(map(res => res));
    return result;
  }

  deleteMultipleData(requestdata: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': this.accesstoken
      })
    };
    var result = this._http.post(this.serverUrl + this.deletesingle_endpointUrl+'many', JSON.stringify(requestdata), httpOptions).pipe(map(res => res));
    return result;
  }

  UpdateStatusForSingleData(requestdata: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': this.accesstoken
      })
    };
    var result = this._http.post(this.serverUrl + this.updatestatus_single_endpointUrl, JSON.stringify(requestdata), httpOptions).pipe(map(res => res));
    return result;
  }

  UpdateStatusForMultipleData(requestdata: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': this.accesstoken
      })
    };
    var result = this._http.post(this.serverUrl + this.updatestatus_single_endpointUrl+'many', JSON.stringify(requestdata), httpOptions).pipe(map(res => res));
    return result;
  }
  CustomRequest(requestdata: any, endpoint:any ) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': this.accesstoken
      })
    };
    var result = this._http.post(this.serverUrl + endpoint, JSON.stringify(requestdata), httpOptions).pipe(map(res => res));
    return result;
  }

  gettemptoken(){
    var result = this._http.get(this.serverUrl + 'gettemptoken').pipe(map(res=>res));
    return result;
  }


  getJsonObject(path:any){
    var result = this._http.get(path).pipe(map(res => res));
    return result;
}

/**add postData */
postdata(requestdata: any) {
  console.log('post Data');
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
      // 'Authorization': this.accesstoken          //hard code written access-token(temp)
    })
  };

  console.log(this.serverUrl,requestdata);
  var result = this._http.post(this.serverUrl + this.addendpointUrl, JSON.stringify(requestdata), httpOptions).pipe(map(res => res));
  return result;
}
  addDataWithoutToken(requestdata: any, endpoint:any ) {
    const returnedTarget = Object.assign(requestdata,{'secret':this.cookieService.get('secret')});
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': this.cookieService.get('jwtToken')
      })
    };
    var result = this._http.post(this.serverUrl + endpoint, JSON.stringify(requestdata), httpOptions).pipe(map(res => res));
    return result;
  }
  postDatawithoutToken(endpoint:any, data) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    console.log('endpoint');
//console.log(endpoint);
    var result = this._http.post(this.serverUrl+endpoint, JSON.stringify(data), httpOptions).pipe(map(res => res));
    return result;
  }
    /* read site setting data */
    public getSiteSettingData(url): Observable<any> {
      return this._http.get(url);
    }

    secrettempToken(data) {
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json'
        })
      };
      // console.log('endpoint');
      //console.log(data);
      var result = this._http.post(this.serverUrl+'temptoken', JSON.stringify(data), httpOptions).pipe(map(res => res));
      return result;
    }

      /* Resolve service */
  ResolveViaPost(requestdata: any, endpoint: any): Observable<any> {
   // console.log(endpoint,requestdata);
    /* set common header */
    const returnedTarget = Object.assign(requestdata,{'secret':this.cookieService.get('secret')});
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': this.cookieService.get('jwtToken'),
        
      })
    };
    // let headers:any=new HttpHeaders();
    // headers=headers.set('Content-Type', 'application/json').set('Authorization', this.cookieService.get('jwtToken')).set('secret',this.cookieService.get('secret'))

    return this._http.post(this.serverUrl + endpoint, JSON.stringify(requestdata),httpOptions).pipe(map(res => res));
  }
/**client ip address fetch */
  getclientip() {
    console.log('endpoint');
    // this.isTokenExpired()
    var result = this._http.get("http://ipinfo.io/?format=json&token=9797c42b93078a").pipe(map(res => res));
    return result;
    }

  serviceViaPost(requestdata: any, endpoint: any): Observable<any> {
    // console.log(endpoint,requestdata);
     /* set common header */
     const returnedTarget = Object.assign(requestdata,{'secret':this.cookieService.get('secret')});
     const httpOptions = {
       headers: new HttpHeaders({
         'Content-Type': 'application/json',
        //  'Authorization': this.cookieService.get('jwtToken'),
         
       })
     };
     return this._http.post(this.serverUrl + endpoint, JSON.stringify(requestdata),httpOptions).pipe(map(res => res));
   }
}



















