import { BaseModel } from './base-model';
import {Deserializable} from './deserializable';

export class Cell extends BaseModel implements Deserializable {
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

  deserialize(input: any): this {
    Object.assign(this, input);
    return this;
  }
}
