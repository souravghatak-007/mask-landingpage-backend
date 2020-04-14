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

    this.meta.setTitle('Virus Medical Face Mask backend | Forget Password');
    this.meta.setTag('og:description', 'Virus Medical Face Mask backend to keep medical professionals safe and protected against harmful viruses, bacteria, and other critical circumstances, while also tending to their comfort.');
    this.meta.setTag('twitter:description', 'Virus Medical Face Mask backend to keep medical professionals safe and protected against harmful viruses, bacteria, and other critical circumstances, while also tending to their comfort.');

    this.meta.setTag('og:keyword', 'Virus Medical Face Mask backend, Medical Face Mask backend, Medical Face Mask backend for Virus');
    this.meta.setTag('twitter:keyword', 'Virus Medical Face Mask backend, Medical Face Mask backend, Medical Face Mask backend for Virus');

    this.meta.setTag('og:title', 'Virus Medical Face Mask backend | Forget Password');
    this.meta.setTag('twitter:title', 'Virus Medical Face Mask backend | Forget Password');
    this.meta.setTag('og:type', 'website');
    this.meta.setTag('og:url','https://mask-landingpage-backend.influxiq.com/');    
    this.meta.setTag('og:image', '../../assets/images/logo-fb.jpg');
    this.meta.setTag('twitter:image', '../../assets/images/logo-twitter.jpg');

  }

  ngOnInit() {
  }

}
