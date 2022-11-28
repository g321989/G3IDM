import moment from "moment";
import { dbName , ParentRepoId , IDM_METADATA_ID , SUPERADMINTENENTID} from "../../../settings";

export const queries = {
  role_read: (data) => {
    let filter = {
      filter: `CodeableConceptMaster.Type == 'PRACTROLE' && CodeableConceptMaster.status == true`,
    };
    return {
      db_name: dbName,
      entity: "CodeableConceptMaster",
      // "filter": "Holiday.activestatus ==true",
      ...filter,
      return_fields:
        "MERGE(CodeableConceptMaster,{coding:(for cod IN TO_ARRAY(CodeableConceptMaster.coding) RETURN DOCUMENT(cod))})",
    };
  },
  permission_role_read: (data) => {
    let filter = {};
    if (data.role_id >= 0) {
      filter = { filter: `PermissionRoleMapping.role_id == ${data.role_id}` };
    }
    return {
      db_name: dbName,
      entity: "PermissionRoleMapping",
      // "filter": "Holiday.activestatus ==true",
      ...filter,
      return_fields: "{PermissionRoleMapping}",
    };
  },
  repository_read: (data) => {
    return {
      db_name: dbName,
      metadataid: IDM_METADATA_ID,
    };
  },
  getRoleDetails: (roleid) => {
    return {
      db_name: dbName,
      "entity": "IDM_PermissionRoleMapping",
      "filter": `IDM_PermissionRoleMapping.roleid =="${roleid}"`,
      "return_fields": "IDM_PermissionRoleMapping.rolename"

    }
  },
  repositary_read_client: (tenantid) => {
    return {
      db_name:dbName,
      tenantId:tenantid,
     // parentrepoId: ParentRepoId,
      metadataid: IDM_METADATA_ID,
      superadmin_tenantId:SUPERADMINTENENTID

    }
  }
};
