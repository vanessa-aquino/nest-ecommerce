import { Injectable } from '@angular/core';
import { CartService } from './cart.service';
import { ProductsService } from './products.service';
import { CardProducts } from '../models/card-products.model';

@Injectable({
  providedIn: 'root'
})
export class CartProductsService {

  constructor(
    private cartService: CartService,
    private productsService: ProductsService
  ) { };

  addProductToCart(product: CardProducts, quantity: number): void {
    this.cartService.addToCart(product, quantity);
  };

  removeProductFromCart(product: CardProducts): void {
    this.cartService.removeFromCart(product);
  };
}
