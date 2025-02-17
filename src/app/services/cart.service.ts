import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CardProducts } from '../models/card-products.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems: { product: CardProducts, quantity: number }[] = [];
  private cartSubject = new BehaviorSubject<{ product: CardProducts, quantity: number}[]>([]);

  cart$ = this.cartSubject.asObservable();

  addToCart(product: CardProducts, quantity: number): void {
    const existingItem = this.cartItems.find(item => item.product.id === product.id);

    if(existingItem) {
      existingItem.quantity += quantity;
    } else {
      this.cartItems.push({ product, quantity });
    };

    this.cartSubject.next(this.cartItems);
  };

  removeFromCart(product: CardProducts): void {
    this.cartItems = this.cartItems.filter(item => item.product.id !== product.id);
    this.cartSubject.next(this.cartItems);
  };

  getCartItems(): any {
    return this.cartItems
  }
}
