import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsRoutingModule } from './products.routing.module';
import { ProductsListComponent } from './pages/products-list/products-list.component';
import { CreateProductComponent } from './pages/create-product/create-product.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select'; // Importa MatSelectModule
import { CardComponentComponent } from './components/card-component/card-component.component';
import { NavbarModule } from 'src/app/shared/components/navbar/navbar.module';
import { EditProductComponent } from './pages/edit-product/edit-product.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from './components/dialogs/confirm/confirm-edit-dialog.component';
import {  MatSnackBarModule } from '@angular/material/snack-bar';
import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
  declarations: [
    ProductsListComponent,
    EditProductComponent,
    CreateProductComponent,
    ProductsListComponent,
    CardComponentComponent,

    ConfirmationDialogComponent,

  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatCardModule,
    MatSelectModule,
    NavbarModule,
    MatDialogModule,
    MatSnackBarModule,
    FormsModule,
    NgxSpinnerModule




  ],
  exports:[

  ]
})
export class ProductsModule { }
