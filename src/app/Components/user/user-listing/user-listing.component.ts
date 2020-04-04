import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { HttpServiceService } from '../../../services/http-service.service';
import { Validators } from "@angular/forms";
declare var moment:any;

@Component({
  selector: 'app-user-listing',
  templateUrl: './user-listing.component.html',
  styleUrls: ['./user-listing.component.css']
})
export class UserListingComponent implements OnInit {
  public userDataarray: any = [];
  public datasource: any; 
  public allUserData_skip: any = [
    "_id",
    "id",
    "user_type",
    "password",
    "created_at",
    "access_code",
    "address",
    "city",
    "state",
    "updated_at",
    "zip"
  ];
  public editUrl: any = "admin/role-management/edit";
  public allUserData_modify_header: any = {
    "firstname": "First Name",
    "lastname": "Last Name",
    "email": "Email",
    "phone": "Phone Number",
    "status": "Status",
  };

  public UpdateEndpoint: any = "addorupdatedata";
  public deleteEndpoint: any = "deletesingledata";
  public previewModal_skip: any = [
    "_id",
    "user_type",
    "password",
    "created_at",
    "access_code",
    "updated_at",
  ];
  public tableName: any = "data_masklandingpage";
  public apiUrl: any;
  public status: any = [{ val: 1, 'name': 'Active' }, { val: 0, 'name': 'Inactive' }];
  public SearchingEndpoint: any = "datalist";
  public SearchingSourceName: any = "";
  public date_search_source_count: any=0;
  public search_settings: any =
    {
      selectsearch: [{ label: 'Search By Status', field: 'status', values: this.status }],
      textsearch: [{ label: "Search By Name", field: 'name_search' },
      { label: "Search By E-Mail", field: 'email' }],

    };
  public user_cookie: any;

  constructor(public router: Router, public route: ActivatedRoute, public _apiService: HttpServiceService) {
      // console.log('custom_link');
      // console.log(this.custom_link);
      // this.datasource = '';
      // let endpoint='datalist';
      // let endpointc='getadminbloglistdata-count';
      // let data:any={
      //     "condition":{
      //         "limit":10,
      //         "skip":0
      //     },
      // sort:{
      //     "type":'desc',
      //     "field":'firstname'
      // }

      // }
      // this._apiService.httpViaPost(endpointc, data).subscribe((res:any) => {
      //     // console.log('in constructor');
      //     // console.log(result);
      //     this.date_search_source_count =res.count;
      //     console.warn('blogData c',res);

      // }, error => {
      //     console.log('Oooops!');
      // });

      // this._apiService.httpViaPost(endpoint,data).subscribe((res:any) => {
      //     // console.log('in constructor');
      //     // console.log(result);
      //     this.userDataarray =res.results.res;
      //     //console.warn('blogData',res);

      // }, error => {
      //     console.log('Oooops!');
      // });
      // this.user_cookie = cookie.get('jwtToken');
      this.apiUrl = _apiService.baseUrl;

  }

  ngOnInit() {
    this.route.data.forEach((data) => {
      this.userDataarray = data.userManagementData.res;
    })
  }


}
