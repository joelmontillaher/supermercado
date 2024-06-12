import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css'],
})
export class ProductsListComponent implements OnInit {
  products: any[] = [];

  constructor(
    private productService: ProductService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.spinner.show();
    this.fetchProducts();
  }

  fetchProducts() {
    this.spinner.show();
    this.productService.getProducts().subscribe({
      next: (response) => {
        this.products = response;
      },
      error: (error) => {
        console.error('Error al recuperar los productos:', error);
      },
      complete: () => {
        this.spinner.hide();
      },
    });
  }
}
