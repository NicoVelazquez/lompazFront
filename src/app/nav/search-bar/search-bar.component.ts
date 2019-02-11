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
  public searchList;
  products = [];

  constructor(private fb: FormBuilder, private router: Router, private producService: ProductService) {
    this.generalSearchForm = fb.group({
      search: new FormControl()
    });
  }

  ngOnInit() {
    this.searchList = [];
    this.displaySearch();
    this.products = this.producService.products;
  }

  displaySearch() {
    this.generalSearchForm.get('search').valueChanges.subscribe(text => {
      console.log(text);
      if (text !== null) {
        // this.searchService.generalSearch(text, 0, 5).then(res => {
        //   console.log(res);
        //   this.searchList = res.content;
        // });
        this.searchList = this.products.filter(c => {
          return c.name.includes(text);
        });
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
    if (this.generalSearchForm.get('search').value === null) {
      UIkit.dropdown('.search-dropdown').hide();
      this.router.navigate(['/search']);
      this.generalSearchForm.reset();
    } else {
      UIkit.dropdown('.search-dropdown').hide();
      this.router.navigate(['/search'], {queryParams: {name: this.generalSearchForm.get('search').value}});
      this.generalSearchForm.reset();
    }
  }

}
