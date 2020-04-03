import { Component, OnInit } from '@angular/core';
import {HttpServiceService} from '../../../services/http-service.service';


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
  constructor(public httpServiceService:HttpServiceService) {

   }

  ngOnInit() {
  }

}
