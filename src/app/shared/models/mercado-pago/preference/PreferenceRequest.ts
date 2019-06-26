import {Item} from './Item';
import {Payer} from './Payer';

export class PreferenceRequest {
  items: Item[];
  payer: Payer;
  externalReference: string;
  freeShipping: boolean;

  // deserialize(input: any): this {
  //   // Object.assign(this, input);
  //   this.payer = new Payer().deserialize(input.payer);
  //   this.address = new ShipmentAddress().deserialize(input.address);
  //   this.items = input.items.map(item => new Item().deserialize(item));
  //   return this;
  // }
}
