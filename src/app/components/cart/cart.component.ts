import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart.service';
import { CardProducts } from '../../models/card-products.model';

@Component({
  selector: 'app-cart',
  imports: [MatDialogModule, CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {
  cartItems: {product: CardProducts, quantity: number}[] = [];

  constructor(
    private cartService: CartService,
    public dialogRef: MatDialogRef<CartComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.cartService.cart$.subscribe(items => {
      this.cartItems = items;
    });
  };

  removeItem(item: {product: CardProducts, quantity: number}): void {
    this.cartService.removeFromCart(item.product);
  };

  getTotalPrice(): number {
    return this.cartItems.reduce((total, item) => {
      return total + (parseFloat(item.product.price.replace('R$ ', '').replace(',', '.')) * item.quantity);
    }, 0);
  }; 
}
