import { Deserializable } from './deserializable';

interface PermissionDetail {
  [key: string]: boolean;
}

export interface PermissionObject {
  [key: string]: PermissionDetail;
}

export class BaseModel implements Deserializable {
  public permissions?: PermissionDetail;

  deserialize(input: any): this {
    Object.assign(this, input);
    return this;
  }

  has_permissions(permission: string) {
    if (this.permissions.hasOwnProperty(permission)) {
      return this.permissions[permission];
    } else {
      return false;
    }
  }
}
