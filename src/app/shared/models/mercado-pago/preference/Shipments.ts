import {ShippingMethod} from './ShippingMethod';
import {Address} from 'cluster';

export class Shipments {
  mode: string;
  localPickup: boolean;
  dimensions: string;
  defaultShippingMethod: number;
  freeMethods: ShippingMethod[];
  currencyId: string;
  freeShipping: boolean;
  receiverAddress: Address;
}
