import { Component, OnInit, Inject } from '@angular/core';
import { HttpServiceService } from 'src/app/services/http-service.service';
import * as moment from 'moment';
import { from } from 'rxjs';
import { MetaService } from '@ngx-meta/core';
// import { FormGroup, FormBuilder, Validators, FormGroupDirective } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiService } from '../../../api.service';

export interface DialogData {
  alldata: any;
}

export interface PeriodicElement {

  productcode: number;
  product: string;
  qty: number;
  unitprice: number;
  total: number;
}




export interface TrElement {
  trid: string;
  marcntID: string;
  type: string;
  datetime: string;
  approval: number;
  authorizationsode: number;
}

const TR_DATA: TrElement[] = [
  { trid: '#1', marcntID: '#1', type: '1.0079', datetime: '12-04-2020', approval: 112, authorizationsode: 112 },
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
  { id: '#1', type: 'admin', userID: '#111', date: '12-04-2020', amount: 112, voided: '112' },
];

@Component({
  selector: 'app-order-edit',
  templateUrl: './order-edit.component.html',
  styleUrls: ['./order-edit.component.css']
})
export class OrderEditComponent implements OnInit {
  public cookieUserallData: any = JSON.parse(this.cookieService.get('user_details'));
  public notes:any=null;
  public notesFlag:boolean=false;

  displayedcontentsColumns = ['productcode', 'product', 'qty', 'unitprice', 'total'];


  transactiondisplayedColumns = ['trid', 'type', 'authorizationsode'];
  // transactiondisplayedColumns = ['trid', 'marcntID', 'type', 'datetime', 'approval', 'authorizationsode'];
  transactiondataSource = TR_DATA;

  orderassociateddisplayedColumns = ['id', 'type', 'userID', 'date', 'amount', 'voided'];
  orderassociateddataSource = OrdAssVolume_DATA;

  displayedSubTotalColumns = ['emptyFooter', 'emptyFooter', 'emptyFooter', 'subtotalTitle', 'subtotalAmount'];
  displayedShippingandHandlingColumns = ['emptyFooter', 'emptyFooter', 'emptyFooter', 'shippingandhandlingTitle', 'shippingandhandlingAmount'];
  displayedTaxColumns = ['emptyFooter', 'emptyFooter', 'emptyFooter', 'taxTitle', 'taxAmount'];

  public orderData: any = [];
  public condition: any;
  public hideRequiredControl: any;

  public header_text: any = "Add Order";

  constructor(public apiService: ApiService, public matSnackBar: MatSnackBar, public cookieService: CookieService, public activatedRoute: ActivatedRoute, public meta: MetaService, public dialog: MatDialog) {

    this.meta.setTitle('Virus Medical Face Mask backend | Edit Order');
    this.meta.setTag('og:description', 'Virus Medical Face Mask backend to keep medical professionals safe and protected against harmful viruses, bacteria, and other critical circumstances, while also tending to their comfort.');
    this.meta.setTag('twitter:description', 'Virus Medical Face Mask backend to keep medical professionals safe and protected against harmful viruses, bacteria, and other critical circumstances, while also tending to their comfort.');

    this.meta.setTag('og:keyword', 'Virus Medical Face Mask backend, Medical Face Mask backend, Medical Face Mask backend for Virus');
    this.meta.setTag('twitter:keyword', 'Virus Medical Face Mask backend, Medical Face Mask backend, Medical Face Mask backend for Virus');

    this.meta.setTag('og:title', 'Virus Medical Face Mask backend | Edit Order');
    this.meta.setTag('twitter:title', 'Virus Medical Face Mask backend | Edit Order');
    this.meta.setTag('og:type', 'website');
    this.meta.setTag('og:url', 'https://mask-landingpage-backend.influxiq.com/');
    this.meta.setTag('og:image', '../../assets/images/logo-fb.jpg');
    this.meta.setTag('twitter:image', '../../assets/images/logo-twitter.jpg');
  }



  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.header_text = "Order View";
      if (params['_id'] != null) {
        this.condition = { id: params._id };
        this.activatedRoute.data.subscribe((resolveData:any) => {
         // console.log(resolveData);

          //  setTimeout(() => {
            this.orderData = resolveData.orderData.res;
            //console.log(this.orderData);
          //  }, 500);

        });
      }
    })
  }

  /**Void Trensection */
  voidtransaction() {
    console.warn("Void Transection here");
    let data: any = {
      data: {
        order_amount: this.orderData[0].product_total,
        transactiontype: this.orderData[0].transactiontype,
        transactionid: this.orderData[0].transactionid
      },
      "orderid":this.orderData[0]._id
    }

    this.apiService.CustomRequest(data, 'void-transaction').subscribe((res: any) => {
      console.log(res.resc.UAPIResponse.processorResponse);
      this.matSnackBar.open(res.resc.UAPIResponse.processorResponse, '', {
        duration: 3000
      });

    });
  }
  /**refund function */
  refundOrder() {
    this.openDialog();
  }
  openDialog() {
    const dialogRef = this.dialog.open(RefundDailog, {
      panelClass: 'custom-modalbox',
      // width: '250px',
      data: { data: this.orderData }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
  /**send email to oder id */
  resendOrderReceipt() {
    console.log("resendOrderReceipt");
    let data: any = {
      orderid: this.orderData[0]._id
    }

    this.apiService.CustomRequest(data, 'resend-order-mail').subscribe((res: any) => {
      console.log(res);
      this.matSnackBar.open(res.msg, '', {
        duration: 3000
      });

    });
  }
/**function for cancel autoship */
CancelAutoshipButton(){
  //console.warn('CancelAutoshipButton');
  this.notesFlag=true;
}
CancelAutoship(){
  //console.warn('CancelAutoship');
  let data: any={};
  //console.warn(this.notes);
  if(this.notes!=null && this.notes!=''){
    data= {
      orderid: this.orderData[0]._id,
      billing_date:this.orderData[0].autoship[0].billing_date,
      notes:this.notes
    }
  }else{
    this.matSnackBar.open('Please Give a cancel Notes', '', {
      duration: 3000
    });
  }
 //console.warn(data);

  this.apiService.CustomRequest(data, 'cancel-autoship').subscribe((res: any) => {
    //console.log(res);
  this.notesFlag=false;
    if(res.status=="success"){
      this.matSnackBar.open('Your AutoShip canceled', '', {
        duration: 3000
      });
    }
   

  });
}
}
//refend Modal
@Component({
  selector: 'refund',
  templateUrl: 'refund.html',
})
export class RefundDailog {
  public checked = false;
  public refundamount: any = null;
  public dta: any = [];
  constructor(
    public dialogRef: MatDialogRef<RefundDailog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData, public apiService: ApiService, public matSnackBar: MatSnackBar) {
    this.dta = data;
    //console.warn(this.dta.data[0]);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  refundFunction() {
    var data: any = {};
    if (this.refundamount != null && this.checked == true) {
      if (this.refundamount >= this.dta.data[0].product_total) {
        console.log("error");
        this.matSnackBar.open('Refund Amount must be less then Total Amount', '', {
          duration: 3000
        });
      }
      data = {
        "data": {
          "order_id": 'OD' + this.dta.data[0]._id,
          "order_amount":this.refundamount ,
          "transactionid": this.dta.data[0].transactionid,
          "transactiontype": this.dta.data[0].transactiontype
        },
        "orderid":this.dta.data[0]._id
      }
    } else {
      data = {
        "data": {
          "order_id": 'OD' + this.dta.data[0]._id,
          "order_amount": this.dta.data[0].product_total,
          "transactionid": this.dta.data[0].transactionid,
          "transactiontype": this.dta.data[0].transactiontype
        },
        "orderid":this.dta.data[0]._id
      }
    }

    console.warn(data);
    
    this.apiService.CustomRequest(data, 'refund-transaction').subscribe((res: any) => {
      //console.log(res);
      if (res.resc.UAPIResponse.processorResponse == "Approved") {
        this.matSnackBar.open(res.resc.UAPIResponse.processorResponse, '', {
          duration: 3000
        });
        this.dialogRef.close();
      } else {
        this.matSnackBar.open(res.resc.UAPIResponse.statusMessage, '', {
          duration: 3000
        });
        this.dialogRef.close();
      }

    });
  }

}