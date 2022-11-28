import { queries } from "./queries";
import moment from "moment";
import { fetchData } from "../../helpers";
import { __readDocumentUrl__ } from "../../settings";

//CONTACT CONSTRUCTION FOR TREE DETAIL
const contactConstruct = (data) => {
	if (data.length > 0) {
		const contact_arr = data.map((val_) => {
			// 
			return {
				mode: {
					label: val_?.system?.display,
					value: val_?.system?._id,

				},
				number: val_?.value,
				use: {
					label: val_?.use?.display,
					value: val_?.use?._id,
				},
				priority: {}
			}
		});
		return contact_arr
	}
};
//ADDRESS CONSTRUCTION FOR TREE DETAILS
const contructAddress = (data) => { 
	if (data.length > 0) {
		const add_obj = data.map((v) => {
			let splitAddress = v?.line?.split(',');
			return {
				address1: splitAddress?.[0],
				address2: splitAddress?.[1],
				address3: splitAddress?.[2],
				city: v?.city,
				district: v?.district,
				state: v?.state,
				pincode: v?.postalCode,
				country: v?.country,
				type: {
					label: v?.Type?.display,
					value: v?.Type?._id
				},
				use: {
					label: v?.use?.display,
					value: v?.use?._id
				}
			}
		});
		return add_obj;
	}
};

const constructLogo = (data) => {
	return {
		file: data?.url,
		load: true,
		name: data?.fileName,
		size: ""
	}
}

const getParentName = async (data) => {
	let parentEntity = "";
	let parentEntityName = "";
	if (data) {
		parentEntityName = await fetchData(
			{ body: JSON.stringify(queries.getParentOrgNameById(data)) },
			__readDocumentUrl__
		);
	}
	parentEntity = parentEntityName?.result?.[0]?.name;
	return parentEntity;
};
//JSON CONSTRUCTION FOR GET TREE DETAIL

const getpersondetails = (contactlist) => {
	let dataList = [];
	if (contactlist?.length > 0) {
		contactlist?.map(val => {
			let lists = {
				"name": val?.name?.[0]?.text ? val?.name?.[0]?.text + " " + val?.name?.[0]?.family + " " + val?.name?.[0]?.given : "",
				"designation": val?.designation?.display ?? "",
				"contact_type": val?.telecom?.[0]?.system?.display ?? "",
				"contact": (val?.telecom?.[0]?.value) ? (val?.telecom?.[0]?.valueprefix?.GeoLocationISDCode ?? "") + " " + val?.telecom?.[0]?.value : ""
			}
			dataList.push(lists);
		})
	}
	return dataList
}

export const ReadTreeDetailJson = (data, parentOrgName, roleDetail) => {
	const specialtyDetailsarr = data?.specialtyDetails.map((val, i) => {
		// specialtyDetailsarr
		return {
			effFrom: moment(moment.unix(val.effFrom)._d).format("DD-MM-YYYY"),
			effTo: moment(moment.unix(val.effTo)._d).format("DD-MM-YYYY"),
			specialty: val?.specialty?.display,
		};
	});
	let obj = {};
	if (data) {
		console.log(data, "daaaaaaaaaaaaaataaaaaaaaaaaaa")
		obj = {
			entityType: {
				label: data?.OrgType?.[0]?.display,
				value: data?.OrgType?.[0]?._id
			},
			roleDetail,
			FacilityAdminEmail: data?.FacilityAdminEmail,
			mappedLevel: data?.mappedLevel,
			entityName: data?.name ?? "",
			entityCode: data?.entitycode ?? "",
			_key: data?._key,
			parentEntityId: data?.ParentOrgID?.[0] ?? '',
			parentEntity: parentOrgName ?? "",
			levelOfCare: {
				value: data?.levelofcareid?._id,
				label: data?.levelofcareid?.description,
			},
			level: data?.levelofcareid?.levelofcareCode ?? "",
			address: contructAddress(data?.address),
			contactPersonName:
				data?.contact[0]?.name[0]?.prefix?.display +
				" " +
				data?.contact[0]?.name[0]?.text +
				" " +
				data?.contact[0]?.name[0]?.family +
				" " +
				data?.contact[0]?.name[0]?.given +
				" " +
				data?.contact[0]?.name[0]?.suffix?.display +
				"",
			designation: data?.contact?.[0]?.designation?.description ?? "",
			contactData: contactConstruct(data?.telecom),
			status: data?.active,
			logo: constructLogo(data?.logo?.[0]),
			// specialtyDetails: specialtyDetailsarr,
			// contact_person_name: getpersondetails(data?.contact?.length > 0 ? data?.contact : null)??null
		};
	}
	console.log(obj, "objjjjjjjjjjjjjjjjjjjjjjjjjjjjj")
	return obj;
};
