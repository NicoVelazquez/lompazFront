import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import * as UIkit from 'uikit';
import {ProductService} from '../../shared/services/product.service';
import {AuthService} from '../../shared/services/auth.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {

  @Input() product;

  constructor(private router: Router, private productService: ProductService, private auth: AuthService) {
  }

  ngOnInit() {
  }

  addToFavorites(id: string) {
    // TODO - Cuando salgo de la lista y entro devuelta, no me aparece como marcado favorito
    if (document.getElementById('i' + id).style.backgroundColor === '') {
      this.productService.addFavoriteProduct(this.product).then(() => {
        document.getElementById('i' + id).style.backgroundColor = '#4DA3E2';
        UIkit.notification({
          message: 'Agregado a favoritos',
          status: 'primary',
          pos: 'top-right'
        });
      }).catch(err => {
        console.log(err);
      });
    } else {
      this.productService.deleteFavoriteProduct(this.product.id).then(() => {
        document.getElementById('i' + id).style.backgroundColor = '';
        UIkit.notification({
          message: 'Quitado de favoritos',
          status: 'danger',
          pos: 'top-right'
        });
      }).catch(err => {
        console.log(err);
      });
    }
  }

  goToProduct(id: number) {
    this.router.navigate(['/product/' + id]);
  }

}
