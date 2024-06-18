import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateProductComponent } from './create-product.component';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProductService } from '../../services/product.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { of } from 'rxjs';

describe('CreateProductComponent', () => {
  let component: CreateProductComponent;
  let fixture: ComponentFixture<CreateProductComponent>;
  let mockRouter: any;
  let mockProductService: any;
  let mockSnackBar: any;
  let mockSpinner: any;

  beforeEach(async () => {
    mockRouter = {
      navigate: jasmine.createSpy('navigate')
    };

    mockProductService = {
      createProduct: jasmine.createSpy('createProduct').and.returnValue(of({}))
    };

    mockSnackBar = {
      openFromComponent: jasmine.createSpy('openFromComponent')
    };

    mockSpinner = {
      show: jasmine.createSpy('show'),
      hide: jasmine.createSpy('hide')
    };

    await TestBed.configureTestingModule({
      declarations: [CreateProductComponent],
      providers: [
        FormBuilder,
        { provide: Router, useValue: mockRouter },
        { provide: ProductService, useValue: mockProductService },
        { provide: MatSnackBar, useValue: mockSnackBar },
        { provide: NgxSpinnerService, useValue: mockSpinner }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the create product component', () => {
    expect(component).toBeTruthy();
  });
});
