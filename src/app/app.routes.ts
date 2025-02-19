import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { FavoritesComponent } from './pages/favorites/favorites.component';
import { CartComponent } from './components/cart/cart.component';

export const routes: Routes = [
  { path: '', redirectTo:'/home', pathMatch: 'full',},
  { path: 'home', component: HomeComponent },
  { path: 'favorites', component: FavoritesComponent },
];
