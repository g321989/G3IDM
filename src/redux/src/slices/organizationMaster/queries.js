// import { dbName } from "../../qdm_query_ids";
import { dbName , ENTERPRICEID ,ORGANIZATIONID , FACILITYID } from "../../settings";

export const queries = {
	getTreeStuct: ({ client_id }) => {
		return {
			db_name: dbName,
			entity: "Organization",
			// filter: "'CodingMaster/11898' IN Organization.OrgType",
			filter: `Organization.ParentOrgID ==[] && Organization.activestatus==true && Organization.client_id == "${client_id}"`,
			// return_fields: "MERGE(Organization,{Organization:(FOR org IN Organization  FILTER Organization.id IN org.ParentOrgID AND 'CodingMaster/11899' IN org.OrgType   RETURN MERGE(org,{facility:(FOR fac IN Organization FILTER 'CodingMaster/11058' IN fac.OrgType AND org.id IN fac.ParentOrgID RETURN fac)}) )})",
			return_fields: "MERGE(Organization,{Organization:(FOR org IN Organization  FILTER Organization._id IN org.ParentOrgID  RETURN MERGE(org,{facility:(FOR fac IN Organization FILTER org._id IN fac.ParentOrgID RETURN fac)}) )})",
		};
	},
	entityType: () => {
		return {
			db_name: dbName,
			entity: "CodeableConceptMaster",
			sort: "document(CodeableConceptMaster.coding[0]).display",
			filter:
				"CodeableConceptMaster.Type=='ORGTYPE' AND CodeableConceptMaster.activestatus==true",
			return_fields:
				"MERGE(CodeableConceptMaster,{coding:(FOR cod IN TO_ARRAY(CodeableConceptMaster.coding) RETURN DOCUMENT(cod))})",
		};
	},
	getParentEntity: (type, client_id) => {
		return {
			db_name: dbName,
			entity: "Organization",
			sort: "Organization.name",
			filter: `${type ? `'${type}' IN Organization.OrgType AND` : ''} ${client_id ? ` Organization.client_id=='${client_id}' AND` : ""} Organization.activestatus==true AND Organization.active==true`,
			return_fields:
				"{_id:Organization._id,_key:Organization._key,id:Organization.id,name:Organization.name,alias:Organization.alias}",
		};
	},
	getLevelOfCare: () => {
		return {
			db_name: dbName,
			entity: "LevelOfCare",
			sort: "LevelOfCare.description",
			filter: "LevelOfCare.active==true && LevelOfCare.activestatus==true",
			return_fields: "{id:LevelOfCare.id,_id:LevelOfCare._id,levelofcareCode:LevelOfCare.levelofcareCode,description:LevelOfCare.description,careType:document(LevelOfCare.careType),active:LevelOfCare.active}"
		};
	},
	orgUseIdenifi: () => {
		return {
			db_name: dbName,
			entity: "CodeableConceptMaster",
			sort: "document(CodeableConceptMaster.coding[0]).display",
			filter:
				"CodeableConceptMaster.Type=='USE' AND CodeableConceptMaster.activestatus==true",
			return_fields:
				"MERGE(CodeableConceptMaster,{coding:(FOR cod IN TO_ARRAY(CodeableConceptMaster.coding) RETURN DOCUMENT(cod))})",
		};
	},
	orgIdTypeIdenifi: () => {
		return {
			db_name: dbName,
			entity: "CodeableConceptMaster",
			sort: "document(CodeableConceptMaster.coding[0]).display",
			filter:
				"CodeableConceptMaster.Type=='ORGIDENTIFICATIONTYPE' AND CodeableConceptMaster.activestatus==true",
			return_fields:
				"MERGE(CodeableConceptMaster,{coding:(FOR cod IN TO_ARRAY(CodeableConceptMaster.coding) RETURN DOCUMENT(cod))})",
		};
	},
	aliastype: () => {
		return {
			db_name: dbName,
			entity: "CodeableConceptMaster",
			sort: "document(CodeableConceptMaster.coding[0]).display",
			filter:
				"CodeableConceptMaster.Type=='ACCOUNTENTITYType' AND CodeableConceptMaster.activestatus==true",
			return_fields:
				"MERGE(CodeableConceptMaster,{coding:(FOR cod IN TO_ARRAY(CodeableConceptMaster.coding) RETURN DOCUMENT(cod))})",
		};
	},
	//ORGANIZATION TREE DETAILS
	getTreeDetails: (_key, client_id) => {
		return {
			db_name: dbName,
			entity: "Organization",
			filter: `Organization._key=='${_key}' AND Organization.activestatus==true AND Organization.client_id=='${client_id}'`,
			// filter: `Organization._key=='10044' AND Organization.activestatus==true`,
			return_fields: `MERGE(Organization, {identifier:(FOR iden IN TO_ARRAY(Organization.identifier) RETURN MERGE(DOCUMENT(iden), {user:DOCUMENT(DOCUMENT(iden).user),period:(FOR per IN TO_ARRAY(DOCUMENT(iden).period) RETURN DOCUMENT(per) ),Type:DOCUMENT(DOCUMENT(iden).Type)})) , address:(FOR add IN TO_ARRAY(Organization.address) RETURN MERGE(DOCUMENT(add),{Type:DOCUMENT(DOCUMENT(add).Type),use:DOCUMENT(DOCUMENT(add).use),city:DOCUMENT(add).city,country:DOCUMENT(add).country,district:DOCUMENT(add).district,state:DOCUMENT(add).state,postalCode:DOCUMENT(add).postalCode})) ,alias:(FOR alias IN TO_ARRAY(Organization.alias) RETURN MERGE(alias,{aliasType:DOCUMENT(alias.aliasType) ,aliasCode:DOCUMENT(alias.aliasCode) })) ,levelofcareid:DOCUMENT(Organization.levelofcareid) ,logo:(FOR attc IN TO_ARRAY(Organization.logo) RETURN DOCUMENT(attc)) ,telecom:(FOR tel IN TO_ARRAY(Organization.telecom) RETURN MERGE(DOCUMENT(tel),{system:DOCUMENT(DOCUMENT(tel).system),use:DOCUMENT(DOCUMENT(tel).use),rank:DOCUMENT(DOCUMENT(tel).rank) ,valueprefix:DOCUMENT(DOCUMENT(tel).valueprefix)})) , contact:(FOR cnt IN TO_ARRAY(Organization.contact) RETURN MERGE(cnt,{telecom:(FOR tel IN TO_ARRAY(cnt.telecom) RETURN MERGE(DOCUMENT(tel),{use:DOCUMENT(DOCUMENT(tel).use),system:DOCUMENT(DOCUMENT(tel).system),rank:DOCUMENT(DOCUMENT(tel).rank),valueprefix:DOCUMENT(DOCUMENT(tel).valueprefix) })),name:(FOR nm IN TO_ARRAY(cnt.name) RETURN MERGE(DOCUMENT(nm),{use:DOCUMENT(DOCUMENT(nm).use),prefix:DOCUMENT(DOCUMENT(nm).prefix),suffix:DOCUMENT(DOCUMENT(nm).suffix)})),designation:DOCUMENT(cnt.designation)}) ),OrgType:(FOR org IN TO_ARRAY(Organization.OrgType) RETURN DOCUMENT(org)),specialtyDetails:(FOR spec IN TO_ARRAY(Organization.specialtyDetails) RETURN MERGE(spec,{specialty:document(spec.specialty)})) })`

		};
	},
	//GET PARENT ORG NAME BY ID
	getParentOrgNameById: (_key) => {
		return {
			db_name: dbName,
			entity: "Organization",
			filter: `Organization._id == '${_key}'`,
			return_fields:
				"{_id:Organization._id,_key:Organization._key,id:Organization.id,name:Organization.name,parentorgid:Organization.ParentOrgID}",
		};
	},
	//UPSERT STATUS
	upsertSatus: (key, status) => {
		return [
			{
				db_name: dbName,
				entity: "Organization",
				is_metadata: true,
				metadataId: "ead11a7e-4a14-4e39-a964-0ca060a073c5",
				filter: {
					_key: `${key}`,
				},
				doc: {
					active: status,
				},
			},
		];
	},
	orgAddType: () => {
		return {
			db_name: dbName,
			entity: "CodeableConceptMaster",
			sort: "document(CodeableConceptMaster.coding[0]).display",
			filter: "CodeableConceptMaster.Type=='ADDRESSTYPE'",
			return_fields:
				"MERGE(CodeableConceptMaster,{coding:(FOR cod IN CodeableConceptMaster.coding RETURN DOCUMENT(cod))})",
		};
	},
	orgAddUSE: () => {
		return {
			db_name: dbName,
			entity: "CodeableConceptMaster",
			sort: "document(CodeableConceptMaster.coding[0]).display",
			filter: "CodeableConceptMaster.Type=='ADDRESSUSE'",
			return_fields:
				"MERGE(CodeableConceptMaster,{coding:(FOR cod IN CodeableConceptMaster.coding RETURN DOCUMENT(cod))})",
		};
	},
	orgAddCity: () => {
		return {
			db_name: dbName,
			entity: "SMGeographicMaster",
			sort: "SMGeographicMaster.geogLevelName",
			filter:
				"Lower(DOCUMENT(SMGeographicMaster.geogLevelType).display)=='city' && SMGeographicMaster.activestatus == true",
			return_fields:
				"{_id:SMGeographicMaster._id,id:SMGeographicMaster.id,geogLevelName:SMGeographicMaster.geogLevelName,parentGeogLevelType:SMGeographicMaster.parentGeogLevelType,parentGeogLevelCode:SMGeographicMaster.parentGeogLevelCode,geogLevelCode:SMGeographicMaster.geogLevelCode}",
		};
	},
	orgAddDISTRICT: (val) => {
		return {
			db_name: dbName,
			entity: "SMGeographicMaster",
			sort: "SMGeographicMaster.geogLevelName",
			filter: `Lower(DOCUMENT(SMGeographicMaster.geogLevelType).display)=='district' && SMGeographicMaster._id=='${val}' && SMGeographicMaster.activestatus == true`,
			return_fields:
				"{_id:SMGeographicMaster._id,id:SMGeographicMaster.id,geogLevelName:SMGeographicMaster.geogLevelName,parentGeogLevelType:SMGeographicMaster.parentGeogLevelType,parentGeogLevelCode:SMGeographicMaster.parentGeogLevelCode}",
		};
	},
	orgAddSTATE: (val) => {
		return {
			db_name: dbName,
			entity: "SMGeographicMaster",
			sort: "SMGeographicMaster.geogLevelName",
			filter: `Lower(DOCUMENT(SMGeographicMaster.geogLevelType).display)=='state' && SMGeographicMaster._id=='${val}' && SMGeographicMaster.activestatus == true`,
			return_fields:
				"{_id:SMGeographicMaster._id,id:SMGeographicMaster.id,geogLevelName:SMGeographicMaster.geogLevelName,parentGeogLevelType:SMGeographicMaster.parentGeogLevelType,parentGeogLevelCode:SMGeographicMaster.parentGeogLevelCode}",
		};
	},
	orgAddCOUNTRY: (val) => {

		return {
			db_name: dbName,
			entity: "SMGeographicMaster",
			sort: "SMGeographicMaster.geogLevelName",
			filter: `Lower(DOCUMENT(SMGeographicMaster.geogLevelType).display)=='country' && SMGeographicMaster._id=='${val}' && SMGeographicMaster.activestatus == true`,
			return_fields:
				"{_id:SMGeographicMaster._id,id:SMGeographicMaster.id,geogLevelName:SMGeographicMaster.geogLevelName,parentGeogLevelType:SMGeographicMaster.parentGeogLevelType,parentGeogLevelCode:SMGeographicMaster.parentGeogLevelCode}",
		};
	},
	orgAddPINCODE: (val) => {
		return {
			db_name: dbName,
			entity: "SMGeographicMaster",
			sort: "SMGeographicMaster.geogLevelName",
			filter: `Lower(DOCUMENT(SMGeographicMaster.geogLevelType).display)=='pincode' && SMGeographicMaster.parentGeogLevelCode=='${val}' && SMGeographicMaster.activestatus == true`,
			return_fields:
				"{_id:SMGeographicMaster._id,id:SMGeographicMaster.id,geogLevelName:SMGeographicMaster.geogLevelName,parentGeogLevelType:SMGeographicMaster.parentGeogLevelType,parentGeogLevelCode:SMGeographicMaster.parentGeogLevelCode}",
		};
	},
	orgContactDetailMode: () => {
		return {
			db_name: dbName,
			entity: "CodeableConceptMaster",
			sort: "document(CodeableConceptMaster.coding[0]).display",
			filter: "CodeableConceptMaster.Type=='CONTACTSYSTEM'",
			return_fields:
				"MERGE(CodeableConceptMaster,{coding:(FOR cod IN CodeableConceptMaster.coding RETURN DOCUMENT(cod))})",
		};
	},
	orgContactDetailCode: () => {
		return {
			db_name: dbName,
			entity: "SMGeographicMaster",
			sort: "SMGeographicMaster.geogLevelName",
			filter:
				"Lower(DOCUMENT(SMGeographicMaster.geogLevelType).display)=='country' && SMGeographicMaster.activestatus == true",
			return_fields:
				"{_id:SMGeographicMaster._id,id:SMGeographicMaster.id,geogLevelName:SMGeographicMaster.geogLevelName,parentGeogLevelType:SMGeographicMaster.parentGeogLevelType,parentGeogLevelCode:SMGeographicMaster.parentGeogLevelCode,GeoLocationISDCode:SMGeographicMaster.GeoLocationISDCode}",
		};
	},
	orgContactDetailUse: () => {
		return {
			db_name: dbName,
			entity: "CodeableConceptMaster",
			sort: "document(CodeableConceptMaster.coding[0]).display",
			filter: "CodeableConceptMaster.Type=='USE'",
			return_fields:
				"MERGE(CodeableConceptMaster,{coding:(FOR cod IN CodeableConceptMaster.coding RETURN DOCUMENT(cod))})",
		};
	},
	orgContactDetailPriority: () => {
		return {
			db_name: dbName,
			entity: "CodeableConceptMaster",
			sort: "document(CodeableConceptMaster.coding[0]).display",
			filter: "CodeableConceptMaster.Type=='PRIORITY'",
			return_fields:
				"MERGE(CodeableConceptMaster,{coding:(FOR cod IN CodeableConceptMaster.coding RETURN DOCUMENT(cod))})",
		};
	},
	orgNamePrefix: () => {
		return {
			db_name: dbName,
			entity: "CodeableConceptMaster",
			sort: "document(CodeableConceptMaster.coding[0]).display",
			filter:
				"CodeableConceptMaster.Type=='NAMEPREFIX' AND CodeableConceptMaster.activestatus==true",
			return_fields:
				"MERGE(CodeableConceptMaster,{coding:(FOR cod IN TO_ARRAY(CodeableConceptMaster.coding) RETURN DOCUMENT(cod))})",
		};
	},
	orgNameSuffix: () => {
		return {
			db_name: dbName,
			entity: "CodeableConceptMaster",
			sort: "document(CodeableConceptMaster.coding[0]).display",
			filter:
				"CodeableConceptMaster.Type=='NAMESUFFIX' AND CodeableConceptMaster.activestatus==true",
			return_fields:
				"MERGE(CodeableConceptMaster,{coding:(FOR cod IN TO_ARRAY(CodeableConceptMaster.coding) RETURN DOCUMENT(cod))})",
		};
	},
	positionDesi: () => {
		return {
			db_name: dbName,
			entity: "CodeableConceptMaster",
			sort: "document(CodeableConceptMaster.coding[0]).display",
			filter: "CodeableConceptMaster.Type=='DESIGNATION' && CodeableConceptMaster.activestatus==true",
			return_fields: "MERGE(CodeableConceptMaster,{coding:(FOR cod IN CodeableConceptMaster.coding RETURN DOCUMENT(cod))})"
		};
	},
	SpecialtyDrop: () => {
		return {
			db_name: dbName,
			entity: "CodeableConceptMaster",
			sort: "document(CodeableConceptMaster.coding[0]).display",
			filter: "CodeableConceptMaster.Type=='SPECIALTY' && CodeableConceptMaster.activestatus==true",
			return_fields: "MERGE(CodeableConceptMaster,{coding:(FOR cod IN CodeableConceptMaster.coding RETURN DOCUMENT(cod))})"
		};
	},
	UserRoles: (organization_id) => {
		return `
		for user_role in user_roles
		filter user_role.organization_id == "${organization_id}" and user_role.is_active == true
		let roleDetail = first(
			for role in roles
				filter role.is_active == true and role._id == user_role._from
				return role
		)
		return {user_role, roleDetail}
			`
	},

	getParentClient:(client_id) => {
		return {
			db_name: dbName,
			entity:"IDM_Repository",
			filter:`IDM_Repository.unique_id == '${client_id}'`,
			return_fields:"IDM_Repository"
		}

	},
	getChildRep:(repid) => {
		return {
			db_name: dbName,
			entity:"IDM_Repository",
			filter:`IDM_Repository.parent_rep == '${repid}'`,
			return_fields:"IDM_Repository"
		}

	},

	idm_repo_upsert:(data) =>{
		return [
			{
				db_name: dbName,
				entity: "IDM_Repository",
				is_metadata: true,
				metadataId: "feecaa8b-8daa-4737-867a-323622ad102d",
				metadata_dbname: "ATP_Metadata_Dev",
				doc:data,
			},
		];

	},
	idm_repo_editstatus:(name , key) => {
		return [
			{
				db_name: dbName,
				entity: "IDM_Repository",
				is_metadata: true,
				metadataId: "feecaa8b-8daa-4737-867a-323622ad102d",
				metadata_dbname: "ATP_Metadata_Dev",
				filter: {
					_key: `${key}`,
				},
				doc:{
					rep_name: name
				},
			},
		];
	},
	getRoleDetails: (roleid) => {
		return {
		  db_name: dbName,
		  "entity": "IDM_PermissionRoleMapping",
		  "filter": `IDM_PermissionRoleMapping.roleid =="${roleid}"`,
		  "return_fields": "IDM_PermissionRoleMapping.rolename"
	
		}
	  },

	  getEnterprice:() => {
		return {
			db_name: dbName,
			"entity": "Organization",
			"filter": `Organization.OrgType[0] =="${FACILITYID}" && Organization.activestatus == true `,
			"return_fields": "Organization"
	  
		  }

	  },
	  getEnterpriceByClient:(clientid) => {
		return {
			db_name: dbName,
			"entity": "Organization",
			"filter": `Organization.OrgType[0] =="${FACILITYID}" && Organization.client_id == "${clientid}" && Organization.activestatus == true `,
			"return_fields": "Organization"	  
		  }
	  },

	  getOrganizationById :(parentrepid) =>{

		return {
			db_name: dbName,
			"entity": "Organization",
			"filter": `Organization.OrgType[0] =="${ORGANIZATIONID}" && Organization.ParentOrgID[0] == "${parentrepid}" && Organization.activestatus == true `,
			"return_fields": "Organization"	  
		  }
	  },

	  getFacilityById :(parentrepid) => {
		return {
			db_name: dbName,
			"entity": "Organization",
			"filter": `Organization.OrgType[0] =="${FACILITYID}" && Organization.ParentOrgID[0] == "${parentrepid}" && Organization.activestatus == true `,
			"return_fields": "Organization"	  
		  }
	  },
	  getClientData:(tenentid) => {
		return {
			db_name: dbName,
			"entity": "client",
			"filter": `client.tenantid =="${tenentid}" && client.activestatus == true `,
			"return_fields": "client"	  
		  }

	  }
};
 