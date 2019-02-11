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
    // Aca deberia hacer el put de la categoria pasando unicamente el nombre y me deberia devolver una categoria y eso es lo que pusheo
    if (category.name.toLowerCase() > this.categories[this.categories.length - 1].name.toLowerCase()) {
      this.categories.push(category);
    } else {
      for (const c of this.categories) {
        console.log(this.categories.indexOf(c));
        if (c.name.toLowerCase() > category.name.toLowerCase()) {
          this.categories.splice(this.categories.indexOf(c), 0, category);
          break;
        }
      }
    }
    this.categoryForm.reset();
  }

}
