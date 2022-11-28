import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
	defaultReject,
	defaultState,
	__readDocumentUrl__,
	__uspsertUrl__,
	__baseUrl__ as __basePath,
	__options,
	upsertQuery,
	UPSERTREPO
	// __deleteUrl__,
	// __update__,
} from "../../settings";
import { fetchData } from "../../helpers";
import { queries } from "./queries";
import { v4 as uuidv4 } from "uuid";
import { ReadTreeJson } from "./orgReadTree";
import { ReadTreeDetailJson } from "./orgReadDetail";
import { generateJson, generateReadJson } from "./genJson";

const ORGANIZATION_TREE_READ = createAsyncThunk(
	`organizationSlice/organizationTreeList`,
	async (payload = {}, { rejectWithValue }) => {
		try {
			let { client_id } = payload;
			const data = await fetchData(
				{ body: JSON.stringify(queries.getTreeStuct({ client_id })) },
				__readDocumentUrl__
			);
			const getJson = ReadTreeJson(data.result);
			return {
				...defaultState.List,
				data: getJson,
			};
		} catch (error) {
			return rejectWithValue({
				...defaultReject,
				message: error.message,
			});
		}
	}
);

const ORGANIZATION_ENTITY_TYPE = createAsyncThunk(
	`organizationSlice/organizationEntityType`,
	async (payload = {}, { rejectWithValue }) => {
		try {
			let { type } = payload;
			const data = await fetchData(
				{ body: JSON.stringify(queries.entityType()) },
				__readDocumentUrl__
			);
			let result = [];
			data.result.map((val, i) => {
				if (val?.coding[0]?.display && val?.coding[0]?._id) {
					result.push({
						label: val?.coding[0]?.display,
						value: val?.coding[0]._id,
					});
				}
			});
			return {
				...defaultState.List,
				data: result,
			};
		} catch (error) {
			return rejectWithValue({
				...defaultReject,
				message: error.message,
			});
		}
	}
);

const ORGANIZATION_GET_PARENT_ENTITY = createAsyncThunk(
	`organizationSlice/orgParEntity`,
	async (payload = {}, { rejectWithValue }) => {
		try {
			let { type, client_id } = payload;
			const data = await fetchData(
				{ body: JSON.stringify(queries.getParentEntity(type, client_id)) },
				__readDocumentUrl__
			);
			let result = [];
			data.result.map((val, i) => {
				if (val?.name && val?._id) {
					result.push({
						label: val?.name,
						value: val?._id,
						_key: val?._key,
					});
				}
			});
			return {
				...defaultState.List,
				data: result,
			};
		} catch (error) {
			return rejectWithValue({
				...defaultReject,
				message: error.message,
			});
		}
	}
);

const ORGANIZATION_GET_LEVEL_CARE = createAsyncThunk(
	`organizationSlice/orgLevelCare`,
	async (payload = {}, { rejectWithValue }) => {
		try {
			let { type } = payload;
			const data = await fetchData(
				{ body: JSON.stringify(queries.getLevelOfCare()) },
				__readDocumentUrl__
			);
			let result = [];
			data.result.map((val, i) => {
				if (val?._id) {
					result.push({
						label: val?.description,
						value: val?._id,
					});
				}
			});
			return {
				...defaultState.List,
				data: result,
			};
		} catch (error) {
			return rejectWithValue({
				...defaultReject,
				message: error.message,
			});
		}
	}
);

const ORGANIZATION_GET_USE_IDENTIFICATION = createAsyncThunk(
	`organizationSlice/orgUseIdenifi`,
	async (payload = {}, { rejectWithValue }) => {
		try {
			let { type } = payload;
			const data = await fetchData(
				{ body: JSON.stringify(queries.orgUseIdenifi()) },
				__readDocumentUrl__
			);
			let result = [];
			data.result.map((val, i) => {
				if (val?.coding[0]?.display && val?.coding[0]?._id) {
					result.push({
						label: val?.coding[0]?.display,
						value: val?.coding[0]._id,
					});
				}
			});
			return {
				...defaultState.List,
				data: result,
			};
		} catch (error) {
			return rejectWithValue({
				...defaultReject,
				message: error.message,
			});
		}
	}
);

const ORGANIZATION_GET_IDTYPE_IDENTIF = createAsyncThunk(
	`organizationSlice/orgIdTypeIdenifi`,
	async (payload = {}, { rejectWithValue }) => {
		try {
			let { type } = payload;
			const data = await fetchData(
				{ body: JSON.stringify(queries.orgIdTypeIdenifi()) },
				__readDocumentUrl__
			);
			let result = [];
			data.result.map((val, i) => {
				if (val?.coding[0]?.display && val?.coding[0]?._id) {
					result.push({
						label: val?.coding[0]?.display,
						value: val?.coding[0]._id,
					});
				}
			});
			return {
				...defaultState.List,
				data: result,
			};
		} catch (error) {
			return rejectWithValue({
				...defaultReject,
				message: error.message,
			});
		}
	}
);

const ORGANIZATION_GET_ALIAS_TYPE = createAsyncThunk(
	`organizationSlice/aliastype`,
	async (payload = {}, { rejectWithValue }) => {
		try {
			let { type } = payload;
			const data = await fetchData(
				{ body: JSON.stringify(queries.aliastype()) },
				__readDocumentUrl__
			);
			let result = [];
			data.result.map((val, i) => {
				if (val?.coding[0]?.display && val?.coding[0]?._id) {
					result.push({
						label: val?.coding[0]?.display,
						value: val?.coding[0]._id,
					});
				}
			});
			return {
				...defaultState.List,
				data: result,
			};
		} catch (error) {
			return rejectWithValue({
				...defaultReject,
				message: error.message,
			});
		}
	}
);

const ORGANIZATION_READ_STATUS_UPSERT = createAsyncThunk(
	`organizationSlice/organizationReadStatusUpsert`,
	async (payload = {}, { rejectWithValue }) => {
		try {
			let { _key, status } = payload;
			const data = await fetchData(
				{ body: JSON.stringify(queries.upsertSatus(_key, status)) },
				__uspsertUrl__
			);
			let da = data?.code;

			return {
				...defaultState.List,
				data: data,
			};
		} catch (error) {
			return rejectWithValue({
				...defaultReject,
				message: error.message,
			});
		}
	}
);

const ORGANIZATION_READ_DETAILS = createAsyncThunk(
	`organizationSlice/organizationReadDetails`,
	async (payload = {}, { rejectWithValue }) => {
		try {
			let { _key, client_id } = payload;
			const data = await fetchData(
				{ body: JSON.stringify(queries.getTreeDetails(_key, client_id)) },
				__readDocumentUrl__
			);
			let parentOrgId = data?.result?.[0]?.ParentOrgID?.[0];

			let organization_id = data?.result?.[0]?._key;


			let parentOrgName = 0;
			if (parentOrgId) {
				parentOrgName = await fetchData(
					{ body: JSON.stringify(queries.getParentOrgNameById(parentOrgId)) },
					__readDocumentUrl__
				);
			}
			const getJson = ReadTreeDetailJson(
				data.result?.[0],
				parentOrgName = {
					label: parentOrgName.result?.[0]?.name ?? '',
					value: parentOrgId,
				},

			);

			return {
				...defaultState.List,
				data: getJson,
			};
		} catch (error) {
			return rejectWithValue({
				...defaultReject,
				message: error.message,
			});
		}
	}
);

const ORGANIZATION_GET_ADD_TYPE = createAsyncThunk(
	`organizationSlice/orgAddType`,
	async (payload = {}, { rejectWithValue }) => {
		try {
			let { type } = payload;
			const data = await fetchData(
				{ body: JSON.stringify(queries.orgAddType()) },
				__readDocumentUrl__
			);
			let result = [];
			data.result.map((val, i) => {
				if (val?.coding[0]?.display && val?.coding[0]?._id) {
					result.push({
						label: val?.coding[0]?.display,
						value: val?.coding[0]._id,
					});
				}
			});
			return {
				...defaultState.List,
				data: result,
			};
		} catch (error) {
			return rejectWithValue({
				...defaultReject,
				message: error.message,
			});
		}
	}
);

const ORGANIZATION_GET_ADD_USE = createAsyncThunk(
	`organizationSlice/orgAddUSE`,
	async (payload = {}, { rejectWithValue }) => {
		try {
			let { type } = payload;
			const data = await fetchData(
				{ body: JSON.stringify(queries.orgAddUSE()) },
				__readDocumentUrl__
			);
			let result = [];
			data.result.map((val, i) => {
				if (val?.coding[0]?.display && val?.coding[0]?._id) {
					result.push({
						label: val?.coding[0]?.display,
						value: val?.coding[0]._id,
					});
				}
			});
			return {
				...defaultState.List,
				data: result,
			};
		} catch (error) {
			return rejectWithValue({
				...defaultReject,
				message: error.message,
			});
		}
	}
);

const ORGANIZATION_GET_ADD_City = createAsyncThunk(
	`organizationSlice/orgAddCity`,
	async (payload = {}, { rejectWithValue }) => {
		try {
			let { type } = payload;
			const data = await fetchData(
				{ body: JSON.stringify(queries.orgAddCity()) },
				__readDocumentUrl__
			);
			let result = [];
			data.result.map((val, i) => {
				if (val?.parentGeogLevelCode && val?.geogLevelName) {
					result.push({
						id: val?.parentGeogLevelCode,
						title: val?.geogLevelName,
						value: val._id,
						code: val?.geogLevelCode,
					});
				}
			});
			return {
				...defaultState.List,
				data: result,
			};
		} catch (error) {
			return rejectWithValue({
				...defaultReject,
				message: error.message,
			});
		}
	}
);

const ORGANIZATION_GET_ADD_DISTRICT = createAsyncThunk(
	`organizationSlice/orgAddDISTRICT`,
	async (payload = {}, { rejectWithValue }) => {
		try {
			let { val } = payload;

			const data = await fetchData(
				{ body: JSON.stringify(queries.orgAddDISTRICT(val)) },
				__readDocumentUrl__
			);
			let result = [];
			data.result.map((val, i) => {
				if (val?.parentGeogLevelCode && val?.geogLevelName) {
					result.push({
						id: val?.parentGeogLevelCode,
						title: val?.geogLevelName,
						value: val._id,
					});
				}
			});
			return {
				...defaultState.List,
				data: result,
			};
		} catch (error) {
			return rejectWithValue({
				...defaultReject,
				message: error.message,
			});
		}
	}
);

const ORGANIZATION_GET_AddSTATE = createAsyncThunk(
	`organizationSlice/orgAddSTATE`,
	async (payload = {}, { rejectWithValue }) => {
		try {
			let { val } = payload;
			const data = await fetchData(
				{ body: JSON.stringify(queries.orgAddSTATE(val)) },
				__readDocumentUrl__
			);
			let result = [];
			data.result.map((val, i) => {
				if (val?.parentGeogLevelCode && val?.geogLevelName) {
					result.push({
						id: val?.parentGeogLevelCode,
						title: val?.geogLevelName,
						value: val._id,
					});
				}
			});
			return {
				...defaultState.List,
				data: result,
			};
		} catch (error) {
			return rejectWithValue({
				...defaultReject,
				message: error.message,
			});
		}
	}
);

const ORGANIZATION_GET_COUNTRY = createAsyncThunk(
	`organizationSlice/orgAddCOUNTRY`,
	async (payload = {}, { rejectWithValue }) => {
		try {
			let { val } = payload;

			const data = await fetchData(
				{ body: JSON.stringify(queries.orgAddCOUNTRY(val)) },
				__readDocumentUrl__
			);
			let result = [];
			data.result.map((val, i) => {
				if (val?.geogLevelName) {
					result.push({
						id: val?.parentGeogLevelCode,
						title: val?.geogLevelName,
						value: val._id,
					});
				}
			});
			return {
				...defaultState.List,
				data: result,
			};
		} catch (error) {
			return rejectWithValue({
				...defaultReject,
				message: error.message,
			});
		}
	}
);

const ORGANIZATION_GET_PINCODE = createAsyncThunk(
	`organizationSlice/orgAddPINCODE`,
	async (payload = {}, { rejectWithValue }) => {
		try {
			let { val } = payload;
			const data = await fetchData(
				{ body: JSON.stringify(queries.orgAddPINCODE(val)) },
				__readDocumentUrl__
			);
			let result = [];
			data.result.map((val, i) => {
				if (val?.parentGeogLevelCode && val?.geogLevelName) {
					result.push({
						id: val?.parentGeogLevelCode,
						title: val?.geogLevelName,
						value: val._id,
					});
				}
			});
			return {
				...defaultState.List,
				data: result,
			};
		} catch (error) {
			return rejectWithValue({
				...defaultReject,
				message: error.message,
			});
		}
	}
);

const ORGANIZATION_GET_CONTACTDETAILMODE = createAsyncThunk(
	`organizationSlice/orgContactDetailMode`,
	async (payload = {}, { rejectWithValue }) => {
		try {
			let { type } = payload;
			const data = await fetchData(
				{ body: JSON.stringify(queries.orgContactDetailMode()) },
				__readDocumentUrl__
			);
			let result = [];
			data.result.map((val, i) => {
				if (val?.coding[0]?.display && val?.coding[0]?._id) {
					result.push({
						label: val?.coding[0]?.display,
						value: val?.coding[0]._id,
					});
				}
			});
			return {
				...defaultState.List,
				data: result,
			};
		} catch (error) {
			return rejectWithValue({
				...defaultReject,
				message: error.message,
			});
		}
	}
);

const ORGANIZATION_GET_CONNTACTDETAILCODE = createAsyncThunk(
	`organizationSlice/orgContactDetailCode`,
	async (payload = {}, { rejectWithValue }) => {
		try {
			let { val } = payload;
			const data = await fetchData(
				{ body: JSON.stringify(queries.orgContactDetailCode(val)) },
				__readDocumentUrl__
			);
			let result = [];
			data.result.map((val, i) => {
				if (val?.GeoLocationISDCode && val?._id) {
					result.push({
						title: val?.GeoLocationISDCode,
						value: val?._id,
					});
				}
			});
			return {
				...defaultState.List,
				data: result,
			};
		} catch (error) {
			return rejectWithValue({
				...defaultReject,
				message: error.message,
			});
		}
	}
);

const ORGANIZATION_GET_CONTACTDETAILUSE = createAsyncThunk(
	`organizationSlice/orgContactDetailUse`,
	async (payload = {}, { rejectWithValue }) => {
		try {
			let { type } = payload;
			const data = await fetchData(
				{ body: JSON.stringify(queries.orgContactDetailUse()) },
				__readDocumentUrl__
			);
			let result = [];
			data.result.map((val, i) => {
				if (val?.coding[0]?.display && val?.coding[0]?._id) {
					result.push({
						label: val?.coding[0]?.display,
						value: val?.coding[0]._id,
					});
				}
			});
			return {
				...defaultState.List,
				data: result,
			};
		} catch (error) {
			return rejectWithValue({
				...defaultReject,
				message: error.message,
			});
		}
	}
);

const ORGANIZATION_GET_CONTACTDETAILPRIORITY = createAsyncThunk(
	`organizationSlice/0`,
	async (payload = {}, { rejectWithValue }) => {
		try {
			let { type } = payload;
			const data = await fetchData(
				{ body: JSON.stringify(queries.orgContactDetailPriority()) },
				__readDocumentUrl__
			);
			let result = [];
			data.result.map((val, i) => {
				if (val?.coding[0]?.display && val?.coding[0]?._id) {
					result.push({
						label: val?.coding[0]?.display,
						value: val?.coding[0]._id,
					});
				}
			});
			return {
				...defaultState.List,
				data: result,
			};
		} catch (error) {
			return rejectWithValue({
				...defaultReject,
				message: error.message,
			});
		}
	}
);

const ORGANIZATION_GET_CONTACT_PREFIX = createAsyncThunk(
	`organizationSlice/orgNamePrefix`,
	async (payload = {}, { rejectWithValue }) => {
		try {
			let { type } = payload;
			const data = await fetchData(
				{ body: JSON.stringify(queries.orgNamePrefix()) },
				__readDocumentUrl__
			);
			let result = [];
			data.result.map((val, i) => {
				if (val?.coding[0]?.display && val?.coding[0]?._id) {
					result.push({
						label: val?.coding[0]?.display,
						value: val?.coding[0]._id,
					});
				}
			});
			return {
				...defaultState.List,
				data: result,
			};
		} catch (error) {
			return rejectWithValue({
				...defaultReject,
				message: error.message,
			});
		}
	}
);

const ORGANIZATION_GET_CONTACT_SUFFIX = createAsyncThunk(
	`organizationSlice/orgNameSuffix`,
	async (payload = {}, { rejectWithValue }) => {
		try {
			let { type } = payload;
			const data = await fetchData(
				{ body: JSON.stringify(queries.orgNameSuffix()) },
				__readDocumentUrl__
			);
			let result = [];
			data.result.map((val, i) => {
				if (val?.coding[0]?.display && val?.coding[0]?._id) {
					result.push({
						label: val?.coding[0]?.display,
						value: val?.coding[0]._id,
					});
				}
			});
			return {
				...defaultState.List,
				data: result,
			};
		} catch (error) {
			return rejectWithValue({
				...defaultReject,
				message: error.message,
			});
		}
	}
);

const ORGANIZATION_GET_CONTACT_DESI = createAsyncThunk(
	`organizationSlice/positionDesi`,
	async (payload = {}, { rejectWithValue }) => {
		try {
			let { type } = payload;
			const data = await fetchData(
				{ body: JSON.stringify(queries.positionDesi()) },
				__readDocumentUrl__
			);
			let result = [];
			data.result.map((val, i) => {
				if (val?.coding?.[0]?.display) {
					result.push({
						label: val?.coding?.[0]?.display,
						value: val?.coding?.[0]?._id,
					});
				}
			});
			return {
				...defaultState.List,
				data: result,
			};
		} catch (error) {
			return rejectWithValue({
				...defaultReject,
				message: error.message,
			});
		}
	}
);

const giveMeSelectedLevel = (levels) => {
	let selectedLevel = null;
	for (let index = 12; index > 0; index--) {
		if (levels[`level${index}`]._key) {
			selectedLevel = levels[`level${index}`].parentLevel;
			break;
		}
	}
	return selectedLevel;
}

// const SET_ORGANIZATION = createAsyncThunk(
// 	`organizationSlice/setOrganization`,
// 	async (payload = {}, { rejectWithValue, getState }) => {
// 		try {
// 			let { state, key, clientPayload, tenantid } = payload;


// 			let queriesjson = generateJson.insert_json(state, key, null);

// 			/// creating facility ///
// 			const data = await fetchData(
// 				{ body: JSON.stringify(queriesjson) },
// 				__uspsertUrl__
// 			).catch((err) => {
// 				console.log(err);
// 				return rejectWithValue({
// 					...defaultReject,
// 					message: err.message,
// 				});
// 			});


// 			if (key) {

// 				const getRepo = await fetchData(

// 					{ body: JSON.stringify(queries.getParentClient(data?.Result[0]?.properties?.doc?._id)) },
// 					__readDocumentUrl__
// 				)

// 				let key = getRepo?.result[0]?._key;

// 				let rep_name = data?.Result[0]?.properties?.doc?.name;

// 				await fetchData(

// 					{ body: JSON.stringify(queries.idm_repo_editstatus(rep_name, key)) },
// 					UPSERTREPO
// 				)

// 			}


// 			else {
// 				const client_id = data?.Result[0]?.properties?.doc?.client_id;

// 				const idm_client = await fetchData(

// 					{ body: JSON.stringify(queries.getParentClient(client_id)) },
// 					__readDocumentUrl__
// 				).catch(err => {
// 					console.log(err);
// 					return rejectWithValue({
// 						...defaultReject,
// 						message: err.message,
// 					});
// 				})

// 				if (idm_client?.result?.length > 0) {
// 					let rep_id = idm_client?.result[0]?.rep_id;

// 					const childrep = await fetchData(
// 						{ body: JSON.stringify(queries.getChildRep(rep_id)) },
// 						__readDocumentUrl__
// 					)
// 					if (childrep?.result?.length > 0) {
// 						let parent_rep_id = "";
// 						const Arr = childrep?.result?.filter((li) => li.unique_id == idmmanagefacility);

// 						if (Arr.length > 0) {

// 							if (data?.Result[0]?.properties?.doc?.ParentOrgID?.length > 0) {

// 								const idm_Parent_Rep_ID = await fetchData(

// 									{ body: JSON.stringify(queries.getParentClient(data?.Result[0]?.properties?.doc?.ParentOrgID)) },
// 									__readDocumentUrl__
// 								)

// 								parent_rep_id = idm_Parent_Rep_ID?.result[0]?.rep_id
// 							}

// 							else {
// 								parent_rep_id = Arr[0].rep_id
// 							}

// 							const datassssvalue = {
// 								rep_id: uuidv4(),
// 								rep_type: "Manage Facility",
// 								rep_name: data?.Result[0]?.properties?.doc?.name,
// 								parent_rep: parent_rep_id,
// 								unique_id: data?.Result[0]?.properties?.doc?._id,
// 								projectid: "projects/540346760",
// 								clientid: "clients/540256733",
// 								metadataid: "f44040b0-6a69-4749-9819-06c6d1ee8057",
// 								tenantid: tenantid
// 							}
// 							await fetchData(

// 								{ body: JSON.stringify(queries.idm_repo_upsert(datassssvalue)) },
// 								UPSERTREPO
// 							)

// 						}

// 						else {
// 							let parent_id = rep_id;

// 							const datassss = {
// 								rep_id: uuidv4(),
// 								rep_type: "Manage Facility",
// 								rep_name: "Manage Facility",
// 								parent_rep: parent_id,
// 								unique_id: idmmanagefacility,
// 								projectid: "projects/540346760",
// 								clientid: "clients/540256733",
// 								metadataid: "f44040b0-6a69-4749-9819-06c6d1ee8057",
// 								tenantid: tenantid
// 							}
// 							const data1 = {
// 								rep_id: uuidv4(),
// 								rep_type: "Manage Facility",
// 								rep_name: data?.Result[0]?.properties?.doc?.name,
// 								parent_rep: datassss.rep_id,
// 								unique_id: data?.Result[0]?.properties?.doc?._id,
// 								projectid: "projects/540346760",
// 								clientid: "clients/540256733",
// 								metadataid: "f44040b0-6a69-4749-9819-06c6d1ee8057",
// 								tenantid: tenantid
// 							}

// 							await fetchData(

// 								{ body: JSON.stringify(queries.idm_repo_upsert(datassss)) },
// 								UPSERTREPO
// 							)

// 							await fetchData(

// 								{ body: JSON.stringify(queries.idm_repo_upsert(data1)) },
// 								UPSERTREPO
// 							)
// 						}
// 					}

// 					else {


// 						let parid = rep_id;

// 						const datassss = {
// 							rep_id: uuidv4(),
// 							rep_type: "Manage Facility",
// 							rep_name: "Manage Facility",
// 							parent_rep: parid,
// 							unique_id: idmmanagefacility,
// 							projectid: "projects/540346760",
// 							clientid: "clients/540256733",
// 							metadataid: "f44040b0-6a69-4749-9819-06c6d1ee8057",
// 							tenantid: tenantid
// 						}
// 						const data1 = {
// 							rep_id: uuidv4(),
// 							rep_type: "Manage Facility",
// 							rep_name: data?.Result[0]?.properties?.doc?.name,
// 							parent_rep: datassss.rep_id,
// 							unique_id: data?.Result[0]?.properties?.doc?._id,
// 							projectid: "projects/540346760",
// 							clientid: "clients/540256733",
// 							metadataid: "f44040b0-6a69-4749-9819-06c6d1ee8057",
// 							tenantid: tenantid
// 						}

// 						await fetchData(

// 							{ body: JSON.stringify(queries.idm_repo_upsert(datassss)) },
// 							UPSERTREPO
// 						)

// 						await fetchData(

// 							{ body: JSON.stringify(queries.idm_repo_upsert(data1)) },
// 							UPSERTREPO
// 						)
// 					}

// 				}
// 			}

// 			return {
// 				data: data,
// 				error: data?.error,
// 				message: data.error ? "Something went wrong" : ""
// 			};
// 		} catch (error) {
// 			console.log(error)
// 			return rejectWithValue({
// 				...defaultReject,
// 				message: error.message,
// 			});
// 		}
// 	}
// );
const SET_ORGANIZATION = createAsyncThunk(
	`organizationSlice/setOrganization`,
	async (payload = {}, { rejectWithValue }) => {
	  try {
		let { state, key } = payload;
  
		let queriesjson = generateJson.insert_json(state, key);
  
		const data = await fetchData(
		  { body: JSON.stringify(queriesjson) },
		  __uspsertUrl__
		);
		let result = [];
		return {
		  ...defaultState.List,
		  data: data,
		};
	  } catch (error) {
		return rejectWithValue({
		  ...defaultReject,
		  message: error.message,
		});
	  }
	}
  );
const ORG_FROM_GET = createAsyncThunk(
	`organizationSlice/getOrganization`,
	async (payload = {}, { rejectWithValue }) => {
		try {
			let { key } = payload;

			const getParentEntityData = await fetchData(
				{ body: JSON.stringify(queries.getParentEntity()) },
				__readDocumentUrl__
			);
			let result = [];
			getParentEntityData.result.map((val, i) => {
				if (val?.name && val?._id) {
					result.push({
						title: val?.name,
						value: val?.id,
					});
				}
			});

			const data = await fetchData(
				{ body: JSON.stringify(queries.getTreeDetails(key)) },
				__readDocumentUrl__
			);
			let queriesjson = generateReadJson.read_json(data.result[0], result);

			return {
				...defaultState.List,
				data: queriesjson,
			};
		} catch (error) {
			return rejectWithValue({
				...defaultReject,
				message: error.message,
			});
		}
	}
);
const ORGANIZATION_GET_ALL = createAsyncThunk(
	`organizationSlice/getAllEnterprice`,
	async (payload = {}, { rejectWithValue }) => {
		try {
			const { Roleid, tenantid } = payload;

			let readqueries = queries.getEnterprice();
				const data = await fetchData(
					{ body: JSON.stringify(readqueries) },
					__readDocumentUrl__,

				);
				return {
					...defaultState.List,
					data: data.result,
				};

			// let getRoledetails = queries.getRoleDetails(Roleid);

			// const Role = await fetchData(
			// 	{ body: JSON.stringify(getRoledetails) },
			// 	__readDocumentUrl__
			// );
			// if (Role?.result[0] === "Super Admin Role") {
			// 	let readqueries = queries.getEnterprice();
			// 	const data = await fetchData(
			// 		{ body: JSON.stringify(readqueries) },
			// 		__readDocumentUrl__,

			// 	);
			// 	return {
			// 		...defaultState.List,
			// 		data: data.result,
			// 	};
			// }

			// else {
			// 	const datasQueries = queries.getClientData(tenantid);
            //     const datass = await fetchData(
			// 		{ body: JSON.stringify(datasQueries) },
			// 		__readDocumentUrl__,

			// 	)

			// 	let ClientId = datass?.result[0]?._id

			// 	let readqueries = queries.getEnterpriceByClient(ClientId);
			// 	const data = await fetchData(
			// 		{ body: JSON.stringify(readqueries) },
			// 		__readDocumentUrl__,

			// 	);
			// 	return {
			// 		...defaultState.List,
			// 		data: data.result,
			// 	};

			// }
		}
		catch (error) {
			return rejectWithValue({
				...defaultReject,
				message: error.message,
			});
		}

	}
)

const ORGANIZATION_GET_ORG_ID = createAsyncThunk(
	`organizationSlice/getAllOrgbyId`,
	async (payload = {}, { rejectWithValue }) => {
		try {
			const { parentid } = payload;

			let getOrganizationById = queries.getOrganizationById(parentid);

			const data = await fetchData(
				{ body: JSON.stringify(getOrganizationById) },
				__readDocumentUrl__,

			);
			return {
				...defaultState.List,
				data: data.result,
			};

		}
		catch (error) {
			return rejectWithValue({
				...defaultReject,
				message: error.message,
			});
		}

	}
)

const ORGANIZATION_GET_FAC_ID = createAsyncThunk(
	`organizationSlice/getFacilityId`,
	async (payload = {}, { rejectWithValue }) => {
		try {
			const { parentid } = payload;

			let getFacilityById = queries.getFacilityById(parentid);

			const data = await fetchData(
				{ body: JSON.stringify(getFacilityById) },
				__readDocumentUrl__,

			);
			return {
				...defaultState.List,
				data: data.result,
			};

		}
		catch (error) {
			return rejectWithValue({
				...defaultReject,
				message: error.message,
			});
		}

	}
)

const ORGANIZATION_GET_SPECIALTY_DROP = createAsyncThunk(
	`organizationSlice/specialtyDrop`,
	async (payload = {}, { rejectWithValue }) => {
		try {
			let { type } = payload;
			const data = await fetchData(
				{ body: JSON.stringify(queries.SpecialtyDrop()) },
				__readDocumentUrl__
			);
			let result = [];
			data.result.map((val, i) => {
				if (val?.coding?.[0] && val?.coding?.[0]?._id) {
					result.push({
						label:
							val?.coding?.[0]?.display + " (" + val?.coding?.[0]?.code + ")",
						value: val?.coding?.[0]?.code,
						name: val?.coding?.[0]?.display,
						id: val?.coding?.[0]?._id,
					});
				}
			});
			return {
				...defaultState.List,
				data: result,
			};
		} catch (error) {
			return rejectWithValue({
				...defaultReject,
				message: error.message,
			});
		}
	}
);

const organizationSlice = createSlice({
	name: "practitionerApiSlice",
	initialState: {
		organizationTreeList: { ...defaultState.List },
		organizationEntityType: { ...defaultState.List },
		orgParEntity: { ...defaultState.List },
		orgLevelCare: { ...defaultState.List },
		orgUseIdenifi: { ...defaultState.List },
		orgIdTypeIdenifi: { ...defaultState.List },
		aliastype: { ...defaultState.List },
		organizationReadDetails: { ...defaultState.Info },
		organizationReadStatusUpsert: { ...defaultState.List },
		orgAddType: { ...defaultState.List },
		orgAddUSE: { ...defaultState.List },
		orgAddCity: { ...defaultState.List },
		orgAddDISTRICT: { ...defaultState.List },
		orgAddSTATE: { ...defaultState.List },
		orgAddCOUNTRY: { ...defaultState.List },
		orgAddPINCODE: { ...defaultState.List },
		orgContactDetailMode: { ...defaultState.List },
		orgContactDetailCode: { ...defaultState.List },
		orgContactDetailUse: { ...defaultState.List },
		orgContactDetailPriority: { ...defaultState.List },
		orgNamePrefix: { ...defaultState.List },
		orgNameSuffix: { ...defaultState.List },
		positionDesi: { ...defaultState.List },
		setOrganization: { ...defaultState.List },
		getOrganization: { ...defaultState.List },
		specialtyDrop: { ...defaultState.List },
		getAllEnterprice: { ...defaultState.List },
		getAllOrgbyId: { ...defaultState.List },
		getFacilityId: { ...defaultState.List }
	},
	extraReducers: {
		// ORGANIZATION_TREE_READ
		[ORGANIZATION_TREE_READ.fulfilled]: (state, action) => {
			(state.organizationTreeList.loading = false);
				(state.organizationTreeList.error = false);
				(state.organizationTreeList = action.payload);
		},
		[ORGANIZATION_TREE_READ.pending]: (state, action) => {
			(state.organizationTreeList.loading = true);
				(state.organizationTreeList.error = false);
				(state.organizationTreeList.loading = true);
		},
		[ORGANIZATION_TREE_READ.rejected]: (state, action) => {
			(state.organizationTreeList.loading = false);
				(state.organizationTreeList.error = true);
				(state.organizationTreeList = action.payload);
		},

		// ORGANIZATION_READ_DETAILS
		[ORGANIZATION_READ_DETAILS.fulfilled]: (state, action) => {
			(state.organizationReadDetails.loading = false);
				(state.organizationReadDetails.error = false);
				(state.organizationReadDetails = action.payload);
		},
		[ORGANIZATION_READ_DETAILS.pending]: (state, action) => {
			(state.organizationReadDetails.loading = true);
				(state.organizationReadDetails.error = false);
				(state.organizationReadDetails.loading = true);
		},
		[ORGANIZATION_READ_DETAILS.rejected]: (state, action) => {
			(state.organizationReadDetails.loading = false);
				(state.organizationReadDetails.error = true);
				(state.organizationReadDetails = action.payload);
		},

		// ORGANIZATION_READ_STATUS_UPSERT
		[ORGANIZATION_READ_STATUS_UPSERT.fulfilled]: (state, action) => {
			(state.organizationReadStatusUpsert.loading = false);
				(state.organizationReadStatusUpsert.error = false);
				(state.organizationReadStatusUpsert = action.payload);
		},
		[ORGANIZATION_READ_STATUS_UPSERT.pending]: (state, action) => {
			(state.organizationReadStatusUpsert.loading = true);
				(state.organizationReadStatusUpsert.error = false);
				(state.organizationReadStatusUpsert.loading = true);
		},
		[ORGANIZATION_READ_STATUS_UPSERT.rejected]: (state, action) => {
			(state.organizationReadStatusUpsert.loading = false);
				(state.organizationReadStatusUpsert.error = true);
				(state.organizationReadStatusUpsert = action.payload);
		},

		// ORGANIZATION_ENTITY_TYPE
		[ORGANIZATION_ENTITY_TYPE.fulfilled]: (state, action) => {
			(state.organizationEntityType.loading = false);
				(state.organizationEntityType.error = false);
				(state.organizationEntityType = action.payload);
		},
		[ORGANIZATION_ENTITY_TYPE.pending]: (state, action) => {
			(state.organizationEntityType.loading = true);
				(state.organizationEntityType.error = false);
				(state.organizationEntityType.loading = true);
		},
		[ORGANIZATION_ENTITY_TYPE.rejected]: (state, action) => {
			(state.organizationEntityType.loading = false);
				(state.organizationEntityType.error = true);
				(state.organizationEntityType = action.payload);
		},

		// ORGANIZATION_GET_PARENT_ENTITY
		[ORGANIZATION_GET_PARENT_ENTITY.fulfilled]: (state, action) => {
			(state.orgParEntity.loading = false);
				(state.orgParEntity.error = false);
				(state.orgParEntity = action.payload);
		},
		[ORGANIZATION_GET_PARENT_ENTITY.pending]: (state, action) => {
			(state.orgParEntity.loading = true);
				(state.orgParEntity.error = false);
				(state.orgParEntity.loading = true);
		},
		[ORGANIZATION_GET_PARENT_ENTITY.rejected]: (state, action) => {
			(state.orgParEntity.loading = false);
				(state.orgParEntity.error = true);
				(state.orgParEntity = action.payload);
		},
		// ORGANIZATION_GET_LEVEL_CARE
		[ORGANIZATION_GET_LEVEL_CARE.fulfilled]: (state, action) => {
			(state.orgLevelCare.loading = false);
				(state.orgLevelCare.error = false);
				(state.orgLevelCare = action.payload);
		},
		[ORGANIZATION_GET_LEVEL_CARE.pending]: (state, action) => {
			(state.orgLevelCare.loading = true);
				(state.orgLevelCare.error = false);
				(state.orgLevelCare.loading = true);
		},
		[ORGANIZATION_GET_LEVEL_CARE.rejected]: (state, action) => {
			(state.orgLevelCare.loading = false);
				(state.orgLevelCare.error = true);
				(state.orgLevelCare = action.payload);
		},
		//ORGANIZATION_GET_USE_IDENTIFICATION
		[ORGANIZATION_GET_USE_IDENTIFICATION.fulfilled]: (state, action) => {
			(state.orgUseIdenifi.loading = false);
				(state.orgUseIdenifi.error = false);
				(state.orgUseIdenifi = action.payload);
		},
		[ORGANIZATION_GET_USE_IDENTIFICATION.pending]: (state, action) => {
			(state.orgUseIdenifi.loading = true);
				(state.orgUseIdenifi.error = false);
				(state.orgUseIdenifi.loading = true);
		},
		[ORGANIZATION_GET_USE_IDENTIFICATION.rejected]: (state, action) => {
			(state.orgUseIdenifi.loading = false);
				(state.orgUseIdenifi.error = true);
				(state.orgUseIdenifi = action.payload);
		},

		// ORGANIZATION_GET_IDTYPE_IDENTIF
		[ORGANIZATION_GET_IDTYPE_IDENTIF.fulfilled]: (state, action) => {
			(state.orgIdTypeIdenifi.loading = false);
				(state.orgIdTypeIdenifi.error = false);
				(state.orgIdTypeIdenifi = action.payload);
		},
		[ORGANIZATION_GET_IDTYPE_IDENTIF.pending]: (state, action) => {
			(state.orgIdTypeIdenifi.loading = true);
				(state.orgIdTypeIdenifi.error = false);
				(state.orgIdTypeIdenifi.loading = true);
		},
		[ORGANIZATION_GET_IDTYPE_IDENTIF.rejected]: (state, action) => {
			(state.orgIdTypeIdenifi.loading = false);
				(state.orgIdTypeIdenifi.error = true);
				(state.orgIdTypeIdenifi = action.payload);
		},

		//ORGANIZATION_GET_ALIAS_TYPE
		[ORGANIZATION_GET_ALIAS_TYPE.fulfilled]: (state, action) => {
			(state.aliastype.loading = false);
				(state.aliastype.error = false);
				(state.aliastype = action.payload);
		},
		[ORGANIZATION_GET_ALIAS_TYPE.pending]: (state, action) => {
			(state.aliastype.loading = true);
				(state.aliastype.error = false);
				(state.aliastype.loading = true);
		},
		[ORGANIZATION_GET_ALIAS_TYPE.rejected]: (state, action) => {
			(state.aliastype.loading = false);
				(state.aliastype.error = true);
				(state.aliastype = action.payload);
		},

		//ORGANIZATION_GET_ADD_TYPE
		[ORGANIZATION_GET_ADD_TYPE.fulfilled]: (state, action) => {
			(state.orgAddType.loading = false);
				(state.orgAddType.error = false);
				(state.orgAddType = action.payload);
		},
		[ORGANIZATION_GET_ADD_TYPE.pending]: (state, action) => {
			(state.orgAddType.loading = true);
				(state.orgAddType.error = false);
				(state.orgAddType.loading = true);
		},
		[ORGANIZATION_GET_ADD_TYPE.rejected]: (state, action) => {
			(state.orgAddType.loading = false);
				(state.orgAddType.error = true);
				(state.orgAddType = action.payload);
		},
		// ORGANIZATION_GET_ADD_USE
		[ORGANIZATION_GET_ADD_USE.fulfilled]: (state, action) => {
			(state.orgAddUSE.loading = false);
				(state.orgAddUSE.error = false);
				(state.orgAddUSE = action.payload);
		},
		[ORGANIZATION_GET_ADD_USE.pending]: (state, action) => {
			(state.orgAddUSE.loading = true);
				(state.orgAddUSE.error = false);
				(state.orgAddUSE.loading = true);
		},
		[ORGANIZATION_GET_ADD_USE.rejected]: (state, action) => {
			(state.orgAddUSE.loading = false);
				(state.orgAddUSE.error = true);
				(state.orgAddUSE = action.payload);
		},
		//ORGANIZATION_GET_ADD_City
		[ORGANIZATION_GET_ADD_City.fulfilled]: (state, action) => {
			(state.orgAddCity.loading = false);
				(state.orgAddCity.error = false);
				(state.orgAddCity = action.payload);
		},
		[ORGANIZATION_GET_ADD_City.pending]: (state, action) => {
			(state.orgAddCity.loading = true);
				(state.orgAddCity.error = false);
				(state.orgAddCity.loading = true);
		},
		[ORGANIZATION_GET_ADD_City.rejected]: (state, action) => {
			(state.orgAddCity.loading = false);
				(state.orgAddCity.error = true);
				(state.orgAddCity = action.payload);
		},
		// ORGANIZATION_GET_ADD_DISTRICT
		[ORGANIZATION_GET_ADD_DISTRICT.fulfilled]: (state, action) => {
			(state.orgAddDISTRICT.loading = false);
				(state.orgAddDISTRICT.error = false);
				(state.orgAddDISTRICT = action.payload);
		},
		[ORGANIZATION_GET_ADD_DISTRICT.pending]: (state, action) => {
			(state.orgAddDISTRICT.loading = true);
				(state.orgAddDISTRICT.error = false);
				(state.orgAddDISTRICT.loading = true);
		},
		[ORGANIZATION_GET_ADD_DISTRICT.rejected]: (state, action) => {
			(state.orgAddDISTRICT.loading = false);
				(state.orgAddDISTRICT.error = true);
				(state.orgAddDISTRICT = action.payload);
		},
		// ORGANIZATION_GET_AddSTATE
		[ORGANIZATION_GET_AddSTATE.fulfilled]: (state, action) => {
			(state.orgAddSTATE.loading = false);
				(state.orgAddSTATE.error = false);
				(state.orgAddSTATE = action.payload);
		},
		[ORGANIZATION_GET_AddSTATE.pending]: (state, action) => {
			(state.orgAddSTATE.loading = true);
				(state.orgAddSTATE.error = false);
				(state.orgAddSTATE.loading = true);
		},
		[ORGANIZATION_GET_AddSTATE.rejected]: (state, action) => {
			(state.orgAddSTATE.loading = false);
				(state.orgAddSTATE.error = true);
				(state.orgAddSTATE = action.payload);
		},
		// ORGANIZATION_GET_COUNTRY
		[ORGANIZATION_GET_COUNTRY.fulfilled]: (state, action) => {
			(state.orgAddCOUNTRY.loading = false);
				(state.orgAddCOUNTRY.error = false);
				(state.orgAddCOUNTRY = action.payload);
		},
		[ORGANIZATION_GET_COUNTRY.pending]: (state, action) => {
			(state.orgAddCOUNTRY.loading = true);
				(state.orgAddCOUNTRY.error = false);
				(state.orgAddCOUNTRY.loading = true);
		},
		[ORGANIZATION_GET_COUNTRY.rejected]: (state, action) => {
			(state.orgAddCOUNTRY.loading = false);
				(state.orgAddCOUNTRY.error = true);
				(state.orgAddCOUNTRY = action.payload);
		},
		// ORGANIZATION_GET_PINCODE
		[ORGANIZATION_GET_PINCODE.fulfilled]: (state, action) => {
			(state.orgAddPINCODE.loading = false);
				(state.orgAddPINCODE.error = false);
				(state.orgAddPINCODE = action.payload);
		},
		[ORGANIZATION_GET_PINCODE.pending]: (state, action) => {
			(state.orgAddPINCODE.loading = true);
				(state.orgAddPINCODE.error = false);
				(state.orgAddPINCODE.loading = true);
		},
		[ORGANIZATION_GET_PINCODE.rejected]: (state, action) => {
			(state.orgAddPINCODE.loading = false);
				(state.orgAddPINCODE.error = true);
				(state.orgAddPINCODE = action.payload);
		},
		// ORGANIZATION_GET_CONTACTDETAILMODE
		[ORGANIZATION_GET_CONTACTDETAILMODE.fulfilled]: (state, action) => {
			(state.orgContactDetailMode.loading = false);
				(state.orgContactDetailMode.error = false);
				(state.orgContactDetailMode = action.payload);
		},
		[ORGANIZATION_GET_CONTACTDETAILMODE.pending]: (state, action) => {
			(state.orgContactDetailMode.loading = true);
				(state.orgContactDetailMode.error = false);
				(state.orgContactDetailMode.loading = true);
		},
		[ORGANIZATION_GET_CONTACTDETAILMODE.rejected]: (state, action) => {
			(state.orgContactDetailMode.loading = false);
				(state.orgContactDetailMode.error = true);
				(state.orgContactDetailMode = action.payload);
		},
		// ORGANIZATION_GET_CONNTACTDETAILCODE
		[ORGANIZATION_GET_CONNTACTDETAILCODE.fulfilled]: (state, action) => {
			(state.orgContactDetailCode.loading = false);
				(state.orgContactDetailCode.error = false);
				(state.orgContactDetailCode = action.payload);
		},
		[ORGANIZATION_GET_CONNTACTDETAILCODE.pending]: (state, action) => {
			(state.orgContactDetailCode.loading = true);
				(state.orgContactDetailCode.error = false);
				(state.orgContactDetailCode.loading = true);
		},
		[ORGANIZATION_GET_CONNTACTDETAILCODE.rejected]: (state, action) => {
			(state.orgContactDetailCode.loading = false);
				(state.orgContactDetailCode.error = true);
				(state.orgContactDetailCode = action.payload);
		},
		// ORGANIZATION_GET_CONTACTDETAILUSE
		[ORGANIZATION_GET_CONTACTDETAILUSE.fulfilled]: (state, action) => {
			(state.orgContactDetailUse.loading = false);
				(state.orgContactDetailUse.error = false);
				(state.orgContactDetailUse = action.payload);
		},
		[ORGANIZATION_GET_CONTACTDETAILUSE.pending]: (state, action) => {
			(state.orgContactDetailUse.loading = true);
				(state.orgContactDetailUse.error = false);
				(state.orgContactDetailUse.loading = true);
		},
		[ORGANIZATION_GET_CONTACTDETAILUSE.rejected]: (state, action) => {
			(state.orgContactDetailUse.loading = false);
				(state.orgContactDetailUse.error = true);
				(state.orgContactDetailUse = action.payload);
		},
		// ORGANIZATION_GET_CONTACTDETAILPRIORITY
		[ORGANIZATION_GET_CONTACTDETAILPRIORITY.fulfilled]: (state, action) => {
			(state.orgContactDetailPriority.loading = false);
				(state.orgContactDetailPriority.error = false);
				(state.orgContactDetailPriority = action.payload);
		},
		[ORGANIZATION_GET_CONTACTDETAILPRIORITY.pending]: (state, action) => {
			(state.orgContactDetailPriority.loading = true);
				(state.orgContactDetailPriority.error = false);
				(state.orgContactDetailPriority.loading = true);
		},
		[ORGANIZATION_GET_CONTACTDETAILPRIORITY.rejected]: (state, action) => {
			(state.orgContactDetailPriority.loading = false);
				(state.orgContactDetailPriority.error = true);
				(state.orgContactDetailPriority = action.payload);
		},
		// ORGANIZATION_GET_CONTACT_PREFIX
		[ORGANIZATION_GET_CONTACT_PREFIX.fulfilled]: (state, action) => {
			(state.orgNamePrefix.loading = false);
				(state.orgNamePrefix.error = false);
				(state.orgNamePrefix = action.payload);
		},
		[ORGANIZATION_GET_CONTACT_PREFIX.pending]: (state, action) => {
			(state.orgNamePrefix.loading = true);
				(state.orgNamePrefix.error = false);
				(state.orgNamePrefix.loading = true);
		},
		[ORGANIZATION_GET_CONTACT_PREFIX.rejected]: (state, action) => {
			(state.orgNamePrefix.loading = false);
				(state.orgNamePrefix.error = true);
				(state.orgNamePrefix = action.payload);
		},
		// ORGANIZATION_GET_CONTACT_SUFFIX
		[ORGANIZATION_GET_CONTACT_SUFFIX.fulfilled]: (state, action) => {
			(state.orgNameSuffix.loading = false);
				(state.orgNameSuffix.error = false);
				(state.orgNameSuffix = action.payload);
		},
		[ORGANIZATION_GET_CONTACT_SUFFIX.pending]: (state, action) => {
			(state.orgNameSuffix.loading = true);
				(state.orgNameSuffix.error = false);
				(state.orgNameSuffix.loading = true);
		},
		[ORGANIZATION_GET_CONTACT_SUFFIX.rejected]: (state, action) => {
			(state.orgNameSuffix.loading = false);
				(state.orgNameSuffix.error = true);
				(state.orgNameSuffix = action.payload);
		},
		// ORGANIZATION_GET_CONTACT_DESI
		[ORGANIZATION_GET_CONTACT_DESI.fulfilled]: (state, action) => {
			(state.positionDesi.loading = false);
				(state.positionDesi.error = false);
				(state.positionDesi = action.payload);
		},
		[ORGANIZATION_GET_CONTACT_DESI.pending]: (state, action) => {
			(state.positionDesi.loading = true);
				(state.positionDesi.error = false);
				(state.positionDesi.loading = true);
		},
		[ORGANIZATION_GET_CONTACT_DESI.rejected]: (state, action) => {
			(state.positionDesi.loading = false);
				(state.positionDesi.error = true);
				(state.positionDesi = action.payload);
		},
		// SET_ORGANIZATION
		[SET_ORGANIZATION.fulfilled]: (state, action) => {
			(state.setOrganization.loading = false);
				(state.setOrganization.error = false);
				(state.setOrganization = action.payload);
		},
		[SET_ORGANIZATION.pending]: (state, action) => {
			(state.setOrganization.loading = true);
				(state.setOrganization.error = false);
				(state.setOrganization.loading = true);
		},
		[SET_ORGANIZATION.rejected]: (state, action) => {
			(state.setOrganization.loading = false);
				(state.setOrganization.error = true);
				(state.setOrganization = action.payload);
		},
		// ORG_FROM_GET
		[ORG_FROM_GET.fulfilled]: (state, action) => {
			(state.getOrganization.loading = false);
				(state.getOrganization.error = false);
				(state.getOrganization = action.payload);
		},
		[ORG_FROM_GET.pending]: (state, action) => {
			(state.getOrganization.loading = true);
				(state.getOrganization.error = false);
				(state.getOrganization.loading = true);
		},
		[ORG_FROM_GET.rejected]: (state, action) => {
			(state.getOrganization.loading = false);
				(state.getOrganization.error = true);
				(state.getOrganization = action.payload);
		},
		// ORGANIZATION_GET_SPECIALTY_DROP
		[ORGANIZATION_GET_SPECIALTY_DROP.fulfilled]: (state, action) => {
			(state.specialtyDrop.loading = false);
				(state.specialtyDrop.error = false);
				(state.specialtyDrop = action.payload);
		},
		[ORGANIZATION_GET_SPECIALTY_DROP.pending]: (state, action) => {
			(state.specialtyDrop.loading = true);
				(state.specialtyDrop.error = false);
				(state.specialtyDrop.loading = true);
		},
		[ORGANIZATION_GET_SPECIALTY_DROP.rejected]: (state, action) => {
			(state.specialtyDrop.loading = false);
				(state.specialtyDrop.error = true);
				(state.specialtyDrop = action.payload);
		},

		[ORGANIZATION_GET_FAC_ID.fulfilled]: (state, action) => {
			(state.getFacilityId.loading = false);
				(state.getFacilityId.error = false);
				(state.getFacilityId = action.payload);
		},
		[ORGANIZATION_GET_FAC_ID.pending]: (state, action) => {
			(state.getFacilityId.loading = true);
				(state.getFacilityId.error = false);
				(state.getFacilityId.loading = true);
		},
		[ORGANIZATION_GET_FAC_ID.rejected]: (state, action) => {
			(state.getFacilityId.loading = false);
				(state.getFacilityId.error = true);
				(state.getFacilityId = action.payload);
		},

		[ORGANIZATION_GET_FAC_ID.fulfilled]: (state, action) => {
			(state.getFacilityId.loading = false);
				(state.getFacilityId.error = false);
				(state.getFacilityId = action.payload);
		},
		[ORGANIZATION_GET_FAC_ID.pending]: (state, action) => {
			(state.getFacilityId.loading = true);
				(state.getFacilityId.error = false);
				(state.getFacilityId.loading = true);
		},
		[ORGANIZATION_GET_FAC_ID.rejected]: (state, action) => {
			(state.getFacilityId.loading = false);
				(state.getFacilityId.error = true);
				(state.getFacilityId = action.payload);
		},

		[ORGANIZATION_GET_ORG_ID.fulfilled]: (state, action) => {
			(state.getAllOrgbyId.loading = false);
				(state.getAllOrgbyId.error = false);
				(state.getAllOrgbyId = action.payload);
		},
		[ORGANIZATION_GET_ORG_ID.pending]: (state, action) => {
			(state.getAllOrgbyId.loading = true);
				(state.getAllOrgbyId.error = false);
				(state.getAllOrgbyId.loading = true);
		},
		[ORGANIZATION_GET_ORG_ID.rejected]: (state, action) => {
			(state.getAllOrgbyId.loading = false);
				(state.getAllOrgbyId.error = true);
				(state.getAllOrgbyId = action.payload);
		},

		[ORGANIZATION_GET_ALL.fulfilled]: (state, action) => {
			(state.getAllEnterprice.loading = false);
				(state.getAllEnterprice.error = false);
				(state.getAllEnterprice = action.payload);
		},
		[ORGANIZATION_GET_ALL.pending]: (state, action) => {
			(state.getAllEnterprice.loading = true);
				(state.getAllEnterprice.error = false);
				(state.getAllEnterprice.loading = true);
		},
		[ORGANIZATION_GET_ALL.rejected]: (state, action) => {
			(state.getAllEnterprice.loading = false);
				(state.getAllEnterprice.error = true);
				(state.getAllEnterprice = action.payload);
		},
	},
});

const organizationActions = {
	ORGANIZATION_TREE_READ,
	ORGANIZATION_ENTITY_TYPE,
	ORGANIZATION_GET_PARENT_ENTITY,
	ORGANIZATION_GET_LEVEL_CARE,
	ORGANIZATION_GET_USE_IDENTIFICATION,
	ORGANIZATION_GET_IDTYPE_IDENTIF,
	ORGANIZATION_GET_ALIAS_TYPE,
	ORGANIZATION_READ_DETAILS,
	ORGANIZATION_READ_STATUS_UPSERT,
	ORGANIZATION_GET_ADD_TYPE,
	ORGANIZATION_GET_ADD_USE,
	ORGANIZATION_GET_ADD_City,
	ORGANIZATION_GET_ADD_DISTRICT,
	ORGANIZATION_GET_AddSTATE,
	ORGANIZATION_GET_COUNTRY,
	ORGANIZATION_GET_PINCODE,
	ORGANIZATION_GET_CONTACTDETAILMODE,
	ORGANIZATION_GET_CONNTACTDETAILCODE,
	ORGANIZATION_GET_CONTACTDETAILUSE,
	ORGANIZATION_GET_CONTACTDETAILPRIORITY,
	ORGANIZATION_GET_CONTACT_SUFFIX,
	ORGANIZATION_GET_CONTACT_PREFIX,
	ORGANIZATION_GET_CONTACT_DESI,
	SET_ORGANIZATION,
	ORG_FROM_GET,
	ORGANIZATION_GET_SPECIALTY_DROP,
	ORGANIZATION_GET_FAC_ID,
	ORGANIZATION_GET_ORG_ID,
	ORGANIZATION_GET_ALL
};

export { organizationActions };

export default organizationSlice.reducer;
