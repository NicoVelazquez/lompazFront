export class Item {
  title: string;
  description: string;
  pictureUrl: string;
  quantity: number;
  unitPrice: number;
  currencyId: string;

  // deserialize(input: any): this {
  //   Object.assign(this, input);
  //   return this;
  // }
}
