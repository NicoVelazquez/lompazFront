import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {PreferenceRequest} from '../shared/models/mercado-pago/preference/PreferenceRequest';
import {PreferenceResponse} from '../shared/models/mercado-pago/preference/PreferenceResponse';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  ngOnInit() {
  }

  constructor(private http: HttpClient) {
  }

  postPreference(request: PreferenceRequest): Promise<PreferenceResponse> {
    return this.http.post<PreferenceResponse>(`${environment.mercadoPagoProxyBaseUrl}/preferences`).toPromise();
  }
}
