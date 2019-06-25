import {ExcludedPaymentType} from './ExcludedPaymentType';
import {ExcludedPaymentMethod} from './ExcludedPaymentMethod';

export class PaymentMethods {
  excludedPaymentMethods: ExcludedPaymentMethod[];
  excludedPaymentTypes: ExcludedPaymentType[];
  defaultPaymentMethodId: string;
  installments: number;
  defaultInstallments: number;

  // deserialize(input: any): this {
  //   Object.assign(this, input);
  //   this.excludedPaymentMethods = input.excludedPaymentMethods.map(epm => new ExcludedPaymentMethod().deserialize(epm));
  //   this.excludedPaymentTypes = input.excludedPaymentTypes.map(ept => new ExcludedPaymentType().deserialize(ept));
  //   return this;
  // }
}
