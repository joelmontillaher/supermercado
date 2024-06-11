import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-confirmation-dialog',
  templateUrl: './confirm-edit-dialog.component.html',
  styleUrls:['./confirm-edit-dialog.component.css']
})
export class EditConfirmationDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<EditConfirmationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onCancelClick(): void {
    this.dialogRef.close();
  }
}
