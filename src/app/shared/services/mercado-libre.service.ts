import {Injectable} from '@angular/core';
import {PreferenceRequest} from '../models/mercado-pago/preference/PreferenceRequest';
import {PreferenceResponse} from '../models/mercado-pago/preference/PreferenceResponse';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from 'angularfire2/firestore';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MercadoLibreService {

  currentCart = [];

  constructor(private http: HttpClient, private afs: AngularFirestore) {
  }

  postPreference(request: PreferenceRequest): Promise<PreferenceResponse> {
    return this.http.post<PreferenceResponse>(`${environment.mercadoPagoProxyBaseUrl}/preferences`, request).toPromise();
  }

  getMerchantOrder(moi: any): Promise<any> {
    return this.http.get<any>(`${environment.mercadoPagoProxyBaseUrl}/merchantorders/` + moi).toPromise();
  }

  setCurrentCart(cart: any) {
    return Promise.resolve(window.localStorage.setItem('currentCart', JSON.stringify(cart)));
  }

  getCurrentCart() {
    return Promise.resolve(JSON.parse(window.localStorage.getItem('currentCart')));
  }

  removeCurrentCart() {
    window.localStorage.removeItem('currentCart');
  }

  public addOrder(order: any): Promise<any> {
    const userId = window.localStorage.getItem('id');
    return this.afs.doc('user-orders/' + userId).collection('orders')
      .add(order);
  }

  public getAllOrders(): Observable<any> {
    const userId = window.localStorage.getItem('id');
    return this.afs.doc('user-orders/' + userId).collection('orders', ref =>
      ref.orderBy('date'))
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
}
