import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import * as UIkit from 'uikit';
import {Router} from '@angular/router';
import {ProductService} from '../../shared/services/product.service';
import {PreferenceRequest} from '../../shared/models/mercado-pago/preference/PreferenceRequest';
import {HttpClient} from '@angular/common/http';
import {MercadoLibreService} from '../../shared/services/mercado-libre.service';
import {AuthService} from '../../shared/services/auth.service';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit, OnChanges {

  @Input() products;
  totalPrice: number;

  onCheckout = false;

  request: PreferenceRequest = new PreferenceRequest();

  totalProducts = 0;

  constructor(private router: Router, private productService: ProductService, private auth: AuthService,
              private meLiService: MercadoLibreService) {
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.products.currentValue !== null) {
      console.log(this.products);
      this.calculateTotalPrice();
    }
  }

  calculateTotalPrice() {
    this.totalPrice = 0;
    for (const p of this.products) {
      this.totalPrice += (p.price * p.cuantity);

      this.totalProducts += p.cuantity;
    }
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

  checkout() {
    this.onCheckout = true;
    const items = [];
    this.products.forEach(p => {
      items.push({
        id: p.id,
        title: p.name,
        description: p.description,
        pictureUrl: p.photosUrl[0],
        quantity: p.cuantity,
        unitPrice: p.price,
        currencyId: 'ARS'
      });
    });

    this.request = {
      'items': items,
      'payer': {
        'email': this.auth.currentUser.email,
        'name': this.auth.currentUser.name,
        'surname': this.auth.currentUser.lastname
      },
      'externalReference': 'nada',
      'freeShipping': true

    };

    this.meLiService.setCurrentCart(this.products).then((e) => {
      this.meLiService.postPreference(this.request).then(r => {
        console.log(r);
        // lo hace en la misma pestaña
        window.location.href = r.sandboxInitPoint;
        // lo hace en una pestaña nueva
        // window.open(r.sandboxInitPoint, undefined, undefined, true);
      }).catch(err => {
        // TODO: q hacemos? redireccionamos a una pagina de error geenrica ?
        console.log(err);
      });
    });
  }

}
