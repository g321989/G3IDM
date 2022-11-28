import moment from "moment";
import { utcTOLocal } from "../../helpers";

const getOptionWithMaster = (data) => {
    let getoptions = [];
    if (data && data?.length > 0) {
        data.map(val => {
            getoptions.push({
                label: val.coding ? val.coding[0] ? val.coding[0].display : "" : val,
                value: val._id,
                ...val
            })
        })
    }
    return getoptions;
}
const getmasterOprions = (key, value, master, valueKey) => {
    let list = [];
    if (value && value?.length > 0) {
        list = master[key].filter(val => val[valueKey ? valueKey :
            "value"] === value) ? master[key].filter(val => val[valueKey ? valueKey : "value"] === value) : []
    }
    return list
}

const contactListData = (data, masters) => {
    let list = [];
    if (data && data?.length > 0) {
        data.map(val => {
            let contactData = {
                "mode": getmasterOprions("contact_mode", val.system, masters)[0],
                "mobile": val.value ? val.value : "",
                "use": getmasterOprions("Address_use", val.use, masters)[0],
                "priority": getmasterOprions("priority", `${val.rank}`, masters)[0],
                "country_code": getmasterOprions("country_code", val.valueprefix, masters)[0],
            }
            list.push(contactData)
        })
    }
    return list;
}

const addressListData = (data, masters) => {
    let list = []
    if (data && data?.length > 0) {
        data.map(val => {
            let addresslistData = {
                "use": getmasterOprions("Address_use", val.use, masters)[0],
                "addressLine1": (val.text && val.text?.length > 0) ? val.text : "",
                "addressLine2": (val.line && val.line?.length > 0) ? val.line : "",
                "city": getmasterOprions("city", val.city, masters)[0],
                "district": getmasterOprions("district", val?.district, masters)[0],
                "state": getmasterOprions("state", val?.state, masters)[0],
                "pincode": (val.postalCode && val.postalCode?.length > 0) ? val.postalCode : "",
                "country": getmasterOprions("country", val.country, masters)[0],
                "type": getmasterOprions("address_type", val.Type, masters)[0]
            }
            list.push(addresslistData)
        })
    }
    return list;
}


const getGeoData = (id, dropDownData) => {
    let obj = {};
    if (id) {
        if (Array.isArray(dropDownData)) {
            //return dropDownData?.filter(val => val?._id === id)
            dropDownData?.map(val => {
                if (val?._id === id) {
                    obj = {
                        label: val.geogLevelName,
                        value: val._id,
                        ...val
                    }
                }
            })
        }
    }
    return obj;
}
export const generateReadJSON = (data, masters, countryData, stateData, districtData, cityData, pincodeData) => {
    

    let identifier = [];
    if (data.identifier && data.identifier?.length > 0) {
        data.identifier.map(val => {
            let identifierData = {
                "id_type": (val.user?.length > 0 && masters.id_type.filter(idlabel => idlabel.value === val.user)[0]) ? masters.id_type.filter(idlabel => idlabel.value === val.user)[0] : {},
                "id_number": val.value,
                "expiry_date": val.period[0].end ? moment.unix(val.period[0].end).format("YYYY-MM-DD") : null,
                "doc": val.files

            }
            identifier.push(identifierData);
        })
    }
    let nameslist = [];
    if (data.name && data.name?.length > 0) {
        data.name.map(val => {
            let namedatas = {
                use: val.use ? masters.use.filter(idlabel => idlabel.value === val.use)[0] : {},
                prefix: val.prefix ? masters.prefix.filter(idlabel => idlabel.value === val.prefix)[0] : {},
                first_name: val.text,
                middle_name: val.given,
                last_name: val.family,
                suffix: val.suffix ? masters.suffix.filter(idlabel => idlabel.value === val.suffix)[0] : {}
            };
            nameslist.push(namedatas);
        })
    }

    let getlanguageoptions = [];

    if (data.communication && data.communication?.length > 0) {
        data.communication.map(val => {
            let languageoptionsData = {
                label: val.coding ? val.coding[0] ? val.coding[0].display : "" : val,
                value: val._id,
                ...val
            };
            getlanguageoptions.push(languageoptionsData)
        })
    }
    let contactlist = [];
    if (data.telecom && data.telecom?.length > 0) {
        data.telecom.map(val => {
            let contactData = {
                "mode": getmasterOprions("contact_mode", val.system, masters)[0],
                "mobile": val.value ? val.value : "",
                "use": getmasterOprions("Address_use", val.use, masters)[0],
                "priority": getmasterOprions("priority", `${val.rank}`, masters)[0],
                "country_code": getmasterOprions("country_code", val.valueprefix, masters)[0],
            }
            contactlist.push(contactData)
        })
    }
    let practitionerbyrolelist = [];
    if (data.practitioner_role && data.practitioner_role?.length > 0) {

        data.practitioner_role.map(val => {
            let practitionerData = {
                speciality: getmasterOprions("speciality", val.SpecialtyID, masters)[0],
                select_entity: getmasterOprions("entity", val.EntityType, masters, "_id")[0],
                entity_name: (val.OrgID && val.OrgID?.length > 0) ? masters["entity_name"].filter(valss => valss.value.toString() === val.OrgID)[0] : {},
                select_location: getmasterOprions("location", val.locationID, masters)[0],
                primary_specialty: val.primary_specialty ? val.primary_specialty : false,
                select_role: getmasterOprions("role", (val.role && val.role?.length > 0) ? val.role[0]._id : null, masters)[0],
                status: val.active ? val.active : false,
                start_date: (val.period && val.period?.length > 0 && val.period[0].start) ? utcTOLocal(val.period[0].start, "YYYY-MM-DD") : null,
                end_date: (val.period && val.period?.length > 0 && val.period[0].end) ? utcTOLocal(val.period[0].end, "YYYY-MM-DD") : null,
                contact: contactListData(val.telecom, masters),
                doc: val.files ? val.files : [],
                // "telecom": contactList(val.contact),
                _key: val?._key

            };
            practitionerbyrolelist.push(practitionerData)
        })
    }
    let addresslist = [];
    if (data.address && data.address?.length > 0) {
        data.address.map(val => {
            let addresslistData = {
                "use": getmasterOprions("Address_use", val.use, masters)[0],
                "addressLine1": (val.text && val.text?.length > 0) ? val.text : "",
                "addressLine2": (val.line && val.line?.length > 0) ? val.line : "",
                // "city": getmasterOprions("city", val.city, masters)[0],
                // "district": getmasterOprions("district", val.district, masters)[0],
                // "state": getmasterOprions("state", val.state, masters)[0],
                // "pincode": (val.postalCode && val.postalCode?.length > 0) ? val.postalCode : "",
                // "country": getmasterOprions("country", val.country, masters)[0],
                "city": getGeoData(val?.city, cityData),
                "district": getGeoData(val?.district, districtData),
                "state": getGeoData(val?.state, stateData),
                "pincode": getGeoData(val.postalCode, pincodeData),
                "country": getGeoData(val.country, countryData),
                "type": getmasterOprions("address_type", val.Type, masters)[0]
            }
            addresslist.push(addresslistData)
        })
    }

    let qualificationList = [];
    if (data.qualification && data.qualification?.length > 0) {
        data.qualification.map(val => {
            let qualificationData = {
                "name": val.name ? val.name : "",
                "qualification_name": val.university_board ? val.university_board : "",
                "issued_by": (val.issue_date) ? utcTOLocal(val.issue_date, "YYYY-MM-DD") : null,
                "start_date": (val.valid_from) ? utcTOLocal(val.valid_from, "YYYY-MM-DD") : null,
                "end_date": (val.valid_to) ? utcTOLocal(val.valid_to, "YYYY-MM-DD") : null,
                "doc": val.files ? val.files : []
            }
            qualificationList.push(qualificationData)
        })
    }

    let PublicationList = [];
    if (data.publication_details && data.publication_details?.length > 0) {
        data.publication_details.map(val => {
            let PublicationListdata = {
                "description": val.description ? val.description : "",
                "link": val.link ? val.link : ""
            }
            PublicationList.push(PublicationListdata)
        })
    }

    let trainingList = [];
    if (data.training_details && data.training_details?.length > 0) {
        data.training_details.map(val => {
            let trainingListData = {
                "organization": val.organization ? val.organization : "",
                "course_name": val.course_name ? val.course_name : "",
                "responsible_person": val.responsible_person ? val.responsible_person : "",
                "course_start_date": (val.course_start_date) ? utcTOLocal(val.course_start_date, "YYYY-MM-DD") : null,
                "course_end_date": val.course_end_date ? utcTOLocal(val.course_end_date, "YYYY-MM-DD") : null,
                "certificate_issue_date": val.certificate_issued_date ? utcTOLocal(val.certificate_issued_date, "YYYY-MM-DD") : null,
                "certificate_expiry_date": val.certificate_expiry_date ? utcTOLocal(val.certificate_expiry_date, "YYYY-MM-DD") : null,
                "doc": val.files ? val.files : [],
                "contact": contactListData(val?.training_contact_details ?? [], masters),
                "address": addressListData(val?.training_address ?? [], masters)
            }
            trainingList.push(trainingListData)
        })
    }

    let jobList = [];
    if (data.job_experience && data.job_experience?.length > 0) {
        data.job_experience.map(val => {
            let jobListData = {
                "organization": val.organization ? val.organization : "",
                "department": val.department ? val.department : "",
                "designation": val.designation ? val.designation : "",
                "role": val.role ? val.role : "",
                "start_date": val.start_date ? utcTOLocal(val.start_date, "YYYY-MM-DD") : null,
                "end_date": val.end_date ? utcTOLocal(val.end_date, "YYYY-MM-DD") : null,
                "reporting_to": val.report_to ? val.report_to : "",
                "grade": val.grade ? val.grade : "",
                "pay_scale": val.pay_scale ? val.pay_scale : "",
                "job_description": val.job_description ? val.job_description : "",
                "doc": val.files ? val.files : [],
                "sequence_no": val.sequence_no ? val.sequence_no : "",
                "contact": contactListData(val.jobexperience_contact_details, masters),
                "address": addressListData(val.jobexperience_address, masters)
            }
            jobList.push(jobListData)
        })
    }

    let awardsList = [];
    if (data.achievements_awards_details && data.achievements_awards_details?.length > 0) {
        data.achievements_awards_details.map(val => {
            let awardsListData = {
                "organization": val.organization ? val.organization : "",
                "type": val.type ? val.type : "",
                "title": val.title ? val.title : "",
                "notes": val.note ? val.note : "",
                "date": (val.date) ? utcTOLocal(val.date, "YYYY-MM-DD") : null,
                "doc": val.files ? val.files : []
            }
            awardsList.push(awardsListData)
        })
    }
    let json = {
        identification: identifier,
        names: nameslist ? nameslist : [{}],
        details: {
            "practitoner_id": data.practitioner_id,
            "gender": (data.gender?.length > 0 && masters.gender.filter(idlabel => idlabel.value === data.gender[0]._id)[0]) ? masters.gender.filter(idlabel => idlabel.value === data.gender[0]._id)[0] : {},
            "dob": data.birthDate ? moment.unix(data.birthDate).format("YYYY-MM-DD") : null,
            "marital_status": (data.marital_status?.length > 0 && masters.marital_status.filter(idlabel => idlabel.value === data.marital_status[0]._id)[0]) ? masters.marital_status.filter(idlabel => idlabel.value === data.marital_status[0]._id)[0] : {},
            "nationality": (data.nationality?.length > 0 && masters.nationality.filter(idlabel => idlabel.value === data.nationality[0]._id)[0]) ? masters.nationality.filter(idlabel => idlabel.value === data.nationality[0]._id)[0] : {},
            "status": data.status,
            "biography_description": (data.biography && data.biography[0] && data.biography[0].biography_description) ? data.biography[0].biography_description : "",
            "photo": {
                "fileName": (data.photo && data.photo[0] && data.photo[0].fileName) ? data.photo[0].fileName : "",
                "fileid": (data.photo && data.photo[0] && data.photo[0].fileid) ? data.photo[0].fileid : "",
                "filetype": (data.photo && data.photo[0] && data.photo[0].filetype) ? data.photo[0].filetype : "",
                "objectid": (data.photo && data.photo[0] && data.photo[0].objectid) ? data.photo[0].objectid : "",
            }
        },
        practitioner_description: {
            "practitioner_type": (data.practitioner_type && data.practitioner_type?.length > 0) ? getOptionWithMaster(data.practitioner_type)[0] ? getOptionWithMaster(data.practitioner_type)[0] : {} : {},
            "position": (data.position && data.position?.length > 0) ? getOptionWithMaster(data.position)[0] ? getOptionWithMaster(data.position)[0] : {} : {},
            "employee_type": (data.employee_status && data.employee_status?.length > 0) ? getOptionWithMaster(data.employee_status)[0] ? getOptionWithMaster(data.employee_status)[0] : {} : {},
            "communication_languages": getlanguageoptions
        },
        practitionerbyrole: practitionerbyrolelist,
        // communication: {},
        contact: contactlist,
        // Submitrole: {},
        address: addresslist,
        publication: PublicationList,
        // reporting: {},
        qualification: qualificationList,
        training: trainingList,
        job: jobList,
        awards: awardsList
    }
    return json;
}