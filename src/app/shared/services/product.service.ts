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
    'category': 'Pijama', 'price': 75, 'rating': 1
  },
    {
      'id': 2, 'name': 'Lompaz2', 'description': 'El mejor de todos',
      'photoUrl': ['../../assets/images/lompa1.jpg', '../../assets/images/lompa2.jpg', '../../assets/images/lompa3.jpg'],
      'category': 'Pijama', 'price': 75, 'rating': 2
    },
    {
      'id': 3, 'name': 'Lompaz3', 'description': 'El mejor de todos',
      'photoUrl': ['../../assets/images/lompa1.jpg', '../../assets/images/lompa2.jpg', '../../assets/images/lompa3.jpg'],
      'category': 'Pijama', 'price': 75, 'rating': 3
    },
    {
      'id': 4, 'name': 'Lompaz4', 'description': 'El mejor de todos',
      'photoUrl': ['../../assets/images/lompa1.jpg', '../../assets/images/lompa2.jpg', '../../assets/images/lompa3.jpg'],
      'category': 'Pijama', 'price': 75, 'rating': 4
    },
    {
      'id': 5, 'name': 'Lompaz5', 'description': 'El mejor de todos',
      'photoUrl': ['../../assets/images/lompa1.jpg', '../../assets/images/lompa2.jpg', '../../assets/images/lompa3.jpg'],
      'category': 'Pijama', 'price': 75, 'rating': 5
    },
    {
      'id': 6, 'name': 'Lompaz6', 'description': 'El mejor de todos',
      'photoUrl': ['../../assets/images/lompa1.jpg', '../../assets/images/lompa2.jpg', '../../assets/images/lompa3.jpg'],
      'category': 'Pijama', 'price': 75, 'rating': 1
    }
  ];

  comments = [{
    'id': 1,
    'title': 'El mejor Lompaz',
    'comment': 'No puede ser mejor este lompa. Es muy fachero y esta remendo. Para usar en todo momento',
    'username': 'Nicolas Velazquez',
    'date': '08/09/2015',
    'rating': 5
  },
    {
      'id': 2,
      'title': 'El mejor Lompaz',
      'comment': 'Muy bueno, lastima la poca variedad de colores. Igualmente, lo super recomiendo para usar en todos lados',
      'username': 'Leo Messi',
      'date': '08/09/2016',
      'rating': 4
    },
    {
      'id': 3,
      'title': 'Medio Pelo',
      'comment': 'No me gusto tanto el producto ya que el bolsillo de atras me aprece chico ya que no me entra mi iphone 6 plus',
      'username': 'Martin Lopez',
      'date': '08/09/2017',
      'rating': 3
    },
    {
      'id': 4,
      'title': 'Medio Pelo2',
      'comment': 'No me gusto tanto el producto ya que el bolsillo de atras me aprece chico ya que no me entra mi iphone 6 plus',
      'username': 'Martin Lopez',
      'date': '08/09/2018',
      'rating': 3
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
    return this.products.filter(p => p.category === category);
  }

  public getProductComments(id: number): any {
    return this.comments;
  }

}
