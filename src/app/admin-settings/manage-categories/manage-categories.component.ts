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
    this.categoryService.getAllCategories().subscribe(data => {
      this.categories = data;
    });
  }

  removeCategory(id: string) {
    this.categoryService.deleteCategory(id).then(() => {
      UIkit.notification({
        message: 'Categoria eliminado exitosamente',
        status: 'primary',
        pos: 'top-right'
      });
    });
  }

  addCategory() {
    const newCategory = {'name': this.categoryForm.value.name};
    this.categoryService.addCategory(newCategory).then(() => {
      UIkit.notification({
        message: 'Categoria agregada exitosamente',
        status: 'primary',
        pos: 'top-right'
      });
      this.categoryForm.reset();
    });
  }

}
