import {AfterViewInit, Component, OnInit} from '@angular/core';
import {MercadoLibreService} from '../shared/services/mercado-libre.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ProductService} from '../shared/services/product.service';
import * as UIkit from 'uikit';
import {AuthService} from '../shared/services/auth.service';

@Component({
  selector: 'app-checkout-response',
  templateUrl: './checkout-response.component.html',
  styleUrls: ['./checkout-response.component.css']
})
export class CheckoutResponseComponent implements OnInit {

  cart = [];
  merchant_order_id = '';
  external_reference = '';

  response = 'success';

  constructor(private meLiService: MercadoLibreService, private aRouter: ActivatedRoute, private router: Router,
              private productService: ProductService, private auth: AuthService) {
  }

  ngOnInit() {
    this.aRouter.params.subscribe(params => {
      if (params.response === 'success') {
        this.success();
      } else {
        this.failure();
      }
    });

    UIkit.util.ready(function () {
      const bar = document.getElementById('js-progressbar') as HTMLProgressElement;
      const animate = setInterval(function () {
        bar.value += 2.5;
        if (bar.value >= bar.max) {
          clearInterval(animate);
        }
      }, 50);
    });
  }

  success() {
    this.response = 'success';
    this.productService.deleteAllCartProducts();

    this.aRouter.queryParams.subscribe(qParams => {
      this.merchant_order_id = qParams.merchant_order_id;
      this.external_reference = qParams.external_reference;

      this.meLiService.getCurrentCart().then(c => {
        this.cart = c;
        this.meLiService.removeCurrentCart();

        this.meLiService.getMerchantOrder(this.merchant_order_id).then(data => {

          this.meLiService.addOrder(
            {
              merchant_order_id: this.merchant_order_id,
              date: Date.now(),
              status: data.shipments[0].status,
              streetName: data.shipments[0].receiverAddress.streetName,
              streetNumber: data.shipments[0].receiverAddress.streetNumber,
              zipCode: data.shipments[0].receiverAddress.zipCode,
              products: this.cart
            }
          ).then(() => {

            const request = {
              email: this.auth.currentUser.email,
              url: 'http://localhost:4201/orders',
              merchant_order_id: this.merchant_order_id
            };

            console.log(request);

            this.meLiService.sendMail(request).then(() => {
              setTimeout(() => {
                this.router.navigate(['/orders']);
              }, 2000);
            });

          });

        });

      });
    });
  }

  failure() {
    this.response = 'failure';

    setTimeout(() => {
      this.router.navigate(['/cart']);
    }, 2000);
  }
}

