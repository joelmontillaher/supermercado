import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../interface/product.interface';


@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'http://localhost:8000/productos';

  constructor(private http: HttpClient) {}

  getProductById(id: string): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${id}`);
  }

  updateProduct(id: string, product: Product): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, product);
  }
}
