import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsListComponent } from './pages/products-list/products-list.component';
import { EditProductComponent } from './pages/edit-product/edit-product.component';
import { CreateProductComponent } from './pages/create-product/create-product.component';

const routes: Routes = [
  { path: '', redirectTo: 'list-products', pathMatch: 'full' },
  { path: 'list-products', component: ProductsListComponent },
  { path: 'edit/:id', component: EditProductComponent },
  { path: 'create', component: CreateProductComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductsRoutingModule {}
