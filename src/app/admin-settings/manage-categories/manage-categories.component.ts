import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {CategoryService} from '../../shared/services/category.service';
import * as UIkit from 'uikit';

@Component({
  selector: 'app-manage-categories',
  templateUrl: './manage-categories.component.html',
  styleUrls: ['./manage-categories.component.css']
})
export class ManageCategoriesComponent implements OnInit {

  public categoryForm: FormGroup;
  public categories: any;

  constructor(private fb: FormBuilder, private categoryService: CategoryService) {
    this.categoryForm = fb.group({
      'name': new FormControl(null, [Validators.required]),
    });
  }

  ngOnInit() {
    this.categories = this.categoryService.getAllCategories();
  }

  removeCategory(id: number) {
    for (let i = 0; i <= this.categories.length; i++) {
      if (this.categories[i].id === id) {
        this.categories.splice(i, 1);
        UIkit.notification({
          message: 'Categoria eliminado exitosamente',
          status: 'primary',
          pos: 'top-right'
        });
        break;
      }
    }
  }

  addCategory() {
    const category = {'id': this.categories.length + 1, 'name': this.categoryForm.value.name};
    this.categories.push(category);
    this.categoryForm.reset();
  }

}
