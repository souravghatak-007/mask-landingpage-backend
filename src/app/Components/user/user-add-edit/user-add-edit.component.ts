import { Component, OnInit,ViewChild} from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormGroupDirective } from '@angular/forms';
import { HttpServiceService } from '../../../services/http-service.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MetaService } from '@ngx-meta/core';

@Component({
  selector: 'app-user-add-edit',
  templateUrl: './user-add-edit.component.html',
  styleUrls: ['./user-add-edit.component.css']
})
export class UserAddEditComponent implements OnInit {
  @ViewChild(FormGroupDirective, {static: false}) formDirective: FormGroupDirective;
  public myForm: FormGroup;
  public header_text:any="Add User";

  constructor(public formbuilder: FormBuilder,public _apiService: HttpServiceService,public router:Router,public ActivatedRoute:ActivatedRoute,public meta:MetaService) { 

    this.meta.setTitle('Virus Medical Face Mask backend | Add Edit Admin User Management');
    this.meta.setTag('og:description', 'Virus Medical Face Mask backend to keep medical professionals safe and protected against harmful viruses, bacteria, and other critical circumstances, while also tending to their comfort.');
    this.meta.setTag('twitter:description', 'Virus Medical Face Mask backend to keep medical professionals safe and protected against harmful viruses, bacteria, and other critical circumstances, while also tending to their comfort.');

    this.meta.setTag('og:keyword', 'Virus Medical Face Mask backend, Medical Face Mask backend, Medical Face Mask backend for Virus');
    this.meta.setTag('twitter:keyword', 'Virus Medical Face Mask backend, Medical Face Mask backend, Medical Face Mask backend for Virus');

    this.meta.setTag('og:title', 'Virus Medical Face Mask backend | Add Edit Admin User Management');
    this.meta.setTag('twitter:title', 'Virus Medical Face Mask backend | Add Edit Admin User Management');
    this.meta.setTag('og:type', 'website');
    this.meta.setTag('og:url','https://mask-landingpage-backend.influxiq.com/');    
    this.meta.setTag('og:image', '../../assets/images/logo-fb.jpg');
    this.meta.setTag('twitter:image', '../../assets/images/logo-twitter.jpg');


    //console.log(this.ActivatedRoute.snapshot.params.id);
    if(this.ActivatedRoute.snapshot.params.id){
      this.header_text = "Edit User";
      let data:any={
        "source":"users",
        "condition":{
          "_id_object":this.ActivatedRoute.snapshot.params.id
        }
      }
      this._apiService.httpViaPost('datalist',data).subscribe((res:any) => {

        // console.warn(res.res[0]);
        this.setDefaultValue(res.res[0]);
       
       });
    }
    this.myForm=this.formbuilder.group({
      id:[null],
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', Validators.compose([Validators.required, Validators.pattern(/^\s*[\w\-\+_]+(\.[\w\-\+_]+)*\@[\w\-\+_]+\.[\w\-\+_]+(\.[\w\-\+_]+)*\s*$/)])],
      phone: ['', Validators.required],
      zip: ['', Validators.required],
      state: ['', Validators.required],
      country: ['', Validators.required],
      password: [''],
      conpassword:[''],
      type:['user']
    },{ validator: this.matchingPasswords('password', 'conpassword')
      
    });
  }
  public matchingPasswords(passwordKey: string, confirmPasswordKey: string){
    return (group: FormGroup): {[key: string]: any} => {

      let password = group.controls[passwordKey];
      let confirmPassword = group.controls[confirmPasswordKey];

      if (password.value !== confirmPassword.value){
        confirmPassword.setErrors({'incorrect': true});
        return {
          mismatchedPasswords: true
        };
      }
    }
  }
  ngOnInit() {
  }
  /**edit function */
  setDefaultValue(defaultValue) {
    //console.log(defaultValue);
    this.myForm.patchValue({
      id:defaultValue._id,
      firstname:defaultValue.firstname,
      lastname:defaultValue.lastname,
      email:defaultValue.email,
      phone:defaultValue.phone,
      zip:defaultValue.zip,
      state: defaultValue.state,
      country:defaultValue.country,
    })

  }
/**submit function */
submit(){
  console.log(this.myForm.value);
  for (let i in this.myForm.controls) {
    this.myForm.controls[i].markAsTouched();
  }
  if(this.myForm.valid){
    delete this.myForm.value.conpassword;
    if(this.myForm.value.id==null){
      delete this.myForm.value.id;
      let data = {
        "source":"users",
        "data":this.myForm.value,       
    };
    this._apiService.httpViaPost('addorupdatedata',data).subscribe((res:any) => {

     console.warn(res);
     this.myForm.reset();
    //  if(res.status=="success" || res.msg=="We’ve sent an email to this address to reset your password"){
    //   this.myForm.reset();
     
    //  }

    });
    }else{
      delete this.myForm.value.password;
      console.log("else",this.myForm.value);
      let data = {
        "source":"users",
        "data":this.myForm.value,       
    };
    this._apiService.httpViaPost('addorupdatedata',data).subscribe((res:any) => {

     console.warn(res);
     this.myForm.reset();
      this.router.navigateByUrl('/admin/user-management');
    });
    }
   
  }
}

inputUntouch(form: any, val: any) {
  form.controls[val].markAsUntouched();
}
}
