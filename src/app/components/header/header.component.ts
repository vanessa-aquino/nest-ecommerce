import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GeolocationService } from '../../services/geolocation.service';
import { SearchService } from '../../services/search.service';

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
    this.searchService.searchTerm$.subscribe(term => {
      this.searchTerm = term;
    });

    this.searchService.selectedCategory$.subscribe(category => {
      this.selectedCategory = category;
    })
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

  updateCategory(event: Event): void {
  const target = event.target as HTMLElement;
  if (!(target instanceof HTMLSelectElement)) {
    console.error("❌ Erro: updateCategory chamado em um elemento que não é um <select>", target);
    return;
  }
  const selectedOption = target.options[target.selectedIndex].text;
  this.searchService.updateCategory(selectedOption);
  console.log(`✅ Categoria selecionada: ${selectedOption}`);
  };

}
