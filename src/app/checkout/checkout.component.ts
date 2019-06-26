import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {PreferenceRequest} from '../shared/models/mercado-pago/preference/PreferenceRequest';
import {PreferenceResponse} from '../shared/models/mercado-pago/preference/PreferenceResponse';
import {environment} from '../../environments/environment';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {


  request: PreferenceRequest = new PreferenceRequest();

  ngOnInit() {
    this.request = {
      'items': [
        {
          'id': 1,
          'title': 'TestTitle',
          'description': 'TestDescription',
          'pictureUrl': 'https://www.google.com/url?sa=i&source=images&cd=&ved=2ahUKEwjWrNrl64LjAhXiGbkGHXlvCLAQjRx6B' +
          'AgBEAU&url=https%3A%2F%2Fes.wikipedia.org%2Fwiki%2FGo_(lenguaje_de_programaci%25C3%25B3n)&psig=AOvVaw3k5174' +
          '-odhuy4QGW89a-wy&ust=1561490565186313',
          'quantity': 2,
          'unitPrice': 15,
          'currencyId': 'ARS'
        },
        {
          'id': 2,
          'title': 'TestTitle2',
          'description': 'TestDescription2',
          'pictureUrl': 'https://www.google.com/url?sa=i&source=images&cd=&ved=2ahUKEwjWrNrl64LjAhXiGbkGHXlvCLAQjRx6BAg' +
          'BEAU&url=https%3A%2F%2Fes.wikipedia.org%2Fwiki%2FGo_(lenguaje_de_programaci%25C3%25B3n)&psig=AOvVaw3k5174-od' +
          'huy4QGW89a-wy&ust=1561490565186313',
          'quantity': 3,
          'unitPrice': 30,
          'currencyId': 'ARS'
        }
      ],
      'payer': {
        'email': 'spc.madeo.patricio@gmail.com',
        'name': 'Pato',
        'surname': 'Madeo'
      },
      'address': {
        'streetName': 'Handel',
        'streetNumber': 1894,
        'zipCode': '1686',
        'apartment': 'D',
        'floor': '123'
      },
      'externalReference': 'nico',
      'freeShipping': true

    };
    this.postPreference(this.request).then(r => {
      console.log(r);
      // lo hace en la misma pestaña
      window.location.href = r.sandboxInitPoint;
      // lo hace en una pestaña nueva
      // window.open(r.sandboxInitPoint, undefined, undefined, true);
    }).catch(r => {
      // TODO: q hacemos? redireccionamos a una pagina de error geenrica ?
    });
  }

  constructor(private http: HttpClient) {
  }

  postPreference(request: PreferenceRequest): Promise<PreferenceResponse> {
    return this.http.post<PreferenceResponse>(`${environment.mercadoPagoProxyBaseUrl}/preferences`, request).toPromise();
  }
}
