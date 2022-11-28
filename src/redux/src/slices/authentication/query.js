import { dbName } from "../../settings";

export const queries = {
  IdmGetPermission: (id) => {
    return {
      db_name: `${dbName}`,
      entity: `PermissionRoleMapping`,
      filter: `PermissionRoleMapping.role_id == ${id}`,
      return_fields: `{PermissionRoleMapping}`,
    };
  },
  
};
