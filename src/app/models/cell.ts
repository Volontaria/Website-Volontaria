import BaseModel from './baseModel';

export class Cell extends BaseModel {
  id: number;
  name: string;
  address_line1: string;
  address_line2: string;
  postal_code: string;
  city: string;
}


