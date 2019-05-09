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
  filteredProducts = [];
  categories = [];
  sizes = ['S', 'M', 'L', 'XL'];
  prices = [{'name': 'menor $100', 'price': 100}, {'name': '$100 ~ $200', 'price': 200},
    {'name': '$200 ~ $300', 'price': 300}, {'name': '$300 ~ $400', 'price': 400}];

  constructor(private productService: ProductService, private categoryService: CategoryService,
              private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.productService.getSexProducts(params.category).subscribe(data => {
        this.products = data;
        this.filteredProducts = data;
      });

      this.categoryService.getAllCategories().subscribe(data => {
        this.categories = data;
      });
    });
  }

  onCategory(category: string) {
    this.filteredProducts = this.products.filter(p => p.category.includes(category));
  }

  onSize(size: string) {
    this.filteredProducts = this.products.filter(p => p.sizes.includes(size));
  }

  onPrice(price: number) {
    this.filteredProducts = this.products.filter(p => (p.price > price - 100 && p.price < price));
  }

}
