import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-admin-settings',
  templateUrl: './admin-settings.component.html',
  styleUrls: ['./admin-settings.component.css']
})
export class AdminSettingsComponent implements OnInit {

  tab: string;

  constructor(private router: Router, private aRouter: ActivatedRoute) {

  }

  ngOnInit() {
    this.aRouter.params.subscribe(params => {
      this.tab = this.router.url.substr(1);
      document.getElementById(this.tab).classList.add('uk-active');
    });
  }

  goToProducts() {
    this.router.navigate(['/manage/products']);
  }

  goToCategories() {
    this.router.navigate(['/manage/categories']);
  }

  goToBanners() {
    this.router.navigate(['/manage/banners']);
  }

}
