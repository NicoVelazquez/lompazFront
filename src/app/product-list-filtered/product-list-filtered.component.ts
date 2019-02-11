import {Component, OnInit} from '@angular/core';
import {ProductService} from '../shared/services/product.service';
import {ActivatedRoute, Router} from '@angular/router';
import {CategoryService} from '../shared/services/category.service';

@Component({
  selector: 'app-product-list-filtered',
  templateUrl: './product-list-filtered.component.html',
  styleUrls: ['./product-list-filtered.component.css']
})
export class ProductListFilteredComponent implements OnInit {

  products = [];
  categories = [];
  sizes = ['XS', 'S', 'M', 'L', 'XL'];
  prices = [{'name': 'menor $100', 'price': 100}, {'name': '$100 ~ $200', 'price': 200},
    {'name': '$200 ~ $300', 'price': 300}, {'name': '$300 ~ $400', 'price': 400}];

  constructor(private productService: ProductService, private categoryService: CategoryService,
              private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit() {

    this.route.queryParams.subscribe(params => {
      console.log(params);

      // Hay que hacer el service que me traiga los productos con promise TODO
      this.products = this.productService.getAllProducts();
      // Ademas me deberia traer los productos filtrados

      this.categories = this.categoryService.categories;
    });
  }

  onCategory(category: any) {
    console.log(category);
  }

  onSize(size: any) {
    console.log(size);
  }

  onPrice(price: any) {
    console.log(price);
  }

}
