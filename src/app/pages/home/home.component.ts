import { Component } from '@angular/core';
import { NavbarComponent } from "../../components/navbar/navbar.component";
import { HeaderComponent } from "../../components/header/header.component";
import { NavbarBottomComponent } from "../../components/navbar-bottom/navbar-bottom.component";
import { CarouselComponent } from "../../components/carousel/carousel.component";

@Component({
  selector: 'app-home',
  imports: [NavbarComponent, HeaderComponent, NavbarBottomComponent, CarouselComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
