import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CardProducts } from '../models/card-products.model';
import { ProductsService } from './products.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems: { product: CardProducts, quantity: number }[] = [];
  private cartSubject = new BehaviorSubject<{ product: CardProducts, quantity: number}[]>([]);

  cart$ = this.cartSubject.asObservable();

  constructor(
    private productsService: ProductsService
  ) {
    this.loadCartFromLocalStorage();
  };

  private saveCartToLocalStorage(): void {
    localStorage.setItem('cart', JSON.stringify(this.cartItems));
  };

  private loadCartFromLocalStorage(): void {
    const savedCart = localStorage.getItem('cart');
    if(savedCart) {
      this.cartItems = JSON.parse(savedCart);
      this.cartSubject.next(this.cartItems);
    };
  };

  addToCart(product: CardProducts, quantity: number): void {
    const uniqueId = this.productsService.getUniqueProductId(product);
    const existingItem = this.cartItems.find(item => 
      this.productsService.getUniqueProductId(item.product) === uniqueId
    );

    if(existingItem) {
      existingItem.quantity += quantity;
    } else {
      this.cartItems.push({ product, quantity });
    };

    this.cartSubject.next(this.cartItems);
    this.saveCartToLocalStorage();
  };


  removeFromCart(product: CardProducts): void {
    const uniqueId = this.productsService.getUniqueProductId(product);
    this.cartItems = this.cartItems.filter(item =>
      this.productsService.getUniqueProductId(item.product) !== uniqueId
    );

    this.cartSubject.next(this.cartItems);
    this.saveCartToLocalStorage();
  };

  getCartItems(): {product: CardProducts, quantity: number}[] {
    return this.cartItems
  };

  setCart(cart: {product: CardProducts, quantity: number}[]): void {
    this.cartItems = cart;
    this.cartSubject.next(this.cartItems);
  };
}
