import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { HttpServiceService } from '../../services/http-service.service';
import { Router} from '@angular/router';
import { DatePipe } from '@angular/common';
import { MetaService } from '@ngx-meta/core';
import { ApiService } from './../../api.service';
import { environment } from '../../../environments/environment';



@Component({
  selector: 'app-dashboard-admin',
  templateUrl: './dashboard-admin.component.html',
  styleUrls: ['./dashboard-admin.component.css']
})
export class DashboardAdminComponent implements OnInit {
  public usersdiv:any;
  public cookieUserallData: any = JSON.parse(this.cookieService.get('user_details'))
  public adminCount: any = [];
  public orderDataList: any = [];
  public successful_count:any=0;
  public successfullOrderDataList: any = [];

  public Incomplete_count:any=0;
  public IncompleteOrderDataList: any = [];

  public UpcomingAutolist: any = [];
  public userMyorder: any = [];
  public date_search_source_count: any = 0;
  public upcoming_search_source_count: any = 0;
  public myorder_search_source_count: any = 0;
  public usersflage:boolean=false;
  public successfullflage:boolean=false;
  public Incompleteflage:boolean=false;

  public transaction: any = [{ val: "TEST", name: 'TEST' }, { val: 'LIVE', name: 'LIVE' }];
  public autoShipSearch: any = [{ val: "Yes", name: 'Yes' }, { val: "No", name: 'No' },];
  public orderStatus: any = [{ val: "Incomplete", name: "Incomplete" }, { val: "Complete", name: "Complete" }, { val: "Shipped", name: "Shipped" }, { val: "Delivered", name: "Delivered" }, { val: "Cancel", name: "Cancelled" }]
  // use for status search
  statusarray: any = [{ val: "Incomplete", name: "Incomplete" }, { val: "Complete", name: "Complete" }, { val: "Shipped", name: "Shipped" }, { val: "Delivered", name: "Delivered" }, { val: "Cancel", name: "Cancelled" }];
  editroute: any = 'admin/order/edit/';
  datasource: any;
  // Like Table head name is " firstname" => "First Name"
  deleteEndpoint: any = "deletesingledata";
  modify_header_array: any = {
    'product qty': "Quantity",
    'order_id': "Order ID",
    'transactiontype': "Transaction Type",
    'ordered_date': "Order Date",
    'product total': "Total ",
  };
  // use for Table Detail Field Skip 
  orderDataList_skip: any = ['accesscode', '_id', 'product_subtotal', 'shipping_phone', 'billing_phone', 'name', 'userid', 'shipping_charge', 'sale_tax', 'type', 'password', 'created_at', 'updated_at', 'id', 'accesscode', 'businessphone', 'companyname', 'country', 'user_info', 'transaction_token', 'card_cc', 'shipping_country', 'shipping_state', 'shipping_city', 'shipping_zip', 'billing_country', 'billing_state', 'billing_city', 'billing_zip', 'shipping_name_search', 'ordered_on', 'product_price', 'autoship_data'];
  // updateendpoint is use for data update endpoint
  updateendpoint = 'addorupdatedata';
  // this is a database collection name
  tablename = 'data_order';
  // searchendpoint is use for data search endpoint
  searchendpoint = 'datalist';
  // use for click to another page routing path
  click_to_add_ananother_page = '/adminlist';
  custom_link: any;
  orderDataList_detail_datatype: any;
  orderDataList_detail_skip: any = ['_id', 'password', "created_at", 'shipping_name_search', 'user_info', 'ordered_on', 'userid', 'autoship_data']
  // date_search_endpoint is use for date search endpoint
  date_search_endpoint: any = 'datalist';
  // send basic limit data
  limitcond: any = {
    "limit": 10,
    "skip": 0,
    "pagecount": 1
  };
  // send basic sort data
  sortdata: any = {
    "type": 'desc',
    "field": 'shipping_name',
    "options": ['shipping_name', 'shipping_address', 'billing_name', 'billing_address', 'order_id', 'product_total', 'product_qty']
  };
  // ths is a database collection or view name
  date_search_source: any = 'admin_blog_list';
  // datacollection
  datacollection: any = 'getorderlistdata';
  //source count
  jwttoken: any;
  apiurl: any = environment.API_URL
  search_settings: any = {

    datesearch: [{ startdatelabel: "Start Date", enddatelabel: "End Date", submit: "Search", field: "ordered_on" }],   // this is use for  date search

    selectsearch: [{ label: 'Search By Transaction Type', field: 'transactiontype', values: this.transaction }, { label: 'Search By Order Status', field: 'order_status', values: this.orderStatus }, { label: 'Search By Autoship', field: 'has_autoship', values: this.autoShipSearch }], // this is use for  select search

    textsearch: [{ label: "Search By Shipping Name", field: 'shipping_name_search' }, { label: "Search By Shipping Address", field: 'shipping_address' },
    { label: "Search By OrderId", field: 'order_id' }, { label: "Search By TransactionID", field: 'transactionid' }]

  };
  //upcoming autoship list
  upcomig_modify_header_array: any = {
    'product qty': "Quantity",
    'product total': "Total",
    'status name': "Status",
    'billing date': "Next Billing date"
  };

  libdata: any = {
    updateendpoint: 'cancel-autoship-liblist',
    // hideeditbutton:true,// all these button options are optional not mandatory
    hidedeletebutton: true,
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
  upcoming_orderStatus: any = [{val:0,name: "Pending"},{val:1,name:"Completed"},{val:2,name:'Cancelled'}]
  upcoming_sortdata: any = {
    "type": 'desc',
    "field": 'billing_date',
    "options": ['billing_date']
  };
  upcoming_limitcond: any = {
    "limit": 10,
    "skip": 0,
    "pagecount": 1
  };
  upcoming_datacollection: any = 'getautoshiplistdata';

  upcoming_date_search_endpoint: any = 'datalist';
  upcoming_UpcomingAutolist_detail_skip: any = ['_id', 'billing_date_timestamp'];
  upcoming_search_settings: any = {

    datesearch: [{ startdatelabel: "Start Date", enddatelabel: "End Date", submit: "Search", field: "billing_date_timestamp" }],   // this is use for  date search

    // selectsearch:[{label:'Search By Autoship',field:'has_autoship',values:this.autoShipSearch}], // this is use for  select search

    //  textsearch:[{label:"Search By OrderId",field:'order_id'},{label:"Search By TransactionID",field:'transactionid'}]    

  };
  upcoming_UpcomingAutolist_skip: any = ['_id', 'transactiontype', 'card_cc', 'transactionid', 'shipping_address', 'billing_address', 'billing_date_timestamp']
  //user My order

  myorder_libdata: any = {
    basecondition:{userid:this.cookieUserallData._id},
    updateendpoint: 'statusupdate',
    // hideeditbutton:true,// all these button options are optional not mandatory
    //hidedeletebutton: true,
    //hideviewbutton:false,
    //hidestatustogglebutton:true,
    // hideaction:true,
    //tableheaders:['product_qty','product_total','status_name','billing_date','order_id','shipping_name'], //not required

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
  myorder_modify_header_array: any = {};
  myorder_orderStatus: any = [{ val: 0, name: "Processing" }, { val: 1, name: "Completed" }]
  myorder_detail_skip: any = ['_id', 'user_info', 'shipping_name_search', 'ordered_on', 'autoship_data'];
  myorder_sortdata: any = {
    "type": 'desc',
    "field": 'order_id',
    "options": ['order_id']
  };
  my_limitcond: any = {
    "limit": 10,
    "skip": 0,
    "pagecount": 1
  };
  my_datacollection: any = 'getorderlistdata';

  myorder_date_search_endpoint: any = 'datalist';
  myorder_search_settings: any = {

    datesearch: [{ startdatelabel: "Start Date", enddatelabel: "End Date", submit: "Search", field: "ordered_on" }],   // this is use for  date search

    // selectsearch:[{label:'Search By Autoship',field:'has_autoship',values:this.autoShipSearch}], // this is use for  select search

    //  textsearch:[{label:"Search By OrderId",field:'order_id'},{label:"Search By TransactionID",field:'transactionid'}]    

  };
  myorder_UpcomingAutolist_skip: any = ['_id', 'userid', 'user_info', 'shipping_name_search', 'ordered_on', 'autoship_data'];
  //user data populated****************

  userDataarray: any = [];
   public status: any = [{ val: 1, 'name': 'Active' }, { val: 0, 'name': 'Inactive' }];
  user_editroute: any = 'user/edit';
  user_modify_header_array: any = {
      'firstname': "First Name",
      'email': 'Email',
      'lastname': 'Last Name',
  };
  pendingmodelapplicationarray_skip: any = ['_id','video_thamnail','type','accesscode','password','description','blogs_image','created_at'];
  pendingmodelapplicationarray_detail_skip: any = ['_id', 'email', 'name','accesscode','created_at','password','type'];
  pendingmodelapplicationarray_detail_datatype: any = [{
      key: "images",
      value: 'image',
      fileurl: "http://18.222.26.198/upload/brandimages/"             // Image path 
  }];
  user_updateendpoint = 'addorupdatedata';
  deleteendpoint = 'deletesingledata';
  user_tablename = 'users';
  user_searchendpoint = 'datalist';
  user_date_search_endpoint: any='datalist';
  user_limitcond:any={
      "limit":10,
      "skip":0,
      "pagecount":1
  };
  user_sortdata:any={
      "type":'desc',
      "field":'email',
      "options":['email','firstname','lastname','country']
  };
  user_date_search_source: any='admin_blog_list';
  user_datacollection: any='getuserlistdata';
  user_date_search_source_count: any=0;
   authval:any= [
      { val: 'YmattZ', 'name': 'YmattZ A' },
      { val: 'YmattZ', 'name': 'YmattZ A' },
      { val: 'Jessica', 'name': 'A Jessica' }
      ];
  user_search_settings:any={

      // datesearch:[{startdatelabel:"Start Date",enddatelabel:"End Date",submit:"Search",  field:"created_at"}],   // this is use for  date search

      // selectsearch:[{label: 'Search By Country', field: 'country', values: this.countryValueForsearch}], // this is use for  select search

       textsearch:[{label:"Search By Firstname",field:'firstname_search'},{label:"Search by Email",field:"email"},{label:"Search by State",field:"state_search"}
      ],  // this is use for  text search

      //search:[{label:"Search By Author",field:'country_search',values:this.countryValueForsearch}]     // this is use for  Autocomplete search
  };
  successfull_datacollection='successfull-getorderlistdata';
  incomplete_datacollection='incomplete-getorderlistdata';
  constructor(public router: Router, public cookieService: CookieService, public http: HttpServiceService, public apiService: ApiService, public meta: MetaService) {
    // private vps: ViewportScroller

    this.meta.setTitle('Virus Medical Face Mask backend | Dashboard');
    this.meta.setTag('og:description', 'Virus Medical Face Mask backend to keep medical professionals safe and protected against harmful viruses, bacteria, and other critical circumstances, while also tending to their comfort.');
    this.meta.setTag('twitter:description', 'Virus Medical Face Mask backend to keep medical professionals safe and protected against harmful viruses, bacteria, and other critical circumstances, while also tending to their comfort.');

    this.meta.setTag('og:keyword', 'Virus Medical Face Mask backend, Medical Face Mask backend, Medical Face Mask backend for Virus');
    this.meta.setTag('twitter:keyword', 'Virus Medical Face Mask backend, Medical Face Mask backend, Medical Face Mask backend for Virus');

    this.meta.setTag('og:title', 'Virus Medical Face Mask backend | Dashboard');
    this.meta.setTag('twitter:title', 'Virus Medical Face Mask backend | Dashboard');
    this.meta.setTag('og:type', 'website');
    this.meta.setTag('og:url', 'https://mask-landingpage-backend.influxiq.com/');
    this.meta.setTag('og:image', '../../assets/images/logo-fb.jpg');
    this.meta.setTag('twitter:image', '../../assets/images/logo-twitter.jpg');


    if (this.cookieUserallData.type == 'admin') {
      this.jwttoken = this.cookieService.get('jwtToken');
      // this.meta.setTitle('Admin Dashboard');
      this.fetchAdminDashboardData();
    } else {
      this.jwttoken = this.cookieService.get('jwtToken');
      // this.meta.setTitle('Dashboard');
      this.fetchUserDashboardData();
    }
  }


  ngOnInit() {
  }

  /**admin dashboard data count */
  fetchAdminDashboardData() {
    let data: any = {};
    this.apiService.addDataWithoutToken(data, 'admin-dashboard').subscribe((res: any) => {
      if (res.status == 'success') {
        // console.warn(res.results);
        this.adminCount = res.results;
        // console.warn(this.adminCount);

      }
    });

    //this.datasource = '';
    let endpoint = 'getorderlistdata';
    let endpointc = 'getorderlistdata-count';

    let dataa: any = {
      "condition": {
        "limit": 8,
        "skip": 0
      },
      sort: {
        "type": 'desc',
        "field": 'order_id'
      }

    }
    // setTimeout(()=>{    //<<<---    using ()=> syntax
    this.http.httpViaPost(endpointc, dataa).subscribe((res: any) => {
      // console.log('in constructor');
      // console.log(result);
      this.date_search_source_count = res.count;
      //console.warn('blogData c',res);

    }, error => {
      console.log('Oooops!');
    });

    this.http.httpViaPost(endpoint, dataa).subscribe((res: any) => {

      this.orderDataList = res.results.res;
      //console.log('Oooops!',this.orderDataList);
    }, error => {
      console.log('Oooops!');
    });
    //  }, 5000);

    /**upcoming autoship list */
    let upcoming_endpoint = 'getautoshiplistdata';
    let upcoming_endpointc = 'getautoshiplistdata-count';

    let upcoming_data: any = {
      "condition": {
        "limit": 8,
        "skip": 0
      },
      sort: {
        "type": 'desc',
        "field": 'billing_date'
      }

    }

    this.http.httpViaPost(upcoming_endpointc, upcoming_data).subscribe((res: any) => {

      //console.warn('upcoming autoship data count',res);
      this.upcoming_search_source_count = res.count;

    }, error => {
      console.log('Oooops!');
    });

    this.http.httpViaPost(upcoming_endpoint, upcoming_data).subscribe((res: any) => {
      this.UpcomingAutolist = res.results.res;
      //console.log('upcoming autoship data',res);
    }, error => {
      console.log('Oooops!');
    });

  }
  // user Data section
  fetchUserDashboardData() {
    let endpoint = 'getorderlistdata';
    let endpointc = 'getorderlistdata-count';

    let dataa: any = {
      "condition": {
        "limit": 8,
        "skip": 0
      },
      sort: {
        "type": 'desc',
        "field": 'order_id'
      },
      "userid": this.cookieUserallData._id

    }
    this.http.httpViaPost(endpointc, dataa).subscribe((res: any) => {
      // console.log('in constructor');
      // console.log(result);
      //console.warn('user order data',res);
      this.myorder_search_source_count = res.count;
    }, error => {
      console.log('Oooops!');
    });

    this.http.httpViaPost(endpoint, dataa).subscribe((res: any) => {


      console.log('user order data count', res);
      this.userMyorder = res.results.res;
    }, error => {
      console.log('Oooops!');
    });
  }
  /**Users data populated */
  Users(usersdiv: string): void {
    
    // console.log("Users");
    this.usersflage=true;
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


    //scroll to target div
    var elmt: HTMLElement|null = document.getElementById("usersdiv");
    if (elmt) {
      setTimeout(() =>
      elmt.scrollIntoView({behavior: 'smooth', block: 'start', inline: 'nearest'}), 0);
    }
  //scroll to End target div





    this.http.httpViaPost(endpointc, data).subscribe((res:any) => {     

        console.log('in constructor');
        // console.log(result);
        this.user_date_search_source_count =res.count.date_search_source_count;
        console.warn('blogData c',res);

    }, error => {
        console.log('Oooops!');
    });

    this.http.httpViaPost(endpoint,data).subscribe((res:any) => {
        console.log('in constructor');
        // console.log(result);
        this.userDataarray =res.results.res;
        //console.warn('blogData',res);

    }, error => {
        console.log('Oooops!');
    });
    
    // this.vps.scrollToAnchor(id);
    
  }
  //Successful Orders
  SuccessfulOrders(){
    console.log("SuccessfulOrders");
    this.usersflage=false;
    this.successfullflage=true;

   let endpoint = 'successfull-getorderlistdata';
   let endpointc = 'successfull-getorderlistdata-count';

   let dataa: any = {
     "condition": {
       "limit": 8,
       "skip": 0
     },
     sort: {
       "type": 'desc',
       "field": 'order_id'
     }

   }
   
   this.http.httpViaPost(endpointc, dataa).subscribe((res: any) => {
     // console.log('in constructor');
     // console.log(result);
     this.successful_count = res.count;
     //console.warn('blogData c',res);
   }, error => {
     console.log('Oooops!');
   });

   this.http.httpViaPost(endpoint, dataa).subscribe((res: any) => {

     this.successfullOrderDataList = res.results.res;
     //console.log('Oooops!',this.orderDataList);
   }, error => {
     console.log('Oooops!');
   });
  }
  //Incomplete Orders
  IncompleteOrders(){
    console.log("IncompleteOrders");
    this.usersflage=false;
    this.successfullflage=false;
    this.Incompleteflage=true;

   let endpoint = 'incomplete-getorderlistdata';
   let endpointc = 'incomplete-getorderlistdata-count';

   let dataa: any = {
     "condition": {
       "limit": 8,
       "skip": 0
     },
     sort: {
       "type": 'desc',
       "field": 'order_id'
     }

   }
   
   this.http.httpViaPost(endpointc, dataa).subscribe((res: any) => {
     // console.log('in constructor');
     // console.log(result);
     this.Incomplete_count = res.count;
     //console.warn('blogData c',res);
   }, error => {
     console.log('Oooops!');
   });
   
  
   this.http.httpViaPost(endpoint, dataa).subscribe((res: any) => {

     this.IncompleteOrderDataList = res.results.res;
     //console.log('Oooops!',this.orderDataList);
   }, error => {
     console.log('Oooops!');
   });
  }
}
