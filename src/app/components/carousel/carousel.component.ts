import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-carousel',
  imports: [CommonModule],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.css'
})
export class CarouselComponent implements OnInit, OnDestroy {
  image: string[] = [
    'img/bg4-card.png',
    'img/bg2-card.png',

  ]
  slides: {title: string; description: string}[] = [
    {
      title: 'Não perca as incrivéis ofertas da mercearia',
      description: 'Increva-se na nossa newsletter',
    },

    {
      title: 'Legumes frescos, grande desconto',
      description: 'Economize até 50% em seu primeiro pedido',
    }
  ];

  currentIndex: number = 0;
  intervalId: any;

  ngOnInit(): void {
    this.startAutoSlide();
  };

  ngOnDestroy(): void {
    if(this.intervalId) {
      clearInterval(this.intervalId);
    }
  };

  startAutoSlide(): void {
    this.intervalId = setInterval(() => {
      this.nextImage();
    }, 5000);
  };

  stopAutoSlive(): void {
    if(this.intervalId) {
      clearInterval(this.intervalId);
    }
  };

  restartAutoSlive(): void {
    this.stopAutoSlive();
    setTimeout(() => {
      this.startAutoSlide();
    }, 3000);
  };

  nextImage(): void {
    const textElement = document.querySelector('.container_texts');
    if(textElement) {
      textElement.classList.add('fade');

      setTimeout(() => {
        this.currentIndex = (this.currentIndex + 1) % this.image.length;
        textElement.classList.remove('fade');
      }, 500);
    }
  }

  prevImage():void {
    this.currentIndex = (this.currentIndex - 1 + this.image.length) % this.image.length;
  }

  goToImage(index: number): void {
    this.currentIndex = index;
  }
}
