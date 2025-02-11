import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MiniBannerService } from '../../services/mini-banner.service';
import { MiniBanner } from '../../models/mini-banner.model';

@Component({
  selector: 'app-mini-banner',
  imports: [CommonModule],
  templateUrl: './mini-banner.component.html',
  styleUrl: './mini-banner.component.css'
})
export class MiniBannerComponent implements OnInit {
  miniBanner: MiniBanner[] = [];

  constructor(private miniBannerService: MiniBannerService) {}

  ngOnInit(): void {
    this.miniBanner = this.miniBannerService.allMiniBanners();
  }
}
