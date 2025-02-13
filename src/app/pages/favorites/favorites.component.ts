import { Component } from '@angular/core';
import { NavbarBottomComponent } from "../../components/navbar-bottom/navbar-bottom.component";
import { HeaderComponent } from "../../components/header/header.component";
import { NavbarComponent } from "../../components/navbar/navbar.component";
import { BannerPageComponent } from "../../components/banner-page/banner-page.component";

@Component({
  selector: 'app-favorites',
  imports: [NavbarBottomComponent, HeaderComponent, NavbarComponent, BannerPageComponent],
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.css'
})
export class FavoritesComponent {
  
}
