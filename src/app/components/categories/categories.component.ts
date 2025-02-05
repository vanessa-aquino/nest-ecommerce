import { Component, OnInit, ElementRef, ViewChild, AfterViewInit,} from '@angular/core';
import { CardProductsComponent } from '../card-products/card-products.component';
import { Category } from '../../models/category.model';
import { CategoryService } from '../../services/category.service';
import { CommonModule } from '@angular/common';
import { ProductsService } from '../../services/products.service';
import { CardProducts } from '../../models/card-products.model';

@Component({
  selector: 'app-categories',
  imports: [CommonModule, CardProductsComponent],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css'
})
export class CategoriesComponent implements OnInit, AfterViewInit {
  @ViewChild('carousel', {static: false}) carousel!: ElementRef;

  categories: Category[] = [];
  products: CardProducts[] = [];
  allProducts: CardProducts[] = [];
  productsTitle: string = 'Todos os Produtos';
  isDragging = false;
  startX = 0;
  scrollLeft = 0

  constructor(
    private categoryService: CategoryService,
    private productsService: ProductsService
  ) {};

  ngOnInit(): void {
    this.categories = this.categoryService.getCategories();
    this.allProducts = this.productsService.getAllProducts();
    this.products = [...this.allProducts];
  };

  ngAfterViewInit(): void {
    const carouselEl = this.carousel.nativeElement;

    carouselEl.addEventListener('mousedown', (event: MouseEvent) => {
      this.isDragging = true;
      this.startX = event.pageX - carouselEl.offsetLeft;
      this.scrollLeft = carouselEl.scrollLeft;
    });

    carouselEl.addEventListener('mouseleave', () => {
      this.isDragging = false;
    });

    carouselEl.addEventListener('mouseup', () => {
      this.isDragging = false;
    });

    carouselEl.addEventListener('mousemove', (event: MouseEvent) => {
      if(!this.isDragging) return;
      event.preventDefault();
      const x = event.pageX - carouselEl.offsetLeft;
      const walk = (x - this.startX);
      carouselEl.scrollLeft = this.scrollLeft - walk;
    });
  };

  scrolLeft() {
    this.carousel.nativeElement.scrollBy({left: -250, behavior: 'smooth'});
  };

  scrollRight() {
    this.carousel.nativeElement.scrollBy({left: 250, behavior: 'smooth'});
  };

  filterByCategories(categoryId: number): void {
    if(categoryId === 0) {
      this.showAllProducts();
    } else {
      const selectedCategory = this.categories.find(cat => cat.id === categoryId)
      this.products = this.allProducts.filter(product => product.id === categoryId);
      this.productsTitle = `Produtos em ${selectedCategory?.name}`;
    };
  };

  showAllProducts(): void {
    this.products = [...this.allProducts];
    this.productsTitle = 'Todos os Produtos';
  }


}
