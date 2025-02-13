import { Component } from '@angular/core';
import { RouterService } from '../../services/router.service';

@Component({
  selector: 'app-navbar-bottom',
  imports: [],
  templateUrl: './navbar-bottom.component.html',
  styleUrl: './navbar-bottom.component.css'
})
export class NavbarBottomComponent {

  constructor(private router: RouterService) {}

  goToHome(): void {
    this.router.goToHome();
  }
}
