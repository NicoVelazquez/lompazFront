import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import * as UIkit from 'uikit';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {

  @Input() product;

  constructor(private router: Router) {
  }

  ngOnInit() {
  }

  addToFavorites(id: string) {
    // Ver que pasa cuando salgo de la lista y lo veo devuelta... TODO
    // Agregar el producto a favoritos TODO
    if (document.getElementById('i' + id).style.backgroundColor === '') {
      document.getElementById('i' + id).style.backgroundColor = '#4DA3E2';
      UIkit.notification({
        message: 'Agregado a favoritos',
        status: 'primary',
        pos: 'top-right'
      });
    } else {
      document.getElementById('i' + id).style.backgroundColor = '';
      UIkit.notification({
        message: 'Quitado de favoritos',
        status: 'primary',
        pos: 'top-right'
      });
    }
  }

  goToProduct(id: number) {
    this.router.navigate(['/product/' + id]);
  }

}
