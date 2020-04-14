import { Component, OnInit } from '@angular/core';
import {HttpServiceService} from '../../../services/http-service.service';
import { MetaService } from '@ngx-meta/core';


@Component({
  selector: 'app-resetpassword',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  public fromTitleName: any = 'Reset From';
  public logo: any = './assets/images/logo.png';
  public serverUrl: any = this.httpServiceService.baseUrl;
  public addEndpoint: any = {
    endpoint:'resetpassword',
    source:'users'
  };
  constructor(public httpServiceService:HttpServiceService,public meta: MetaService) {

    this.meta.setTitle('Virus Medical Face Mask backend | Reset Password');
    this.meta.setTag('og:description', 'Virus Medical Face Mask backend to keep medical professionals safe and protected against harmful viruses, bacteria, and other critical circumstances, while also tending to their comfort.');
    this.meta.setTag('twitter:description', 'Virus Medical Face Mask backend to keep medical professionals safe and protected against harmful viruses, bacteria, and other critical circumstances, while also tending to their comfort.');

    this.meta.setTag('og:keyword', 'Virus Medical Face Mask backend, Medical Face Mask backend, Medical Face Mask backend for Virus');
    this.meta.setTag('twitter:keyword', 'Virus Medical Face Mask backend, Medical Face Mask backend, Medical Face Mask backend for Virus');

    this.meta.setTag('og:title', 'Virus Medical Face Mask backend | Reset Password');
    this.meta.setTag('twitter:title', 'Virus Medical Face Mask backend | Reset Password');
    this.meta.setTag('og:type', 'website');
    this.meta.setTag('og:url','https://mask-landingpage-backend.influxiq.com/');    
    this.meta.setTag('og:image', '../../assets/images/logo-fb.jpg');
    this.meta.setTag('twitter:image', '../../assets/images/logo-twitter.jpg');

   }

  ngOnInit() {
  }

}
