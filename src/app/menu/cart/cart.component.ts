import {Component, Input, OnInit} from '@angular/core';
import * as UIkit from 'uikit';
import {Router} from '@angular/router';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  @Input() products;
  totalPrice: number;

  constructor(private router: Router) {
  }

  ngOnInit() {
    this.calculateTotalPrice();
  }

  calculateTotalPrice() {
    this.totalPrice = 0;
    for (const p of this.products) {
      this.totalPrice = this.totalPrice + p.price;
    }
  }

  checkout() {

  }

  goToProduct(id: number) {
    this.router.navigate(['/product/' + id]);
  }

  removeFromCart(id: number) {
    for (let i = 0; i < this.products.length; i++) {
      if (this.products[i].id === id) {
        this.products.splice(i, 1);
        this.calculateTotalPrice();
        UIkit.notification({
          message: 'Quitado de carrito',
          status: 'primary',
          pos: 'top-right'
        });
      }
    }
  }

}
