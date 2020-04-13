import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { HttpServiceService } from '../../services/http-service.service';
import { Router, ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import { MetaService } from '@ngx-meta/core';
import {ApiService} from './../../api.service';
import {environment} from '../../../environments/environment';



@Component({
  selector: 'app-dashboard-admin',
  templateUrl: './dashboard-admin.component.html',
  styleUrls: ['./dashboard-admin.component.css']
})
export class DashboardAdminComponent implements OnInit {
 public cookieUserallData:any=JSON.parse(this.cookieService.get('user_details'))
 public adminCount:any=[];
 public orderDataList:any=[];
 public date_search_source_count: any=0;

 public transaction: any =  [{val: "TEST", name: 'TEST'}, {val: 'LIVE', name: 'LIVE'}];
 public orderStatus:any = [{val:"Incomplete",name: "Incomplete"},{val:"Complete",name: "Complete"},{val:"Shipped",name: "Shipped"},{val:"Delivered",name: "Delivered"},{val:"Cancel",name: "Cancel"}]

 // use for status search
 statusarray: any =  [{val:"Incomplete",name: "Incomplete"},{val:"Complete",name: "Complete"},{val:"Shipped",name: "Shipped"},{val:"Delivered",name: "Delivered"},{val:"Cancel",name: "Cancel"}]; 
editroute: any = 'admin/order/edit/';
datasource: any; 
// Like Table head name is " firstname" => "First Name"
modify_header_array: any = {
    'firstname': "First Name",
    'email': 'Email Id',
    'lastname': 'Last Name',
    'name': "Full Name",
    'phone':"Phone Number",
    'state':'State',
    'city':'City',
    'zip':"Zip Code",
    'order_id' :"Order ID",
    'transactiontype':"Transaction Type"
};
  // use for Table Detail Field Skip 
orderDataList_skip: any = ['accesscode','_id','product_subtotal','shipping_phone','billing_phone','name','userid','shipping_charge','sale_tax','type', 'password','created_at','updated_at','id','accesscode','businessphone','companyname','country','user_info','transaction_token','card_cc','shipping_country','shipping_state','shipping_city','shipping_zip','billing_country','billing_state','billing_city','billing_zip'];
// updateendpoint is use for data update endpoint
updateendpoint = 'addorupdatedata';
// this is a database collection name
tablename = 'data_order';
// searchendpoint is use for data search endpoint
searchendpoint = 'datalist';
// use for click to another page routing path
click_to_add_ananother_page = '/adminlist';
custom_link:any;
orderDataList_detail_datatype:any;
orderDataList_detail_skip:any=['_id','password',"created_at"]
// date_search_endpoint is use for date search endpoint
date_search_endpoint: any='datalist';
// send basic limit data
limitcond:any={
  "limit":10,
  "skip":0,
  "pagecount":1
};
// send basic sort data
sortdata:any={
  "type":'desc',
  "field":'shipping_name',
  "options":['shipping_name','shipping_address','billing_name','billing_address']
};
// ths is a database collection or view name
date_search_source: any='admin_blog_list';
// datacollection
datacollection: any='getorderlistdata';
 //source count
 jwttoken:any;
 apiurl:any=environment.API_URL
search_settings:any={
  
  datesearch:[{startdatelabel:"Start Date",enddatelabel:"End Date",submit:"Search",  field:"ordered_on"}],   // this is use for  date search

  selectsearch:[{ label: 'Search By Transactiontype', field: 'transactiontype', values: this.transaction },{ label: 'Search By Transaction', field: 'order_status', values: this.orderStatus }], // this is use for  select search

   textsearch:[{label:"Search By ShippingName",field:'shipping_name'},{label:"Search By ShippingAddress",field:'shipping_address'},
   {label:"Search By OrderId",field:'order_id'},{label:"Search By TransactionID",field:'transactionid'}]    

};
  constructor(public router: Router, public cookieService: CookieService, public http: HttpServiceService,public apiService:ApiService,public meta:MetaService){
    if(this.cookieUserallData.type=='admin')
    {
      this.jwttoken=this.cookieService.get('jwtToken');
      this.meta.setTitle('Admin Dashboard');
      this.fetchAdminDashboardData();
    }
  }
   

  ngOnInit() {
  }

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

    //this.datasource = '';
    let endpoint='getorderlistdata';
    let endpointc='getorderlistdata-count';

    let dataa:any={
        "condition":{
            "limit":8,
            "skip":0
        },
    sort:{
        "type":'desc',
        "field":'shipping_name'
    }
 
    }
    // setTimeout(()=>{    //<<<---    using ()=> syntax
      this.http.httpViaPost(endpointc, dataa).subscribe((res:any) => {
        // console.log('in constructor');
        // console.log(result);
        this.date_search_source_count =res.count;
        //console.warn('blogData c',res);

    }, error => {
        console.log('Oooops!');
    });

    this.http.httpViaPost(endpoint,dataa).subscribe((res:any) => {
       
        this.orderDataList =res.results.res;
        //console.log('Oooops!',this.orderDataList);
    }, error => {
        console.log('Oooops!');
    });
//  }, 5000);
       
 
  }
}
