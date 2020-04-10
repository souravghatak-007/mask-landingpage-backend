import { Component, OnInit,ViewChild} from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormGroupDirective } from '@angular/forms';
import { HttpServiceService } from '../../../services/http-service.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-add-edit',
  templateUrl: './user-add-edit.component.html',
  styleUrls: ['./user-add-edit.component.css']
})
export class UserAddEditComponent implements OnInit {
  @ViewChild(FormGroupDirective, {static: false}) formDirective: FormGroupDirective;
  public myForm: FormGroup;

  constructor(public formbuilder: FormBuilder,public _apiService: HttpServiceService,public router:Router,public ActivatedRoute:ActivatedRoute) { 
    //console.log(this.ActivatedRoute.snapshot.params.id);
    if(this.ActivatedRoute.snapshot.params.id){
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
