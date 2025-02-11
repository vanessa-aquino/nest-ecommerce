import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GeolocationService } from '../../services/geolocation.service';
import { SearchService } from '../../services/search.service';
import { ProductsService } from '../../services/products.service';
import { Category } from '../../models/category.model';

@Component({
  selector: 'app-header',
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit{
  latitude: number | null = null;
  longitude: number | null = null;
  errorMessage: string = '';
  searchTerm: string = '';

  categories: Category[] = [];

  constructor(
    private geolocationService: GeolocationService,
    private searchService: SearchService,
  ) {};

  ngOnInit(): void {
    this.searchService.searchTerm$.subscribe(term => {
      this.searchTerm = term;
    });
  };

  getUserLocation(): void {
    this.geolocationService.getLocation()
    .then((position) => {
      this.latitude = position.coords.latitude;
      this.longitude = position.coords.longitude;
    })
    .catch((error) => {
      this.errorMessage = error.message || 'Erro desconhecido ao obter localização'
    })
  };

  updateSearchTerm(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.searchService.updateSearchTerm(value);
    console.log(value)
  };

  scrollBy():void {
    const search = document.querySelector('#buy');
    if(search) {
      search.scrollIntoView({behavior: 'smooth'});
    };
  };
}
