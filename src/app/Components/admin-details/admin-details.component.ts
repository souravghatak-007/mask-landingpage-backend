import { Component, OnInit,Inject } from '@angular/core';
import { HttpServiceService } from '../../services/http-service.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { matchpwd, nameValidator, phoneValidator } from '../common/validators';
import { CookieService } from 'ngx-cookie-service';
import { Router, ActivatedRoute} from '@angular/router'
import {environment} from '../../../environments/environment';
import { MetaService } from '@ngx-meta/core';


@Component({
  selector: 'app-admin-details',
  templateUrl: './admin-details.component.html',
  styleUrls: ['./admin-details.component.css']
})
export class AdminDetailsComponent implements OnInit {


   
  public status: any =  [{val: 1, name: 'Active'}, {val: 0, name: 'Inactive'}];

   // use for status search
   statusarray: any =  [{val: 1, name: 'Active'}, {val: 0, name: 'Inactive'}]; 


  //  Example like this
  editroute: any = 'admin/edit';

  datasource: any; 
  adminDataList:any=[];


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
  adminDataList_skip: any = ['_id', 'name','type', 'password','created_at','updated_at','id','accesscode','businessphone','companyname','country'];


   // use for Table Detail inside the modal image path 
//    adminDataList_skip_detail_datatype: any = [{
//       key: "images",
//       value: 'image',
//       fileurl: "http://18.222.26.198/upload/brandimages/"             // Image path 
//   }];

  // updateendpoint is use for data update endpoint
  updateendpoint = 'addorupdatedata';

  // deleteendpoint is use for data delete endpoint
  deleteendpoint = 'deletesingledata';

  // this is a database collection name
  tablename = 'users';

  // searchendpoint is use for data search endpoint
  searchendpoint = 'datalist';

  // use for click to another page routing path
  click_to_add_ananother_page = '/adminlist';

  custom_link:any;

  adminDataList_detail_datatype:any;
  adminDataList_detail_skip:any=['_id','password',"created_at"]

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
    "field":'firstname',
    "options":['firstname','email','lastname','email','state','city']
};
libdata:any={
  updateendpoint: 'statusupdate',
}
  // this is a database collection or view name
  date_search_source: any='admin_blog_list';
  // datacollection
  datacollection: any='getadminlistdata';
  //source count
  date_search_source_count: any=0;


  search_settings:any={

      datesearch:[{startdatelabel:"Start Date",enddatelabel:"End Date",submit:"Search",  field:"created_at"}],   // this is use for  date search

      selectsearch:[{ label: 'Search By Status', field: 'status', values: this.status }], // this is use for  select search

       textsearch:[{label:"Search By name",field:'firstname'},{label:"Search By Email",field:'email'}],  // this is use for  text search

       // this is use for  Autocomplete search
    //    search:[{label:"Search By status",field:this.status}]     

  };

  // this is search block 



  brandarray: any = [];
  notpendingapplication_view: any = [];
  adminlist: any = [];

  editroute1:any='modeledit';
    jwttoken:any;
  


  constructor(public activatedRoute:ActivatedRoute,public httpService:HttpServiceService,private cookieService: CookieService,public meta:MetaService) {

    this.meta.setTitle('Virus Medical Face Mask backend | Admin Details');
    this.meta.setTag('og:description', 'Virus Medical Face Mask backend to keep medical professionals safe and protected against harmful viruses, bacteria, and other critical circumstances, while also tending to their comfort.');
    this.meta.setTag('twitter:description', 'Virus Medical Face Mask backend to keep medical professionals safe and protected against harmful viruses, bacteria, and other critical circumstances, while also tending to their comfort.');

    this.meta.setTag('og:keyword', 'Virus Medical Face Mask backend, Medical Face Mask backend, Medical Face Mask backend for Virus');
    this.meta.setTag('twitter:keyword', 'Virus Medical Face Mask backend, Medical Face Mask backend, Medical Face Mask backend for Virus');

    this.meta.setTag('og:title', 'Virus Medical Face Mask backend | Admin Details');
    this.meta.setTag('twitter:title', 'Virus Medical Face Mask backend | Admin Details');
    this.meta.setTag('og:type', 'website');
    this.meta.setTag('og:url','https://mask-landingpage-backend.influxiq.com/');    
    this.meta.setTag('og:image', '../../assets/images/logo-fb.jpg');
    this.meta.setTag('twitter:image', '../../assets/images/logo-twitter.jpg');

 
      this.jwttoken=this.cookieService.get('jwtToken');
      // console.log( this.jwttoken)


  }

  ngOnInit() {
    this.datasource = '';
    let endpoint='getadminlistdata';
    let endpointc='getadminlistdata-count';
    let data:any={
        "condition":{
            "limit":10,
            "skip":0
        },
    sort:{
        "type":'desc',
        "field":'firstname'
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
           
            this.adminDataList =res.results.res;

        }, error => {
            console.log('Oooops!');
        });




        this.activatedRoute.data.forEach(res=>{
            let result:any=res;
            this.adminDataList=result.adminlist.res; 
            // console.log(this.adminDataList)    
        
        })


  }


}
