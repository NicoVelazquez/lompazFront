import {Component, Input, OnInit} from '@angular/core';
import {ProductService} from '../shared/services/product.service';
import {ActivatedRoute, Router} from '@angular/router';
import * as UIkit from 'uikit';
import {AuthService} from '../shared/services/auth.service';
import {OnClickEvent} from "angular-star-rating";

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  public rating = 5;
  product: any;
  categoryProducts: any;
  sizes = [{'id': 1, 'name': 'Extra Small'}, {'id': 2, 'name': 'Small'}, {'id': 3, 'name': 'Medium'},
    {'id': 3, 'name': 'Large'}, {'id': 4, 'name': 'Extra Large'}];
  selectedSize: string;

  constructor(public auth: AuthService, private router: Router, private aRouter: ActivatedRoute, private productService: ProductService) {
  }

  ngOnInit() {
    this.aRouter.params.subscribe(params => {
      // Hacer el service de agarrar un producto TODO
      this.product = this.productService.getProduct(params['id']);
      // Hacer el service de agarrar productos de una categoria TODO
      this.categoryProducts = this.productService.getCategoryProducts(this.product.category);
    });
  }

  changeImage(index: number) {
    console.log(index);
  }

  addtoCart(product: any) {
    console.log(product);
    UIkit.notification({
      message: 'Producto añadido al carrito',
      status: 'primary',
      pos: 'top-right'
    });
  }

  selectSize(size: string) {
    if (this.selectedSize != null) {
      document.getElementById(this.selectedSize).style.fontWeight = '';
    }
    this.selectedSize = size;
    document.getElementById(size).style.fontWeight = 'bold';
  }

  goToProduct(id: number) {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
    this.router.navigate(['/product/' + id]);
  }

  editProduct(id: number) {
    this.router.navigate(['/product/' + id + '/edit']);
  }

  private addRating($event: OnClickEvent) {
    console.log($event.rating);
  }

}
