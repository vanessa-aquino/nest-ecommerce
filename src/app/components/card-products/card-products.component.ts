import { Component, OnInit } from '@angular/core';
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
  cardProducts: CardProducts[] = [];

  constructor (private productsService: ProductsService) {};

  ngOnInit(): void {
    this.cardProducts = this.productsService.getAllProducts();
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
}
