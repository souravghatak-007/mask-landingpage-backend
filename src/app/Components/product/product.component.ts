import { Component, OnInit,ViewChild } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { FormGroup, FormBuilder, Validators, FormGroupDirective } from '@angular/forms';
import {ApiService} from './../../api.service';
import { MetaService } from '@ngx-meta/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {environment} from "../../../environments/environment";


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  @ViewChild(FormGroupDirective, {static: false}) formDirective: FormGroupDirective;
  public orderForm: FormGroup;
  public countrylistarray:any=[];
  public countrylistarray2:any=[];
  public product:any=[false,false,false];
  public product_qty:number=3;
  public qty:number=1;
  public total:number=0;
  public subtotal:number=0;
  public price:number=39.95;
  public saletax:number=0;
  public shipping:number=4.95;
  public statelistarray:any=[];
  public has_autoship:any='';
  public autoship_data:any='';
  public statelistarray2:any=[];
  public Noloading: boolean = false;
  public transection_Type =  environment["Tran_type"];
  public cookieUserallData:any=JSON.parse(this.cookie.get('user_details'))
  constructor(public _snackBar: MatSnackBar,public router: Router, public meta: MetaService, public apiService:ApiService,public activatedRoute: ActivatedRoute,public cookie: CookieService,public formbuilder: FormBuilder) {    window.scrollTo(500, 0);
   
    this.Noloading=false;
    // console.warn(this.transection_Type);
    console.log('cookie',this.cookieUserallData);
  
    // this.meta.update({ name: 'description', content: 'Dynamic Hello Angular Lovers description!' });
    this.meta.setTag('og:description', 'FFP3 Standard medical face masks for best Protection Against COVID-19, filtering 98% germs, viruses and bacteria, and other hazardous particles. Best face masks in the market to prevent COVID-19 infection.');
    this.meta.setTag('twitter:description', 'FFP3 Standard medical face masks for best Protection Against COVID-19, filtering 98% germs, viruses and bacteria, and other hazardous particles. Best face masks in the market to prevent COVID-19 infection.');

    this.meta.setTag('og:keyword', 'Protection Against COVID-19, COVID-19 Protection Masks, Face Masks for COVID-19');
    this.meta.setTag('twitter:keyword', 'Protection Against COVID-19, COVID-19 Protection Masks, Face Masks for COVID-19');

    this.meta.setTag('og:title', 'Virus Barrier Medical Face Mask');
    this.meta.setTag('twitter:title', 'Virus Barrier Medical Face Mask');
    this.meta.setTag('og:type', 'website');
    this.meta.setTag('og:url','https://mask-landingpage.influxiq.com/');
    this.meta.setTag('og:image', 'https://all-frontend-assets.s3.amazonaws.com/bvt-mask-assetc/images/144-144.png');
       //<<<---    using ()=> syntax
      this.genarateForm();
    
  }

  ngOnInit() {
    this.getCountryStateCityList();
    this.patchValue();
  }
  genarateForm(){
    this.orderForm=this.formbuilder.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', Validators.compose([Validators.required, Validators.pattern(/^\s*[\w\-\+_]+(\.[\w\-\+_]+)*\@[\w\-\+_]+\.[\w\-\+_]+(\.[\w\-\+_]+)*\s*$/)])],
      phone: [''],
      city: [''],
      state: [''],
      country:[''],
      zip: [''],
      companyname:[''],
      billing_postal:['',Validators.required],
      billing_country:['',Validators.required],
      billing_state:['',Validators.required],
      billing_city:['',Validators.required],
      billing_address:['',Validators.required],
      billing_phone:['',Validators.required],
      billing_name:['',Validators.required],
      shipping_name:['',Validators.required],
      shipping_phone:['',Validators.required],
      shipping_address:['',Validators.required],
      shipping_city:['',Validators.required],
      shipping_state:['',Validators.required],
      shipping_country:['',Validators.required],
      shipping_postalcode:['',Validators.required],
      card_type:['',Validators.required],
      card_expyear:['',Validators.required],
      card_expmonth:['',Validators.required],
      card_cvv:['',Validators.required],
      card_cc:['',Validators.required],
      acceptform:[null,Validators.required]
    });
  }


  checkqty(){
    if(this.product_qty<3) this.product_qty=3;
    this.calculatecost();
  }
  resetproduct(){
    this.product=[false,false,false];
    this.has_autoship=false;
    this.autoship_data='';
    setTimeout(()=>{
      this.calculatecost();
    }, 1000);
  }
  setproduct(val:any){
    this.product=[false,false,false];
    setTimeout(()=>{
      this.product[val]=true;
      this.calculatecost();
    }, 1000);

  }

  calculatecost(){
    if(this.product[0]==true){
      this.shipping=4.95;
      this.qty=1;
      this.price=39.95;
    }
    if(this.product[1]==true){
      this.shipping=4.95;
      this.qty=2;
      this.price=(37.95);
    }
    if(this.product[2]==true){
      this.shipping=4.95;
      this.qty=this.product_qty;
      this.price=35.95;
    }
    this.saletax=((this.price*this.qty)/100*6);
    this.saletax=parseFloat(this.saletax.toFixed(2));
    this.subtotal=(this.price*this.qty);
    this.subtotal=parseFloat(this.subtotal.toFixed(2));
    if(this.subtotal>100) this.shipping=0;
    this.total=(this.subtotal+this.shipping+this.saletax);
    this.total=parseFloat(this.total.toFixed(2));
  }
  /**api service for json data of state country and city */
  getCountryStateCityList() {
    this.apiService.getJsonObject('assets/json/coun.json')     // json for english-speaking-country
      .subscribe((res:any) => {
        //console.log(res.countries);
        this.countrylistarray = res.countries;
      });

    this.apiService.getJsonObject('assets/json/coun.json')     // json for english-speaking-country
      .subscribe((res:any) => {
        //console.log(res.countries);
        this.countrylistarray2 = res.countries;
      });
  }
  /**country wise state function */
  setState(country:any){
   // console.warn(country);
    for (let i in this.countrylistarray) {
      //console.log(this.countrylistarray[i].country);
      if (this.countrylistarray[i].country == country) {
        this.statelistarray = this.countrylistarray[i].states;
        // console.log(this.statelistarray);
      }
    }
  }
  /**country wise state function for shipping details*/
  setStateShipping(country:any){
    //console.warn(country);
    for (let i in this.countrylistarray) {
      //console.log(this.countrylistarray[i].country);
      if (this.countrylistarray[i].country == country) {
        this.statelistarray2 = this.countrylistarray[i].states;
        // console.log(this.statelistarray);
      }
    }
  }

  /**patch value form cookie */
  patchValue(){

    this.orderForm.patchValue({
      firstname:this.cookieUserallData.firstname,
      lastname:this.cookieUserallData.lastname,
      email:this.cookieUserallData.email,
      phone:this.cookieUserallData.phone,
      city:this.cookieUserallData.city,
      state:this.cookieUserallData.state,
      country:this.cookieUserallData.country,
      zip:this.cookieUserallData.zip,
      companyname:this.cookieUserallData.companyname
        });
  }

  inputUntouch(form: any, val: any) {
    form.controls[val].markAsUntouched();
  }

  /**copy billing address to shipping address*/

  handleSelected($event) {
    if ($event.target.checked === true) {
      this.orderForm.controls['shipping_postalcode'].patchValue(this.orderForm.controls['billing_postal'].value);
      this.orderForm.controls['shipping_city'].patchValue(this.orderForm.controls['billing_city'].value);
      this.orderForm.controls['shipping_name'].patchValue(this.orderForm.controls['billing_name'].value);
      this.orderForm.controls['shipping_address'].patchValue(this.orderForm.controls['billing_address'].value);
      this.orderForm.controls['shipping_country'].patchValue(this.orderForm.controls['billing_country'].value);
      this.setStateShipping(this.orderForm.controls['billing_country'].value);
      this.orderForm.controls['shipping_state'].patchValue(this.orderForm.controls['billing_state'].value);
      this.orderForm.controls['shipping_phone'].patchValue(this.orderForm.controls['billing_phone'].value);

      // this.orderForm.controls['shipping_country'].setValue(this.orderForm.controls['billing_country'].value);
      // for(let i in this.countrylistarray2){
      //   console.log(this.countrylistarray2[i].country);
      //   if(this.countrylistarray2[i].country == this.orderForm.controls['billing_country'].value){
      //     this.countrylistarray2=this.countrylistarray2[i];
      //     console.log(this.countrylistarray2);
      //   }
      // }
    }
  }


  /**Submit submit */
  submit(){
    for (let i in this.orderForm.controls) {
      this.orderForm.controls[i].markAsTouched();
    }

    let dataset:any={};
    dataset=this.orderForm.value;
    dataset.product_qty=this.qty;
    dataset.price=this.price;
    dataset.sale_tax=this.saletax;
    dataset.subtotal=this.subtotal;
    dataset.shipping_charge=this.shipping;
    dataset.total=this.total;
    dataset.transactiontype="TEST";
    dataset.autoship_data=this.autoship_data;
    dataset.has_autoship=this.has_autoship;
    dataset.order_status='Incomplete';
    console.log('dataset',dataset);
  
    if(dataset.total==0){
     this._snackBar.open('please choose a product ','',{
      duration: 3000
     });
     return;
    }
    if(dataset.has_autoship==true && dataset.autoship_data==''){
      this._snackBar.open('please choose Autoship Option','',{
        duration: 3000
       });
       return;
    }
    // console.log(this.orderForm.value,'p',this.product,'dataset',dataset);
    if(this.orderForm.valid && this.orderForm.controls['acceptform'].value){
      this.Noloading=true;
      delete this.orderForm.value.acceptform;
      //console.warn("sucess Submit",dataset);
      // api call
      let data:any={
        "data":dataset,
        "userid":this.cookieUserallData._id
        
      }
      this.apiService.addDataWithoutToken(data, 'masklanding-order').subscribe((res:any) => {

        console.warn(res);

     if(res.status=="success" && res.results.UAPIResponse.statusCode > 0){
       this.Noloading=false;
       this._snackBar.open(res.results.UAPIResponse.statusMessage,'',{
        duration: 3000
       });
        
     }else{
       console.log("all success");
       this.Noloading=false;

       this.router.navigateByUrl('user/success/'+res.order_id);
     }
    
    });
    }
  }
}
