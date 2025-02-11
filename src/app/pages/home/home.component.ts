import { Component } from '@angular/core';
import { NavbarComponent } from "../../components/navbar/navbar.component";
import { HeaderComponent } from "../../components/header/header.component";
import { NavbarBottomComponent } from "../../components/navbar-bottom/navbar-bottom.component";
import { CarouselComponent } from "../../components/carousel/carousel.component";
import { CategoriesComponent } from "../../components/categories/categories.component";
import { NestComponent } from "../../components/nest/nest.component";
import { MiniBannerComponent } from "../../components/mini-banner/mini-banner.component";
import { FooterComponent } from "../../components/footer/footer.component";

@Component({
  selector: 'app-home',
  imports: [NavbarComponent, HeaderComponent, NavbarBottomComponent, CarouselComponent, CategoriesComponent, NestComponent, MiniBannerComponent, FooterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
