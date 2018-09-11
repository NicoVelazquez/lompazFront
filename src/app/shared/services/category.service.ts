import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  categories = [{
    'id': 1, 'name': 'Pijama',
  },
    {
      'id': 2, 'name': 'Pantalon',
    },
    {
      'id': 3, 'name': 'Remera',
    },
    {
      'id': 4, 'name': 'Buzo',
    }
  ];

  constructor() {
  }

  public getAllCategories(): any {
    return this.categories;
  }
}
