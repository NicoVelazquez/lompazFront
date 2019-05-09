import {Component, Input, OnInit} from '@angular/core';
import * as UIkit from 'uikit';
import {Router} from '@angular/router';
import {ProductService} from '../../shared/services/product.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {

  @Input() products;

  constructor(private router: Router, private productService: ProductService) {
  }

  ngOnInit() {
  }

  removeFromFavorites(id: string) {
    this.productService.deleteFavoriteProduct(id).then(() => {
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

  goToProduct(id: number) {
    this.router.navigate(['/product/' + id]);
  }

}
