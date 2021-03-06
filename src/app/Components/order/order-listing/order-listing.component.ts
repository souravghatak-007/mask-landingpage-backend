import { Component, OnInit } from '@angular/core';
import { HttpServiceService } from '../../../services/http-service.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { matchpwd, nameValidator, phoneValidator } from '../../common/validators';
import { CookieService } from 'ngx-cookie-service';
import { Router, ActivatedRoute} from '@angular/router'
import {environment} from '../../../../environments/environment';
import { MetaService } from '@ngx-meta/core';
@Component({
  selector: 'app-order-listing',
  templateUrl: './order-listing.component.html',
  styleUrls: ['./order-listing.component.css']
})
export class OrderListingComponent implements OnInit {
public cookieUserallData:any=JSON.parse(this.cookieService.get('user_details'));

  public transaction: any =  [{val: "TEST", name: 'TEST'}, {val: 'LIVE', name: 'LIVE'}];
 public autoShipSearch:any=[{val:"Yes",name:'Yes'},{val:"No",name:'No'},];

  public orderStatus:any = [{val:"Incomplete",name: "Incomplete"},{val:"Complete",name: "Complete"},{val:"Shipped",name: "Shipped"},{val:"Delivered",name: "Delivered"},{val:"Cancel",name: "Cancel"}]

  // use for status search
  statusarray: any =  [{val:"Incomplete",name: "Incomplete"},{val:"Complete",name: "Complete"},{val:"Shipped",name: "Shipped"},{val:"Delivered",name: "Delivered"},{val:"Cancel",name: "Cancel"}]; 


 //  Example like this
 editroute: any = 'admin/order/edit/';

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
     'zip':"Zip Code",
     '_id' :"OrderID"
 };

//   api url from environment
 apiurl:any=environment.API_URL



   // use for Table Detail Field Skip 
orderDataList_skip: any = ['name','userid','shipping_charge','sale_tax','type', 'password','created_at','updated_at','_id','accesscode','businessphone','companyname','country','user_info','transaction_token','card_cc','shipping_country','shipping_state','shipping_city','shipping_zip','billing_country','billing_state','billing_city','billing_zip','ordered_on'];

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

libdata:any={
    updateendpoint:'statusupdate',
    // hideeditbutton:true,// all these button options are optional not mandatory
    hidedeletebutton:true,
    //hideviewbutton:false,
    //hidestatustogglebutton:true,
    // hideaction:true,
    tableheaders:['order_id','shipping_name','billing_name','shipping_address','billing_address'], //not required
    // custombuttons:[
    //     {
    //         label:"fb search with blog title",
    //         link:"https://www.facebook.com/search/top/",
    //         type:'externallink',
    //         param:[{key:'blogtitle',q:'q'}],
    //     },
    //     {
    //         label:"G search with blog title ACtive",
    //         link:"https://www.google.com/search",
    //         type:'externallink',
    //         param:[{key:'blogtitle',q:'q'},{key:'author',q:'oq'}],
    //         cond:'status',
    //         condval: 1
    //     },{
    //         label:"mask blog",
    //         link:"https://mask-blog1.influxiq.com/blog-details",
    //         type:'externallink',
    //         paramtype:'angular',
    //         param:['blogtitle','_id'],
    //         cond:'status',
    //         condval: 0
    //     },
    //     {
    //         label:" fb profile ",
    //         link:"https://www.facebook.com/debasiskar007",
    //         type:'externallink'
    //     },
    //     {
    //         label:" fb profile for inactive",
    //         link:"https://www.facebook.com/debasiskar007",
    //         type:'externallink',
    //         cond:'status',
    //         condval:0
    //     },
    //     {
    //         label:" fb profile for active",
    //         link:"https://www.facebook.com/debasiskar007",
    //         type:'externallink',
    //         cond:'status',
    //         condval:1
    //     },
    //     {
    //         label:"see brand",
    //         route:"brand",
    //         type:'internallink',
    //         cond:'status',
    //         condval:0
    //     },
    //     {
    //         label:"see brand with param",
    //         route:"brand",
    //         type:'internallink',
    //         cond:'status',
    //         condval:0,
    //         param:['_id','blogtitle'],
    //     }
    // ]
}
// send basic sort data
sortdata:any={
   "type":'desc',
   "field":'shipping_name',
   "options":['shipping_name','shipping_address','billing_name','billing_address']
};

 // this is a database collection or view name
 date_search_source: any='admin_blog_list';
 // datacollection
 datacollection: any='getorderlistdata';
 //source count
 date_search_source_count: any=0;


 search_settings:any={

     datesearch:[{startdatelabel:"Start Date",enddatelabel:"End Date",submit:"Search",  field:"ordered_on"}],   // this is use for  date search

     selectsearch:[{ label: 'Search By Transaction Type', field: 'transactiontype', values: this.transaction },{ label: 'Search By Transaction', field: 'order_status', values: this.orderStatus },{label:'Search By Autoship',field:'has_autoship',values:this.autoShipSearch}], // this is use for  select search

      textsearch:[{label:"Search By ShippingName",field:'shipping_name'},{label:"Search By ShippingAddress",field:'shipping_address'},
      {label:"Search By OrderId",field:'order_id'},{label:"Search By TransactionID",field:'transactionid'}]  // this is use for  text search

      // this is use for  Autocomplete search
   //    search:[{label:"Search By status",field:this.status}]     

 };

 // this is search block 



 brandarray: any = [];
 notpendingapplication_view: any = [];
 adminlist: any = [];

 editroute1:any='modeledit';
   jwttoken:any;
 


 constructor(public activatedRoute:ActivatedRoute,public httpService:HttpServiceService,private cookieService: CookieService,public meta: MetaService) {


    this.meta.setTitle('Virus Medical Face Mask backend | Order Listing');
    this.meta.setTag('og:description', 'Virus Medical Face Mask backend to keep medical professionals safe and protected against harmful viruses, bacteria, and other critical circumstances, while also tending to their comfort.');
    this.meta.setTag('twitter:description', 'Virus Medical Face Mask backend to keep medical professionals safe and protected against harmful viruses, bacteria, and other critical circumstances, while also tending to their comfort.');

    this.meta.setTag('og:keyword', 'Virus Medical Face Mask backend, Medical Face Mask backend, Medical Face Mask backend for Virus');
    this.meta.setTag('twitter:keyword', 'Virus Medical Face Mask backend, Medical Face Mask backend, Medical Face Mask backend for Virus');

    this.meta.setTag('og:title', 'Virus Medical Face Mask backend | Order Listing');
    this.meta.setTag('twitter:title', 'Virus Medical Face Mask backend | Order Listing');
    this.meta.setTag('og:type', 'website');
    this.meta.setTag('og:url','https://mask-landingpage-backend.influxiq.com/');    
    this.meta.setTag('og:image', '../../assets/images/logo-fb.jpg');
    this.meta.setTag('twitter:image', '../../assets/images/logo-twitter.jpg');



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




    //    this.activatedRoute.data.forEach(res=>{
    //        let result:any=res;
    //        this.orderDataList=result.adminlist.res; 
    //        // console.log(this.adminDataList)    
       
    //    })


 }

}
