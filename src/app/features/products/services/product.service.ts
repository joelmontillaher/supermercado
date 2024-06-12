import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, delay } from 'rxjs';
import { Product } from '../interface/product.interface';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = 'http://localhost:8000/productos';

  constructor(private http: HttpClient) {}
  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl)
    .pipe(delay(1500));
  }
  getProductById(id: string): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${id}`)
    .pipe(delay(1500));
  }

  updateProduct(id: string, product: Product): Observable<void> {
    return this.http
      .put<void>(`${this.apiUrl}/${id}`, product)
      .pipe(delay(1500));
  }

  createProduct(product: Product): Observable<any> {
    return this.http.post<any>(this.apiUrl, product)
    .pipe(delay(1500));
  }

  deleteProduct(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);

  }
}
