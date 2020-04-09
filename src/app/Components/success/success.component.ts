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
    this.meta.setTitle('Mask landing Page');
    // this.meta.update({ name: 'description', content: 'Dynamic Hello Angular Lovers description!' });
    this.meta.setTag('og:description', 'Virus Barrier Medical Face Mask to keep medical professionals safe and protected against harmful viruses, bacteria, and other critical circumstances, while also tending to their comfort.');
    this.meta.setTag('twitter:description', 'Virus Barrier Medical Face Mask to keep medical professionals safe and protected against harmful viruses, bacteria, and other critical circumstances, while also tending to their comfort.');

    this.meta.setTag('og:keyword', 'Virus Barrier Medical Face Mask, Medical Face Mask, Medical Face Mask for Virus');
    this.meta.setTag('twitter:keyword', 'Virus Barrier Medical Face Mask, Medical Face Mask, Medical Face Mask for Virus');

    this.meta.setTag('og:title', 'Virus Barrier Medical Face Mask');
    this.meta.setTag('twitter:title', 'Virus Barrier Medical Face Mask');
    this.meta.setTag('og:type', 'website');
    this.meta.setTag('og:url','https://virusmedicalmask.com');
      this.meta.setTag('og:image', 'https://all-frontend-assets.s3.amazonaws.com/bvt-mask-assetc/images/144-144.png');


  }

  ngOnInit() {
    this.activatedRoute.data.forEach((data:any) => {
      // console.log(data);
      this.successData=data.success_data.res[0];
     console.warn(this.successData);


    });
  }
/**print document */
print(){
  window.print();
}
}
