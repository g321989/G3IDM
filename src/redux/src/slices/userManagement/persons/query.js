import moment from "moment";
import { dbName , METADATAID } from "../../../settings";

export const queries = {
  person_read: (data) => {
    let filter = {};
    return {
      db_name: dbName,
      entity: "Person",
      filter: "Person.activestatus==true",
      sort: "Person.createddate",
      return_fields:
        "merge(Person,{name:(for nam in HumanNameMaster filter nam._id in Person.name return merge(nam,{use:document(nam.use),suffix:document(nam.suffix),prefix:document(nam.prefix)}))},{gender:document(Person.gender)},{telecom:(for con in ContactPointMaster filter con._id in Person.telecom return merge(con,{use:document(con.use),rank:document(con.rank)}))},{photo:document(Person.photo)},{address:document(Person.address)},{identifier:(for iden in IdentifierMaster filter iden._id in Person.identifier return merge(iden,{user:document(iden.user),Type:document(iden.Type)}))},{OrgID:document(Person.OrgID)},{orgType:document(Person.orgType)})",
    };
  },
  person_delete: (data) => {
    let filter = {};
    if (data._id) {
      filter = { filter: { _id: data._id } };
    }
    return [
      {
        db_name: dbName,
        entity: "Person",
        // "is_metadata": true,
        metadataId: METADATAID,
        ...filter,
      },
    ];
  },
  person_upsert: (data) => {
    let filter = {};
    let tenentid = localStorage.getItem("tenentid");
    if (data._key) {
      filter = { filter: { _key: data._key } };
    }
    delete data._key;

    data[tenentid] = tenentid;
    return [
      {
        db_name: dbName,
        entity: "Person",
        is_metadata: true,
        metadataId: METADATAID,
        ...filter,
        doc: {
          ...data,
        },
      },
    ];
  },

  contact_system_master: (data) => {
    return {
      db_name: dbName,
      entity: "CodingMaster",
      filter:
        "CodingMaster.Type=='CONTACTSYSTEM' && CodingMaster.activestatus==true",
      return_fields:
        "KEEP(CodingMaster,'_id','id','_key','code','display','Type')",
    };
  },
  entity_name_master: (data) => {
    return {
      db_name: dbName,
      entity: "Organization",
      filter: `Organization.activestatus==true && lower(first(document(Organization.OrgType)[*].display)) == '${data}'`,
      return_fields:
        "{_id:Organization._id,_key:Organization._key,id:Organization.id,name:Organization.name,alias:Organization.alias}",
    };
  },
  entity_type_master: (data) => {
    return {
      db_name: dbName,
      entity: "CodingMaster",
      filter: "CodingMaster.Type=='ORGTYPE' && CodingMaster.activestatus==true",
      return_fields:
        "KEEP(CodingMaster,'_id','id','_key','code','display','Type')",
    };
  },
  gender_master: (data) => {
    return {
      db_name: dbName,
      entity: "CodingMaster",
      filter: "CodingMaster.Type=='GENDER' && CodingMaster.activestatus==true",
      return_fields:
        "KEEP(CodingMaster,'_id','id','_key','code','display','Type')",
    };
  },
  id_type_master: (data) => {
    return {
      db_name: dbName,
      entity: "CodingMaster",
      filter:
        "CodingMaster.Type=='ALTERNATEIDTYPE' && CodingMaster.activestatus==true",
      return_fields:
        "KEEP(CodingMaster,'_id','id','_key','code','display','Type')",
    };
  },
  prefix_master: (data) => {
    return {
      db_name: dbName,
      entity: "CodingMaster",
      filter:
        "CodingMaster.Type=='NAMEPREFIX' && CodingMaster.activestatus==true",
      return_fields:
        "KEEP(CodingMaster,'_id','id','_key','code','display','Type')",
    };
  },
  priority_master: (data) => {
    return {
      db_name: dbName,
      entity: "CodingMaster",
      filter:
        "CodingMaster.Type=='PRIORITY' && CodingMaster.activestatus==true",
      return_fields:
        "KEEP(CodingMaster,'_id','id','_key','code','display','Type')",
    };
  },
  surffix_master: (data) => {
    return {
      db_name: dbName,
      entity: "CodingMaster",
      filter:
        "CodingMaster.Type=='NAMESUFFIX' && CodingMaster.activestatus==true",
      return_fields:
        "KEEP(CodingMaster,'_id','id','_key','code','display','Type')",
    };
  },
  use_master: (data) => {
    return {
      db_name: dbName,
      entity: "CodingMaster",
      filter: "CodingMaster.Type=='USE' && CodingMaster.activestatus==true",
      return_fields:
        "KEEP(CodingMaster,'_id','id','_key','code','display','Type')",
    };
  },
  single_read_person: (data) => {
    return {
      db_name: dbName,
      entity: "Person",
      filter: ` Person._key=='${data._key}' && Person.activestatus==true`,
      return_fields:
        "merge(Person,{name:(for nam in HumanNameMaster filter nam._id in Person.name return merge(nam,{use:document(nam.use),suffix:document(nam.suffix),prefix:document(nam.prefix)}))},{gender:document(Person.gender)},{telecom:(for con in ContactPointMaster filter con._id in Person.telecom return merge(con,{use:document(con.use),rank:document(con.rank)}))},{photo:document(Person.photo)},{address:(for add in AddressMaster filter add._id in Person.address return merge(add,{use:document(add.use),Type:document(add.Type),city:document(add.city),district:document(add.district),state:document(add.state),country:document(add.country),postalCode:document(add.postalCode)}))},{identifier:(for iden in IdentifierMaster filter iden._id in Person.identifier return merge(iden,{user:document(iden.user),Type:document(iden.Type),period:document(iden.period)}))},{OrgID:document(Person.OrgID)},{orgType:document(Person.orgType)})",
    };
    // return {
    //   "db_name": dbName,
    //   "entity": "Person",
    //   "filter": `Person.activestatus==true && Person._key=='${data._key}'`,
    //   "return_fields": "merge(Person,{name:(for nam in HumanNameMaster filter nam._id in Person.name return merge(nam,{use:document(nam.use),suffix:document(nam.suffix),prefix:document(nam.prefix)}))},{gender:document(Person.gender)},{telecom:(for con in ContactPointMaster filter con._id in Person.telecom return merge(con,{use:document(con.use),rank:document(con.rank),system:document(con.system)}))},{photo:document(Person.photo)},{address:document(Person.address)},{identifier:(for iden in IdentifierMaster filter iden._id in Person.identifier return merge(iden,{user:document(iden.user),Type:document(iden.Type)}))},{OrgID:document(Person.OrgID)},{orgType:document(Person.orgType)})"
    // }
  },
  orgname: (data) => {
    return {
      db_name: dbName,
      entity: "Organization",
      sort: `Organization.OrgName`,
      filter: "Organization.activestatus==true",
      return_fields: "{name: Organization.OrgName, id:Organization._id}",
    };
  },
  facilityList: (data) => {
    return {
      db_name: dbName,
      entity: "Facility",
      sort: "Facility.FacName",
      filter: `Facility.activestatus==true && Facility.OrgCode == '${data}'`,
      return_fields: "{name: Facility.FacName, id:Facility._id}",
    };
  },
  patientcategory: (data) => {
    return {
      db_name: dbName,
      entity: "CodingMaster",
      filter:
        "CodingMaster.Type=='PATIENTCATEGORY' && CodingMaster.activestatus==true",
      return_fields:
        "KEEP(CodingMaster,'_id','id','_key','code','display','Type')",
    };
  },
  mealtype: (data) => {
    return {
      db_name: dbName,
      entity: "CodingMaster",
      filter:
        "CodingMaster.Type=='MEALTYPE' && CodingMaster.activestatus==true",
      return_fields:
        "KEEP(CodingMaster,'_id','id','_key','code','display','Type')",
    };
  },
  day: (data) => {
    return {
      db_name: dbName,
      entity: "CodingMaster",
      filter: "CodingMaster.Type=='DAY' && CodingMaster.activestatus==true",
      return_fields:
        "KEEP(CodingMaster,'_id','id','_key','code','display','Type')",
    };
  },
  isPersonExist:(data) => {
    return [
      {
        db_name: dbName,
        entity: "ContactPointMaster",
        filter:`ContactPointMaster.value == '${data?.doc?.telecom[0]?.value}'`,
        return_fields: "ContactPointMaster"
      },
    ];

  }
};

// person_read: (data) => {
//   let filter = {};
//   return {
//     "db_name": dbName,
//     "entity": "Person",
//     "filter": "Person.activestatus==true",
//     "limit": {
//     "count": 10,
//     "offset": 0
//     },
//     "return_fields": "merge(Person,{name:(for nam in HumanNameMaster filter nam._id in Person.name return merge(nam,{use:document(nam.use),suffix:document(nam.suffix),prefix:document(nam.prefix)}))},{gender:document(Person.gender)},{telecom:(for con in ContactPointMaster filter con._id in Person.telecom return merge(con,{use:document(con.use),rank:document(con.rank)}))},{photo:document(Person.photo)},{address:document(Person.address)},{identifier:(for iden in IdentifierMaster filter iden._id in Person.identifier return merge(iden,{user:document(iden.user),Type:document(iden.Type)}))},{OrgID:document(Person.OrgID)},{orgType:document(Person.orgType)})",
//     "sort": "Person.createddate"
//     }
// },
