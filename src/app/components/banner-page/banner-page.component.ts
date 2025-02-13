import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-banner-page',
  imports: [],
  templateUrl: './banner-page.component.html',
  styleUrl: './banner-page.component.css'
})
export class BannerPageComponent {
  constructor(private router: Router) {};

  goToHome(): void {
    this.router.navigate(['/home']);
  }

  goToFavorites(): void {
    this.router.navigate(['/favorites'])
  }
}
