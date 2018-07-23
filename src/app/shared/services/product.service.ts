import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  products = [{'name': 'Lompaz', 'description': 'El mejor de todos', 'photoUrl': '../../assets/images/lompa.jpg'},
    {'name': 'Lompaz', 'description': 'El mejor de todos', 'photoUrl': '../../assets/images/lompa.jpg'},
    {'name': 'Lompaz', 'description': 'El mejor de todos', 'photoUrl': '../../assets/images/lompa.jpg'},
    {'name': 'Lompaz', 'description': 'El mejor de todos', 'photoUrl': '../../assets/images/lompa.jpg'}
  ];

  constructor() {
  }

  public getAllProducts(): any {
    return this.products;
  }
}
