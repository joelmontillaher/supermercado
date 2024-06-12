import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProductCategory } from '../../interface/product.interface';
import { ProductService } from '../../services/product.service';
import { SnackbarComponent } from '../../../../shared/components/snackBar-message/snackbar.component';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css'],
})
export class CreateProductComponent {
  @Output() productCreated = new EventEmitter<any>();

  public productForm: FormGroup;
  public photoPreviewUrl: string = '';
  public categories = Object.values(ProductCategory);

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private productService: ProductService,
    private snackBar: MatSnackBar,
    private spinner: NgxSpinnerService
  ) {
    this.productForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      category: ['', Validators.required],
      price: [
        '',
        [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)],
      ],
      description: [''],
      photoUrl: ['', [Validators.required, Validators.pattern('https?://.+')]],
    });

    this.productForm.get('photoUrl')?.valueChanges.subscribe((url) => {
      this.photoPreviewUrl = url;
    });
  }

  onSubmit() {
    if (this.productForm.valid) {
      const newProduct = this.productForm.value;
      this.spinner.show(); // Mostrar el spinner
      this.productService.createProduct(newProduct).subscribe({
        next: (response) => {
          console.log('Producto añadido con éxito:', response);
          this.productForm.reset();
          this.photoPreviewUrl = '';
          this.productCreated.emit();
          this.showSnackbar('El producto ha sido creado con éxito');
          this.router.navigate(['/list-products']);
        },
        error: (error) => {
          console.error('Error al agregar el producto:', error);
        },
        complete: () => {
          this.spinner.hide();
        },
      });
    } else {
      console.log('Formulario no válido');
    }
  }

  private showSnackbar(message: string): void {
    this.snackBar.openFromComponent(SnackbarComponent, {
      data: { message },
      duration: 3000,
    });
  }
}
