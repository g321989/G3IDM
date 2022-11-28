// import { dbName } from "../../qdm_query_ids";
import { dbName , METADATAID   } from "../../settings";

export const queries = {
  rolelist: (type) => {
    return {
      db_name: dbName,
      entity: "CodeableConceptMaster",
      filter: `CodeableConceptMaster.Type=='${type}'`,
      return_fields:
        "MERGE(CodeableConceptMaster,{coding:(FOR cod IN CodeableConceptMaster.coding RETURN DOCUMENT(cod))})",
      sort: "CodeableConceptMaster.createddate",
    };
  },
  upsert: (data) => {
    let filter = {};
    let _key = {};
    let metadata = {};
    if (data._key) {
      filter = { filter: { _key: data._key } };
    }
    if (data?.coding_key) {
      _key = { _key: data?.coding_key };
    }
    if (data.id) {
      metadata = { id: data.id };
    }
    return [
      {
        db_name: dbName,
        entity: "CodeableConceptMaster",
        is_metadata: true,
        metadataId: METADATAID,
        ...filter,
        doc: {
          text: "",
          _id: "",
          id: 0,
          coding: [
            {
              system: "",
              version: "1",
              code: data.code,
              display: data.description,
              userSelected: true,
              Type: data.type,
              id: data.id,
              status: data.status,
              ..._key,
            },
          ],
          Type: data.type,
          status: data.status,
        },
      },
    ];
  },
  practitioner_by_id: (id) => {
    return {
      db_name: dbName,
      entity: "Practitioner",
      filter: `Practitioner._key=='${id}' && Practitioner.activestatus==true`,
      return_fields:
        "merge(Practitioner,{identifier:(for doc in IdentifierMaster filter doc._id in Practitioner.identifier return merge(doc,{period:(for cod in doc.period return document(cod))})),address:(for a in Practitioner.address return document(a)),communication:( FOR cod IN CodeableConceptMaster filter cod._id in Practitioner.communication RETURN MERGE(cod,{coding:(FOR d IN cod.coding RETURN DOCUMENT(d))})),marital_status:(FOR cod IN CodeableConceptMaster filter cod._id==Practitioner.marital_status RETURN MERGE(cod,{coding:(FOR d IN cod.coding RETURN DOCUMENT(d))})),name:(for a in Practitioner.name return document(a)),nationality:(FOR cod IN SMGeographicMaster filter cod._id==Practitioner.nationality RETURN cod),photo:(for a in Practitioner.photo return document(a)),position:(for pt in CodeableConceptMaster filter pt._id==Practitioner.position return merge(pt,{coding:(FOR d IN pt.coding RETURN DOCUMENT(d))})),practitioner_type:(for pt in CodeableConceptMaster filter pt._id==Practitioner.practitioner_type return merge(pt,{coding:(FOR d IN pt.coding RETURN DOCUMENT(d))})),telecom:(for a in Practitioner.telecom return document(a)),job_experience:(for c in Practitioner.job_experience RETURN merge(c,{jobexperience_contact_details:(for con in c.jobexperience_contact_details return document(con)), jobexperience_address:(for add in c.jobexperience_address return document(add))})),training_details:(for c in Practitioner.training_details RETURN merge(c,{training_contact_details:(for con in c.training_contact_details return document(con)), training_address:(for add in c.training_address return document(add))})),practitioner_role:(for doc in PractitionerRole filter doc._id IN Practitioner.practitioner_role return MERGE(doc,{telecom:(for rol in ContactPointMaster filter rol._id in doc.telecom return rol),role:(for cod in CodeableConceptMaster filter cod._id==doc.role return merge(cod,{coding:(for code in CodingMaster filter code._id in cod.coding return code)})),period:(for per in periodMaster filter per._id in doc.period return per)})),gender:(FOR cod IN CodeableConceptMaster filter cod._id==Practitioner.gender RETURN MERGE(cod,{coding:(FOR d IN cod.coding RETURN DOCUMENT(d))})),employee_status:(for pt in CodeableConceptMaster filter pt._id==Practitioner.employee_status return merge(pt,{coding:(FOR d IN pt.coding RETURN DOCUMENT(d))}))})",
    };
  },
  // practitioner_list: (page = 0, perPage = 10, search) => {
  //   return {
  //     db_name: dbName,
  //     entity: "Practitioner",
  //     // sort : "Practitioner.createddate",
  //     sort: "Practitioner.updatedate desc",
  //     filter: `(like(document(first(Practitioner.name)).text,'%${search}%',true) || like(document(first(document(Practitioner.practitioner_type).coding)).display,'%${search}%',true) || like(document(document(document(Practitioner.practitioner_role[0]).SpecialtyID).coding[0]).display,'%${search}%',true)) && Practitioner.activestatus==true`,
  //     limit: { offset: page, count: perPage },
  //     return_fields:
  //       "{TotalCount:COUNT(FOR cnt IN Practitioner RETURN cnt._key),PersonID:Practitioner.PersonID,_id:Practitioner._id, id:Practitioner.id,name:(FOR nam IN TO_ARRAY(Practitioner.name) RETURN DOCUMENT(nam).text)[0],type: (for t in CodeableConceptMaster filter t._id == Practitioner.practitioner_type return merge(t,{coding:(for cod in CodingMaster filter cod._id in t.coding return cod.display)})),_key:Practitioner._key,status:Practitioner.status,Practitionerrole:(for pr in PractitionerRole filter pr._id in Practitioner.practitioner_role && pr.primary_specialty==true return merge(pr,{SpecialtyID:(for spe in CodeableConceptMaster filter spe._id ==pr.SpecialtyID return merge(spe,{coding:(for cod in CodingMaster filter cod._id in spe.coding return cod.display)}))}))}",
  //   };
  // },
  practitioner_list: (page = 0, perPage = 10, search) => {
    return {
      db_name: dbName,
      entity: "Person",
      filter: `(like(document(first(Person.name)).text,'%${search}%',true)) && Person.roleid[0].roleid!='5'&& Person.activestatus==true`,
      limit: { offset: page, count: perPage },
      return_fields:
        "MERGE(Person,{ name:(FOR nam IN TO_ARRAY(Person.name) RETURN MERGE(DOCUMENT(nam),{use:DOCUMENT(DOCUMENT(nam).use)})), address:(FOR add IN TO_ARRAY(Person.address) RETURN MERGE(DOCUMENT(add),{country:DOCUMENT(DOCUMENT(add).country),Type:DOCUMENT(DOCUMENT(add).Type) ,use:DOCUMENT(DOCUMENT(add).use) ,city:DOCUMENT(DOCUMENT(add).city) ,state:DOCUMENT(DOCUMENT(add).state) ,postalCode:DOCUMENT(DOCUMENT(add).postalCode) })), photo:DOCUMENT(Person.photo), telecom:(for tel IN TO_ARRAY(Person.telecom) RETURN MERGE(DOCUMENT(tel),{system:DOCUMENT(DOCUMENT(tel).system),use:DOCUMENT(DOCUMENT(tel).use),rank:MERGE(DOCUMENT(DOCUMENT(tel).rank),{coding:DOCUMENT(DOCUMENT(DOCUMENT(tel).rank).coding)}) })), gender:MERGE(DOCUMENT(Person.gender),{coding:(FOR cod IN TO_ARRAY(DOCUMENT(Person.gender).coding) RETURN DOCUMENT(cod))}) })",
    };
    {
    }
  },
  practitioner_list_teneteid: (page = 0, perPage = 10, search , teneteid) => {
    return {
      db_name: dbName,
      entity: "Person",
      filter: `(like(document(first(Person.name)).text,'%${search}%',true)) && Person.roleid[0].roleid!='5' && Person.tenantid == '${teneteid}' && Person.activestatus==true `,
      limit: { offset: page, count: perPage },
      return_fields:
        "MERGE(Person,{ name:(FOR nam IN TO_ARRAY(Person.name) RETURN MERGE(DOCUMENT(nam),{use:DOCUMENT(DOCUMENT(nam).use)})), address:(FOR add IN TO_ARRAY(Person.address) RETURN MERGE(DOCUMENT(add),{country:DOCUMENT(DOCUMENT(add).country),Type:DOCUMENT(DOCUMENT(add).Type) ,use:DOCUMENT(DOCUMENT(add).use) ,city:DOCUMENT(DOCUMENT(add).city) ,state:DOCUMENT(DOCUMENT(add).state) ,postalCode:DOCUMENT(DOCUMENT(add).postalCode) })), photo:DOCUMENT(Person.photo), telecom:(for tel IN TO_ARRAY(Person.telecom) RETURN MERGE(DOCUMENT(tel),{system:DOCUMENT(DOCUMENT(tel).system),use:DOCUMENT(DOCUMENT(tel).use),rank:MERGE(DOCUMENT(DOCUMENT(tel).rank),{coding:DOCUMENT(DOCUMENT(DOCUMENT(tel).rank).coding)}) })), gender:MERGE(DOCUMENT(Person.gender),{coding:(FOR cod IN TO_ARRAY(DOCUMENT(Person.gender).coding) RETURN DOCUMENT(cod))}) })",
    };
    {
    }
  },

  status_update_practitioner: (data) => {
    return [
      {
        db_name: dbName,
        entity: "Practitioner",
        filter: {
          _key: data._key,
        },
        is_metadata: true,
        metadataId: METADATAID,
        doc: {
          status: data.status,
        },
      },
    ];
  },
  get_entity_by_id: (id) => {
    return {
      db_name: dbName,
      entity: "Organization",
      sort: "Organization.name",
      filter: `Organization.activestatus==true && Organization.OrgType any =='${id}'`,
      return_fields:
        "{_id:Organization._id,_key:Organization._key,id:Organization.id,name:Organization.name,alias:Organization.alias}",
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
};
