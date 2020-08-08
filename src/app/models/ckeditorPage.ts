import { BaseModel } from './base-model';

export class CkeditorPage extends BaseModel {
  public id?: number;
  public url?: string;
  public key?: string;
  public content: string;
  public updated_at?: string;
  public created_at?: string;
}
