import { Component, Output, EventEmitter, Input } from '@angular/core';
import { Product } from '../../interface/product.interface';

@Component({
  selector: 'card-component',
  templateUrl: './card-component.component.html',
  styleUrls: ['./card-component.component.css']
})
export class CardComponentComponent {
  @Input() product: Product | null = null;
  @Output() editClicked = new EventEmitter<void>();
  @Output() deleteClicked = new EventEmitter<void>();

  onEdit():void {
    this.editClicked.emit();
  }

  onDelete():void {
    this.deleteClicked.emit();
  }
}
