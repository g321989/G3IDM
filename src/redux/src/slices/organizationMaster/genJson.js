import { dbName } from "../../settings";
import moment from "moment";

export const generateJson = {
	insert_json: (data, key, user_profile_id) => {

		const identifierArr = data?.Identification?.map((v, i) => {
			if (v?.use?.value) {
				return {
					user: v?.use?.value,
					value: v?.idnumber,
					period: [
						{
							start: moment(v?.startdate).unix(),
							end: moment(v?.enddate).unix(),
							id: 0,
						},
					],
					Type: v?.idtype?.value,
				};
			}
		});

		const aliasArr = data?.Alias?.map((v, i) => {
			return {
				aliasType: v?.aliastype?.value,
				aliasDesc: v?.aliasname,
				aliasStart: moment(v?.startdate).unix(),
				aliasEnd: moment(v?.enddate).unix(),
			};
		});

		const addressArr = data?.Address?.map((val, i) => {
			let address1 = val?.address1 ? val?.address1 : "";
			let address2 = val?.address2 ? val?.address2 : "";
			let address3 = val?.address3 ? val?.address3 : "";
			return {
				use: val?.use?.value,
				text: "",
				line: address1 + "," + address2 + "," + address3,
				city: val?.city,
				district: val?.district,
				state: val?.state,
				postalCode: val?.pincode,
				country: val?.country,
				Type: val?.type?.value,
				id: 0,
			};
		});

		const teltcomArr = data?.Contact?.map((val, i) => {
			if (val.mode.value) {
				return {
					system: val?.mode?.value,
					value: val?.number,
					use: val?.use?.value,
					rank: val?.priority?.value,
					id: 0,
					valueprefix: val?.code?.value,
					priority: val?.code?.value
				};
			}
		});

		const contactpersondetailsArr = data?.ContactPersonDetails?.map((val, i) => {
			return {
				telecom: val?.point?.map((v, i) => {
					if (v?.use?.value) {
						return {
							system: v?.mode?.value,
							value: v?.number,
							use: v?.use?.value,
							rank: v?.priority?.value,
							id: 0,
							valueprefix: v?.code?.value,
						};
					}
				}),

				name: [
					{
						use: val?.use?.value,
						text: val?.firstName,
						family: val?.middleName,
						given: val?.lastName,
						prefix: val?.prefix?.value,
						suffix: val?.suffix?.value,
						period: [],
						id: 0,
					},
				],
				designation: val?.designation?.value,
			};
		});

		const specialtyDetailsArr = data?.specialtyDetails?.map((val, i) => {
			return {
				specialty: val?.dropdown.id,
				effFrom: moment(val?.fromDate).unix(),
				effTo: moment(val?.toDate).unix(),
				external: false,
			};
		});

		let filter = {};

		///updating id with selected parent organisation key
		let id = { id: parseInt(data?.ParentEntity?._key) };

		if (key) {
			filter = { filter: { _key: `${key}` } };
			id = {};
		}

		return [
			{
				db_name: dbName,
				entity: "Organization",
				is_metadata: true,
				metadataId: "ead11a7e-4a14-4e39-a964-0ca060a073c5",
				...filter,
				doc: {
					client_id: data.client_id,
					FacilityAdminEmail: data.FacilityAdminEmail,
					mappedLevel: data.clientlevels,
					active: true,
					identifier: identifierArr?.filter((val) => val != undefined),
					name: data?.EntityName,
					alias: aliasArr,
					telecom: teltcomArr,
					address: addressArr,
					contact: contactpersondetailsArr,
					specialtyDetails: specialtyDetailsArr,
					// map user with facility ( need to add in user_profile_id field in entity designer)
					// user_profile_id : user_profile_id,  
					...id,
					ParentOrgID: data?.ParentEntity?.value
						? [data?.ParentEntity?.value]
						: [],
					OrgType: [data.EntityType.value],
					levelofcareid: data?.LevelOfCare?.value,
					logo:
						data?.imageDetails && data?.imageDetails.length > 0
							? [
								{
									date: "",
									url: data?.imageDetails[0]?.file,
									id: 0,
									fileName: data?.imageDetails[0]?.name,
									fileid: data?.imageDetails[0]?.fileid,
									filetype: data?.imageDetails[0]?.name?.split('.')?.[1],
									objectid: data?.imageDetails[0]?.objectid,
								},
							]
							: [],
					entitycode: data?.EntityCode,
				},
			},
		];
	},
};

export const generateReadJson = {
	read_json: (data, Parentget) => {
		const IdentificationArr = data?.identifier?.map((v, i) => {
			// IdentificationArr readdd
			return {
				startdate: moment().utc(v?.period[0]?.start, "DD-MM-YYYY")._d,
				enddate: moment().utc(v?.period[0]?.end, "DD-MM-YYYY")._d,

				use: { title: v?.user?.display, value: v?.user?._id },

				idtype: { title: v?.Type?.display, value: v?.Type?._id },
				idnumber: v?.value,
			};
		});
		const AliasArr = data?.alias?.map((v, i) => {
			// AliasArr read
			return {
				startdate: moment().utc(v?.aliasEnd, "DD-MM-YYYY")._d,
				enddate: moment().utc(v?.aliasStart, "DD-MM-YYYY")._d,
				aliastype: { title: v?.aliasType?.display, value: v?.aliasType?._id },
				aliasname: v?.aliasDesc,
			};
		});
		const AddressArr = data?.address?.map((v, i) => {
			// AddressArr read
			let addressAll = v.line.split(",");

			return {
				use: { title: v?.use?.display, value: v?.use?._id },
				type: { title: v?.Type?.display, value: v?.Type?._id },
				address1: addressAll[0],
				address2: addressAll[1],
				address3: addressAll[2],
				city: { title: v?.city?.geogLevelName, value: v?.city?._id },
				district: {
					title: v?.district?.geogLevelName,
					value: v?.district?._id,
				},
				state: { title: v?.state?.geogLevelName, value: v?.state?._id },
				country: { title: v?.country?.geogLevelName, value: v?.country?._id },
				pincode: {
					title: v?.postalCode?.geogLevelName,
					value: v?.postalCode?._id,
				},
			};
		});
		const ContactArr = data?.telecom?.map((v, i) => {
			// AliasArr read
			return {
				code: {
					title: v?.valueprefix?.GeoLocationISDCode,
					value: v?.valueprefix?._id,
				},
				mode: { title: v?.system?.display, value: v?.system?._id },
				number: v?.value,
				use: { title: v?.use?.display, value: v?.use?._id },
				priority: { title: v?.rank?.display, value: v?.rank?._id },
			};
		});
		const ContactPersonDetailsArr = data?.contact?.map((v, i) => {
			// ContactPersonDetailsArr read
			return {
				use: { title: v.name[0].use.display, value: v.name[0].use._id },
				prefix: {
					title: v?.name[0]?.prefix?.display,
					value: v?.name[0]?.prefix?._id,
				},
				firstName: v?.name[0]?.text,
				middleName: v?.name[0]?.family,
				lastName: v?.name[0]?.given,
				suffix: {
					title: v?.name[0]?.suffix?.display,
					value: v?.name[0]?.suffix?._id,
				},
				designation: {
					title: v?.designation?.display,
					value: v?.designation?._id,
				},
				point: v?.telecom?.map((val, i) => {
					return {
						mode: { title: val?.system?.display, value: val?.system?._id },
						code: {
							title: val?.valueprefix?.GeoLocationISDCode,
							value: val?.valueprefix?._id,
						},
						number: val?.value,
						use: { title: val?.use?.display, value: val?.use?._id },
						priority: { title: val?.rank?.display, value: val?.rank?._id },
					};
				}),
			};
		});
		const specialtyDetailsarr = data?.specialtyDetails.map((val, i) => {
			// specialtyDetailsarr

			return {
				effFrom: moment(moment.unix(val?.effFrom)._d).format("DD-MM-YYYY"),
				effTo: moment(moment.unix(val?.effTo)._d).format("DD-MM-YYYY"),
				specialty: val?.specialty?.display,
				code: val?.specialty?.code,
				specialty_id: val?.specialty?._id,
				fromDate: moment.unix(val?.effFrom)._d,
				toDate: moment.unix(val.effTo)._d,
				dropdown: {
					label:
						val?.specialty?.display +
						" (" +
						val?.specialty?.code +
						")",
					value: val?.specialty?.code,
					name: val?.specialty?.display,
					id: val?.specialty?._id,
				},
			};
		});


		return {
			_key: data?._key,
			status: data?.active,
			EntityType_: {
				title: data?.OrgType[0]?.display,
				value: data?.OrgType[0]?._id,
			},
			ParentEntity_:
				data?.ParentOrgID?.length > 0
					? Parentget?.filter((val) => val?.value === data?.ParentOrgID[0])
					: [],
			LevelOfCare_: {
				title: data?.levelofcareid?.description,
				value: data?.levelofcareid?._id,
			},
			EntityCode_: data?.entitycode,
			EntityName_: data?.name,
			//
			Identification_: IdentificationArr,
			Alias_: AliasArr,
			Address_: AddressArr,
			Contact_: ContactArr,
			ContactPersonDetails_: ContactPersonDetailsArr,
			specialtyDetails: specialtyDetailsarr,
			imageDetails_: data?.logo[0]?.fileid
				? [
					{
						fileid: data?.logo[0]?.fileid,
						filetype: data?.logo[0]?.filetype,
						objectid: data?.logo[0]?.objectid,
						filename: data?.logo[0]?.fileName,
					},
				]
				: null,
		};
	},
};
