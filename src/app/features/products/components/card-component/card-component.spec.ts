import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CardComponentComponent } from './card-component.component';
import { ProductsModule } from '../../products.module';

describe('CardComponentComponent', () => {
  let component: CardComponentComponent;
  let fixture: ComponentFixture<CardComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductsModule],
      declarations: [CardComponentComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should emit editClicked event when onEdit() is called', () => {
    let editClickedSpy = spyOn(component.editClicked, 'emit');

    component.onEdit();

    expect(editClickedSpy).toHaveBeenCalled();
  });

  it('should emit deleteClicked event when onDelete() is called', () => {
    let deleteClickedSpy = spyOn(component.deleteClicked, 'emit');

    component.onDelete();

    expect(deleteClickedSpy).toHaveBeenCalled();
  });
});
