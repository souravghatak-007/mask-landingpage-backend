import { Component, OnInit } from '@angular/core';
import { HttpServiceService } from '../../../services/http-service.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { matchpwd, nameValidator, phoneValidator } from '../../common/validators';
import { CookieService } from 'ngx-cookie-service';
import { Router, ActivatedRoute} from '@angular/router'
import {environment} from '../../../../environments/environment';
@Component({
  selector: 'app-order-listing',
  templateUrl: './order-listing.component.html',
  styleUrls: ['./order-listing.component.css']
})
export class OrderListingComponent implements OnInit {

  public status: any =  [{val: 1, name: 'Active'}, {val: 0, name: 'Inactive'}];

  // use for status search
  statusarray: any =  [{val: 1, name: 'Active'}, {val: 0, name: 'Inactive'}]; 


 //  Example like this
 editroute: any = 'admin/edit';

 datasource: any; 
 orderDataList:any=[];


 // use for Table Header modification 

 // Like Table head name is " firstname" => "First Name"
 modify_header_array: any = {
     'firstname': "First Name",
     'email': 'Email Id',
     'lastname': 'Last Name',
     'name': "Full Name",
     'phone':"Phone Number",
     'state':'State',
     'city':'City',
     'zip':"Zip Code"
 };

//   api url from environment
 apiurl:any=environment.API_URL



   // use for Table Detail Field Skip 
orderDataList_skip: any = ['_id', 'name','userid','shipping_charge','sales_tax','type', 'password','created_at','updated_at','id','accesscode','businessphone','companyname','country'];

 // updateendpoint is use for data update endpoint
 updateendpoint = 'addorupdatedata';

 // deleteendpoint is use for data delete endpoint
 deleteendpoint = 'deletesingledata';

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
   "options":['shipping_name']
};

 // this is a database collection or view name
 date_search_source: any='admin_blog_list';
 // datacollection
 datacollection: any='getorderlistdata';
 //source count
 date_search_source_count: any=0;


 search_settings:any={

     datesearch:[{startdatelabel:"Start Date",enddatelabel:"End Date",submit:"Search",  field:"created_at"}],   // this is use for  date search

     selectsearch:[{ label: 'Search By Status', field: 'status', values: this.status }], // this is use for  select search

      textsearch:[{label:"Search By ShippingName",field:'shipping_name'}],  // this is use for  text search

      // this is use for  Autocomplete search
   //    search:[{label:"Search By status",field:this.status}]     

 };

 // this is search block 



 brandarray: any = [];
 notpendingapplication_view: any = [];
 adminlist: any = [];

 editroute1:any='modeledit';
   jwttoken:any;
 


 constructor(public activatedRoute:ActivatedRoute,public httpService:HttpServiceService,private cookieService: CookieService) {

     this.jwttoken=this.cookieService.get('jwtToken');
     // console.log( this.jwttoken)


 }

 ngOnInit() {
   this.datasource = '';
   let endpoint='getorderlistdata';
   let endpointc='getorderlistdata-count';
   let data:any={
       "condition":{
           "limit":10,
           "skip":0
       },
   sort:{
       "type":'desc',
       "field":'shipping_name'
   }

   }
       this.httpService.httpViaPost(endpointc, data).subscribe((res:any) => {
           // console.log('in constructor');
           // console.log(result);
           this.date_search_source_count =res.count;
           //console.warn('blogData c',res);

       }, error => {
           console.log('Oooops!');
       });

       this.httpService.httpViaPost(endpoint,data).subscribe((res:any) => {
          
           this.orderDataList =res.results.res;

       }, error => {
           console.log('Oooops!');
       });




       this.activatedRoute.data.forEach(res=>{
           let result:any=res;
           this.orderDataList=result.adminlist.res; 
           // console.log(this.adminDataList)    
       
       })


 }

}
