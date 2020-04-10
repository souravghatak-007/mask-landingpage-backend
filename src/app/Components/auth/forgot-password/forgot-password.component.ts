import { Component, OnInit } from '@angular/core';
import {HttpServiceService} from '../../../services/http-service.service';
import { MetaService } from '@ngx-meta/core';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  public logo: any = './assets/images/logo.png';
  public fromTitle: any = 'FORGOTTEN PASSWORD'
    // public signUpRouteingUrl: any = 'sign-up';
  public serverUrl:any =this.httpServiceService.baseUrl;
  public addEndpoint: any = {
    endpoint:'forgetpassword'
  };
  public loginRouteingUrl: any = {
    // "path":"login",
    "path":"",
    "buttonName":"Login",
    "customLink":"/login",
    "customURl":""
  };
  public signUpRouteingUrl: any = {
    // "path":"sign-up",
    // "path":"",
    // "buttonName":"Sign Up",
    // "customLink":"",
    // "customURl":""
  };
  public buttonName: any = 'Reset Password';

  public domainUrl: any = 'https://mask-landingpage-backend.influxiq.com/reset-password';

  constructor(public meta: MetaService,public httpServiceService:HttpServiceService) {
    this.meta.setTitle('Mask - Forget Password');
  }

  ngOnInit() {
  }

}
