import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BannerService {

  banners = [{'name': 'Banner1', 'photoUrl': '../../assets/images/banner1.png'},
    {'name': 'Banner2', 'photoUrl': '../../assets/images/banner2.jpg'},
    {'name': 'Banner3', 'photoUrl': '../../assets/images/banner3.jpg'}
  ];

  constructor() {
  }

  public getBanners(): any {
    return this.banners;
  }
}
