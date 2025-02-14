import { Component, OnInit, Input } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { CardProducts } from '../../models/card-products.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card-products',
  imports: [CommonModule],
  templateUrl: './card-products.component.html',
  styleUrl: './card-products.component.css'
})
export class CardProductsComponent implements OnInit {
  @Input() cardProducts: CardProducts[] = [];
  @Input() isFavoritePage: boolean = false;
  showTooltip: boolean = false;

  notificationMessage: string = '';
  showNotification: boolean = false;

  constructor (private productsService: ProductsService) {};

  ngOnInit(): void {
    const savedFavorites = localStorage.getItem('favorites');
    if(savedFavorites) {
      const favoriteIds: string[] = JSON.parse(savedFavorites);

      this.cardProducts.forEach(product => {
        const uniqueId = this.productsService.getUniqueProductId(product);
        product.isFavorited = favoriteIds.includes(uniqueId);
        product.favorite = product.isFavorited ? 'icons/favorite-hover.png' : 'icons/favorite.png'
      })
    }
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
      this.showNotificationMessage('Item adicionado aos favoritos!')
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

}
