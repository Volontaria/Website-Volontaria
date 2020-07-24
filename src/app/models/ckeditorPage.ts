import { BaseModel } from './base-model';
import { Deserializable } from './deserializable';

export class CkeditorPage extends BaseModel implements Deserializable {
  public id?: number;
  public url?: string;
  public key?: string;
  public content: string;
  public updated_at?: string;
  public created_at?: string;

  deserialize(input: any): this {
    Object.assign(this, input);
    return this;
  }
}
