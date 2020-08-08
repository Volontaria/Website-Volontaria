import { BaseModel } from './base-model';

export class TaskType extends BaseModel {
  public id?: number;
  public url?: string;
  public name: string;
}
