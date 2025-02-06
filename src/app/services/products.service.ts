import { Injectable } from '@angular/core';
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
      id: 5
    },
    {
      tag: 'New',
      image: 'img/choco.png',
      category: 'guloseimas',
      name: 'Barra Milka',
      price: 'R$ 32,00',
      id: 5
    },
    {
      image: 'img/cookie.png',
      category: 'guloseimas',
      name: 'Biscoitos Sortidos',
      price: 'R$ 8,50',
      id: 5
    },
    {
      image: 'img/creamcheese.png',
      category: 'laticinios',
      name: 'Cream Cheese',
      price: 'R$ 10,50',
      id: 1
    },
    {
      tag: 'Hot',
      image: 'img/gin.png',
      category: 'alcoolicos',
      name: 'Gin Draco',
      price: 'R$ 80,00',
      id: 2
    },
    {
      image: 'img/grape.png',
      category: 'frutas',
      name: 'Uva',
      price: 'R$ 7,00',
      id: 7
    },
    {
      image: 'img/kiwi.png',
      category: 'frutas',
      name: 'Kiwi',
      price: 'R$ 8,00',
      id: 7
    },
    {
      image: 'img/mango.png',
      category: 'frutas',
      name: 'Manga',
      price: 'R$ 5,50',
      id: 7
    },
    {
      image: 'img/margarina.png',
      category: 'laticinios',
      name: 'Qualy Margarina',
      price: 'R$ 8,50',
      id: 1
    },
    {
      image: 'img/milk.png',
      category: 'laticinios',
      name: 'Leite Ninho',
      price: 'R$ 24,00',
      id: 1
    },
    {
      image: 'img/potato.png',
      category: 'legumes',
      name: 'Batata',
      price: 'R$ 3,90',
      id: 8
    },
    {
      image: 'img/rice.png',
      category: 'mercearia',
      name: 'Arroz',
      price: 'R$ 5,90',
      id: 6
    },
    {
      image: 'img/sugar.png',
      category: 'mercearia',
      name: 'Açucar',
      price: 'R$ 3,90',
      id: 6
    },
    {
      tag: 'Sale',
      image: 'img/tomato.png',
      category: 'legumes',
      name: 'Tomate',
      price: 'R$ 1,90',
      id: 8
    },
  ];

  getAllProducts(): CardProducts[] {
    return this.allProducts;
  };

  getProductsById(id: number): CardProducts[] {
    return this.allProducts.filter(product => product.id === id);
  };


}
