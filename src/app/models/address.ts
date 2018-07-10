import BaseModel from './baseModel';

export class Address extends BaseModel {
  id: number;
  address_line1: string;
  address_line2: string;
  postal_code: string;
  city: string;

  getAddressField() {
    return [
      this.address_line1,
      this.address_line2,
      this.postal_code + ' ' + this.city
    ];
  }
}


