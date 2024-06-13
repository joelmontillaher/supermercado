import { Component, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'card-component',
  templateUrl: './card-component.component.html',
  styleUrls: ['./card-component.component.css']
})
export class CardComponentComponent {
  @Input() product: any;
  @Output() editClicked = new EventEmitter<string>();
  @Output() deleteClicked = new EventEmitter<string>();

  onEdit(productId: string) {
    this.editClicked.emit(productId);
  }

  onDelete(productId: string) {
    this.deleteClicked.emit(productId);
  }
}
