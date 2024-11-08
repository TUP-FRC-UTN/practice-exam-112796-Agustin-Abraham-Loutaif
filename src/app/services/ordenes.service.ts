import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Productos } from '../models/productos';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Order } from '../models/order';

@Injectable({
  providedIn: 'root'
})
export class OrdenesService {

  private readonly URL_PRODUCTOS: string = "http://localhost:3000/products";
  private readonly URL_ORDENES: string = "http://localhost:3000/orders";

  private client = inject(HttpClient)
  constructor() { }

  getProducts(): Observable<Productos[]>{
    return this.client.get<Productos[]>
    (`${this.URL_PRODUCTOS}`);
  }

  getOrderByEmail(email: string): Observable<Order[]>{
    return this.client.get<Order[]>
    (`${this.URL_ORDENES}?email=${email}`);
  }

  getOrders(): Observable<Order[]>{
    return this.client.get<Order[]>
    (`${this.URL_ORDENES}`);
  }
}
