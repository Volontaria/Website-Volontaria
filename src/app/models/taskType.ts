import { BaseModel } from './base-model';
import {Deserializable} from './deserializable';

export class TaskType extends BaseModel implements Deserializable {
  public id?: number;
  public url?: string;
  public name: string;

  deserialize(input: any): this {
    Object.assign(this, input);
    return this;
  }
}
