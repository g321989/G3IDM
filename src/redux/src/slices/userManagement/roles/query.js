import moment from "moment";
import { dbName  , idm_metadata_dbname , IDM_METADATA_ID, METADATAID} from "../../../settings";

export const queries = {
  getRoleDetails: (roleid) => {
    return {
      db_name: dbName,
      "entity": "IDM_PermissionRoleMapping",
      "filter": `IDM_PermissionRoleMapping.roleid =="${roleid}"`,
      "return_fields": "IDM_PermissionRoleMapping.rolename"

    }
  },
  role_read: (data) => {
   
    return {
      db_name: dbName,
      entity: "IDM_PermissionRoleMapping",
      filter: "IDM_PermissionRoleMapping.activestatus ==true",
      return_fields: "IDM_PermissionRoleMapping",
    };
  },
  isRoleExist:(data) => {
    return {
      db_name: dbName,
      entity: "IDM_PermissionRoleMapping",
      filter: `IDM_PermissionRoleMapping.rolename == '${data?.rolename}' && IDM_PermissionRoleMapping.tenantid == '${data?.tenantid}' && IDM_PermissionRoleMapping.activestatus ==true`,
      return_fields: "IDM_PermissionRoleMapping",
    };

  },

  role_read_tenetid: (data) => {
   let tenentid = localStorage.getItem("tenentid");
    return {
      db_name: dbName,
      entity: "IDM_PermissionRoleMapping",
      filter: `IDM_PermissionRoleMapping.activestatus ==true && IDM_PermissionRoleMapping.tenantid == '${tenentid}' ` ,
      return_fields: "IDM_PermissionRoleMapping",
    };
  },
  permission_role_read: (data) => {
    let filter = {};
    if (data?.role_id >= 0) {
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
  get_role_by_id: (roleid) => {
    return {
      db_name: dbName,
      entity: "IDM_PermissionRoleMapping",
      roleid: roleid, //"CodingMaster/11117",
    };
  },
  permission_management_read: (data) => {
    let filter = {};
    // if(data.role_id){
    //   filter = { "filter": `PermissionManagement.role_id == '${data.role_id}'` }
    // }
    return {
      db_name: dbName,
      entity: "PermissionManagement",
      // "filter": "Holiday.activestatus ==true",
      ...filter,
      return_fields: "{PermissionManagement}",
    };
  },
  permission_role_upsert: (data) => {
    let filter = {};
    if (data._key) {
      filter = { filter: { _key: data._key } };
    }
    return [
      {
        db_name: dbName,
        entity: "IDM_PermissionRoleMapping",
        is_metadata: true,
        metadataId: METADATAID,
        metadata_dbname: idm_metadata_dbname,
        ...filter,
        doc: {
          ...data,
        },
      },
    ];
  },
  role_upsert: (data) => {
    let filter = {};
    if (data._key) {
      filter = { filter: { _key: data._key } };
    }
    return [
      {
        db_name: dbName,
        entity: "CodeableConceptMaster",
        is_metadata: true,
        metadataId: METADATAID,
        ...filter,
        doc: {
          ...data,
        },
      },
    ];
  },
  role_soft_delete: (key) => {
    return {
      db_name: dbName,
      // metadata_dbname: idm_metadata_dbname,
      entity: "IDM_PermissionRoleMapping",
      filter: `IDM_PermissionRoleMapping._key=='${key}'`,
    };
  },
  role_delete: (data) => {
    let filter = {};
    if (data._id) {
      filter = { filter: { _id: data._id } };
    }
    return [
      {
        db_name: dbName,
        entity: "CodeableConceptMaster",
        // "is_metadata": true,
        metadataId: METADATAID,
        ...filter,
      },
    ];
  },
  coding_update: (data) => {
    // return [{
    //   "db_name": dbName,
    //   "entity": "CodingMaster",
    //   "is_metadata": true,
    //   "metadataId": "04ecb73d-f048-44ce-8563-c9be015812dd",
    //   "filter": {
    //   "_key":`${data._key}` ,
    //   },
    //   "doc": {
    //     ...data
    //   }
    // }]

    let filter = {
      filter: {
        _key: `${data?._key}`,
      },
    };

    return [
      {
        db_name: dbName,
        entity: "IDM_PermissionRoleMapping",
        is_metadata: true,
        metadataId: METADATAID,
        ...(data?._key && filter),
        doc: {
          id: data?.id,
          roleid: data?.roleid,
          rolename: data?.rolename,
          perrolepermsnid: data?.perrolepermsnid,
          activestatus: data?.activestatus,
          metadataid: IDM_METADATA_ID,
          clientid: "clients/540256733",
          projectid: "projects/540346760",
        },
      },
    ];
  },
};
