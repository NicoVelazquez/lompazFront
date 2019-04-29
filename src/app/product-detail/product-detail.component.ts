import {Component, Input, OnInit} from '@angular/core';
import {ProductService} from '../shared/services/product.service';
import {ActivatedRoute, Router} from '@angular/router';
import * as UIkit from 'uikit';
import {AuthService} from '../shared/services/auth.service';
import {OnClickEvent} from 'angular-star-rating';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  product: any;
  categoryProducts: any;
  sizes = [];
  selectedSize: string;
  comments: any;
  rating: number;

  constructor(public auth: AuthService, private router: Router, private aRouter: ActivatedRoute, private productService: ProductService) {
  }

  ngOnInit() {
    this.aRouter.params.subscribe(params => {
      this.productService.getProduct(params['id']).subscribe(data => {
        this.product = data;
        console.log(this.product);
        this.product.id = params['id'];
        this.sizes = this.product.sizes;
        this.productService.getCategoryProducts(this.product.category).subscribe(data2 => {
          this.categoryProducts = data2;
        });

        // this.comments = this.productService.getProductComments(this.product.id);
        // this.calculateRating();

      });

    });
  }

  changeImage(index: number) {
    console.log(index);
  }

  addtoCart(product: any) {
    product.sizes = this.selectedSize;
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

  calculateRating() {
    let sum = 0;
    for (const c of this.comments) {
      sum += c.rating;
    }
    this.rating = sum / this.comments.length;
    console.log(this.rating);
  }

}
