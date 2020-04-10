import { Component, OnInit } from '@angular/core';
import {HttpServiceService} from '../../../services/http-service.service';
import { MetaService } from '@ngx-meta/core';

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

  constructor(public meta: MetaService,public httpServiceService:HttpServiceService,) {
    this.meta.setTitle('Mask - Login');
    // this.meta.setTag('og:description', 'Virus Barrier Medical Face Mask to keep medical professionals safe and protected against harmful viruses, bacteria, and other critical circumstances, while also tending to their comfort.');
    // this.meta.setTag('twitter:description', 'Virus Barrier Medical Face Mask to keep medical professionals safe and protected against harmful viruses, bacteria, and other critical circumstances, while also tending to their comfort.');

    // this.meta.setTag('og:keyword', 'Virus Barrier Medical Face Mask, Medical Face Mask, Medical Face Mask for Virus');
    // this.meta.setTag('twitter:keyword', 'Virus Barrier Medical Face Mask, Medical Face Mask, Medical Face Mask for Virus');

    // this.meta.setTag('og:title', 'Virus Barrier Medical Face Mask');
    // this.meta.setTag('twitter:title', 'Virus Barrier Medical Face Mask');
    // this.meta.setTag('og:type', 'website');
    // this.meta.setTag('og:url','https://virusmedicalmask.com');
    // this.meta.setTag('og:image', 'https://all-frontend-assets.s3.amazonaws.com/bvt-mask-assetc/images/144-144.png');

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
