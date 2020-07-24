import { Deserializable } from './deserializable';
import { PermissionObject } from './base-model';

export interface IUserRegister {
  email: string;
  password1: string;
  password2: string;
  first_name: string;
  last_name: string;
  cgu_accepted: boolean;
}

export interface IUserInformation {
  first_name?: string;
  last_name?: string;
  phone?: string;
}

export interface IUser {
  id?: number;
  url?: string;
  first_name: string;
  last_name: string;
  email: string;
  is_active?: boolean;
  is_superuser?: boolean;
  permissions?: PermissionObject;
}
export class User implements Deserializable {
  public id?: number;
  public url?: string;
  public first_name?: string;
  public last_name?: string;
  public email: string;
  public is_active?: boolean;
  public is_superuser?: boolean;
  public permissions?: PermissionObject;

  deserialize(input: IUser) {
    Object.assign(this, input);
    return this;
  }

  get name() {
    if (this.first_name && this.last_name) {
      return `${this.first_name} ${this.last_name}`;
    } else {
      return this.email;
    }
  }

  get display() {
    if (this.first_name && this.last_name) {
      return this.name;
    } else {
      return this.email;
    }
  }

  has_permissions(object: string, permissions: string[]) {
    if (this.permissions) {
      if (this.permissions.hasOwnProperty(object)) {
        for (const permission of permissions) {
          const value = this.permissions[object][permission];

          if (!value) {
            return false;
          }
        }

        return true;
      }
    }

    return false;
  }
}
