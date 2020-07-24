interface PermissionDetail {
  [key: string]: boolean;
}

export interface PermissionObject {
  [key: string]: PermissionDetail;
}

export class BaseModel {
  public permissions?: PermissionDetail;

  has_permissions(permission: string) {
    if (this.permissions.hasOwnProperty(permission)) {
      return this.permissions[permission];
    } else {
      return false;
    }
  }
}
