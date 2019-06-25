import {Item} from './Item';
import {Payer} from './Payer';
import {PaymentMethods} from './PaymentMethods';
import {Shipments} from './Shipments';
import {BackUrls} from './BackUrls';
import {DifferentialPricing} from './DifferentialPricing';

export class PreferenceResponse {
  items: Item[];
  payer: Payer;
  paymentMethods: PaymentMethods;
  shipments: Shipments;
  backUrls: BackUrls;
  notificationUrl: string;
  id: string;
  initPoint: string;
  sandboxInitPoint: string;
  dateCreated: Date;
  operationType: string;
  additionalInfo: string;
  autoReturn: string;
  externalReference: string;
  expires: boolean;
  expirationDateFrom: Date;
  expirationDateTo: Date;
  collectorId: string;
  clientId: string;
  marketplace: string;
  marketplaceFee: number;
  differentialPricing: DifferentialPricing;
}
