import {Injectable} from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from 'angularfire2/firestore';
import {AngularFireStorage, AngularFireUploadTask} from 'angularfire2/storage';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {ProviderMeta} from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private afs: AngularFirestore, private storage: AngularFireStorage) {
  }

  // PRODUCTS

  public addProduct(product: any): Promise<any> {
    return this.afs.collection('products')
      .add(product);
  }

  public updateProduct(id: string, product: any): Promise<any> {
    return this.afs.doc('products/' + id)
      .update(product);
  }

  public deleteProduct(id: string): Promise<any> {
    // TODO delete photo when deleting product
    return this.afs.doc('products/' + id)
      .delete();
  }

  public deleteProductFromCarts(productid: string): any {
    this.afs.collection('users').get().subscribe(querySnapshot => {
      const that = this;
      querySnapshot.forEach(function (doc) {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id);
        that.deleteCartProduct2(productid, doc.id).then(() => {
          console.log('borro');
        }).catch((err) => {
          console.log('no borro xq: ' + err);
        });
      });
    });
  }

  public deleteCartProduct2(cartProductId: string, userId: string): Promise<any> {
    return this.afs.doc('carts/' + userId).collection('cart-products').doc(cartProductId)
      .delete();
  }

  // public deleteProductFromFavorites(id: string): Promise<any> {
  //   return undefined;
  // }

  public getAllProducts(): Observable<any> {
    return this.afs.collection('products')
      .snapshotChanges().pipe(
        map(actions => {
          return actions.map(a => {
            const data = a.payload.doc.data();
            data['id'] = a.payload.doc.id;
            return data;
          });
        })
      );
  }

  public getProduct(id: number): Observable<any> {
    return this.afs.doc('products/' + id)
      .valueChanges();
  }


  public getSexProducts(sex: string): Observable<any> {
    return this.afs.collection('products', ref => ref.where('sex', '==', sex))
      .snapshotChanges().pipe(
        map(actions => {
          return actions.map(a => {
            const data = a.payload.doc.data();
            data['id'] = a.payload.doc.id;
            return data;
          });
        })
      );
  }

  public getLatestProducts(): Observable<any> {
    return this.afs.collection('products', ref =>
      ref.orderBy('date', 'desc').limit(4))
      .snapshotChanges().pipe(
        map(actions => {
          return actions.map(a => {
            const data = a.payload.doc.data();
            data['id'] = a.payload.doc.id;
            return data;
          });
        })
      );
  }


  // PHOTO

  public addProductPhotos(path: string, file: File): Promise<any> {
    return this.storage.upload('products/' + path, file).then(data => {
      return this.storage.ref(data.metadata.fullPath).getDownloadURL();
    });
  }

  // MENU

  public addCartProduct(product: any): Promise<any> {
    const userId = window.localStorage.getItem('id');
    return this.afs.doc('carts/' + userId).collection('cart-products')
      .add(product);
  }

  public getCartProducts(): Observable<any> {
    const userId = window.localStorage.getItem('id');
    return this.afs.doc('carts/' + userId).collection('cart-products')
      .snapshotChanges().pipe(
        map(actions => {
          return actions.map(a => {
            const data = a.payload.doc.data();
            data['id'] = a.payload.doc.id;
            return data;
          });
        })
      );
  }

  public deleteCartProduct(cartProductId: string): Promise<any> {
    const userId = window.localStorage.getItem('id');
    return this.afs.doc('carts/' + userId).collection('cart-products').doc(cartProductId)
      .delete();
  }

  // TODO - meter un Promise.all y que la funcion entera devuelva un promise
  public deleteAllCartProducts() {
    const cartProducts = JSON.parse(window.localStorage.getItem('currentCart'));
    cartProducts.forEach(p => {
      this.deleteCartProduct(p.id).then(() => console.log('borro'));
    });
  }

  // TODO - probar que se este agregando el producto con el id del product
  public addFavoriteProduct(product: any): Promise<any> {
    const userId = window.localStorage.getItem('id');
    return this.afs.doc('favorites/' + userId).collection('favorites-products').doc(product.id)
      .set(product);
  }

  public getFavoriteProducts(): Observable<any> {
    const userId = window.localStorage.getItem('id');
    return this.afs.doc('favorites/' + userId).collection('favorites-products')
      .snapshotChanges().pipe(
        map(actions => {
          return actions.map(a => {
            const data = a.payload.doc.data();
            data['id'] = a.payload.doc.id;
            return data;
          });
        })
      );
  }

  // TODO - probar que se este borrando bien (depende de que se haya agreagdo bien)
  public deleteFavoriteProduct(cartProductId: string): Promise<any> {
    const userId = window.localStorage.getItem('id');
    return this.afs.doc('favorites/' + userId).collection('favorites-products').doc(cartProductId)
      .delete();
  }


  // CATEGORIES

  // TODO poder hacer un .contain() en lugar del '=='
  public getCategoryProducts(category: string): any {
    return this.afs.collection('products', ref => ref.where('category', '==', category).limit(4))
      .snapshotChanges().pipe(
        map(actions => {
          return actions.map(a => {
            const data = a.payload.doc.data();
            data['id'] = a.payload.doc.id;
            return data;
          });
        })
      );
  }


  // COMMENTS

  public addProductComment(productId: any, comment: any): Promise<any> {
    return this.afs.doc('products/' + productId).collection('comments')
      .add(comment);
  }

  public getProductComments(id: string): Observable<any> {
    return this.afs.doc('products/' + id).collection('comments', ref => ref.orderBy('date', 'desc'))
      .snapshotChanges().pipe(
        map(actions => {
          return actions.map(a => {
            const data = a.payload.doc.data();
            data['id'] = a.payload.doc.id;
            return data;
          });
        })
      );
  }

  public deleteComment(productId: string, commentId: string): Promise<any> {
    return this.afs.doc('products/' + productId).collection('comments').doc(commentId)
      .delete();
  }


}
