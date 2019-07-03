import {Component, OnInit} from '@angular/core';
import {ProductService} from '../shared/services/product.service';
import {ActivatedRoute, Router} from '@angular/router';
import {CategoryService} from '../shared/services/category.service';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {Subscription} from 'rxjs';

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

  searching = false;

  public generalSearchForm: FormGroup;

  subs: Subscription;

  category = '';

  currentCategory = '';
  currentSize = '';
  currentPrice = {min: -1, max: 0};
  currentText = '';

  constructor(private productService: ProductService, private categoryService: CategoryService,
              private router: Router, private route: ActivatedRoute, private fb: FormBuilder) {
    this.generalSearchForm = fb.group({
      search: new FormControl()
    });
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params.category) {
        this.searching = false;
        this.category = params.category;

        this.subs = this.productService.getSexProductsPaginated(params.category).subscribe(data => {
          this.products = data;
          this.filteredProducts = data;
        });
      }
      if (params.search) {
        this.searching = true;
        this.displaySearch();

        this.subs = this.productService.getAllProductsPaginated().subscribe(data => {
          this.products = data;
          this.filteredProducts = data;

          if (params.search !== 'all') {
            this.generalSearchForm.patchValue({'search': params.search});
          }
        });
      }

      this.categoryService.getAllCategories().subscribe(data => {
        this.categories = data;
      });
    });
  }

  more() {
    this.subs.unsubscribe();
    if (this.searching) {
      this.subs = this.productService.getAllProductsPaginated().subscribe(data => {
        this.products = data;
        this.filter();
      });
    }

    if (!this.searching) {
      this.subs = this.productService.getSexProductsPaginated(this.category).subscribe(data => {
        this.products = data;
        this.filter();
      });
    }
  }

  onCategory(category: string) {
    this.currentCategory = category;
    this.filter();
  }

  onSize(size: string) {
    this.currentSize = size;
    this.filter();
  }

  onPrice(min: number, max: number) {
    this.currentPrice = {min: min, max: max};
    this.filter();
  }

  displaySearch() {
    this.generalSearchForm.get('search').valueChanges.subscribe((text: string) => {
      console.log(text);
      if (text !== null && text !== '') {
        this.currentText = text;
        this.filter();
      }
    });
  }

  filter() {
    let a = this.products;

    if (this.currentCategory !== '') {
      a = a.filter(p => p.category.includes(this.currentCategory));
    }
    if (this.currentSize !== '') {
      a = a.filter(p => p.category.includes(this.currentSize));
    }
    if (this.currentPrice.min !== -1) {
      a = a.filter(p => (p.price >= this.currentPrice.min && p.price < this.currentPrice.max));
    }
    if (this.currentText !== '') {
      a = a.filter(c => c.name.toLowerCase().includes(this.currentText.toLowerCase()));
    }

    this.filteredProducts = a;
  }

}
