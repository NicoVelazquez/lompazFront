import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ProductService} from '../shared/services/product.service';
import {MercadoLibreService} from '../shared/services/mercado-libre.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  tab: string;
  cartProducts = [];
  favoriteProducts = [];
  orders = [];


  constructor(private router: Router, private aRouter: ActivatedRoute, private productService: ProductService,
              private meLiService: MercadoLibreService) {
  }

  ngOnInit() {
    this.aRouter.params.subscribe(params => {
      this.tab = this.router.url.substr(1);
      document.getElementById(this.tab).classList.add('uk-active');
    });

    this.productService.getCartProducts().subscribe(data => {
      this.cartProducts = data;
      console.log(this.cartProducts);
    });

    this.productService.getFavoriteProducts().subscribe(data => {
      this.favoriteProducts = data;
    });

    this.meLiService.getAllOrders().subscribe(data => {
      this.orders = data;
    });

  }

  goToProfile() {
    this.router.navigate(['/profile']);
  }

  goToCart() {
    this.router.navigate(['/cart']);
  }

  goToFavorites() {
    this.router.navigate(['/favorites']);
  }

  goToOrders() {
    this.router.navigate(['/orders']);
  }

}
