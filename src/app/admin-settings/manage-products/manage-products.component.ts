import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ProductService} from '../../shared/services/product.service';
import * as UIkit from 'uikit';

@Component({
  selector: 'app-manage-products',
  templateUrl: './manage-products.component.html',
  styleUrls: ['./manage-products.component.css']
})
export class ManageProductsComponent implements OnInit {

  public productForm: FormGroup;
  product = {
    'name': '',
    'description': '',
    'photoUrl': [],
    'category': '', 'price': 0
  };
  sizes = [{'name': 'S', 'checked': true}, {'name': 'M', 'checked': true},
    {'name': 'L', 'checked': true}, {'name': 'XL', 'checked': true}];
  categoriesA = ['Pantalon', 'Pijama', 'Remeras', 'Remeras Mujeres', 'Remeras Varones', 'Remeras Nuevas'];
  categories = [];

  constructor(private fb: FormBuilder, private productService: ProductService) {
    this.productForm = fb.group({
      'name': new FormControl(null, [Validators.required]),
      'category': new FormControl(null, [Validators.required]),
      'description': new FormControl(null, [Validators.required]),
      'price': new FormControl(null, [Validators.required]),
      'location': new FormControl(null, [Validators.required]),
    });
  }

  ngOnInit() {
    this.displayCategories();
  }

  addProduct() {
    console.log(this.productForm.value);
    console.log(this.sizes.filter(s => s.checked).map(s => s.name));
    UIkit.notification({
      message: 'Producto agregado exitosamente',
      status: 'primary',
      pos: 'top-right'
    });
  }

  readUrl(event: any) {
    // Se podria agregar un spinner TODO
    setTimeout(() => {
      if (event.target.files && event.target.files[0]) {
        const reader = new FileReader();
        reader.onload = (event2: ProgressEvent) => {
          // Agregar la imagen a la base TODO
          this.product.photoUrl.push((<FileReader>event2.target).result);
        };
        reader.readAsDataURL(event.target.files[0]);
      }
    }, 1000);
  }

  displayCategories() {
    this.productForm.get('location').valueChanges.subscribe(text => {
      if (text !== null) {
        // this.locationService.getLocation(text).then(res => {
        //   this.locations = res['resourceSets'][0]['resources'].map(e => e['name']);
        // });
        this.categories = this.categoriesA.filter( c => {
          return c.includes(text);
        });
      }
    });

  }

  setCategory(location: string) {
    this.productForm.value.location = location;
    (<HTMLInputElement>document.getElementById('location')).value = location;
    this.categories = [];
  }

}
