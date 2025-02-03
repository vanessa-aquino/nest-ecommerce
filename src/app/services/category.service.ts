import { Injectable } from '@angular/core';
import { Category } from '../models/category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private categories: Category[] = [
    {
      name:'Leites e Laticínios',
      image: 'img/milks.png'
    },
    {
      name:'Vinhos e Alcólicos',
      image: 'img/wines.png'
    },
    {
      name:'Beleza',
      image: 'img/beauty.png'
    },
    {
      name:'Pets',
      image: 'img/pets.png'
    },
    {
      name:'Guloseimas',
      image: 'img/junkfoods.png'
    },
    {
      name:'Alimentos Básicos',
      image: 'img/dairies.png'
    },
    {
      name:'Frutas',
      image: 'img/fruits.png'
    },
    {
      name:'Legumes e Verduras',
      image: 'img/vegetables.png'
    },
  ];

  getCategories(): Category[] {
    return this.categories;
  };
}
