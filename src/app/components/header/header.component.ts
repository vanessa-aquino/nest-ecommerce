import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GeolocationService } from '../../services/geolocation.service';
import { SearchService } from '../../services/search.service';
import { Category } from '../../models/category.model';
import { ProductsService } from '../../services/products.service';
import { Subscription } from 'rxjs';
import { RouterService } from '../../services/router.service';

@Component({
  selector: 'app-header',
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit, OnDestroy{
  categories: Category[] = [];
  latitude: number | null = null;
  longitude: number | null = null;
  errorMessage: string = '';
  searchTerm: string = '';
  favoriteCount: number = 0;
  private favoritesCountSubscription!: Subscription;

  constructor(
    private geolocationService: GeolocationService,
    private searchService: SearchService,
    private productsService: ProductsService,
    private routerService: RouterService,
  ) {};

  ngOnInit(): void {
    this.searchService.searchTerm$.subscribe(term => {
      this.searchTerm = term;
    });
    this.favoritesCountSubscription = this.productsService.favoritesCount$.subscribe(count => {
      this.favoriteCount = count;
    })
  };

  ngOnDestroy(): void {
    if(this.favoritesCountSubscription) {
      this.favoritesCountSubscription.unsubscribe();
    }
  }

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

  goToFavorites() {
    this.routerService.goToFavorites();
  };
}

