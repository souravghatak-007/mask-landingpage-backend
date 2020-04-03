import { Component, OnInit } from '@angular/core';
import {HttpServiceService} from '../../../services/http-service.service';
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
    "path":"",
    "buttonName":"Sign Up",
    "customLink":"",
    "customURl":""
  };
  public buttonName: any = 'Reset Password';

  public domainUrl: any = 'http://localhost:4200/reset-password';

  constructor(public httpServiceService:HttpServiceService) {
       
  }

  ngOnInit() {
  }

}
