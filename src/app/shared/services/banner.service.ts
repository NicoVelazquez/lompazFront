import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BannerService {

  banners = [{
    'id': 1,
    'name': 'Banner1',
    'photoUrl': '../../assets/images/banner1.png',
    'startDate': '26-07-2018',
    'finishDate': '30-07-2018'
  },
    {
      'id': 2,
      'name': 'Banner2',
      'photoUrl': '../../assets/images/banner2.jpg',
      'startDate': '26-07-2018',
      'finishDate': '30-07-2018'
    },
    {
      'id': 3,
      'name': 'Banner3',
      'photoUrl': '../../assets/images/banner3.jpg',
      'startDate': '26-07-2018',
      'finishDate': '30-07-2018'
    }
  ];

  constructor() {
  }

  public getBanners(): any {
    return this.banners;
  }
}
