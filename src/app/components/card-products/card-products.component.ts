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

  constructor (private productsService: ProductsService) {};

  ngOnInit(): void {
    this.cardProducts = this.productsService.getAllProducts();

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
  }
}
