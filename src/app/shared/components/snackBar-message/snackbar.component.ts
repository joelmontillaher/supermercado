// snackbar.component.ts
import { Component, Inject } from '@angular/core';
import { MatSnackBarRef, MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';


@Component({
  selector: 'snackbar-message',
  template: `
    <div>
      {{ data.message }}
      <button mat-button (click)="snackBarRef.dismiss()">Cerrar</button>
    </div>
  `,
  styles: [
    `
      div {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
    `,
  ],
})
export class SnackbarComponent {
  constructor(
    public snackBarRef: MatSnackBarRef<SnackbarComponent>,
    @Inject(MAT_SNACK_BAR_DATA) public data: any
  ) {}
}
