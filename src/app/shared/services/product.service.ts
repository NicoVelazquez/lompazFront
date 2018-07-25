import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  products = [{
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
    },
    {
      'id': 4, 'name': 'Lompaz4', 'description': 'El mejor de todos',
      'photoUrl': ['../../assets/images/lompa1.jpg', '../../assets/images/lompa2.jpg', '../../assets/images/lompa3.jpg'],
      'category': 'Pijama', 'price': 75
    },
    {
      'id': 5, 'name': 'Lompaz5', 'description': 'El mejor de todos',
      'photoUrl': ['../../assets/images/lompa1.jpg', '../../assets/images/lompa2.jpg', '../../assets/images/lompa3.jpg'],
      'category': 'Pijama', 'price': 75
    },
    {
      'id': 6, 'name': 'Lompaz6', 'description': 'El mejor de todos',
      'photoUrl': ['../../assets/images/lompa1.jpg', '../../assets/images/lompa2.jpg', '../../assets/images/lompa3.jpg'],
      'category': 'Pijama', 'price': 75
    }
  ];

  constructor() {
  }

  public getAllProducts(): any {
    return this.products;
  }

  public getProduct(id: number): any {
    return this.products[id - 1];
  }

  public getCategoryProducts(category: string): any {
    return this.products.filter(p => p.category === 'Pijama');
  }
}
