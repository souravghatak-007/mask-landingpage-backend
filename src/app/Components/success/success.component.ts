import { Component, OnInit } from '@angular/core';
import { MetaService } from '@ngx-meta/core';
import { Router,ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.css']
})
export class SuccessComponent implements OnInit {
public successData:any=[];
  constructor(public meta: MetaService,public activatedRoute:ActivatedRoute) {  window.scrollTo(500, 0); 

    this.meta.setTitle('Virus Medical Face Mask backend | Success');
    this.meta.setTag('og:description', 'Virus Medical Face Mask backend to keep medical professionals safe and protected against harmful viruses, bacteria, and other critical circumstances, while also tending to their comfort.');
    this.meta.setTag('twitter:description', 'Virus Medical Face Mask backend to keep medical professionals safe and protected against harmful viruses, bacteria, and other critical circumstances, while also tending to their comfort.');

    this.meta.setTag('og:keyword', 'Virus Medical Face Mask backend, Medical Face Mask backend, Medical Face Mask backend for Virus');
    this.meta.setTag('twitter:keyword', 'Virus Medical Face Mask backend, Medical Face Mask backend, Medical Face Mask backend for Virus');

    this.meta.setTag('og:title', 'Virus Medical Face Mask backend | Success');
    this.meta.setTag('twitter:title', 'Virus Medical Face Mask backend | Success');
    this.meta.setTag('og:type', 'website');
    this.meta.setTag('og:url','https://mask-landingpage-backend.influxiq.com/');    
    this.meta.setTag('og:image', '../../assets/images/logo-fb.jpg');
    this.meta.setTag('twitter:image', '../../assets/images/logo-twitter.jpg');

  }

  ngOnInit() {
    this.activatedRoute.data.forEach((data:any) => {
      // console.log(data);
      this.successData=data.success_data.res[0];
     //console.warn(this.successData);


    });
  }
/**print document */
print(){
  window.print();
}
}
