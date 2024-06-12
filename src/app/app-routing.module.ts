import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NgxSpinnerModule } from 'ngx-spinner';

const routes: Routes = [

  {
    path: '',
    loadChildren: () => import('./features/products/products.module').then(m => m.ProductsModule)
  },
  { path: '**', redirectTo: 'home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],

  exports: [RouterModule],

})
export class AppRoutingModule { }
