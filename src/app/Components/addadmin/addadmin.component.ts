import { Component, OnInit ,Inject} from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { matchpwd, nameValidator, phoneValidator } from './validators';
import { HttpServiceService } from 'src/app/services/http-service.service';
import * as moment from 'moment';
import { from } from 'rxjs';
import { MetaService } from '@ngx-meta/core';

@Component({
  selector: 'app-addAdmin',
  templateUrl: './addadmin.component.html',
  styleUrls: ['./addadmin.component.css']
})
export class AddAdminComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private http: HttpServiceService,
    private cookieService: CookieService, private router: Router,
    private activatedRoute: ActivatedRoute) {
  

  }

  ngOnInit() {
  }



 
}
