import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { HttpServiceService } from '../../services/http-service.service';
import { Router, ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import { MetaService } from '@ngx-meta/core';
import {ApiService} from './../../api.service';



@Component({
  selector: 'app-dashboard-admin',
  templateUrl: './dashboard-admin.component.html',
  styleUrls: ['./dashboard-admin.component.css']
})
export class DashboardAdminComponent implements OnInit {
  public cookieUserallData:any=JSON.parse(this.cookieService.get('user_details'))
  public adminCount:[];



  constructor(public router: Router, public cookieService: CookieService, public http: HttpServiceService,public apiService:ApiService,public meta:MetaService){
    if(this.cookieUserallData.type=='admin')
    {
      this.meta.setTitle('Admin Dashboard');
      this.fetchAdminDashboardData();
    }
  }
   



  ngOnInit() {
   
  }
  ngAfterViewInit(){}
  /**admin dashboard data count */
  fetchAdminDashboardData(){
    let data:any={};
    this.apiService.addDataWithoutToken(data, 'admin-dashboard').subscribe((res:any) => {
      if(res.status=='success'){
      // console.warn(res.results);
      this.adminCount=res.results;
      // console.warn(this.adminCount);

      }
    });
  }
}
