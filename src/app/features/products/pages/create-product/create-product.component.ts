import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ProductCategory } from '../../interface/product.interface';
import { MatDialog } from '@angular/material/dialog';
import { InfoDialog } from '../../components/dialogs/info/info-dialog.component';

@Component({
  selector: 'create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent {
  public productForm: FormGroup;
  public photoPreviewUrl: string = '';
  public categories = Object.values(ProductCategory);

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    public dialog: MatDialog
  ) {
    this.productForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      category: ['', Validators.required],
      price: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
      description: [''],
      photoUrl: ['', [Validators.required, Validators.pattern("https?://.+")]]
    });

    this.productForm.get('photoUrl')?.valueChanges.subscribe((url) => {
      this.photoPreviewUrl = url;
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(InfoDialog, {
      data: {
        title: 'Información',
        message: 'El producto ha sido creado'
      }
    });

    dialogRef.afterClosed().subscribe(() => {
      this.router.navigate(['/list-products']);
    });
  }

  onSubmit() {
    if (this.productForm.valid) {
      const newProduct = this.productForm.value;
      this.http.post<any>('http://localhost:8000/productos', newProduct).subscribe(
        (response) => {
          console.log('Producto añadido con éxito:', response);

          this.photoPreviewUrl = '';
          this.openDialog();
          // this.productForm.reset(); ho he tret ja que sino em sortia els errors dels camps com si faltes info
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
