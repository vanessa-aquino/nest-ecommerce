import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarBottomComponent } from "../../components/navbar-bottom/navbar-bottom.component";
import { HeaderComponent } from "../../components/header/header.component";
import { NavbarComponent } from "../../components/navbar/navbar.component";
import { BannerPageComponent } from "../../components/banner-page/banner-page.component";
import { CardProductsComponent } from "../../components/card-products/card-products.component";
import { CardProducts } from '../../models/card-products.model';
import { ProductsService } from '../../services/products.service';
import { RouterService } from '../../services/router.service';

@Component({
  selector: 'app-favorites',
  imports: [NavbarBottomComponent, HeaderComponent, NavbarComponent, BannerPageComponent, CardProductsComponent, CommonModule],
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.css'
})
export class FavoritesComponent implements OnInit {
  favorites: CardProducts[] = [];

  constructor(
    private productsService: ProductsService,
    private routerService: RouterService,
  ) {};

  ngOnInit(): void {
    this.favorites = this.productsService.getFavoriteProducts();
    };
  
  goToHome(): void {
    this.routerService.goToHome();
  }
}

