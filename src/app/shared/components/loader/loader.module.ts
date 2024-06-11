import { NgModule } from '@angular/core';
import { SpinnerLoaderComponent } from './loader.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
@NgModule({
  declarations: [

    SpinnerLoaderComponent,
  ],
  imports: [
    MatProgressSpinnerModule
  ],
  exports: [
    SpinnerLoaderComponent,
    MatProgressSpinnerModule
  ]
})
export class LoaderModule { }
