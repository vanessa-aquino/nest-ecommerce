import { Component, OnInit, Input} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ProductsService } from '../../services/products.service';
import { CardProducts } from '../../models/card-products.model';
import { CartService } from '../../services/cart.service';
import { CartComponent } from '../cart/cart.component';

@Component({
  selector: 'app-card-products',
  imports: [CommonModule, FormsModule],
  templateUrl: './card-products.component.html',
  styleUrl: './card-products.component.css'
})
export class CardProductsComponent implements OnInit {
  @Input() cardProducts: CardProducts[] = [];
  @Input() isFavoritePage: boolean = false;
  showTooltip: boolean = false;
  products: CardProducts[] = [];
  notificationMessage: string = '';
  showNotification: boolean = false;

  constructor (
    private productsService: ProductsService,
    private cartService: CartService,
    public dialog: MatDialog
  ) {};

  ngOnInit(): void {
    const savedFavorites = localStorage.getItem('favorites');
    if(savedFavorites) {
      const favoriteIds: string[] = JSON.parse(savedFavorites);

      this.cardProducts.forEach(product => {
        const uniqueId = this.productsService.getUniqueProductId(product);
        product.isFavorited = favoriteIds.includes(uniqueId);
        product.favorite = product.isFavorited ? 'icons/favorite-hover.png' : 'icons/favorite.png'
      })
    };

    const savedCart = localStorage.getItem('cart');
    if(savedCart) {
      this.cartService.setCart(JSON.parse(savedCart));
    };
  }

  getTagColor(tag: string): string {
    switch(tag) {
      case 'New':
        return '#3BB77E';
      case 'Hot':
        return '#F74B81';
      case 'Sale':
        return '#67BCEE';
      default:
        return '';
    };
  };

  getToggleFavorite(product: CardProducts): void {
    this.productsService.toggleFavorite(product);
    const favoriteIds = this.cardProducts
      .filter(p => p.isFavorited)
      .map(p => this.productsService.getUniqueProductId(p));

    localStorage.setItem('favorites', JSON.stringify(favoriteIds));

    if(!product.isFavorited) {
      this.removeProductFromList(product);
      this.showNotificationMessage('Item removido dos favoritos!');
    } else {
      this.showNotificationMessage('Item adicionado aos favoritos!');
    };
  };

  showNotificationMessage(message: string): void {
    this.notificationMessage = message;
    this.showNotification = true;

    setTimeout(() => {
      this.showNotification = false;
    }, 3000);
  };

  removeProductFromList(product: CardProducts): void {
    const index = this.cardProducts.indexOf(product);
    if(index !== -1 && this.isFavoritePage) {
      this.cardProducts.splice(index, 1);
    };
  };

  showQuantitySelector(product: CardProducts): void {
    product.showQuantityInput = true;
    product.quantity = 1;
  };

  addToCart(product: CardProducts, quantity: number = 1): void {
    let cart: {product: CardProducts, quantity: number}[] = JSON.parse(localStorage.getItem('cart') || '[]');
    const productIndex = cart.findIndex(p =>
      this.productsService.getUniqueProductId(p.product) === this.productsService.getUniqueProductId(product)
    );

    if(productIndex !== -1) {
      cart[productIndex].quantity += quantity;
    } else {
      cart.push({product, quantity});
    };

    localStorage.setItem('cart', JSON.stringify(cart));
    this.cartService.addToCart(product, quantity);
    this.showNotificationMessage('Item adicionado ao carrinho!');
  };

  changeInputValue(product: CardProducts, value: number): void {
   let newValue = (product.quantity || 1) + value;
   product.quantity = newValue >= 1 ? newValue : 1;
  };

  removeProductFromCart(product: CardProducts): void {
  let cart: { product: CardProducts, quantity: number }[] = JSON.parse(localStorage.getItem('cart') || '[]');
  const uniqueId = this.productsService.getUniqueProductId(product);

  const productIndex = cart.findIndex(p =>
    this.productsService.getUniqueProductId(p.product) === uniqueId
  );

  if (productIndex !== -1) {
    if (cart[productIndex].quantity > 1) {
      cart[productIndex].quantity -= 1;
    } else {
      cart.splice(productIndex, 1);
    }
  }

  localStorage.setItem('cart', JSON.stringify(cart));
  this.cartService.setCart(cart);
  this.showNotificationMessage('Item removido do carrinho!');
}


  openCartDialog(): void {
    this.dialog.open(CartComponent, {
      width: '500px',
      height: '700px',
      data: {message: 'Cart details'}
    });
  };
}
