import { BaseModel } from './base-model';

export class Cell extends BaseModel {
  public id?: number;
  public url?: string;
  public name: string;
  public address_line_1: string;
  public address_line_2: string;
  public postal_code: string;
  public city: string;
  public state_province: string;
  public longitude: string;
  public latitude: string;
}
