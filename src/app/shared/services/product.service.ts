import {Injectable} from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from 'angularfire2/firestore';
import {AngularFireStorage, AngularFireUploadTask} from 'angularfire2/storage';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  comments = [{
    'id': 1,
    'title': 'El mejor Lompaz',
    'comment': 'No puede ser mejor este lompa. Es muy fachero y esta remendo. Para usar en todo momento',
    'username': 'Nicolas Velazquez',
    'date': '08/09/2015',
    'rating': 5
  },
    {
      'id': 2,
      'title': 'El mejor Lompaz',
      'comment': 'Muy bueno, lastima la poca variedad de colores. Igualmente, lo super recomiendo para usar en todos lados',
      'username': 'Leo Messi',
      'date': '08/09/2016',
      'rating': 4
    },
    {
      'id': 3,
      'title': 'Medio Pelo',
      'comment': 'No me gusto tanto el producto ya que el bolsillo de atras me aprece chico ya que no me entra mi iphone 6 plus',
      'username': 'Martin Lopez',
      'date': '08/09/2017',
      'rating': 3
    },
    {
      'id': 4,
      'title': 'Medio Pelo2',
      'comment': 'No me gusto tanto el producto ya que el bolsillo de atras me aprece chico ya que no me entra mi iphone 6 plus',
      'username': 'Martin Lopez',
      'date': '08/09/2018',
      'rating': 3
    }
  ];

  constructor(private afs: AngularFirestore, private storage: AngularFireStorage) {
  }

  public getAllProducts(): any {
    return this.afs.collection('books')
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
    return this.afs.collection('products', ref => ref.limit(4))
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

  public getProductComments(id: number): any {
    return this.comments;
  }

  public addProduct(product: any): Promise<any> {
    return this.afs.collection('products')
      .add(product);
  }

  public addProductPhotos(path: string, file: File): Promise<any> {
    return this.storage.upload('products/' + path, file).then(data => {
      return this.storage.ref(data.metadata.fullPath).getDownloadURL();
    });
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

}
