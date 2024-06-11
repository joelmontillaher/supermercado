import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDeleteDialogComponent } from '../dialogs/delete/confirm-delete-dialog.component';

@Component({
  selector: 'card-component',
  templateUrl: './card-component.component.html',
  styleUrls: ['./card-component.component.css']
})
export class CardComponentComponent implements OnInit {
  products: any[] = [];

  constructor(private http: HttpClient, private router: Router, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.fetchProducts();
  }

  fetchProducts() {
    this.http.get<any[]>('http://localhost:8000/productos').subscribe(
      (response) => {
        this.products = response;
      },
      (error) => {
        console.error('Error al recuperar los productos:', error);
      }
    );
  }

  onEdit(productId: string) {
    this.router.navigate(['/edit', productId]);
  }

  onDelete(productId: string) {
    const dialogRef = this.dialog.open(ConfirmDeleteDialogComponent, {
      width: '250px',
      data: { id: productId }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteProduct(productId);
      }
    });
  }

  deleteProduct(productId: string) {
    this.http.delete(`http://localhost:8000/productos/${productId}`).subscribe(
      () => {
        this.products = this.products.filter(product => product.id !== productId);
      },
      (error) => {
        console.error('Error al eliminar el producto:', error);
      }
    );
  }
}
