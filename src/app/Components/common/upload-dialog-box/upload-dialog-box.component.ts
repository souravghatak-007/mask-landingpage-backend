import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-upload-dialog-box',
  templateUrl: './upload-dialog-box.component.html',
  styleUrls: ['./upload-dialog-box.component.css']
})
export class UploadDialogBoxComponent implements OnInit {

  constructor(public dialog: MatDialog) { }
  openDialog() {
    const dialogRef = this.dialog.open(DialogContentExampleDialog);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  ngOnInit() {
  }


}
@Component({
  selector: 'upload-dialog-content',
  templateUrl: './upload-dialog-content.html',
})
export class DialogContentExampleDialog {}
