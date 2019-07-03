import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';
import * as UIkit from 'uikit';
import {ProductService} from '../../shared/services/product.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {
  public generalSearchForm: FormGroup;
  searchList = [];
  products = [];

  constructor(private fb: FormBuilder, private router: Router, private productService: ProductService) {
    this.generalSearchForm = fb.group({
      search: new FormControl()
    });
  }

  ngOnInit() {
    this.displaySearch();
    this.productService.getAllProducts().subscribe(data => {
      this.products = data;
    });
  }

  displaySearch() {
    this.generalSearchForm.get('search').valueChanges.subscribe((text: string) => {
      if (text !== null && text !== '') {
        this.searchList = this.products.filter(c => {
          return c.name.toLowerCase().includes(text.toLowerCase());
        }).slice(0, 5);
      } else {
        this.searchList = [];
      }
    });
  }

  hideDropdown() {
    if (this.searchList.length === 0) {
      UIkit.dropdown('.search-dropdown').hide();
    } else {
      UIkit.dropdown('.search-dropdown').show();
    }
  }

  onResult(item: any) {
    UIkit.dropdown('.search-dropdown').hide();
    this.router.navigate(['/product/' + item.id]);
    this.generalSearchForm.reset();
  }

  onSearch() {
    UIkit.dropdown('.search-dropdown').hide();
    console.log('entro');
    if (this.generalSearchForm.get('search').value === null) {
      this.router.navigate(['/filtered'], {queryParams: {search: 'all'}});
      this.generalSearchForm.reset();
    } else {
      this.router.navigate(['/filtered'], {queryParams: {search: (this.generalSearchForm.get('search').value).toString().toLowerCase()}});
      this.generalSearchForm.reset();
    }
  }

}
