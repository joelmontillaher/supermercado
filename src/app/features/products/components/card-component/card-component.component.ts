import { Component, Output, EventEmitter, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDeleteDialogComponent } from '../dialogs/delete/confirm-delete-dialog.component';
import { ProductService } from '../../services/product.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'card-component',
  templateUrl: './card-component.component.html',
  styleUrls: ['./card-component.component.css']
})
export class CardComponentComponent {
  @Input() product: any;
  @Output() productDeleted = new EventEmitter<void>();

  constructor(
    public dialog: MatDialog,
    private productService: ProductService,
    private router:Router,
    private snackBar:MatSnackBar
  ) {}

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

  private deleteProduct(productId: string) {
    this.productService.deleteProduct(productId).subscribe(
      () => {
        this.productDeleted.emit();
        this.showSnackbar('El producto ha sido eliminado con éxito');
      },
      (error) => {
        console.error('Error al eliminar el producto:', error);
      }
    );
  }
  private showSnackbar(message: string): void {
    this.snackBar.open(message, 'Cerrar', {
      duration: 3000,
    });
  }
}
