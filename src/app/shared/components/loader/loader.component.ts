import { Component } from '@angular/core';

@Component({
  selector: 'loader-spinner',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class SpinnerLoaderComponent {
  showSpinner: boolean = true;

  constructor() {
    setTimeout(() => {
      this.showSpinner = false;
    }, 5000);
  }
}
