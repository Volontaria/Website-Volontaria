import BaseModel from './baseModel';

export class Address extends BaseModel {
  id: number;
  address_line1: string;
  address_line2: string;
  postal_code: string;
  city: string;
}


