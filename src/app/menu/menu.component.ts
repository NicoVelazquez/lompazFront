import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  tab: string;
  cartProducts = [{
    'id': 1,
    'name': 'Lompaz',
    'description': 'El mejor de todos los lompaz. La mejor calidad del mercado. Gran diseño y mucha facha.',
    'photoUrl': ['../../assets/images/lompa1.jpg', '../../assets/images/lompa2.jpg', '../../assets/images/lompa3.jpg'],
    'category': 'Pijama', 'price': 75
  },
    {
      'id': 2, 'name': 'Lompaz2', 'description': 'El mejor de todos',
      'photoUrl': ['../../assets/images/lompa1.jpg', '../../assets/images/lompa2.jpg', '../../assets/images/lompa3.jpg'],
      'category': 'Pijama', 'price': 75
    },
    {
      'id': 3, 'name': 'Lompaz3', 'description': 'El mejor de todos',
      'photoUrl': ['../../assets/images/lompa1.jpg', '../../assets/images/lompa2.jpg', '../../assets/images/lompa3.jpg'],
      'category': 'Pijama', 'price': 75
    }
  ];

  constructor(private router: Router, private aRouter: ActivatedRoute) {
  }

  ngOnInit() {
    this.aRouter.params.subscribe(params => {
      this.tab = this.router.url.substr(1);
      document.getElementById(this.tab).classList.add('uk-active');
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
