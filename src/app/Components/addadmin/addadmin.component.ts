
import { matchpwd, nameValidator, phoneValidator } from './validators';
import { HttpServiceService } from 'src/app/services/http-service.service';
import * as moment from 'moment';
import { from } from 'rxjs';
import { MetaService } from '@ngx-meta/core';
import { Component, OnInit, ViewChildren, ViewChild,Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormGroupDirective } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import {CookieService} from 'ngx-cookie-service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-addAdmin',
  templateUrl: './addadmin.component.html',
  styleUrls: ['./addadmin.component.css']
})
export class AddAdminComponent implements OnInit {

  public addAdminForm: FormGroup;
  public stateList: any;
  public cityList: any; 
  public header_text:any="Add Admin";
  public btn_text:any="Submit";
  public allCities:any;
  public message:any='Admin Added Successfully';
  public condition:any;
  public action:any='add';
  public adminData:any;


  @ViewChild(FormGroupDirective, {static: false}) formDirective: FormGroupDirective;

  constructor(public fb: FormBuilder, public httpService: HttpServiceService,
    public cookieService: CookieService, public router: Router,
    public activatedRoute: ActivatedRoute,public snackBar:MatSnackBar,public meta:MetaService) {

      this.meta.setTitle('Virus Medical Face Mask backend | Add Admin');
      // this.meta.setTag('og:description', 'FFP3 Standard medical face masks for best Protection Against COVID-19, filtering 98% germs, viruses and bacteria, and other hazardous particles. Best face masks in the market to prevent COVID-19 infection.');
      // this.meta.setTag('twitter:description', 'FFP3 Standard medical face masks for best Protection Against COVID-19, filtering 98% germs, viruses and bacteria, and other hazardous particles. Best face masks in the market to prevent COVID-19 infection.');
  
      // this.meta.setTag('og:keyword', 'Protection Against COVID-19, COVID-19 Protection Masks, Face Masks for COVID-19');
      // this.meta.setTag('twitter:keyword', 'Protection Against COVID-19, COVID-19 Protection Masks, Face Masks for COVID-19');
      this.meta.setTag('og:description', 'Virus Medical Face Mask backend to keep medical professionals safe and protected against harmful viruses, bacteria, and other critical circumstances, while also tending to their comfort.');
      this.meta.setTag('twitter:description', 'Virus Medical Face Mask backend to keep medical professionals safe and protected against harmful viruses, bacteria, and other critical circumstances, while also tending to their comfort.');
  
      this.meta.setTag('og:keyword', 'Virus Medical Face Mask backend, Medical Face Mask backend, Medical Face Mask backend for Virus');
      this.meta.setTag('twitter:keyword', 'Virus Medical Face Mask backend, Medical Face Mask backend, Medical Face Mask backend for Virus');
  
      this.meta.setTag('og:title', 'Virus Medical Face Mask backend | Add Admin');
      this.meta.setTag('twitter:title', 'Virus Medical Face Mask backend | Add Admin');
      this.meta.setTag('og:type', 'website');
      this.meta.setTag('og:url','https://mask-landingpage-backend.influxiq.com/');    
      this.meta.setTag('og:image', '../../assets/images/logo-fb.jpg');
      this.meta.setTag('twitter:image', '../../assets/images/logo-twitter.jpg');

    this.activatedRoute.params.subscribe(params => {
      if (params['_id'] != null) {
        this.action = "edit";
        this.condition = { id: params._id };
        this.activatedRoute.data.subscribe(resolveData => {
          this.adminData = resolveData.admin_data.res[0];
          // console.log('++++++++++++++++',this.adminData);
        });
      }
      else
        this.action = "add";
    })


    if(router.url != '/admin/add')
    {

      this.addAdminForm = this.fb.group({
        id:null,
        firstname: [null, Validators.required],
        lastname: [null, Validators.required],
        email: [null, Validators.compose([Validators.required, Validators.pattern(/^\s*[\w\-\+_]+(\.[\w\-\+_]+)*\@[\w\-\+_]+\.[\w\-\+_]+(\.[\w\-\+_]+)*\s*$/)])],
        phone: [null, Validators.required],
        zip: [null, Validators.required],
        city: [null, Validators.required],
        state: [null, Validators.required],
        type: ["admin"],
        status:1
      })

    } else {


      this.addAdminForm = this.fb.group({
        id:null,
        firstname: [null, Validators.required],
        lastname: [null, Validators.required],
        email: [null, Validators.compose([Validators.required, Validators.pattern(/^\s*[\w\-\+_]+(\.[\w\-\+_]+)*\@[\w\-\+_]+\.[\w\-\+_]+(\.[\w\-\+_]+)*\s*$/)])],
        phone: [null, Validators.required],
        zip: [null, Validators.required],
        city: [null, Validators.required],
        state: [null, Validators.required],
        password: [null, Validators.required],
        conpass: [null, Validators.required],
        type: ["admin"],
        status:1
      },
      {
        validator: this.machpassword('password', 'conpass')
      });

    }

  

  }

  ngOnInit() {

    switch(this.action) {
      case 'add':
        /* Button text */

      this.message='Admin Added Successfully';
        this.header_text = "Add Admin";
        this.btn_text = "Submit";
  
        break;
      case 'edit':
        /* Button text */
        this.getStateList();
        this.btn_text = "Update ";
        this.message ='Admin Updated Successfully';
        this.setDefaultValue(this.adminData);
        this.header_text = "Edit Admin";
        break;
    }


    this.getStateList();
    this.getCityList();

  }

      /**Miss Match password check function */
      machpassword(passwordkye: string, confirmpasswordkye: string) {
        return (group: FormGroup) => {
          let passwordInput = group.controls[passwordkye],
            confirmpasswordInput = group.controls[confirmpasswordkye];
          if (passwordInput.value !== confirmpasswordInput.value) {
            return confirmpasswordInput.setErrors({ notEquivalent: true });
          }
          else {
            return confirmpasswordInput.setErrors(null);
          }
        };
      }
      getStateList() {
        this.httpService.getJsonObject('assets/data/states.json').subscribe(response => {
          let result: any = {};
          result = response;
          this.stateList = result;
        })
      }
      getCityList() {
        this.httpService.getJsonObject('assets/data/city.json').subscribe((res) => {
          let result: any = {};
          result = res;
          this.cityList = result;
        })
      }
    
    
    
      getCity(event:any) {
        var val = event;
        this.allCities = this.cityList[val];
      }

           /**Submit function */
  addAdminFormSubmit() {
    for (let x in this.addAdminForm.controls) {
      this.addAdminForm.controls[x].markAsTouched();
    }
    if (this.addAdminForm.valid) {
      console.log('hit1')
      /**check id null or not null */
      if(this.addAdminForm.value.id==null){
        delete this.addAdminForm.value.id;
      }
          if (this.addAdminForm.value.conpass != null) {
          delete this.addAdminForm.value.conpass;

        }

        /**Api service for insert form */

        var data = { source: "users", 
                    data: Object.assign(this.addAdminForm.value,this.condition) }
        this.httpService.ResolveViaPost(data, 'addorupdatedata').subscribe((data: any) => {
          // console.log(data);
          if (data.status == 'success') {
          
            this.snackBar.open(this.message,'OK', {
              duration: 3000,
            });

          this.router.navigateByUrl('/admin/list');
          }else{
            // console.log("Add customer Successfully");
            this.formDirective.resetForm();
            this.router.navigateByUrl('/admin/add');
          }
          
        })
    }
  }


  setDefaultValue(defaultValue:any){

    setTimeout(() => {
      this.getCity(this.adminData.state)

    }, 500);
    this.addAdminForm.patchValue({
      firstname:defaultValue.firstname,
      lastname:defaultValue.lastname,
      email:defaultValue.email,
      phone:defaultValue.phone,
      state:defaultValue.state,
      city:defaultValue.city,
      zip:defaultValue.zip,
      status:defaultValue.status,
      type:defaultValue.type
    })
  }


  inputUntouched(val: any) {
    this.addAdminForm.controls[val].markAsUntouched();
  }

  
  



 
}
