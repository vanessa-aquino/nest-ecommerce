import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CardProducts } from '../models/card-products.model';

@Injectable({
  providedIn: 'root'
})

export class ProductsService {
  private allProducts: CardProducts[] = [
    {
      image: 'img/bis.png',
      category: 'guloseimas',
      name: 'Bis',
      price: 'R$ 10,00',
      id: 5,
      favorite: 'icons/favorite.png',
      isFavorited: false,
      showTooltip: false
    },
    {
      tag: 'New',
      image: 'img/choco.png',
      category: 'guloseimas',
      name: 'Barra Milka',
      price: 'R$ 32,00',
      id: 5,
      favorite: 'icons/favorite.png',
      isFavorited: false,
      showTooltip: false
    },
    {
      image: 'img/cookie.png',
      category: 'guloseimas',
      name: 'Biscoitos Sortidos',
      price: 'R$ 8,50',
      id: 5,
      favorite: 'icons/favorite.png',
      isFavorited: false,
      showTooltip: false
    },
    {
      image: 'img/creamcheese.png',
      category: 'laticinios',
      name: 'Cream Cheese',
      price: 'R$ 10,50',
      id: 1,
      favorite: 'icons/favorite.png',
      isFavorited: false,
      showTooltip: false
    },
    {
      tag: 'Hot',
      image: 'img/gin.png',
      category: 'alcoolicos',
      name: 'Gin Draco',
      price: 'R$ 80,00',
      id: 2,
      favorite: 'icons/favorite.png',
      isFavorited: false,
      showTooltip: false
    },
    {
      image: 'img/grape.png',
      category: 'frutas',
      name: 'Uva',
      price: 'R$ 7,00',
      id: 7,
      favorite: 'icons/favorite.png',
      isFavorited: false,
      showTooltip: false
    },
    {
      image: 'img/kiwi.png',
      category: 'frutas',
      name: 'Kiwi',
      price: 'R$ 8,00',
      id: 7,
      favorite: 'icons/favorite.png',
      isFavorited: false,
      showTooltip: false
    },
    {
      image: 'img/mango.png',
      category: 'frutas',
      name: 'Manga',
      price: 'R$ 5,50',
      id: 7,
      favorite: 'icons/favorite.png',
      isFavorited: false,
      showTooltip: false
    },
    {
      image: 'img/margarina.png',
      category: 'laticinios',
      name: 'Qualy Margarina',
      price: 'R$ 8,50',
      id: 1,
      favorite: 'icons/favorite.png',
      isFavorited: false,
      showTooltip: false
    },
    {
      image: 'img/milk.png',
      category: 'laticinios',
      name: 'Leite Ninho',
      price: 'R$ 24,00',
      id: 1,
      favorite: 'icons/favorite.png',
      isFavorited: false,
      showTooltip: false
    },
    {
      image: 'img/potato.png',
      category: 'legumes',
      name: 'Batata',
      price: 'R$ 3,90',
      id: 8,
      favorite: 'icons/favorite.png',
      isFavorited: false,
      showTooltip: false
    },
    {
      image: 'img/rice.png',
      category: 'mercearia',
      name: 'Arroz',
      price: 'R$ 5,90',
      id: 6,
      favorite: 'icons/favorite.png',
      isFavorited: false,
      showTooltip: false
    },
    {
      image: 'img/sugar.png',
      category: 'mercearia',
      name: 'Açucar',
      price: 'R$ 3,90',
      id: 6,
      favorite: 'icons/favorite.png',
      isFavorited: false,
      showTooltip: false
    },
    {
      tag: 'Sale',
      image: 'img/tomato.png',
      category: 'legumes',
      name: 'Tomate',
      price: 'R$ 1,90',
      id: 8,
      favorite: 'icons/favorite.png',
      isFavorited: false,
      showTooltip: false
    },
  ];

  private favoritesCountSubject = new BehaviorSubject<number>(this.getFavoritesCount());
  public favoritesCount$ = this.favoritesCountSubject.asObservable();

  getAllProducts(): CardProducts[] {
    return this.allProducts;
  };

  getProductsById(id: number): CardProducts[] {
    return this.allProducts.filter(product => product.id === id);
  };

  toggleFavorite(product: CardProducts): void {
    product.isFavorited = !product.isFavorited;
    product.favorite = product.isFavorited ? 'icons/favorite-hover.png' : 'icons/favorite.png';
    this.updateFavoritesCount();
    this.favoritesCountSubject.next(this.getFavoritesCount());
  };

  getUniqueProductId(product: CardProducts): string {
    return `${product.id} - ${product.name}`;
  };

  updateFavoritesCount(): void {
    const favoriteIds = this.allProducts
      .filter(p => p.isFavorited)
      .map(p => this.getUniqueProductId(p));

    localStorage.setItem('favorites', JSON.stringify(favoriteIds));
    const count = favoriteIds.length;
    localStorage.setItem('favoriteItensCount', JSON.stringify(count));
    this.favoritesCountSubject.next(count);
  };

  getFavoritesCount(): number {
    const savedFavoritesCount = localStorage.getItem('favoriteItensCount');
    return savedFavoritesCount ? JSON.parse(savedFavoritesCount) : 0;
  };

  getFavoriteProducts(): CardProducts[] {
    const savedFavorites = localStorage.getItem('favorites');

    if(!savedFavorites) {
      return [];
    };
    const favoriteIds: string[] = JSON.parse(savedFavorites);
    return this.allProducts.filter(product => {
      const uniqueId = this.getUniqueProductId(product);
      return favoriteIds.includes(uniqueId);
    });
  }
}
