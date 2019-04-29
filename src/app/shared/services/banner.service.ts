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
export class BannerService {

  banners = [{
    'id': 1,
    'name': 'Banner1',
    'photoUrl': '../../assets/images/banner1.png',
    'startDate': '26-07-2018',
    'finishDate': '30-07-2018'
  },
    {
      'id': 2,
      'name': 'Banner2',
      'photoUrl': '../../assets/images/banner2.jpg',
      'startDate': '26-07-2018',
      'finishDate': '30-07-2018'
    },
    {
      'id': 3,
      'name': 'Banner3',
      'photoUrl': '../../assets/images/banner3.jpg',
      'startDate': '26-07-2018',
      'finishDate': '30-07-2018'
    }
  ];

  constructor(private afs: AngularFirestore, private storage: AngularFireStorage) {
  }

  public getAllBanners(): Observable<any> {
    return this.afs.collection('banners')
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

  public addBanner(banner: any): Promise<any> {
    return this.afs.collection('banners')
      .add(banner);
  }

  public addBannerPhotos(path: string, file: File): Promise<any> {
    return this.storage.upload('banners/' + path, file).then(data => {
      return this.storage.ref(data.metadata.fullPath).getDownloadURL();
    });
  }

  public updateBanner(banner: any): Promise<any> {
    return this.afs.doc('banners/' + banner.id)
      .update(banner);
  }

  public deleteBanner(id: string): Promise<any> {
    // TODO delete photo when deleting banner
    return this.afs.doc('banners/' + id)
      .delete();
  }

}
