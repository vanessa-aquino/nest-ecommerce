import { Injectable } from '@angular/core';
import { CartService } from './cart.service';
import { CardProducts } from '../models/card-products.model';

@Injectable({
  providedIn: 'root'
})
export class CartProductsService {

  constructor(
    private cartService: CartService
  ) { };

  addProductToCart(product: CardProducts, quantity: number): void {
    this.cartService.addToCart(product, quantity);
  };

  removeProductFromCart(product: CardProducts): void {
    this.cartService.removeFromCart(product);
  };
}
