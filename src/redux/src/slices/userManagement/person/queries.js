import { dbName , idm_metadata_dbname , METADATAID  } from "../../../settings";

export const queries = {
  person_upsert: (data) => {
    return [
      {
        db_name: dbName,
        entity: "Person",
        is_metadata: true,
        metadataId: METADATAID,
        metadata_dbname: idm_metadata_dbname,
        doc: {
          ...data,
        },
      },
    ];
  },
  person_update: (data) => {
    return [
      {
        db_name: dbName,
        entity: "Person",
        filter:{
          ...data.filter
        },
        is_metadata: true,
        metadataId: METADATAID,
        metadata_dbname: idm_metadata_dbname,
        doc: {
          ...data.doc,
        },
      },
    ];
  },
  isPersonExist:(data) => {
    return {
        db_name: dbName,
        entity: "ContactPointMaster",
        filter:`ContactPointMaster.value == '${data?.telecom[0]?.value}'`,
        return_fields: "ContactPointMaster"
      }
  },
  resetEmail:(data) => {
    return {
      email: data?.telecom[0]?.value,
      metadata_dbname: idm_metadata_dbname,
    }
  }
};
