import BaseModel from './baseModel';

export class Cycle extends BaseModel {
  id: number;
  name: string;
  start_date: string;
  end_date: string;
}
