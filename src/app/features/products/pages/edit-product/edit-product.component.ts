import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { ProductCategory, Product } from '../../interface/product.interface';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarComponent } from '../../../../shared/components/snackBar-message/snackbar.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { ConfirmationDialogComponent } from '../../components/dialogs/confirm/confirm-edit-dialog.component';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {
  @Output() productUpdated = new EventEmitter<void>();

  productForm!: FormGroup;
  productId!: string;
  categories = Object.values(ProductCategory);
  photoPreviewUrl: string = '';

  constructor(
    private readonly fb: FormBuilder,
    private readonly productService: ProductService,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly dialog: MatDialog,
    private readonly snackBar: MatSnackBar,
    private readonly spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.productId = id;
    } else {
      console.error('No se encontró el ID del producto en la ruta');
      this.router.navigate(['/products']);
      return;
    }

    this.productForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      category: ['', Validators.required],
      price: ['', [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)]],
      description: [''],
      photoUrl: ['', [Validators.required, Validators.pattern("https?://.+")]]
    });

    this.getProductDetails();

    this.productForm.get('photoUrl')?.valueChanges.subscribe((url) => {
      this.photoPreviewUrl = url;
    });
  }

 public getProductDetails(): void {
    this.spinner.show();
    this.productService.getProductById(this.productId).subscribe({
      next: (product: Product) => {
        this.productForm.patchValue(product);
        this.photoPreviewUrl = product.photoUrl;
      },
      error: (error) => {
        console.error('Error al cargar el producto:', error);
      },
      complete: () => {
        this.spinner.hide();
      }
    });
  }

 public openEditConfirmationDialog(): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '250px',
      data: {
        title: 'Confirmar Edición',
        message: '¿Estás seguro de que deseas guardar los cambios en este producto?'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.onSubmit();
      } else {
        console.log('Cancelar la edición');
      }
    });
  }

  public onSubmit(): void {
    if (this.productForm.valid) {
      const updatedProduct: Product = this.productForm.value;
      this.spinner.show();
      this.productService.updateProduct(this.productId, updatedProduct).subscribe({
        next: () => {
          this.productUpdated.emit();
          this.showSnackBar('El producto ha sido editado con éxito');
          this.router.navigate(['/list-products']);
        },
        error: error => {
          console.error('Error al actualizar el producto:', error);
        },
        complete: () => {
          this.spinner.hide();
        }
      });
    } else {
      console.log('Formulario no válido');
    }
  }

  private showSnackBar(message: string): void {
    this.snackBar.openFromComponent(SnackbarComponent, {
      data: { message },
      duration: 3000,
    });
  }
}
