import { Component, OnInit } from '@angular/core';
import { HttpServiceService } from 'src/app/services/http-service.service';
import * as moment from 'moment';
import { from } from 'rxjs';
import { MetaService } from '@ngx-meta/core';
import { FormGroup, FormBuilder, Validators, FormGroupDirective } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import {CookieService} from 'ngx-cookie-service';


export interface PeriodicElement {
 
  productcode: number;
  product: string;
  qty: number;
  unitprice: number;
  total: number;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {productcode: 1, product: 'Hydrogen', qty: 1.0079, unitprice: 112, total: 112},
  {productcode: 1, product: 'Hydrogen', qty: 1.0079, unitprice: 112, total: 112},
  {productcode: 1, product: 'Hydrogen', qty: 1.0079, unitprice: 112, total: 112},
  {productcode: 1, product: 'Hydrogen', qty: 1.0079, unitprice: 112, total: 112},
];


export interface TrElement { 
  trid: string;
  marcntID: string;
  type: string;
  datetime: string;
  approval: number;
  authorizationsode: number;
}

const TR_DATA: TrElement[] = [
  {trid: '#1', marcntID: '#1', type: '1.0079', datetime: '12-04-2020', approval: 112, authorizationsode: 112},
];


export interface OrdAssVolumeElement { 
  id: string;
  type: string;
  userID: string;
  date: string;
  amount: number;
  voided: string;
}

const OrdAssVolume_DATA: OrdAssVolumeElement[] = [
  {id: '#1', type: 'admin', userID: '#111', date: '12-04-2020', amount: 112, voided: '112'},
];

@Component({
  selector: 'app-order-edit',
  templateUrl: './order-edit.component.html',
  styleUrls: ['./order-edit.component.css']
})
export class OrderEditComponent implements OnInit {

  displayedcontentsColumns = ['productcode','product', 'qty', 'unitprice', 'total'];
  contentsdataSource = ELEMENT_DATA;

  transactiondisplayedColumns = ['trid', 'marcntID', 'type', 'datetime', 'approval', 'authorizationsode'];
  transactiondataSource = TR_DATA;

  orderassociateddisplayedColumns = ['id', 'type', 'userID', 'date', 'amount', 'voided']; 
  orderassociateddataSource = OrdAssVolume_DATA;

  displayedSubTotalColumns = ['emptyFooter', 'emptyFooter', 'emptyFooter', 'subtotalTitle', 'subtotalAmount'];
  displayedShippingandHandlingColumns = ['emptyFooter', 'emptyFooter', 'emptyFooter', 'shippingandhandlingTitle', 'shippingandhandlingAmount'];
  displayedTaxColumns = ['emptyFooter', 'emptyFooter', 'emptyFooter', 'taxTitle', 'taxAmount'];


  public orderEditform: FormGroup;
  public orderData:any=[];
  public condition:any;
  public hideRequiredControl:any;

  public header_text:any="Add Order";

  constructor(public activatedRoute:ActivatedRoute,public fb: FormBuilder,public meta: MetaService) { 

    this.meta.setTitle('Virus Medical Face Mask backend | Edit Order');
    this.meta.setTag('og:description', 'Virus Medical Face Mask backend to keep medical professionals safe and protected against harmful viruses, bacteria, and other critical circumstances, while also tending to their comfort.');
    this.meta.setTag('twitter:description', 'Virus Medical Face Mask backend to keep medical professionals safe and protected against harmful viruses, bacteria, and other critical circumstances, while also tending to their comfort.');

    this.meta.setTag('og:keyword', 'Virus Medical Face Mask backend, Medical Face Mask backend, Medical Face Mask backend for Virus');
    this.meta.setTag('twitter:keyword', 'Virus Medical Face Mask backend, Medical Face Mask backend, Medical Face Mask backend for Virus');

    this.meta.setTag('og:title', 'Virus Medical Face Mask backend | Edit Order');
    this.meta.setTag('twitter:title', 'Virus Medical Face Mask backend | Edit Order');
    this.meta.setTag('og:type', 'website');
    this.meta.setTag('og:url','https://mask-landingpage-backend.influxiq.com/');    
    this.meta.setTag('og:image', '../../assets/images/logo-fb.jpg');
    this.meta.setTag('twitter:image', '../../assets/images/logo-twitter.jpg');


    this.activatedRoute.params.subscribe(params => {
      this.header_text = "Order View";
      if (params['_id'] != null) {
        this.condition = { id: params._id };
        this.activatedRoute.data.subscribe(resolveData => {
          this.orderData = resolveData.orderData.res;
          console.log(this.orderData);
        });
      }
    })
    // this.orderEditform = this.fb.group({
    //   id:null,
    //   username: [null, Validators.required],      
    //   orderid: [null, Validators.required],
    //   orderstatus: [null, Validators.required],
    //   paymentstatus: [null, Validators.required],
    //   dateadded: [null, Validators.required],
    //   ordersource: [null, Validators.required],
    //   billingprofile: [null, Validators.required],
    //   shippinginstruction: [null, Validators.required],
    //   fulfillmentnotes: [null, Validators.required],
    //   usercomments: [null, Validators.required],
    //   admincomments: [null, Validators.required],
    //   systemlog: [null, Validators.required],
    //   productname: [null, Validators.required],
    //   productquantity: [null, Validators.required],
    //   productprice: [null, Validators.required],
    //   subtotal: [null, Validators.required],
    //   shipping:[null, Validators.required],
    //   tax:[null, Validators.required],
    //   total:[null, Validators.required]
    // });
  }



  ngOnInit() {

  
  }

 

}
