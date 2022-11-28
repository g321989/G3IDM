import { dbName } from "../../settings";

export const masterQuery = {
    "id_type": `{
        "db_name": "${dbName}",
        "entity": "CodeableConceptMaster",
         "sort":"document(CodeableConceptMaster.coding[0]).display",
        "filter": "CodeableConceptMaster.Type=='ALTERNATEIDTYPE' && CodeableConceptMaster.status == true",
        "return_fields": "MERGE(CodeableConceptMaster,{coding:(FOR cod IN CodeableConceptMaster.coding RETURN DOCUMENT(cod))})"
    }`,
    "id_number": `{
        "db_name": "${dbName}",
        "entity": "CodeableConceptMaster",
         "sort":"document(CodeableConceptMaster.coding[0]).display",
        "filter": "CodeableConceptMaster.Type=='RELATIONSHIP'",
        "return_fields": "MERGE(CodeableConceptMaster,{coding:(FOR cod IN CodeableConceptMaster.coding RETURN DOCUMENT(cod))})"
    }`,
    "prefix": `{
        "db_name": "${dbName}",
        "entity": "CodeableConceptMaster",
         "sort":"document(CodeableConceptMaster.coding[0]).display",
        "filter": "CodeableConceptMaster.Type=='NAMEPREFIX'",
        "return_fields": "MERGE(CodeableConceptMaster,{coding:(FOR cod IN CodeableConceptMaster.coding RETURN DOCUMENT(cod))})"
    }`,
    "suffix": `{
        "db_name": "${dbName}",
        "entity": "CodeableConceptMaster",
        "sort":"document(CodeableConceptMaster.coding[0]).display",
        "filter": "CodeableConceptMaster.Type=='NAMESUFFIX'",
        "return_fields": "MERGE(CodeableConceptMaster,{coding:(FOR cod IN CodeableConceptMaster.coding RETURN DOCUMENT(cod))})"
    }`,
    "gender": `{
            "db_name": "${dbName}",
            "entity": "CodeableConceptMaster",
            "filter": "CodeableConceptMaster.Type=='GENDER' AND DOCUMENT(CodeableConceptMaster.coding)[*].code ANY != 'ANY' AND DOCUMENT(CodeableConceptMaster.coding)[*].status ANY ==true",
            "return_fields": "MERGE(CodeableConceptMaster,{coding:(FOR cod IN CodeableConceptMaster.coding RETURN DOCUMENT(cod))})",
            "sort": "document(CodeableConceptMaster.coding[0]).display"
    }`,
    "use": `{
        "db_name": "${dbName}",
        "entity": "CodeableConceptMaster",
        "sort":"document(CodeableConceptMaster.coding[0]).display",
        "filter": "CodeableConceptMaster.Type=='USE'",
        "return_fields": "MERGE(CodeableConceptMaster,{coding:(FOR cod IN CodeableConceptMaster.coding RETURN DOCUMENT(cod))})"
    }`,
    "practitioner_type": `{
        "db_name": "${dbName}",
        "entity": "CodeableConceptMaster",
         "sort":"document(CodeableConceptMaster.coding[0]).display",
        "filter": "CodeableConceptMaster.Type=='PRACTTYPE' && CodeableConceptMaster.status == true",
        "return_fields": "MERGE(CodeableConceptMaster,{coding:(FOR cod IN CodeableConceptMaster.coding RETURN DOCUMENT(cod))})"
    }`,
    "Communication_languages": `{
        "db_name": "${dbName}",
        "entity": "CodeableConceptMaster",
         "sort":"document(CodeableConceptMaster.coding[0]).display",
        "filter": "CodeableConceptMaster.Type=='LANGUAGE'",
        "return_fields": "MERGE(CodeableConceptMaster,{coding:(FOR cod IN CodeableConceptMaster.coding RETURN DOCUMENT(cod))})"
    }`,
    "speciality": `{
        "db_name": "${dbName}",
        "entity": "CodeableConceptMaster",
         "sort":"document(CodeableConceptMaster.coding[0]).display",
        "filter": "CodeableConceptMaster.Type=='SPECIALTY' && CodeableConceptMaster.status==true",
        "return_fields": "MERGE(CodeableConceptMaster,{coding:(FOR cod IN CodeableConceptMaster.coding RETURN DOCUMENT(cod))})"
    }`,
    // "entity": `{
    //     "db_name": "${dbName}",
    //     "entity": "Organization",
    //     "filter": "Organization.OrgType!=[]",
    //     "return_fields": "DISTINCT Organization.OrgType[0]"
    // }`,
    "entity": `{
        "db_name": "${dbName}",
        "entity": "CodeableConceptMaster",
         "sort":"document(CodeableConceptMaster.coding[0]).display",
        "filter": "CodeableConceptMaster.Type=='ORGTYPE' AND CodeableConceptMaster.activestatus==true",
        "return_fields": "MERGE(CodeableConceptMaster,{coding:(FOR cod IN TO_ARRAY(CodeableConceptMaster.coding) RETURN DOCUMENT(cod))})"
    }`,
    // "entity_name": `{
    //     "db_name": "${dbName}",
    //     "entity": "Organization",
    //     "filter": "'Hospital' IN Organization.OrgType",
    //     "return_fields": "{OrgID:Organization.id,name:Organization.name}"
    // }`,
    "entity_name": `{
        "db_name": "${dbName}",
        "entity": "Organization",
        "filter": "Organization.activestatus==true",
        "return_fields": "{_id:Organization._id,_key:Organization._key,id:Organization.id,name:Organization.name,alias:Organization.alias}"
    }`,
    "Address_use": `{
        "db_name": "${dbName}",
        "entity": "CodeableConceptMaster",
         "sort":"document(CodeableConceptMaster.coding[0]).display",
        "filter": "CodeableConceptMaster.Type=='USE'",
        "return_fields": "MERGE(CodeableConceptMaster,{coding:(FOR cod IN CodeableConceptMaster.coding RETURN DOCUMENT(cod))})"
    }`,
    "contact_mode": `{
        "db_name": "${dbName}",
        "entity": "CodeableConceptMaster",
         "sort":"document(CodeableConceptMaster.coding[0]).display",
        "filter": "CodeableConceptMaster.Type=='CONTACTSYSTEM'",
        "return_fields": "MERGE(CodeableConceptMaster,{coding:(FOR cod IN CodeableConceptMaster.coding RETURN DOCUMENT(cod))})"
    }`,
    "priority": `{
        "db_name": "${dbName}",
        "entity": "CodeableConceptMaster",
         "sort":"document(CodeableConceptMaster.coding[0]).display",
        "filter": "CodeableConceptMaster.Type=='PRIORITY'",
        "return_fields": "MERGE(CodeableConceptMaster,{coding:(FOR cod IN CodeableConceptMaster.coding RETURN DOCUMENT(cod))})"
    }`,
    "address_type": `{
        "db_name": "${dbName}",
        "entity": "CodeableConceptMaster",
         "sort":"document(CodeableConceptMaster.coding[0]).display",
        "filter": "CodeableConceptMaster.Type=='ADDRESSTYPE'",
        "return_fields": "MERGE(CodeableConceptMaster,{coding:(FOR cod IN CodeableConceptMaster.coding RETURN DOCUMENT(cod))})"
    }`,
    "role": `{
        "db_name": "${dbName}",
        "entity": "CodeableConceptMaster",
         "sort":"document(CodeableConceptMaster.coding[0]).display",
        "filter": "CodeableConceptMaster.Type=='PRACTROLE' && CodeableConceptMaster.status == true",
        "return_fields": "MERGE(CodeableConceptMaster,{coding:(FOR cod IN CodeableConceptMaster.coding RETURN DOCUMENT(cod))})"
    }`,
    "location": `{
        "db_name": "${dbName}",
        "entity": "LocationMaster",
        "sort":"LocationMaster.shortdesc",
        "filter": "LocationMaster.activestatus==true && lower(LocationMaster.status)=='active'", 
        "return_fields": "LocationMaster"
    }`,
    "city": `{
        "db_name": "${dbName}",
        "entity": "SMGeographicMaster",
        "sort":"SMGeographicMaster.geogLevelName",
        "filter": "SMGeographicMaster.geogLevelType=='CITY' && SMGeographicMaster.activestatus == true",
        "return_fields": "{_id:SMGeographicMaster._id,id:SMGeographicMaster.id,geogLevelName:SMGeographicMaster.geogLevelName,parentGeogLevelType:SMGeographicMaster.parentGeogLevelType,parentGeogLevelCode:SMGeographicMaster.parentGeogLevelCode}"
    }`,
    "district": `{
        "db_name": "${dbName}",
        "entity": "SMGeographicMaster",
         "sort":"SMGeographicMaster.geogLevelName",
        "filter": "SMGeographicMaster.geogLevelType=='DISTRICT' && SMGeographicMaster.geogLevelCode=='BLR' && SMGeographicMaster.activestatus == true",
        "return_fields": "{_id:SMGeographicMaster._id,id:SMGeographicMaster.id,geogLevelName:SMGeographicMaster.geogLevelName,parentGeogLevelType:SMGeographicMaster.parentGeogLevelType,parentGeogLevelCode:SMGeographicMaster.parentGeogLevelCode}"
    }`,
    "state": `{
        "db_name": "${dbName}",
        "entity": "SMGeographicMaster",
         "sort":"SMGeographicMaster.geogLevelName",
        "filter": "SMGeographicMaster.geogLevelType=='STATE' && SMGeographicMaster.geogLevelCode=='KAR' && SMGeographicMaster.activestatus == true",
        "return_fields": "{_id:SMGeographicMaster._id,id:SMGeographicMaster.id,geogLevelName:SMGeographicMaster.geogLevelName,parentGeogLevelType:SMGeographicMaster.parentGeogLevelType,parentGeogLevelCode:SMGeographicMaster.parentGeogLevelCode}"
    }`,
    "country": `{
        "db_name": "${dbName}",
        "entity": "SMGeographicMaster",
         "sort":"SMGeographicMaster.geogLevelName",
        "filter": "SMGeographicMaster.geogLevelType=='COUNTRY' && SMGeographicMaster.activestatus == true",
        "return_fields": "{_id:SMGeographicMaster._id,id:SMGeographicMaster.id,geogLevelName:SMGeographicMaster.geogLevelName,parentGeogLevelType:SMGeographicMaster.parentGeogLevelType,parentGeogLevelCode:SMGeographicMaster.parentGeogLevelCode}"
    }`,
    "country": `{
        "db_name": "primarycare",
        "entity": "SMGeographicMaster",
        "sort": "SMGeographicMaster.geogLevelName",
        "filter": "document(SMGeographicMaster.geogLevelType).code=='GE002' && SMGeographicMaster.activestatus == true",
        "return_fields": "{_id:SMGeographicMaster._id,id:SMGeographicMaster.id,geogLevelName:SMGeographicMaster.geogLevelName,geogLevelCode:SMGeographicMaster.geogLevelCode,parentGeogLevelType:SMGeographicMaster.parentGeogLevelType,parentGeogLevelCode:SMGeographicMaster.parentGeogLevelCode}"
    }`,
    "position": `{
        "db_name": "${dbName}",
        "entity": "CodeableConceptMaster",
         "sort":"document(CodeableConceptMaster.coding[0]).display",
        "filter": "CodeableConceptMaster.Type=='POSITION' && CodeableConceptMaster.status==true",
        "return_fields": "MERGE(CodeableConceptMaster,{coding:(FOR cod IN CodeableConceptMaster.coding RETURN DOCUMENT(cod))})"
    }`,
    "employee_type": `{
        "db_name": "${dbName}",
        "entity": "CodeableConceptMaster",
         "sort":"document(CodeableConceptMaster.coding[0]).display",
        "filter": "CodeableConceptMaster.Type=='EMPSTATUS' && CodeableConceptMaster.status==true",
        "return_fields": "MERGE(CodeableConceptMaster,{coding:(FOR cod IN CodeableConceptMaster.coding RETURN DOCUMENT(cod))})"
    }`,
    "marital_status": `{
        "db_name": "${dbName}",
        "entity": "CodeableConceptMaster",
        "sort":"document(CodeableConceptMaster.coding[0]).display",
        "filter": "CodeableConceptMaster.Type=='MARITALSTATUS' && CodeableConceptMaster.activestatus==true && CodeableConceptMaster.status == true",
        "return_fields": "MERGE(CodeableConceptMaster,{coding:(FOR cod IN CodeableConceptMaster.coding RETURN DOCUMENT(cod))})"
    }`,
    "nationality": `{
        "db_name": "${dbName}",
        "entity": "SMGeographicMaster",
        "sort": "SMGeographicMaster.geogLevelName",
        "filter": "lower(document(SMGeographicMaster.geogLevelType).display)=='country' && SMGeographicMaster.activestatus == true && SMGeographicMaster.active== true",
        "return_fields": "{_id:SMGeographicMaster._id,id:SMGeographicMaster.id,geogLevelName:SMGeographicMaster.geogLevelName,parentGeogLevelType:SMGeographicMaster.parentGeogLevelType,parentGeogLevelCode:SMGeographicMaster.parentGeogLevelCode}"
    }`,
    "country_code": `{
        "db_name": "${dbName}",
        "entity": "SMGeographicMaster",
        "sort": "SMGeographicMaster.GeoLocationISDCode",
        "filter": "lower(document(SMGeographicMaster.geogLevelType).display)=='country' && SMGeographicMaster.activestatus == true && SMGeographicMaster.active == true",
        "return_fields": "{_id:SMGeographicMaster._id,id:SMGeographicMaster.id,geogLevelName:SMGeographicMaster.geogLevelName,parentGeogLevelType:SMGeographicMaster.parentGeogLevelType,parentGeogLevelCode:SMGeographicMaster.parentGeogLevelCode,GeoLocationISDCode:SMGeographicMaster.GeoLocationISDCode}"
    }`

}

export const masterqueries = {
    practitioner_location_rule(type) {
        return {
            db_name: dbName,
            entity: "LocationMaster",
            sort: "LocationMaster.shortdesc",
            filter: `LocationMaster.managingOrgID=='${type}' && LocationMaster.activestatus==true && lower(LocationMaster.status)=='active'`,
            "return_fields": "LocationMaster"
        }
    },

    country() {
        return {
            "db_name": dbName,
            "entity": "SMGeographicMaster",
            "sort": "SMGeographicMaster.geogLevelName",
            "filter": "document(SMGeographicMaster.geogLevelType).code=='GE002' && SMGeographicMaster.activestatus == true",
            "return_fields": "{_id:SMGeographicMaster._id,id:SMGeographicMaster.id,geogLevelName:SMGeographicMaster.geogLevelName,geogLevelCode:SMGeographicMaster.geogLevelCode,parentGeogLevelType:SMGeographicMaster.parentGeogLevelType,parentGeogLevelCode:SMGeographicMaster.parentGeogLevelCode}"
        }
    },
    state_by_country(geogLevelCode) {
        return {
            "db_name": dbName,
            "entity": "SMGeographicMaster",
            "filter": `SMGeographicMaster.activestatus==true && lower(document(SMGeographicMaster.geogLevelType).display)=='state' && lower(document(SMGeographicMaster.parentGeogLevelCode).geogLevelCode)==lower('${geogLevelCode}')`,
            "return_fields": "{_id:SMGeographicMaster._id, id:SMGeographicMaster.id, geogLevelType:document(SMGeographicMaster.geogLevelType), geogLevelCode:SMGeographicMaster.geogLevelCode, geogLevelName:SMGeographicMaster.geogLevelName, parentGeogLevelType:document(SMGeographicMaster.parentGeogLevelType), parentGeogLevelCode:document(SMGeographicMaster.parentGeogLevelCode), active: SMGeographicMaster.activestatus,_key:SMGeographicMaster._key}"
        }
    },
    district_by_state(geogLevelCode) {
        return {
            "db_name": dbName,
            "entity": "SMGeographicMaster",
            "filter": `SMGeographicMaster.activestatus==true && lower(document(SMGeographicMaster.geogLevelType).display)=='district' && lower(document(SMGeographicMaster.parentGeogLevelCode).geogLevelCode)==lower('${geogLevelCode}')`,
            "return_fields": "{_id:SMGeographicMaster._id, id:SMGeographicMaster.id, geogLevelType:document(SMGeographicMaster.geogLevelType), geogLevelCode:SMGeographicMaster.geogLevelCode, geogLevelName:SMGeographicMaster.geogLevelName, parentGeogLevelType:document(SMGeographicMaster.parentGeogLevelType), parentGeogLevelCode:document(SMGeographicMaster.parentGeogLevelCode), active: SMGeographicMaster.activestatus,_key:SMGeographicMaster._key}"
        }
    },
    city_by_district(geogLevelCode) {
        return {
            "db_name": dbName,
            "entity": "SMGeographicMaster",
            "filter": `SMGeographicMaster.activestatus==true && lower(document(SMGeographicMaster.geogLevelType).display)=='city' && lower(document(SMGeographicMaster.parentGeogLevelCode).geogLevelCode)==lower('${geogLevelCode}')`,
            "return_fields": "{_id:SMGeographicMaster._id, id:SMGeographicMaster.id, geogLevelType:document(SMGeographicMaster.geogLevelType), geogLevelCode:SMGeographicMaster.geogLevelCode, geogLevelName:SMGeographicMaster.geogLevelName, parentGeogLevelType:document(SMGeographicMaster.parentGeogLevelType), parentGeogLevelCode:document(SMGeographicMaster.parentGeogLevelCode), active: SMGeographicMaster.activestatus,_key:SMGeographicMaster._key}"
        }
    },
    pincode_by_city(geogLevelCode) {
        return {
            "db_name": dbName,
            "entity": "SMGeographicMaster",
            "filter": `SMGeographicMaster.activestatus==true && lower(document(SMGeographicMaster.geogLevelType).display)=='pincode' && lower(document(SMGeographicMaster.parentGeogLevelCode).geogLevelCode)==lower('${geogLevelCode}')`,
            "return_fields": "{_id:SMGeographicMaster._id, id:SMGeographicMaster.id, geogLevelType:document(SMGeographicMaster.geogLevelType), geogLevelCode:SMGeographicMaster.geogLevelCode, geogLevelName:SMGeographicMaster.geogLevelName, parentGeogLevelType:document(SMGeographicMaster.parentGeogLevelType), parentGeogLevelCode:document(SMGeographicMaster.parentGeogLevelCode), active: SMGeographicMaster.activestatus,_key:SMGeographicMaster._key}"
        }
    },

    state_by_country_() {
        return {
            "db_name": dbName,
            "entity": "SMGeographicMaster",
            "filter": `SMGeographicMaster.activestatus==true && lower(document(SMGeographicMaster.geogLevelType).display)=='state'`,
            "return_fields": "{_id:SMGeographicMaster._id, id:SMGeographicMaster.id, geogLevelType:document(SMGeographicMaster.geogLevelType), geogLevelCode:SMGeographicMaster.geogLevelCode, geogLevelName:SMGeographicMaster.geogLevelName, parentGeogLevelType:document(SMGeographicMaster.parentGeogLevelType), parentGeogLevelCode:document(SMGeographicMaster.parentGeogLevelCode), active: SMGeographicMaster.activestatus,_key:SMGeographicMaster._key}"
        }
    },
    district_by_state_() {
        return {
            "db_name": dbName,
            "entity": "SMGeographicMaster",
            "filter": `SMGeographicMaster.activestatus==true && lower(document(SMGeographicMaster.geogLevelType).display)=='district'`,
            "return_fields": "{_id:SMGeographicMaster._id, id:SMGeographicMaster.id, geogLevelType:document(SMGeographicMaster.geogLevelType), geogLevelCode:SMGeographicMaster.geogLevelCode, geogLevelName:SMGeographicMaster.geogLevelName, parentGeogLevelType:document(SMGeographicMaster.parentGeogLevelType), parentGeogLevelCode:document(SMGeographicMaster.parentGeogLevelCode), active: SMGeographicMaster.activestatus,_key:SMGeographicMaster._key}"
        }
    },
    city_by_district_() {
        return {
            "db_name": dbName,
            "entity": "SMGeographicMaster",
            "filter": `SMGeographicMaster.activestatus==true && lower(document(SMGeographicMaster.geogLevelType).display)=='city'`,
            "return_fields": "{_id:SMGeographicMaster._id, id:SMGeographicMaster.id, geogLevelType:document(SMGeographicMaster.geogLevelType), geogLevelCode:SMGeographicMaster.geogLevelCode, geogLevelName:SMGeographicMaster.geogLevelName, parentGeogLevelType:document(SMGeographicMaster.parentGeogLevelType), parentGeogLevelCode:document(SMGeographicMaster.parentGeogLevelCode), active: SMGeographicMaster.activestatus,_key:SMGeographicMaster._key}"
        }
    },
    pincode_by_city_() {
        return {
            "db_name": dbName,
            "entity": "SMGeographicMaster",
            "filter": `SMGeographicMaster.activestatus==true && lower(document(SMGeographicMaster.geogLevelType).display)=='pincode'`,
            "return_fields": "{_id:SMGeographicMaster._id, id:SMGeographicMaster.id, geogLevelType:document(SMGeographicMaster.geogLevelType), geogLevelCode:SMGeographicMaster.geogLevelCode, geogLevelName:SMGeographicMaster.geogLevelName, parentGeogLevelType:document(SMGeographicMaster.parentGeogLevelType), parentGeogLevelCode:document(SMGeographicMaster.parentGeogLevelCode), active: SMGeographicMaster.activestatus,_key:SMGeographicMaster._key}"
        }
    }
}