import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from "@angular/material";
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormBuilder, FormGroup } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { HttpServiceService } from '../../../services/http-service.service';

export interface DialogData {
  header: string,
  message: string,
  id: any,
  button1: { text: string },
  button2: { text: string },
}

@Component({
  selector: 'app-dialog-box',
  templateUrl: './dialog-box.component.html',
  styleUrls: ['./dialog-box.component.css']
})

export class DialogBoxComponent implements OnInit {

  public data: any;
  passwordForm: any;
  condition: any;
  user_data: any;
  Type: any;
  adminflag: any = 0;

  constructor(public dialogRef: MatDialogRef<DialogBoxComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogData: DialogData, public router: Router, private formBuilder: FormBuilder,
    private cookieService: CookieService, private http: HttpServiceService, private activatedRouter: ActivatedRoute) {
    this.data = dialogData;
    /*Getting the role*/
    let allData: any = {};
    allData = cookieService.getAll()
    this.user_data = JSON.parse(allData.user_details);
    this.Type = this.user_data.type;
    //console.log("+++++++++++++++++++++Type", this.Type);
    if (this.Type == 'admin')
      this.adminflag = 1;
  }



  ngOnInit() {
    this.passwordForm = this.formBuilder.group({
      currentpassword: [],
      newpassword: [],
      newpassword2: []
    });
  }

  button1() {
    this.dialogRef.close(this.data.button1.text);
  }

  button2() {
    this.dialogRef.close(this.data.button2.text);
    //console.log(this.passwordForm.value);
    let postData: any = {
      "adminflag": this.adminflag,
      '_id': this.data.id.id,
      'oldPassword': this.passwordForm.value.currentpassword,
      'newPassword': this.passwordForm.value.newpassword
    };

    this.http.httpViaPost('changepassword', postData).subscribe((response: any) => {

      if (response.Status == true)
        alert('Password Changed Successfully!!');
      else
        alert('Error in Service.Please try again later!!!');

    });
  }

}
