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
  sizes = [{'id': 1, 'name': 'Extra Small'}, {'id': 2, 'name': 'Small'}, {'id': 3, 'name': 'Medium'},
    {'id': 3, 'name': 'Large'}, {'id': 4, 'name': 'Extra Large'}];
  selectedSize: string;

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
      // Hacer el service de agarrar un producto TODO
      this.product = this.productService.getProduct(params['id']);
      // Hacer el service de agarrar productos de una categoria TODO
      this.categoryProducts = this.productService.getCategoryProducts(this.product.category);
    });
  }

  changeImage(index: number) {
    console.log(index);
  }

  addtoCart(product: any) {
    console.log(product);
    UIkit.notification({
      message: 'Producto añadido al carrito',
      status: 'primary',
      pos: 'top-right'
    });
  }

  selectSize(size: string) {
    if (this.selectedSize != null) {
      document.getElementById(this.selectedSize).style.fontWeight = '';
    }
    this.selectedSize = size;
    document.getElementById(size).style.fontWeight = 'bold';
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

  saveProduct(id: number) {
    // Hay que guardar el producto bien TODO
    console.log(this.editForm.value);
    UIkit.notification({
      message: 'Los cambios se han realizado exitosamente',
      status: 'primary',
      pos: 'top-right'
    });
    this.router.navigate(['/product/' + id]);
  }

  deleteProduct() {
    UIkit.modal('#confirmDeleteProduct').show();
  }

  confirmDeleteProduct() {
    // Eliminar el usuario de la base TODO
    UIkit.notification({
      message: 'Producto eliminado exitosamente',
      status: 'primary',
      pos: 'top-right'
    });
    UIkit.modal('#confirmDeleteProduct').hide();
    this.router.navigate(['']);
    //  Tambien deberia hacer el logout TODO
  }
}
