import {Injectable} from '@angular/core';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from 'angularfire2/firestore';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  categories = [{
    'id': 1, 'name': 'Pijama',
  },
    {
      'id': 2, 'name': 'Pantalon',
    },
    {
      'id': 3, 'name': 'Remera',
    },
    {
      'id': 4, 'name': 'Buzo',
    }
  ];

  constructor(private afs: AngularFirestore) {
  }

  public getAllCategories(): Observable<any> {
    return this.afs.collection('categories', ref => ref.orderBy('name'))
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

  public addCategory(category: any): Promise<any> {
    return this.afs.collection('categories')
      .add(category);
  }

  public deleteCategory(id: string): Promise<any> {
    return this.afs.doc('categories/' + id)
      .delete();
  }
}
