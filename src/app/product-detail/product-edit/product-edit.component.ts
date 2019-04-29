import {Component, Input, OnInit} from '@angular/core';
import {ProductService} from '../../shared/services/product.service';
import {ActivatedRoute, Router} from '@angular/router';
import * as UIkit from 'uikit';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';


@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {

  public editForm: FormGroup;
  product: any;
  categoryProducts: any;
  sizes = [{'name': 'S', 'checked': false}, {'name': 'M', 'checked': false},
    {'name': 'L', 'checked': false}, {'name': 'XL', 'checked': false}];

  constructor(private fb: FormBuilder, private router: Router, private aRouter: ActivatedRoute, private productService: ProductService) {
    this.editForm = fb.group({
      'category': new FormControl(null, [Validators.required]),
      'name': new FormControl(null, [Validators.required]),
      'price': new FormControl(null, [Validators.required]),
      'description': new FormControl(null, [Validators.required]),
    });
  }

  ngOnInit() {
    this.aRouter.params.subscribe(params => {
      this.productService.getProduct(params['id']).subscribe(data => {
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
          category: this.product.category[1]
        });

        this.productService.getCategoryProducts(this.product.category).subscribe(data2 => {
          this.categoryProducts = data2;
        });
      });
    });
  }

  changeImage(index: number) {
    console.log(index);
  }


  checkboxChanged(index: number) {
    this.sizes[index].checked = !this.sizes[index].checked;
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
    const saveProduct = this.editForm.value;
    saveProduct.category = [this.product.category[0], saveProduct.category];
    saveProduct.sizes = this.sizes.filter(s => s.checked).map(s => s.name);
    console.log(saveProduct);
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
    this.productService.deleteProduct(this.product.id).then(() => {
      this.router.navigate(['']);
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
}
