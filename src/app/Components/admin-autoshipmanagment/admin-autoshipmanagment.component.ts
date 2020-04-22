import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { HttpServiceService } from '../../services/http-service.service';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-admin-autoshipmanagment',
  templateUrl: './admin-autoshipmanagment.component.html',
  styleUrls: ['./admin-autoshipmanagment.component.css']
})
export class AdminAutoshipmanagmentComponent implements OnInit {
  public cookieUserallData:any=JSON.parse(this.cookieService.get('user_details'));
  public jwttoken=this.cookieService.get('jwtToken');
 public UpcomingAutolist:any=[];
 public upcoming_search_source_count: any=0;
 modify_header_array:any={
   'product qty':"Quantity",
   'product total':"Total",
   'status name':"Status",
   'billing date':"Next Billing date",
   'shipping name':"Shipping Name",
   'order id':"Order Id"
 };
 apiurl:any=environment.API_URL
 updateendpoint = 'addorupdatedata';
deleteEndpoint: any = "deletesingledata";
date_search_source: any='admin_blog_list';
date_search_endpoint: any='datalist';
tablename = 'data_order';
searchendpoint = 'datalist';

orderDataList_detail_datatype:any;
editroute: any = 'admin/order/edit/';
custom_link:any;

 upcoming_orderStatus:any = [{val:0,name: "Pending"},{val:1,name:"Completed"},{val:2,name:'Cancelled'}]
 upcoming_sortdata:any={
   "type":'desc',
   "field":'billing_date',
   "options":['billing_date']
 };
 upcoming_limitcond:any={
   "limit":10,
   "skip":0,
   "pagecount":1
 };
 upcoming_datacollection: any='getautoshiplistdata';
 libdata:any={
  updateendpoint:'cancel-autoship-liblist',
  // hideeditbutton:true,// all these button options are optional not mandatory
  hidedeletebutton:true,
  //hideviewbutton:false,
  //hidestatustogglebutton:true,
  // hideaction:true,
  tableheaders:['product_qty','product_total','status_name','billing_date','order_id','shipping_name'], //not required
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
 upcoming_date_search_endpoint: any='datalist';
 upcoming_UpcomingAutolist_detail_skip:any=['_id','billing_date_timestamp'];
 upcoming_search_settings:any={
   
   datesearch:[{startdatelabel:"Start Date",enddatelabel:"End Date",submit:"Search",  field:"billing_date_timestamp"}],   // this is use for  date search
 
   // selectsearch:[{label:'Search By Autoship',field:'has_autoship',values:this.autoShipSearch}], // this is use for  select search
 
   //  textsearch:[{label:"Search By OrderId",field:'order_id'},{label:"Search By TransactionID",field:'transactionid'}]    
 
 };
 upcoming_UpcomingAutolist_skip: any = ['_id','transactiontype','card_cc','transactionid','shipping_address','billing_address','billing_date_timestamp']
  
 constructor(public cookieService:CookieService,public http: HttpServiceService) { 
    let upcoming_endpoint='getautoshiplistdata';
    let upcoming_endpointc='getautoshiplistdata-count';
   
    let upcoming_data:any={
        "condition":{
            "limit":8,
            "skip":0
        },
    sort:{
        "type":'desc',
        "field":'billing_date'
    }
   
    }
    
      this.http.httpViaPost(upcoming_endpointc, upcoming_data).subscribe((res:any) => {
       
        //console.warn('upcoming autoship data count',res);
        this.upcoming_search_source_count=res.count;
   
    }, error => {
        console.log('Oooops!');
    });
   
    this.http.httpViaPost(upcoming_endpoint,upcoming_data).subscribe((res:any) => {
       this.UpcomingAutolist=res.results.res;
        //console.log('upcoming autoship data',res);
    }, error => {
        console.log('Oooops!');
    });
  }

  ngOnInit() {
  }

}
