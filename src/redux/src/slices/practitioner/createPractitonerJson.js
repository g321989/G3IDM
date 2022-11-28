import moment from "moment";
import { getUtcTime } from "../../helpers";
import { dbName , METADATAID } from "../../settings";

// contact list common function 
const contactList = (data) => {
  let contactLists = [];
  if (data && data.length > 0) {
    data.map(val => {
      let contactData = {
        // "_id": "string",
        "system": val.mode ? val.mode.value : "",
        "value": val.mobile ? val.mobile : "",
        "use": val.use ? val.use.value : "",
        "rank": val.priority ? val.priority.value : "",
        "valueprefix": val.country_code ? val.country_code.value : "",
        "period": [
          {
            // "_id": "string",
            "start": getUtcTime(),
            "end": getUtcTime(moment().endOf('day')),
            // "id": "number"
          }
        ],
        // "id": "number"
      }
      contactLists.push(contactData);
    })
  }
  return contactLists;
}

// Address list
const addresslist = (data) => {
  let addLists = [];

  if (data && data.length > 0) {
    data.map(val => {
      let addressData = {
        // "_id": "string",
        "use": val.use ? val.use.value : '',
        "text": val.addressLine1 ? val.addressLine1 : "",
        "line": val.addressLine2 ? val.addressLine2 : "",
        "city": val.city ? val.city.value : '',
        "district": val.district ? val.district.value : "",
        "state": val.state ? val.state.value : "",
        "postalCode": val.pincode?._id ? val.pincode?._id : "",
        "country": val.country ? val.country.value : "",
        "latitude": "",
        "longitude": "",
        'Type': val.type ? val.type.value : ""
      }
      addLists.push(addressData);
    })
  }

  return addLists;
}

export const generateJSON = (data, _key, person_id, ID) => {
  

  //person id
  let personId = {};
  if (person_id >= 0) {
    personId = { "PersonID": person_id }
  }

  //  filter to update the practitioner
  let filter = {};
  if (_key) {
    filter = { "filter": { "_id": _key } };
  }

  let id = {}

  if (ID >= 0) {
    id = { id: ID }
  }

  // PRACTITIONER IDENTIFICATION
  let Identification = [];

  if (data.identification && data.identification.length > 0) {
    data.identification.map(val => {
      // var given = moment(val.expiry_date, "YYYY-MM-DD");
      // var current = moment().startOf('day');
      // var expiry_day = moment.duration(given.diff(current)).asDays();
      let data = {
        "IDType": val.id_type.value ? val.id_type.value : "",
        "IDNumber": val.id_number ? val.id_number : "",
        "ExpiryDate": val.expiry_date ? getUtcTime(moment(val.expiry_date)) : null,
        // doc
        // "files": val.doc ? val.doc : []
      }
      Identification.push(data)
    })

  }

  let identifierList = [];
  if (data.identification && data.identification.length > 0) {
    data.identification.map(val => {
      let data = {
        // "_id": "string",
        "user": val.id_type.value ? val.id_type.value : "",
        "system": "",
        "value": val.id_number ? val.id_number : "",
        "files": val.doc ? val.doc : [],
        "period": [
          {
            // "_id": "string",
            "start": getUtcTime(),
            "end": val.expiry_date ? getUtcTime(moment(val.expiry_date)) : null,
            // "id": "number"
          }
        ],
        // "assigner": "string",
        // "Type": "string",
        // "id": "number",
      }
      identifierList.push(data)
    })

  }

  // PRACTITIONER DETAILS
  let names = [];
  if (data.names && data.names.length > 0) {
    data.names.map(val => {
      let nameData = {
        // "_id": "string",
        "use": val.use ? val.use.value : "",
        "text": val.first_name ? val.first_name : "",
        "family": val.last_name ? val.last_name : "",
        "given": val.middle_name ? val.middle_name : "",
        "prefix": val.prefix ? val.prefix.value : "",
        "suffix": val.suffix ? val.suffix.value : "",
        "period": [
          {
            // "_id": "",
            "start": getUtcTime(),
            "end": getUtcTime(moment().endOf('day')),
            // "id": "number"
          }
        ]
      }
      names.push(nameData)
    })
  }

  // Practitioner Description
  let languagesList = [];
  if (data.practitioner_description && data.practitioner_description.communication_languages && data.practitioner_description.communication_languages.length > 0) {
    languagesList = data.practitioner_description.communication_languages.map(val => val.value);
  }

  // CONTACT DETAILS
  // contact list
  let contact = [];
  if (data.contact && data.contact.length > 0) {
    data.contact.map(val => {
      let contactData = {
        // "_id": "string",
        "system": val.mode ? val.mode.value : "",
        "value": val.mobile ? val.mobile : "",
        "use": val.use ? val.use.value : "",
        "rank": val.priority ? val.priority.value : "",
        "valueprefix": val.country_code ? val.country_code.value : "",
        "period": [
          {
            // "_id": "string",
            "start": getUtcTime(),
            "end": getUtcTime(moment().endOf('day')),
            // "id": "number"
          }
        ],
        // "id": "number"
      }
      contact.push(contactData);
    })
  }


  let practitioner_list = [];
  if (data.practitionerbyrole && data.practitionerbyrole.length > 0) {
    data.practitionerbyrole.map(val => {

      let key = {}
      let roleId = {};
      if (val?._key) {
        key = { _key: val?._key };
      } else {
        roleId = { id: 0 };
      }


      let practitionerData = {
        role: val.select_role ? val.select_role.value : "",
        active: val.status ? val.status : false,
        // "EntityName": val.entity_name ? val.entity_name.value : "",
        period: [
          {
            // "_id": "string",
            start: val.start_date ? getUtcTime(moment(val.start_date)) : null,
            end: val.end_date ? getUtcTime(moment(val.end_date)) : null,
            // "id": "number"
          },
        ],
        SpecialtyID: val.speciality ? val.speciality.value : "",
        EntityType: val.select_entity ? val.select_entity._id : "",
        OrgID: val.entity_name ? `${val.entity_name.value}` : "",
        EntityName: val.entity_name ? `${val.entity_name.value}` : "",
        locationID: val.select_location ? val.select_location.value : "",
        primary_specialty: val.primary_specialty
          ? val.primary_specialty
          : false,
        telecom: contactList(val.contact),
        files: val.doc ? val.doc : [],
        ...roleId,
        ...key,
      };
      practitioner_list.push(practitionerData);
    })
  }


  // Address
  let addressList = [];
  if (data.address && data.address.length > 0) {
    data.address.map(val => {
      let addressData = {
        // "_id": "string",
        "use": val.use ? val.use.value : '',
        "text": val.addressLine1 ? val.addressLine1 : "",
        "line": val.addressLine2 ? val.addressLine2 : "",
        "city": val.city ? val.city.value : '',
        "district": val.district ? val.district.value : "",
        "state": val.state ? val.state.value : "",
        "postalCode": val.pincode?._id ? val.pincode?._id : "",
        "country": val.country ? val.country.value : "",
        "latitude": "",
        "longitude": "",
        'Type': val.type ? val.type.value : ""
      }
      addressList.push(addressData);
    })
    // return addressList;
  }


  // Qualification
  let qualification_list = [];
  if (data.qualification && data.qualification.length > 0) {
    data.qualification.map(val => {
      let qualificationData = {
        "name": val.name ? val.name : "",
        "university_board": val.qualification_name ? val.qualification_name : "",
        "issue_date": val.issued_by ? getUtcTime(moment(val.issued_by)) : null,
        "valid_from": val.start_date ? getUtcTime(moment(val.start_date)) : null,
        "valid_to": val.end_date ? getUtcTime(moment(val.end_date)) : null,
        "files": val.doc ? val.doc : []
      }
      qualification_list.push(qualificationData);
    })
    // return qualification_list;
  }


  // Publication
  let publication_list = []
  if (data.publication && data.publication.length > 0) {
    data.publication.map(val => {
      let publicationData = {
        "description": val.description ? val.description : "",
        "link": val.link ? val.link : ""
      }
      publication_list.push(publicationData);
    })
    // return publication_list;
  }


  // Training
  let training_list = [];
  if (data.training && data.training.length > 0) {
    data.training.map(val => {
      let trainingData = {
        "organization": val.organization ? val.organization : "",
        "course_name": val.course_name ? val.course_name : "",
        "responsible_person": val.responsible_person ? val.responsible_person : "",
        "course_start_date": val.course_start_date ? getUtcTime(moment(val.course_start_date)) : null,
        "course_end_date": val.course_end_date ? getUtcTime(moment(val.course_end_date)) : null,
        "certificate_issued_date": val.certificate_issue_date ? getUtcTime(moment(val.certificate_issue_date)) : null,
        "certificate_expiry_date": val.certificate_expiry_date ? getUtcTime(moment(val.certificate_expiry_date)) : null,
        "files": val.doc ? val.doc : [],
        "training_contact_details": contactList(val.contact),
        "training_address": addresslist(val.address)
      }

      training_list.push(trainingData)
    })
    // return training_list;
  }


  // Job Experience
  let job_experience_list = [];
  if (data.job && data.job.length > 0) {
    data.job.map(val => {
      let jsobData = {
        "organization": val.organization ? val.organization : "",
        "department": val.department ? val.department : "",
        "designation": val.designation ? val.designation : "",
        "role": val.role ? val.role : "",
        "start_date": val.start_date ? getUtcTime(moment(val.start_date)) : null,
        "end_date": val.end_date ? getUtcTime(moment(val.end_date)) : null,
        "report_to": val.reporting_to ? val.reporting_to : "",
        "grade": val.grade ? val.grade : "",
        "pay_scale": val.pay_scale ? val.pay_scale : "",
        "job_description": val.job_description ? val.job_description : "",
        "files": val.doc ? val.doc : [],
        "sequence_no": val.sequence_no ? val.sequence_no : "",
        "jobexperience_contact_details": contactList(val.contact),
        "jobexperience_address": addresslist(val.address)
      }
      job_experience_list.push(jsobData)
    })
    // return job_experience_list;
  }


  // Acheivement/Awards
  let awardsList = [];
  if (data.awards && data.awards.length > 0) {
    data.awards.map(val => {
      let awardsData = {
        "organization": val.organization ? val.organization : "",
        "type": val.type ? val.type : "",
        "title": val.title ? val.title : "",
        "note": val.notes ? val.notes : "",
        "date": val.date ? getUtcTime(moment(val.date)) : null,
        "files": val.doc ? val.doc : []
      }
      awardsList.push(awardsData)
    })
    // return awardsList;
  }

  let json = [
    {
      "db_name": dbName,
      "entity": "Practitioner",
      "is_metadata": true,
      "metadataId": METADATAID,
      ...filter,
      "doc": {
        // "_id": "string",
        // "Identification": Identification,
        // "id": 0,
        ...id,
        "identifier": identifierList,
        "name": names,
        "gender": data.details.gender ? data.details.gender._id : "",
        "birthDate": data.details.dob ? moment(data.details.dob).unix() : null,
        "marital_status": data.details.marital_status ? data.details.marital_status.value : "",
        "status": data.details.status ? data.details.status : false,
        "nationality": data.details.nationality ? data.details.nationality.value : "",
        "active": true,
        // practitioner_description
        "practitioner_type": data.practitioner_description.practitioner_type ? data.practitioner_description.practitioner_type.value : "",
        "position": data.practitioner_description.position ? data.practitioner_description.position.value : "",
        "employee_status": data.practitioner_description.employee_type ? data.practitioner_description.employee_type.value : "",
        "communication": languagesList,
        // "practitioner_description": [
        //   {
        //     "communication_languages": languagesList,
        //   }
        // ],
        "telecom": contact,
        "practitioner_role": practitioner_list,
        "address": addressList,
        "qualification": qualification_list,
        "job_experience": job_experience_list,
        "achievements_awards_details": awardsList,
        "training_details": training_list,
        "publication_details": publication_list,
        "biography": [
          {
            "biography_description": data.details.biography_description ? data.details.biography_description : ""
          }
        ],
        "photo": [
          {
            // "_id": "string",
            "date": "",
            "url": "",
            // "id": "number",
            "fileName": (data.details.photo && data.details.photo.fileName) ? data.details.photo.fileName : "",
            "fileid": (data.details.photo && data.details.photo.fileid) ? data.details.photo.fileid : "",
            "filetype": (data.details.photo && data.details.photo.filetype) ? data.details.photo.filetype : "",
            "objectid": (data.details.photo && data.details.photo.objectid) ? data.details.photo.objectid : "",
          }
        ],
        "practitioner_id": data.details.practitoner_id ? data.details.practitoner_id : "",
        // "id": "number",
        // "PersonID": 0,
        ...personId
        // "PractitionerRoleID": 0,
        // "External": false,
        // "ReportingEntityType": "",
        // "ReportingEntityName": "",
        // "PrimarySpeciality": "",

      }
    }
  ]

  return json;
}