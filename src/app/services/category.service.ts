import { Injectable } from '@angular/core';
import { Category } from '../models/category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private categories: Category[] = [
    {
      name: 'Leites & Laticínios',
      image: 'img/milks.png',
      id: 1
    },
    {
      name: 'Vinhos & Alcólicos',
      image: 'img/wines.png',
      id: 2
    },
    {
      name: 'Beleza',
      image: 'img/beauty.png',
      id: 3
    },
    {
      name: 'Pets',
      image: 'img/pets.png',
      id: 4
    },
    {
      name: 'Guloseimas',
      image: 'img/junkfoods.png',
      id: 5
    },
    {
      name: 'Alimentos Básicos',
      image: 'img/dairies.png',
      id: 6
    },
    {
      name: 'Frutas',
      image: 'img/fruits.png',
      id: 7
    },
    {
      name: 'Legumes & Verduras',
      image: 'img/vegetables.png',
      id: 8
    },
  ];

  getCategories(): Category[] {
    return this.categories;
  };

}
