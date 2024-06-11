import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductCategory } from '../../interface/product.interface';
import { ProductService } from '../../services/product.service';

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
    private productService: ProductService
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
      this.productService.createProduct(newProduct).subscribe(
        (response) => {
          console.log('Producto añadido con éxito:', response);
          this.productForm.reset();
          this.photoPreviewUrl = '';
          this.productCreated.emit();
          this.router.navigate(['/list-products']);
        },
        (error) => {
          console.error('Error al agregar el producto:', error);
        }
      );
    } else {
      console.log('Formulario no válido');
    }
  }
}
