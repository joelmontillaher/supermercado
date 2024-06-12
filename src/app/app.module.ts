import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarModule } from './shared/components/navbar/navbar.module';
import { HttpClientModule } from '@angular/common/http';
import { ProductsModule } from './features/products/products.module';
import { NgxSpinnerModule } from 'ngx-spinner';
import { SnackbarComponent } from './shared/components/snackBar-message/snackbar.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';


@NgModule({
  declarations: [
    AppComponent,
    SnackbarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NavbarModule,
    HttpClientModule,
    ProductsModule,
    MatSnackBarModule,
    MatButtonModule,
    NgxSpinnerModule.forRoot({type: 'ball-scale-multiple'})

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
