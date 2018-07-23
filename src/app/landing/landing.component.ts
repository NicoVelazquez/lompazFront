import {Component, OnInit} from '@angular/core';
import * as UIkit from 'uikit';
import {ProductService} from "../shared/services/product.service";


@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {

  products = [];

  constructor(private productService: ProductService) {
  }

  ngOnInit() {
    // Hay que hacer el service que me traiga los productos con promise
    this.products = this.productService.getAllProducts();

    UIkit.notification({
      message: 'Hola',
      status: 'primary',
      pos: 'bottom-center'
    });
  }

}
