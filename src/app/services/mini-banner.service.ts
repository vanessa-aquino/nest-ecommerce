import { Injectable } from '@angular/core';
import { MiniBanner } from '../models/mini-banner.model';

@Injectable({
  providedIn: 'root'
})
export class MiniBannerService {
  private miniBanner: MiniBanner[] = [
    {
      image: 'icons/offer.png',
      title: 'Melhores Preços',
      detail: 'Pedidos acima de R$50'
    },
    {
      image: 'icons/deal.png',
      title: 'Entrega grátis',
      detail: 'Serviços incríveis 24h'
    },
    {
      image: 'icons/delivery.png',
      title: 'Ofertas Diárias',
      detail: 'Quando você se inscreve'
    },
    {
      image: 'icons/assortment.png',
      title: 'Ampla Variedade',
      detail: 'Mega Descontos'
    },
    {
      image: 'icons/returns.png',
      title: 'Fácil Devolução',
      detail: 'Em até 30 dias'
    }
  ];

  allMiniBanners(): MiniBanner[] {
    return this.miniBanner;
  }
}
