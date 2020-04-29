import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { HttpServiceService } from '../../../services/http-service.service';
import { CookieService } from 'ngx-cookie-service';
import {ApiService} from './../../../api.service';
import { Key } from 'protractor';
import { MetaService } from '@ngx-meta/core';

@Component({
  selector: 'app-user-listing',
  templateUrl: './user-listing.component.html',
  styleUrls: ['./user-listing.component.css']
})
export class UserListingComponent implements OnInit {
  componentRef: any;
  datasource: any; 
  status_gretterthan_zero: any;
  pendingapplication_view: any;
  joquuserlist: any;
  public countrylistarray:any=[];
  public countryValueForsearch:any=[];
  placeholder: any = ['placeholder'];
  type: any = ['text'];
  name: any = ['Username'];

  userDataarray: any = [];
 
  public status: any = [{ val: 1, 'name': 'Active' }, { val: 0, 'name': 'Inactive' }];

   // use for status search

  statusarray: any = [{val: 1, name: 'Approve'}, {val: 4, name: 'Decline'}, {val: 3, name: 'Lock'}]; 

  // use for edit any field Navigate that page And you should be import the app-routing.module.ts   ex:- {path: 'editroute/:id', component: < "Write the class name"> },

  //  Example like this
  editroute: any = 'user/edit';


  // use for Table Header modification 

  // Like Table head name is " firstname" => "First Name"
  modify_header_array: any = {
      'firstname': "First Name",
      'email': 'Email',
      'lastname': 'Last Name',
  };


  // use for Table Header Skip 
  pendingmodelapplicationarray_skip: any = ['_id','video_thamnail','type','accesscode','password','description','blogs_image','created_at'];



    // use for Table Detail Field Skip 
  pendingmodelapplicationarray_detail_skip: any = ['_id', 'email', 'name','accesscode','created_at','password','type'];


   // use for Table Detail inside the modal image path 
  pendingmodelapplicationarray_detail_datatype: any = [{
      key: "images",
      value: 'image',
      fileurl: "http://18.222.26.198/upload/brandimages/"             // Image path 
  }];

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



  // date_search_endpoint is use for date search endpoint
  date_search_endpoint: any='datalist';
  // send basic limit data
  limitcond:any={
      "limit":10,
      "skip":0,
      "pagecount":1
  };
  libdata:any={
    updateendpoint: 'statusupdate',
  }
// send basic sort data
  sortdata:any={
      "type":'desc',
      "field":'email',
      "options":['email','firstname','lastname','country']
  };

  // this is a database collection or view name
  date_search_source: any='admin_blog_list';
  // datacollection
  datacollection: any='getuserlistdata';
  //source count
  date_search_source_count: any=0;

  // this is use for  All type of search
   authval:any= [
      { val: 'YmattZ', 'name': 'YmattZ A' },
      { val: 'YmattZ', 'name': 'YmattZ A' },
      { val: 'Jessica', 'name': 'A Jessica' }
      ];


  search_settings:any={

      // datesearch:[{startdatelabel:"Start Date",enddatelabel:"End Date",submit:"Search",  field:"created_at"}],   // this is use for  date search

       selectsearch:[{label: 'Search By Country', field: 'country', values: this.countryValueForsearch}], // this is use for  select search

       textsearch:[{label:"Search By Firstname",field:'firstname_search'},{label:"Search by Email",field:"email"},{label:"Search by State",field:"state_search"}
      ],  // this is use for  text search

      //search:[{label:"Search By Author",field:'country_search',values:this.countryValueForsearch}]     // this is use for  Autocomplete search
  };

  // this is search block 



  brandarray: any = [];
  notpendingapplication_view: any = [];
  adminlist: any = [];



  editroute1:any='modeledit';


  
  status_gretterthan_zero_skip: any= ['_id','username','phone','city','state','ethnicity','height','haircolor','eyecolor','weight','bust','waist','hips','slim','toned','tattoos','athletic','piercings','retail','voluptuous','promotions','sales','descriptionbox','facebooklink','twitterlink','instagramlink','modelmayhemlink','type','images','accesstoken'];
  status_gretterthan_zero_modify_header: any = { 'dateformat': 'Date','status':'Status','email':'Email', 'name':'Full Name', 'bodytype' : 'Bodytype', 'shatterblok agreement date': 'Shatterblok Agreement Date', 'audiodeadline agreement date': 'Audiodeadline Agreement Date' };
  status_gretterthan_zero_detail_skip:any=['_id','email','name','type','status','accesstoken'];
  public user_cookie:any;
  public apiUrl:any;

  constructor(public apiService:ApiService,public router: Router, public route: ActivatedRoute, public _apiService: HttpServiceService,  public cookie: CookieService,
    public meta:MetaService) {

      this.meta.setTitle('Virus Medical Face Mask backend | Admin User Management');
      this.meta.setTag('og:description', 'Virus Medical Face Mask backend to keep medical professionals safe and protected against harmful viruses, bacteria, and other critical circumstances, while also tending to their comfort.');
      this.meta.setTag('twitter:description', 'Virus Medical Face Mask backend to keep medical professionals safe and protected against harmful viruses, bacteria, and other critical circumstances, while also tending to their comfort.');
  
      this.meta.setTag('og:keyword', 'Virus Medical Face Mask backend, Medical Face Mask backend, Medical Face Mask backend for Virus');
      this.meta.setTag('twitter:keyword', 'Virus Medical Face Mask backend, Medical Face Mask backend, Medical Face Mask backend for Virus');
  
      this.meta.setTag('og:title', 'Virus Medical Face Mask backend | Admin User Management');
      this.meta.setTag('twitter:title', 'Virus Medical Face Mask backend | Admin User Management');
      this.meta.setTag('og:type', 'website');
      this.meta.setTag('og:url','https://mask-landingpage-backend.influxiq.com/');    
      this.meta.setTag('og:image', '../../assets/images/logo-fb.jpg');
      this.meta.setTag('twitter:image', '../../assets/images/logo-twitter.jpg');

      
      // console.log('custom_link');
      // console.log(this.custom_link);
      this.datasource = '';
        let endpoint='getuserlistdata';
        let endpointc='getuserlistdata-count';
        let data:any={
            "condition":{
                "limit":10,
                "skip":0
            },
        sort:{
            "type":'desc',
            "field":'email'
        }

        }
        this._apiService.httpViaPost(endpointc, data).subscribe((res:any) => {
            console.log('in constructor');
            // console.log(result);
            this.date_search_source_count =res.count.date_search_source_count;
            console.warn('blogData c',res);

        }, error => {
            console.log('Oooops!');
        });

        this._apiService.httpViaPost(endpoint,data).subscribe((res:any) => {
            console.log('in constructor');
            // console.log(result);
            this.userDataarray =res.results.res;
            //console.warn('blogData',res);

        }, error => {
            console.log('Oooops!');
        });
      this.user_cookie = cookie.get('jwtToken');
      this.apiUrl = _apiService.baseUrl;
    }

  ngOnInit() {
    this.route.data.forEach((data) => {
      //console.log(data);
      this.userDataarray = data.userManagementData.res;
    })
    this.getCountryStateCityList();
   
    setTimeout(()=>{    
      for(let i in this.countrylistarray){
        // console.log(this.countrylistarray[i].country);
        this.countryValueForsearch.push({val: this.countrylistarray[i].country,'name': this.countrylistarray[i].country})
      }
      //console.log(this.countryValueForsearch);
 }, 5000);
    
  }

  getCountryStateCityList() {
    this.apiService.getJsonObject('assets/json/coun.json')     // json for english-speaking-country
      .subscribe((res:any) => {
        
        this.countrylistarray = res.countries;
       //console.log(this.countrylistarray);
      });
     
  }
}
