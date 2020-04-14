import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormGroupDirective } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { ApiService } from '../../api.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-user-account-settings',
  templateUrl: './user-account-settings.component.html',
  styleUrls: ['./user-account-settings.component.css']
})
export class UserAccountSettingsComponent implements OnInit {
  public UpdateForm: FormGroup;
  public userData: any = [];
  public countrylistarray: any = [];
  public statelistarray: any = [];
  public changePasswordFormGroup: FormGroup;

  constructor(public fb: FormBuilder, public apiService: ApiService, public cook: CookieService,public snackBar :MatSnackBar) {
    let allcookies: any;
    allcookies = cook.getAll();
    this.userData = JSON.parse(allcookies.user_details);
   // console.log(this.userData);
    this.UpdateForm = this.fb.group({
      // id: [null, null],
      email: [null, Validators.compose([Validators.required, Validators.pattern(/^\s*[\w\-\+_]+(\.[\w\-\+_]+)*\@[\w\-\+_]+\.[\w\-\+_]+(\.[\w\-\+_]+)*\s*$/)])],
      firstname: [null, Validators.required],
      lastname: [null, Validators.required],
      phone: [null, Validators.required],
      // address: [null, Validators.required],
      zip: [null, Validators.required],
      city: [null, Validators.required],
      state: [null, Validators.required],
      country: [null, Validators.required],
      status: 1,
      type:[null]
    });
    this.patchvalue();

    this.changePasswordFormGroup = this.fb.group({
      oldPassword: [null, Validators.required],
      newPassword: ['', Validators.required],
      confirmPassword: [null]
    }, { validator: this.matchpassword('newPassword', 'confirmPassword') ,
         validator1:this.misMatchPassword('oldPassword','newPassword')})
  }

  ngOnInit() {
    this.getCountryStateCityList();
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
     // console.warn(this.changePasswordFormGroup.value);
      delete this.changePasswordFormGroup.value.confirmPassword;
      let endpoint: any = "changepassword";
      let data = {
        _id: this.userData._id,
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
  getCountryStateCityList() {
    this.apiService.getJsonObject('assets/json/coun.json')     // json for english-speaking-country
      .subscribe((res: any) => {
        // console.log(res.countries);
        this.countrylistarray = res.countries;
      });
  }
  /**country wise state function */
  setState(country: any) {
    //console.warn(country);
    this.getCountryStateCityList();

    setTimeout(() => {    //<<<---    using ()=> syntax
      for (let i in this.countrylistarray) {
        if (this.countrylistarray[i].country == country) {
          this.statelistarray = this.countrylistarray[i].states;
        }
      }
    }, 3000);

  }
  patchvalue() {
    this.UpdateForm = this.fb.group({
      email: this.userData.email,
      firstname: this.userData.firstname,
      lastname: this.userData.lastname,
      phone: this.userData.phone,
      zip: this.userData.zip,
      city: this.userData.city,
      country: this.userData.country,
      state: this.userData.state,
      type:this.userData.type
    });
    this.setState(this.userData.country);
  }
  inputUntouched(form: any, val: any) {
    form.controls[val].markAsUntouched();
  }
  UpdateFormSubmit() {
    for (let x in this.UpdateForm.controls) {
      this.UpdateForm.controls[x].markAsTouched();
    }

    if(this.UpdateForm.valid){
      let data:any={
        source: "users",
       data:{
       
        id: this.userData._id,
        firstname: this.UpdateForm.value.firstname,
        lastname: this.UpdateForm.value.lastname,
        email: this.UpdateForm.value.email,
        phone: this.UpdateForm.value.phone,
        zip: this.UpdateForm.value.zip,
        city: this.UpdateForm.value.city,
        country:this.UpdateForm.value.country,
        state: this.UpdateForm.value.state,
        type: this.UpdateForm.value.type,
      }
    }
      //console.warn(data);
      
      this.apiService.CustomRequest(data,'addorupdatedata').subscribe((res:any)=>{
        console.log(res)
        if(res.status=="success"){
          this.UpdateForm.reset();
          this.snackBar.open('Successfully Updated', '', {
            duration: 1000,
          });
        }
      });
    }
  }
}
