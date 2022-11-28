import moment from "moment";
import { dbName , METADATAID} from "../../../settings";

export const queries = {

  user_read: (data) => {
    let filter = {};
    return {
      "db_name": dbName,
      "entity": "Practitioner",
      // "filter": "Holiday.activestatus ==true",
      ...filter,
      "return_fields": "{Practitioner}"
    }
  },
  user_delete: (data) => {
    let filter = {};
    if (data._id) {
      filter = { filter: { _id: data._id } };
    }
    return [
      {
        "db_name": dbName,
        "entity": "Practitioner",
        // "is_metadata": true,
        "metadataId": METADATAID,
       ...filter
      }
    ]
  },
  user_upsert: (data) => {
    let filter = {};
    if (data._key) {
      filter = { filter: { _key: data._key } };
    }
    return [
      {
        "db_name": dbName,
        "entity": "Practitioner",
        "is_metadata": true,
        "metadataId": METADATAID,
        ...filter,
        "doc": {
          ...data
        }
      }
    ]
  }, 
  practitioner_by_id: (data) => {
    return {
      "db_name": dbName,
      "entity": "Practitioner",
      "filter": `Practitioner.PersonID==${data.id} && Practitioner.activestatus==true`,
      "return_fields": "merge(Practitioner,{identifier:(for doc in IdentifierMaster filter doc._id in Practitioner.identifier return merge(doc,{period:(for cod in doc.period return document(cod))})),address:(for a in Practitioner.address return document(a)),communication:( FOR cod IN CodeableConceptMaster filter cod._id in Practitioner.communication RETURN MERGE(cod,{coding:(FOR d IN cod.coding RETURN DOCUMENT(d))})),marital_status:(FOR cod IN CodeableConceptMaster filter cod._id==Practitioner.marital_status RETURN MERGE(cod,{coding:(FOR d IN cod.coding RETURN DOCUMENT(d))})),name:(for a in Practitioner.name return MERGE(document(a),{period:DOCUMENT(document(a).period)})),nationality:(FOR cod IN SMGeographicMaster filter cod._id==Practitioner.nationality RETURN cod),photo:(for a in Practitioner.photo return document(a)),position:(for pt in CodeableConceptMaster filter pt._id==Practitioner.position return merge(pt,{coding:(FOR d IN pt.coding RETURN DOCUMENT(d))})),practitioner_type:(for pt in CodeableConceptMaster filter pt._id==Practitioner.practitioner_type return merge(pt,{coding:(FOR d IN pt.coding RETURN DOCUMENT(d))})),telecom:(for a in Practitioner.telecom return document(a)),job_experience:(for c in Practitioner.job_experience RETURN merge(c,{jobexperience_contact_details:(for con in c.jobexperience_contact_details return document(con)), jobexperience_address:(for add in c.jobexperience_address return document(add))})),training_details:(for c in Practitioner.training_details RETURN merge(c,{training_contact_details:(for con in c.training_contact_details return document(con)), training_address:(for add in c.training_address return document(add))})),practitioner_role:(for doc in PractitionerRole filter doc._id IN Practitioner.practitioner_role return MERGE(doc,{telecom:(for rol in ContactPointMaster filter rol._id in doc.telecom return rol),role:(for cod in CodeableConceptMaster filter cod._id==doc.role return merge(cod,{coding:(for code in CodingMaster filter code._id in cod.coding return code)})),period:(for per in periodMaster filter per._id in doc.period return per)})),gender:(FOR cod IN CodeableConceptMaster filter cod._id==Practitioner.gender RETURN MERGE(cod,{coding:(FOR d IN cod.coding RETURN DOCUMENT(d))})),employee_status:(for pt in CodeableConceptMaster filter pt._id==Practitioner.employee_status return merge(pt,{coding:(FOR d IN pt.coding RETURN DOCUMENT(d))}))})"
      }
  },
};
