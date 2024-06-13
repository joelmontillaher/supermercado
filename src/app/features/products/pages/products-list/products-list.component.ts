import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Product, ProductCategory } from '../../interface/product.interface';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarComponent } from '../../../../shared/components/snackBar-message/snackbar.component';
import { ConfirmationDialogComponent } from '../../components/dialogs/confirm/confirm-edit-dialog.component';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css'],
})
export class ProductsListComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  searchTerm: string = '';
  categories: string[] = Object.values(ProductCategory);
  selectedCategory: ProductCategory | '' = '';

  constructor(
    private readonly productService: ProductService,
    private readonly spinner: NgxSpinnerService,
    private readonly dialog: MatDialog,
    private readonly router: Router,
    private readonly snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.fetchProducts();
  }

  public fetchProducts() {
    this.spinner.show();
    this.productService.getProducts().subscribe({
      next: (response: Product[]) => {
        this.products = response;
        this.filteredProducts = response;
      },
      error: (error) => {
        console.error('Error al recuperar los productos:', error);
      },
      complete: () => {
        this.spinner.hide();
      },
    });
  }

  public filterProducts() {
    const searchTermLower = this.searchTerm.toLowerCase();
    this.filteredProducts = this.products.filter(product => {
      const matchesSearchTerm = product.name.toLowerCase().includes(searchTermLower);
      const matchesCategory = this.selectedCategory ? product.category === this.selectedCategory : true;
      return matchesSearchTerm && matchesCategory;
    });
  }

  public onEditProduct(productId: string) {
    this.spinner.show();
    this.router.navigate(['/edit', productId]).then(() => {
      this.spinner.hide();
    }).catch(() => {
      this.spinner.hide();
    });
  }

  public onDeleteProduct(productId: string) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '250px',
      data: { id: productId, title: 'Eliminar Producto', message: '¿Estás seguro que deseas eliminar este producto?' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteProduct(productId);
      }
    });
  }

  private deleteProduct(productId: string) {
    this.productService.deleteProduct(productId).subscribe({
      next: () => {
        this.fetchProducts();
        this.showSnackbar('El producto ha sido eliminado con éxito');
      },
      error: error => {
        console.error('Error al eliminar el producto:', error);
      }
    });
  }

  private showSnackbar(message: string): void {
    this.snackBar.openFromComponent(SnackbarComponent, {
      data: { message },
      duration: 3000,
    });
  }
}
