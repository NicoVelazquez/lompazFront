import {Component, Input, OnInit} from '@angular/core';
import * as UIkit from 'uikit';
import {Router} from '@angular/router';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {

  @Input() products;

  constructor(private router: Router) {
  }

  ngOnInit() {
  }

  removeFromFavorites(id: string) {
    for (let i = 0; i < this.products.length; i++) {
      if (this.products[i].id === id) {
        this.products.splice(i, 1);
        UIkit.notification({
          message: 'Producto quitado de favoritos',
          status: 'primary',
          pos: 'top-right'
        });
      }
    }
  }

  goToProduct(id: number) {
    this.router.navigate(['/product/' + id]);
  }

}
