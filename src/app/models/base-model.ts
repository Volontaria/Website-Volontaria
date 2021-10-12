interface PermissionDetail {
  [key: string]: boolean;
}

export interface PermissionObject {
  [key: string]: PermissionDetail;
}

export class BaseModel {
  public permissions?: PermissionDetail;

  constructor(data: Object = {}) {
    for (const name in data) {
      if ( data.hasOwnProperty(name) ) {
          this[name] = data[name];
        }
      }
    }

  has_permissions(permission: string) {
    if (this.permissions.hasOwnProperty(permission)) {
      return this.permissions[permission];
    } else {
      return false;
    }
  }
}
