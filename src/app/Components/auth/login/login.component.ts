import { Component, OnInit } from '@angular/core';
import {HttpServiceService} from '../../../services/http-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public logo: any = './assets/images/logo.png';
  public fromTitle: any = "Login";    // This is a From Title
  public fullUrl: any = this.httpServiceService.baseUrl;  // server url
  public endpoint: any = "login";
  public buttonName:any= 'Login';
  public defaultLoginUrl = '/';

  loading: boolean;
 



  public signUpRouteingUrl: any = {
    // "path": "",
    // "buttonName": "Not registered? Request Sign Up Here",
    // "customLink": "/",
    // "customURl": ""
  };
  public forgetRouteingUrl: any = {
    "path": "",
    "buttonName": "Forgot your password ?",
    "customLink": "/forget-password",
  };

  public routerStatus: any;

  constructor(public httpServiceService:HttpServiceService,) {
    this.routerStatus = {           // this is use for if login succcess then navigate which page 
      "data": [
        {
          "type": "admin",
          "routerNav": "dashboard"
        },
        {
          "type": "user",
          "routerNav": "dashboard"
        },
        {
          "type": "model",
          "routerNav": "modelDashbord"
        }
      ]
    }
  }

  ngOnInit() {
  }

}
