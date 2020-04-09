import { Component, OnInit } from '@angular/core';
import { HttpServiceService } from 'src/app/services/http-service.service';
import * as moment from 'moment';
import { from } from 'rxjs';
import { MetaService } from '@ngx-meta/core';
import { FormGroup, FormBuilder, Validators, FormGroupDirective } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import {CookieService} from 'ngx-cookie-service';

@Component({
  selector: 'app-order-edit',
  templateUrl: './order-edit.component.html',
  styleUrls: ['./order-edit.component.css']
})
export class OrderEditComponent implements OnInit {
  public orderEditform: FormGroup;
  public orderData:any;
  public condition:any;

  constructor(public activatedRoute:ActivatedRoute,public fb: FormBuilder) { 

    this.activatedRoute.params.subscribe(params => {
      if (params['_id'] != null) {
        this.condition = { id: params._id };
        this.activatedRoute.data.subscribe(resolveData => {
          this.orderData = resolveData.orderData.res[0];
          console.log('++++++++++++++++',this.orderData.user_info.firstname);
        });
      }
    })
    this.orderEditform = this.fb.group({
      id:null,
      orderid: [null, Validators.required],
      username: [null, Validators.required],
      dateadded: [null, Validators.required],
      productname: [null, Validators.required],
      productquantity: [null, Validators.required],
      productprice: [null, Validators.required],
      subtotal: [null, Validators.required],
      shipping:[null, Validators.required],
      tax:[null, Validators.required],
      total:[null, Validators.required]
    })
    this.orderEditform.patchValue({
      orderid:this.orderData._id,
      username:this.orderData.user_info.firstname,
      productname:this.orderData.product_name,
      productquantity:this.orderData.product_qty,
      productprice:this.orderData.product_price,
      subtotal:this.orderData.product_subtotal,
      shipping:this.orderData.shipping_charge,
      tax:this.orderData.sale_tax,
      total:this.orderData.product_total
})
  }

  ngOnInit() {
  }

}
