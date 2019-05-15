import BaseModel from './baseModel';

export class InfoSection extends BaseModel {
  id: number;
  content: string;
  title: string;
  is_accordion: boolean;
}
