import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-info-dialog',
  templateUrl: './info-dialog.component.html',
  styleUrls: ['./info-dialog.component.css']
})
export class InfoDialog implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<InfoDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.dialogRef.close();
    }, 3000);
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }
}
