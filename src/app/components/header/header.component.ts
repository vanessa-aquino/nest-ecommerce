import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GeolocationService } from '../../services/geolocation.service';
import { SearchService } from '../../services/search.service';
import { take } from 'rxjs';

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
  selectedCategory: string = 'all';

  constructor(
    private geolocationService: GeolocationService,
    private searchService: SearchService
  ) {};

  ngOnInit(): void {
    this.searchService.searchTerm$.pipe(take(1)).subscribe(term => this.searchTerm = term);
    this.searchService.selectedCategory$.pipe(take(1)).subscribe(category => this.selectedCategory = category);
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
  };

  updateCategory(event: Event): void {
    const value = (event.target as HTMLSelectElement).value;
    this.searchService.updateCategory(value);
  };

  searchItens(): void {
    this.searchService.searchTerm$.pipe(take(1)).subscribe(searchTerm => {
      this.searchTerm = searchTerm;
      console.log(searchTerm)
    });
    this.searchService.selectedCategory$.pipe(take(1)).subscribe(selectedCategory => {
      this.selectedCategory = selectedCategory;
      console.log(selectedCategory)
    });
  };
}
