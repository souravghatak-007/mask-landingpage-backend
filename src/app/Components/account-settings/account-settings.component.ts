
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormGroupDirective } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { ApiService } from '../../api.service';
import { MatSnackBar } from '@angular/material';
import { MetaService } from '@ngx-meta/core';
@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrls: ['./account-settings.component.css']
})
export class AccountSettingsComponent implements OnInit {
  @ViewChild(FormGroupDirective, { static: false }) formDirective: FormGroupDirective;
​
  // isPasswordVisible: Boolean = false;
​
  isPasswordVisible: Boolean = true;
​
​
  public index: number;
  public user_cookies: any;
  public UpdateForm: FormGroup;
  public changePasswordFormGroup: FormGroup;
  public cookies_id: any;
  public userData: any = [];
  public profilePicture: any;
  
  public images_array: any = [];
  public states: any;
  public cities: any;
  public allCities: any;
  constructor(public meta: MetaService, public fb: FormBuilder, public apiService: ApiService, public cook: CookieService,public snackBar :MatSnackBar) {

    this.meta.setTitle('Virus Medical Face Mask backend | My Account');
    this.meta.setTag('og:description', 'Virus Medical Face Mask backend to keep medical professionals safe and protected against harmful viruses, bacteria, and other critical circumstances, while also tending to their comfort.');
    this.meta.setTag('twitter:description', 'Virus Medical Face Mask backend to keep medical professionals safe and protected against harmful viruses, bacteria, and other critical circumstances, while also tending to their comfort.');

    this.meta.setTag('og:keyword', 'Virus Medical Face Mask backend, Medical Face Mask backend, Medical Face Mask backend for Virus');
    this.meta.setTag('twitter:keyword', 'Virus Medical Face Mask backend, Medical Face Mask backend, Medical Face Mask backend for Virus');

    this.meta.setTag('og:title', 'Virus Medical Face Mask backend | My Account');
    this.meta.setTag('twitter:title', 'Virus Medical Face Mask backend | My Account');
    this.meta.setTag('og:type', 'website');
    this.meta.setTag('og:url','https://mask-landingpage-backend.influxiq.com/');    
    this.meta.setTag('og:image', '../../assets/images/logo-fb.jpg');
    this.meta.setTag('twitter:image', '../../assets/images/logo-twitter.jpg');



      this.allStateCityData();
      let allcookies: any;
    allcookies = cook.getAll();
    this.user_cookies = JSON.parse(allcookies.user_details);
    this.cookies_id = this.user_cookies._id;
​
​
    this.UpdateForm = this.fb.group({
      // id: [null, null],
      email: [null, Validators.compose([Validators.required, Validators.pattern(/^\s*[\w\-\+_]+(\.[\w\-\+_]+)*\@[\w\-\+_]+\.[\w\-\+_]+(\.[\w\-\+_]+)*\s*$/)])],
      firstname: [null, Validators.required],
      lastname: [null, Validators.required],
      phone: [null, Validators.required],
      // address: [null, Validators.required],
      zip: [null, Validators.required],
      city: [null, Validators.required],
      state: [null, Validators.required]
​
    });
    this.changePasswordFormGroup = this.fb.group({
      oldPassword: [null, Validators.required],
      newPassword: ['', Validators.required],
      confirmPassword: []
    }, { validator: this.matchpassword('newPassword', 'confirmPassword') ,
         validator1:this.misMatchPassword('oldPassword','newPassword')})
     }
     ngOnInit() {
      this.getdata();
    }
    inputUntouched(form: any, val: any) {
      form.controls[val].markAsUntouched();
    }
  
    matchpassword(passwordkye: string, confirmpasswordkye: string) {
      return (group: FormGroup) => {
        let passwordInput = group.controls[passwordkye],
          confirmpasswordInput = group.controls[confirmpasswordkye];
        if (passwordInput.value !== confirmpasswordInput.value) {
          return confirmpasswordInput.setErrors({ notEquivalent: true });
        } else {
          return confirmpasswordInput.setErrors(null);
        }
      };
    }
    misMatchPassword(oldPassword: string, newPassword: string) {
     
      return (group: FormGroup) => {
        let oldPasswordInput = group.controls[oldPassword],
        newPasswordInput = group.controls[newPassword];
        if (oldPasswordInput.value === newPasswordInput.value) {
          return newPasswordInput.setErrors({ notEquivalent: true });
        } else {
          return oldPasswordInput.setErrors(null);
        }
      };
    }
  
  
    changePasswordFormSubmit() {
  
      for (let x in this.changePasswordFormGroup.controls) {
        this.changePasswordFormGroup.controls[x].markAsTouched();
      }
      if (this.changePasswordFormGroup.valid) {
        delete this.changePasswordFormGroup.value.confirmPassword;
        let endpoint: any = "changepassword";
        let data = {
          _id: this.cookies_id,
          adminflag: 0,
          oldPassword: this.changePasswordFormGroup.value.oldPassword,
          newPassword: this.changePasswordFormGroup.value.newPassword
        }
  
        this.apiService.serviceViaPost(data, endpoint).subscribe((res:any)=> {
          if(res.Status=='true'){
            let message = "Successfully Changed Password";
            let action  = "Ok"
            this.snackBar.open(message, action, {
              duration: 2000,
            });
          }else{
            let message = res.message;
            let action  = "Ok"
            this.snackBar.open(message, action, {
              duration: 3000,
            });
          }
        })
      }
    }                                               
    getdata() {
      let data: any = {
        endpoint: 'datalist',
        source: 'users_view',
        condition: {
          "_id_object": this.cookies_id
        }
      }
      this.apiService.ResolveViaPost(data,'datalist').subscribe((res: any) => {
        this.userData = res.res[0];
        this.getCity(this.userData.state);
        this.UpdateForm.controls['firstname'].patchValue(this.userData.firstname);
        this.UpdateForm.controls['lastname'].patchValue(this.userData.lastname);
        this.UpdateForm.controls['email'].patchValue(this.userData.email);
        this.UpdateForm.controls['phone'].patchValue(this.userData.phone);
        // this.UpdateForm.controls['address'].patchValue(this.userData.address);
        this.UpdateForm.controls['zip'].patchValue(this.userData.zip);
        this.UpdateForm.controls['city'].patchValue(this.userData.city);
        this.UpdateForm.controls['state'].patchValue(this.userData.state);
      });
    }
    /**for getting all states & cities function start here**/
    allStateCityData() {
      this.apiService.getSiteSettingData("./assets/data/states.json").subscribe(response => {
        this.states = response;
      });
  
      this.apiService.getSiteSettingData("./assets/data/city.json").subscribe(response => {
        this.cities = response;
        this.getdata();
      });
    }
    /**for getting all states & cities  function end here**/
    getCity(event) {
      var val = event;
      this.allCities = this.cities[val];
    }
    UpdateFormSubmit() {
      for (let x in this.UpdateForm.controls) {
        this.UpdateForm.controls[x].markAsTouched();
      }
  
      if (this.UpdateForm.valid) {
        let endpoint: any = "addorupdatedata";
        let data: any = {
          source: "users",
          data: {
            id: this.cookies_id,
            firstname: this.UpdateForm.value.firstname,
            lastname: this.UpdateForm.value.lastname,
            email: this.UpdateForm.value.email,
            phone: this.UpdateForm.value.phone,
            // address: this.UpdateForm.value.address,
            zip: this.UpdateForm.value.zip,
            city: this.UpdateForm.value.city,
            state: this.UpdateForm.value.state,
            
          }
        };
  
        this.apiService.ResolveViaPost(data, endpoint).subscribe(res => {
          let message = "Successfully Updted";
          let action  = "Ok"
          this.snackBar.open(message, action, {
            duration: 1000,
          });
      
  
        })
      }else{
        console.log("invalid form");
      }
  
    }
​
}