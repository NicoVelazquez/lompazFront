import {Component, OnInit} from '@angular/core';
import {ProductService} from '../shared/services/product.service';
import {ActivatedRoute, Router} from '@angular/router';
import {CategoryService} from '../shared/services/category.service';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';

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

  constructor(private productService: ProductService, private categoryService: CategoryService,
              private router: Router, private route: ActivatedRoute, private fb: FormBuilder) {
    this.generalSearchForm = fb.group({
      search: new FormControl()
    });
  }

  ngOnInit() {
    this.displaySearch();

    this.route.queryParams.subscribe(params => {
      if (params.category) {
        this.searching = false;

        this.productService.getSexProducts(params.category).subscribe(data => {
          this.products = data;
          this.filteredProducts = data;
        });
      }
      if (params.search) {
        this.searching = true;

        this.productService.getAllProducts().subscribe(data => {
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

  displaySearch() {
    this.generalSearchForm.get('search').valueChanges.subscribe(text => {
      console.log(text);
      if (text !== null && text !== '') {
        console.log('entro al posta');
        this.filteredProducts = this.products.filter(c => c.name.includes(text));
      }
      if (text === '') {
        console.log('entro al vacio');
        this.filteredProducts = this.products;
      }
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
