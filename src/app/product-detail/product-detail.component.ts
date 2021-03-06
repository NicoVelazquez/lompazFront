import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProductService} from '../shared/services/product.service';
import {ActivatedRoute, Router} from '@angular/router';
import * as UIkit from 'uikit';
import {AuthService} from '../shared/services/auth.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit, OnDestroy {

  product: any;
  categoryProducts: any;
  sizes = [];
  selectedSize: string;
  comments: any;
  rating: number;

  private subscription: Subscription;

  constructor(private auth: AuthService, private router: Router, private aRouter: ActivatedRoute, private productService: ProductService) {
  }

  ngOnInit() {
    this.aRouter.params.subscribe(params => {
      this.subscription = this.productService.getProduct(params['id']).subscribe(data => {
        this.product = data;
        this.product.id = params['id'];
        this.sizes = this.product.sizes;
        this.selectedSize = this.sizes[0];
        this.productService.getCategoryProducts(this.product.category).subscribe(data2 => {
          this.categoryProducts = data2;
        });
      });

      this.productService.getProductComments(params['id']).subscribe(data => {
        this.comments = data;
        this.calculateRating();
      });

    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  changeImage(index: number) {
    console.log(index);
  }

  addToCart(product: any) {
    product.sizes = this.selectedSize;
    product.cuantity = 1;
    this.productService.addCartProduct(product);
    UIkit.notification({
      message: 'Producto añadido al carrito',
      status: 'primary',
      pos: 'top-right'
    });
    // this.productService.addCartProduct(product).then(() => {
    //   UIkit.notification({
    //     message: 'Producto añadido al carrito',
    //     status: 'primary',
    //     pos: 'top-right'
    //   });
    // }).catch(err => {
    //   console.log(err);
    // });
  }

  // selectSize(size: string) {
  //   if (this.selectedSize != null) {
  //     document.getElementById(this.selectedSize).style.fontWeight = '';
  //   }
  //   this.selectedSize = size;
  //   document.getElementById(size).style.fontWeight = 'bold';
  // }
  selectSize(size: any) {
    this.selectedSize = size.target.value;
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
    this.rating = sum !== 0 ? Math.round(sum / this.comments.length) : 1;
  }

}
