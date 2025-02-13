import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RouterService {

  constructor(private router: Router) { };

  goToHome(): void {
    this.router.navigate(['/home']);
  };

  goToFavorites(): void {
    this.router.navigate(['/favorites']);
  };
}
