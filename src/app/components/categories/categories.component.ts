import { Component, OnInit, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { Category } from '../../models/category.model';
import { CategoryService } from '../../services/category.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-categories',
  imports: [CommonModule],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css'
})
export class CategoriesComponent implements OnInit, AfterViewInit {
  @ViewChild('carousel', {static: false}) carousel!: ElementRef;

  categories: Category[] = [];
  isDragging = false;
  startX = 0;
  scrollLeft = 0

  constructor(private categoryService: CategoryService) {};

  ngOnInit(): void {
    this.categories = this.categoryService.getCategories();
  }

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
  }

  scrolLeft() {
    this.carousel.nativeElement.scrollBy({left: -250, behavior: 'smooth'});
  }

  scrollRight() {
    this.carousel.nativeElement.scrollBy({left: 250, behavior: 'smooth'});
  }
}
