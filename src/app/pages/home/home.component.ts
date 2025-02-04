import { Component } from '@angular/core';
import { NavbarComponent } from "../../components/navbar/navbar.component";
import { HeaderComponent } from "../../components/header/header.component";
import { NavbarBottomComponent } from "../../components/navbar-bottom/navbar-bottom.component";
import { CarouselComponent } from "../../components/carousel/carousel.component";
import { CategoriesComponent } from "../../components/categories/categories.component";
import { CardProductsComponent } from "../../components/card-products/card-products.component";

@Component({
  selector: 'app-home',
  imports: [NavbarComponent, HeaderComponent, NavbarBottomComponent, CarouselComponent, CategoriesComponent, CardProductsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
