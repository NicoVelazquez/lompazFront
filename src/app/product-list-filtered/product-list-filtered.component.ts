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
  prices = [{'name': 'menor $100', 'pMin': 0, 'pMax': 100}, {'name': '$100 ~ $200', 'pMin': 100, 'pMax': 200},
    {'name': '$200 ~ $300', 'pMin': 200, 'pMax': 300}, {'name': '$300 ~ $400', 'pMin': 300, 'pMax': 400},
    {'name': 'mayor $400', 'pMin': 400, 'pMax': Number.POSITIVE_INFINITY}];

  constructor(private productService: ProductService, private categoryService: CategoryService,
              private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params.category) {
        this.productService.getSexProducts(params.category).subscribe(data => {
          this.products = data;
          this.filteredProducts = data;
        });
      }
      if (params.search) {
        this.productService.getAllProducts().subscribe(data => {
          this.products = data;
          // this.filteredProducts = data;

          this.products = this.products.filter(p => p.name.toLowerCase().startsWith(params.search));
          this.filteredProducts = this.products.filter(p => p.name.toLowerCase().startsWith(params.search));
        });
      }


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

  onPrice(min: number, max: number) {
    this.filteredProducts = this.products.filter(p => (p.price > min && p.price < max));
  }

}
