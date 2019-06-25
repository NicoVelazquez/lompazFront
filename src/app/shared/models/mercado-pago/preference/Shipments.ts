import {ShippingMethod} from './ShippingMethod';
import {ShipmentAddress} from './ShipmentAddress';

export class Shipments {
  mode: string;
  localPickup: boolean;
  dimensions: string;
  defaultShippingMethod: number;
  freeMethods: ShippingMethod[];
  currencyId: string;
  freeShipping: boolean;
  receiverAddress: ShipmentAddress;
}
