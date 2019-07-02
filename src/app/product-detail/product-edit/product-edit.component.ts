import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {ProductService} from '../../shared/services/product.service';
import {ActivatedRoute, Router} from '@angular/router';
import * as UIkit from 'uikit';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {CategoryService} from '../../shared/services/category.service';
import {Subscription} from 'rxjs';


@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit, OnDestroy {

  public editForm: FormGroup;
  product: any;
  categoryProducts: any;
  sizes = [{'name': 'S', 'checked': false}, {'name': 'M', 'checked': false},
    {'name': 'L', 'checked': false}, {'name': 'XL', 'checked': false}];
  allCategories = [];
  categories = [];
  sex: string;

  private subscription: Subscription;


  constructor(private fb: FormBuilder, private router: Router, private aRouter: ActivatedRoute, private productService: ProductService,
              private categoryService: CategoryService) {
    this.editForm = fb.group({
      'category': new FormControl(null, [Validators.required]),
      'name': new FormControl(null, [Validators.required]),
      'price': new FormControl(null, [Validators.required]),
      'description': new FormControl(null, [Validators.required]),
    });
  }

  ngOnInit() {
    this.aRouter.params.subscribe(params => {
      this.subscription = this.productService.getProduct(params['id']).subscribe(data => {
        this.product = data;
        this.product.id = params['id'];
        this.product.sizes.forEach(e => {
          for (const s of this.sizes) {
            if (s.name === e) {
              s.checked = true;
            }
          }
        });

        this.editForm.setValue({
          name: this.product.name,
          price: this.product.price,
          description: this.product.description,
          // TODO ver de ponerlo bien
          category: this.product.category[0]
        });
        this.sex = this.product.sex;
        const radio = document.getElementById(this.sex) as HTMLInputElement;
        radio.checked = true;

        this.productService.getCategoryProducts(this.product.category).subscribe(data2 => {
          this.categoryProducts = data2;
        });
      });
    });

    this.categoryService.getAllCategories().subscribe((data) => {
      this.allCategories = data;
      this.displayCategories();
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  checkboxChanged(index: number) {
    this.sizes[index].checked = !this.sizes[index].checked;
  }


  changeImage(index: number) {
    console.log(index);
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

  removePhoto(photo: any) {
    // Hay que sacar la imagen de la base TODO
    for (let i = 0; i < this.product.photoUrl.length; i++) {
      if (photo === this.product.photoUrl[i]) {
        this.product.photoUrl.splice(i, 1);
      }
    }
  }

  saveProduct(id: string) {
    // Hay que guardar el producto bien TODO
    const saveProduct = {
      name: this.editForm.value.name,
      price: this.editForm.value.price,
      description: this.editForm.value.description,
      sizes: this.sizes.filter(s => s.checked).map(s => s.name),
      sex: this.sex,
      category: [this.editForm.value.category]
    };
    this.productService.updateProduct(id, saveProduct).then(() => {
      UIkit.notification({
        message: 'Los cambios se han realizado exitosamente',
        status: 'primary',
        pos: 'top-right'
      });
      this.router.navigate(['/product/' + id]);
    }).catch(err => {
      UIkit.notification({
        message: 'Los cambios no se han realizado exitosamente',
        status: 'danger',
        pos: 'top-right'
      });
      console.log(err);
    });

  }

  deleteProduct() {
    UIkit.modal('#confirmDeleteProduct').show();
  }

  confirmDeleteProduct() {
    this.router.navigate(['']);

    this.productService.deleteProduct(this.product.id).then(() => {
      UIkit.notification({
        message: 'Producto eliminado exitosamente',
        status: 'primary',
        pos: 'top-right'
      });
      UIkit.modal('#confirmDeleteProduct').hide();
    }).catch(err => {
      UIkit.notification({
        message: 'No se ha podido eliminar exitosamente',
        status: 'primary',
        pos: 'top-right'
      });
      console.log(err);
    });
  }

  displayCategories() {
    this.editForm.get('category').valueChanges.subscribe(text => {
      if (text !== null) {
        this.categories = this.allCategories.filter(c => {
          return c.name.includes(text);
        });
      }
    });
  }

  setCategory(c: string) {
    this.editForm.patchValue({category: c});
    (<HTMLInputElement>document.getElementById('category')).value = c;
    this.categories = [];
  }

  setSex(s: string) {
    this.sex = s;
  }
}
