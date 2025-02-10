import { Component, OnInit, ElementRef, ViewChild, AfterViewInit,} from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardProductsComponent } from '../card-products/card-products.component';
import { Category } from '../../models/category.model';
import { CardProducts } from '../../models/card-products.model';
import { CategoryService } from '../../services/category.service';
import { ProductsService } from '../../services/products.service';
import { SearchService } from '../../services/search.service';
import { debounceTime } from 'rxjs';

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
  searchTerm: string = '';
  selectedCategory: string = 'all';
  isDragging = false;
  startX = 0;
  scrollLeft = 0

  constructor(
    private categoryService: CategoryService,
    private productsService: ProductsService,
    private searchService: SearchService
  ) {};

  ngOnInit(): void {
    this.categories = this.categoryService.getCategories();
    this.allProducts = this.productsService.getAllProducts();
    this.products = [...this.allProducts];

    this.searchService.searchTerm$.pipe(debounceTime(500)).subscribe(term => {
    this.searchTerm = term;
    this.filterProducts();
    });

    this.searchService.selectedCategory$.subscribe(category => {
    this.selectedCategory = category;
    this.filterProducts();
  });
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

 filterProducts(): void {
    const searchTerm = this.searchTerm ? this.searchTerm.toLowerCase() : '';
    this.products = this.allProducts.filter(product => {
      const matchesSearchTerm = product.name.toLowerCase().includes(searchTerm);
      const matchesCategory = this.selectedCategory === 'all' || product.category === this.selectedCategory;
      return matchesSearchTerm && matchesCategory;
    });

    this.productsTitle = this.selectedCategory === 'all'
    ? 'Todos os Produtos'
    : `Produtos em: ${this.selectedCategory}`;
};

  scrolLeft(): void {
    this.carousel.nativeElement.scrollBy({left: -250, behavior: 'smooth'});
  };

  scrollRight(): void {
    const carousel = this.carousel.nativeElement;
    if (carousel.scrollLeft + carousel.clientWidth < carousel.scrollWidth) {
      this.carousel.nativeElement.scrollBy({left: 250, behavior: 'smooth'});
    }
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
