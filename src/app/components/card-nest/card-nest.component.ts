import { Component } from '@angular/core';

@Component({
  selector: 'app-card-nest',
  imports: [],
  templateUrl: './card-nest.component.html',
  styleUrl: './card-nest.component.css'
})
export class CardNestComponent {


scrollBuy() {
  const sectionBuy = document.querySelector('#buy');
  if(sectionBuy) {
    sectionBuy.scrollIntoView({behavior: 'smooth'});
  };
};

}
