import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import * as UIkit from 'uikit';
import {Router} from '@angular/router';
import {ProductService} from '../../shared/services/product.service';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit, OnChanges {

  @Input() products;
  totalPrice: number;

  constructor(private router: Router, private productService: ProductService) {
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.products.currentValue !== null) {
      this.calculateTotalPrice();
    }
  }

  calculateTotalPrice() {
    this.totalPrice = 0;
    for (const p of this.products) {
      this.totalPrice += p.price;
    }
  }

  checkout() {

  }

  goToProduct(id: number) {
    this.router.navigate(['/product/' + id]);
  }

  removeFromCart(id: string) {
    // TODO probar que se este borrando bien de front
    this.productService.deleteCartProduct(id).then(() => {
      UIkit.notification({
        message: 'Quitado de carrito',
        status: 'danger',
        pos: 'top-right'
      });
    });
    // for (let i = 0; i < this.products.length; i++) {
    //   if (this.products[i].id === id) {
    //     this.products.splice(i, 1);
    //     this.calculateTotalPrice();
    //     UIkit.notification({
    //       message: 'Quitado de carrito',
    //       status: 'primary',
    //       pos: 'top-right'
    //     });
    //   }
    // }
  }

}
