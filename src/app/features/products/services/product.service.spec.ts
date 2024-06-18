import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ProductService } from './product.service';


describe('ProductService', () => {
  let service: ProductService;
  let httpMock: HttpTestingController;
  const apiUrl = 'http://localhost:8000/productos';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProductService]
    });

    service = TestBed.inject(ProductService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should delete a product', () => {
    const id = '2';

    service.deleteProduct(id).subscribe({
      next: (response) => {
        expect(response).toBeNull();
      },
      error: () => fail('Expected a successful response, but received an error'),
    });

    const req = httpMock.expectOne(`${apiUrl}/${id}`);
    expect(req.request.method).toBe('DELETE');
    req.flush(null, { status: 200, statusText: 'OK' });
  });



  it('should handle errors when deleting a product', () => {
    const id = '2';

    service.deleteProduct(id).subscribe({
      next: () => fail('Expected an error, but received a next notification'),
      error: (error) => {
        expect(error.message).toContain('Http failure response');
      }
    });

    const req = httpMock.expectOne(`${apiUrl}/${id}`);
    expect(req.request.method).toBe('DELETE');
    req.error(new ErrorEvent('HttpErrorResponse', {
      error: new Error('Error deleting product'),
      message: 'Error deleting product'
    }));
  });

});
