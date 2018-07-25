import {Component, OnInit} from '@angular/core';
import * as UIkit from 'uikit';
import {ProductService} from '../shared/services/product.service';
import {BannerService} from '../shared/services/banner.service';


@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {

  products = [];
  banners = [];

  constructor(private productService: ProductService, private bannerService: BannerService) {
  }

  ngOnInit() {
    // Hay que hacer el service que me traiga los productos con promise TODO
    this.products = this.productService.getAllProducts();
    // Hay que hacer el service que me traiga los banners con promise TODO
    this.banners = this.bannerService.getBanners();
  }

}
