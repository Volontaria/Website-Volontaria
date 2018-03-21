import BaseModel from './baseModel';
import { Cell } from './cell';

export class Cycle extends BaseModel {
  id: number;
  name: string;
  start_date: string;
  end_date: string;
}
