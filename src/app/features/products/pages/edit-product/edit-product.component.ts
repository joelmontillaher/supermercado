import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { ProductCategory, Product } from '../../interface/product.interface';
import { MatDialog } from '@angular/material/dialog';
import { EditConfirmationDialogComponent } from '../../components/dialogs/edit/confirm-edit-dialog.component';

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
    private fb: FormBuilder,
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog
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

  getProductDetails() {
    this.productService.getProductById(this.productId).subscribe(
      (product: Product) => {
        this.productForm.patchValue(product);
        this.photoPreviewUrl = product.photoUrl;
      },
      (error) => {
        console.error('Error al cargar el producto:', error);
      }
    );
  }

  openEditConfirmationDialog(): void {
    const dialogRef = this.dialog.open(EditConfirmationDialogComponent, {
      width: '250px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.onSubmit();
      } else {
        console.log('Cancelar la edición');
      }
    });
  }

  onSubmit() {
    if (this.productForm.valid) {
      const updatedProduct: Product = this.productForm.value;
      this.productService.updateProduct(this.productId, updatedProduct).subscribe(
        () => {
          this.productUpdated.emit();
          this.router.navigate(['/list-products']);
        },
        (error) => {
          console.error('Error al actualizar el producto:', error);
        }
      );
    } else {
      console.log('Formulario no válido');
    }
  }
}
