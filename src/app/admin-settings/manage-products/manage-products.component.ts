import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ProductService} from '../../shared/services/product.service';
import * as UIkit from 'uikit';
import {CategoryService} from '../../shared/services/category.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-manage-products',
  templateUrl: './manage-products.component.html',
  styleUrls: ['./manage-products.component.css']
})
export class ManageProductsComponent implements OnInit {

  public productForm: FormGroup;
  photos = [];
  photosFiles = [];
  sizes = [{'name': 'S', 'checked': true}, {'name': 'M', 'checked': true},
    {'name': 'L', 'checked': true}, {'name': 'XL', 'checked': true}];
  allCategories = [];
  categories = [];
  addButtonText = 'Agregar';
  sex = 'Hombre';

  constructor(private fb: FormBuilder, private productService: ProductService, private categoryService: CategoryService,
              private route: Router) {
    this.productForm = fb.group({
      'name': new FormControl(null, [Validators.required]),
      'description': new FormControl(null, [Validators.required]),
      'price': new FormControl(null, [Validators.required]),
      'category': new FormControl(null, [Validators.required]),
    });
  }

  ngOnInit() {
    this.categoryService.getAllCategories().subscribe((data) => {
      this.allCategories = data;
      this.displayCategories();
    });
  }

  addProduct() {
    (<HTMLInputElement>document.getElementById('addProductButton')).disabled = true;
    this.addButtonText = 'Procesando...';
    const newProduct = {
      name: this.productForm.value.name,
      description: this.productForm.value.description,
      price: this.productForm.value.price,
      category: [this.productForm.value.category],
      sizes: this.sizes.filter(s => s.checked).map(s => s.name),
      photosUrl: [],
      rating: 0,
      sex: this.sex
    };

    // // TODO Poner los .catch devuelta bien
    // Fijarme como hacer para pasar el id y arreglo de fotos
    this.productService.addProductPhotos(newProduct.name, this.photosFiles[0]).then(data => {
      data.subscribe(url => {
        newProduct.photosUrl.push(url);
        this.productService.addProduct(newProduct).then((added) => {
          this.route.navigate(['product/' + added.id]);
          UIkit.notification({
            message: 'Producto agregado exitosamente',
            status: 'primary',
            pos: 'top-right'
          });
          // this.productForm.reset();
          // this.photos = [];
          // this.photosFiles = [];
          // this.sizes.forEach(s => s.checked = true);
          // this.addButtonText = 'Agregar';
        }).catch(productErr => {
          UIkit.notification({
            message: 'Producto no se ha agregado exitosamente',
            status: 'danger',
            pos: 'top-right'
          });
          console.log(productErr);
        });
      });
    });
  }

  readUrl(event: any) {
    // TODO Se podria agregar un spinner
    setTimeout(() => {
      if (event.target.files && event.target.files[0]) {
        const reader = new FileReader();
        reader.onload = (event2: ProgressEvent) => {
          this.photosFiles.push(event.target.files[0]);
          this.photos.push((<FileReader>event2.target).result);
        };
        reader.readAsDataURL(event.target.files[0]);
      }
    }, 1000);
  }

  displayCategories() {
    this.productForm.get('category').valueChanges.subscribe((text: string) => {
      if (text !== null) {
        this.categories = this.allCategories.filter(c => {
          return c.name.toLowerCase().includes(text.toLowerCase());
        });
      }
    });

  }

  setCategory(c: string) {
    this.productForm.patchValue({category: c});
    (<HTMLInputElement>document.getElementById('category')).value = c;
    this.categories = [];
  }

  checkboxChanged(index: number) {
    this.sizes[index].checked = !this.sizes[index].checked;
  }

  setSex(s: string) {
    this.sex = s;
  }

}
