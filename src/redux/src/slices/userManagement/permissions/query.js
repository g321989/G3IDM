import moment from "moment";
import { dbName, idm_metadata_dbname , METADATAID ,IDM_METADATA_ID } from "../../../settings";

export const queries = {
  getRoleDetails: (roleid) => {
    return {
      db_name: dbName,
      "entity": "IDM_PermissionRoleMapping",
      "filter": `IDM_PermissionRoleMapping.roleid =="${roleid}"`,
      "return_fields": "IDM_PermissionRoleMapping.rolename"

    }
  },
  permission_read: (data) => {
    return {
      db_name: dbName,
      entity: "IDM_PermissionManagement",
    };
  },
  permission_read_by_id: (_id) => {
    
    return {
      db_name: dbName,
      entity: "IDM_PermissionManagement",
      _id: _id ?? "",
    };
  },
  permission_delete: (_key) => {
    return {
      db_name: dbName,
      metadata_dbname: idm_metadata_dbname,
      entity: "IDM_PermissionManagement",
      filter: `IDM_PermissionManagement._key=='${_key}'`,
    };
  },

  isPermissionExist:(payload) => {
    return {
      db_name: dbName,
      entity: "IDM_PermissionManagement",
      filter: `IDM_PermissionManagement.permsnname =='${payload?.permsnname}' && IDM_PermissionManagement.tenantid == '${payload?.tenantid}' `,
      return_fields:"IDM_PermissionManagement"
    };
  },

  permission_upsert: (data) => {
    let filter = {};
    if (data._key) {
      filter = { filter: { _key: data._key } };
    }

    return [
      {
        db_name: dbName,
        entity: "IDM_PermissionManagement",
        is_metadata: true,
        metadataId: METADATAID,
        metadata_dbname: idm_metadata_dbname,
        ...filter,
        doc: {
          permsnid: data?.permsnid,
          permsnname: data?.permsnname,
          status: data?.status,
          metadataid: IDM_METADATA_ID,
          clientid: "clients/540256733",
          projectid: "projects/540346760",
          permsn_repo: data?.permsn_repo,
          tenantid:data?.tenantid
        },
      },
    ];
  },
};
