import axios from "axios";
import {config} from "../../src/config";
import { v4 as uuid } from "uuid";
export const Axios = (params) => {
  return new Promise((resolve, reject) => {
    axios(params)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
//create Roles
export const addRole = (token = "", name = "") => {
  return new Promise((resolve, reject) => {
    let myHeaders = {};

    let params = {
      name: name,
      composite: false,
      clientRole: false,
      containerId: config.secretKey,
    };
    myHeaders.Authorization = "Bearer " + token;
    myHeaders["Content-Type"] = "application/json";
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      data: params,
      redirect: "follow",
      url: `${config.keylock_url}/auth/admin/realms/${config.realm}/roles`,

      // url:`${config.keylock_url}/auth/admin/realms/${config.realm}/clients/${config.secretKey}/roles`
    };
    Axios(requestOptions)
      .then((res) => {
        resolve(res);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
//get RoleId
export const getRoleId = (token, roleName) => {
  return new Promise((resolve, reject) => {
    var myHeaders = {};
    myHeaders.Authorization = "Bearer " + token;

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
      url: `${config.keylock_url}/auth/admin/realms/${config.realm}/roles/${roleName}`,
    };

    Axios(requestOptions)
      .then((response) => resolve(response))
      .catch((error) => reject(error));
  });
};

//create users
export const addRolesToKeyClock = (token = "", roleName = "") => {
  return new Promise((resolve, reject) => {
    var myHeaders = { "Content-Type": "text/plain" };

    var raw = {
      name: roleName,
      composite: false,
      clientRole: false,
      containerId: "organization",
      attributes: {},
    };
    var encoded = btoa(JSON.stringify(raw));

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      data: encoded,
      redirect: "follow",
      url: `${config.keylock_url}/api/v1/createRealmRoles`,
    };

    return Axios(requestOptions)
      .then((res) => {
        resolve(res);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

//create users
export const addRolesForUser_KeyClock = (Uname = "", Rname = "") => {
  return new Promise((resolve, reject) => {
    var myHeaders = { "Content-Type": "text/plain" };

    var rawData = {
      username: Uname,
      rolesName: Rname,
    };
    var encoded = btoa(JSON.stringify(rawData));

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      data: encoded,
      redirect: "follow",
      url: `${config.keylock_url}/api/v1/assignUserRoles`,
    };

    return Axios(requestOptions)
      .then((res) => {
        resolve(res);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

//create users
export const addUserToKeyClock = (
  token = "",
  email = "",
  firstName = "",
  lastName = ""
) => {
  return new Promise((resolve, reject) => {
    var myHeaders = { "Content-Type": "text/plain" };

    // myHeaders.Authorization = "Bearer " + token;
    // myHeaders['Content-Type'] = "application/json";

    var raw = {
      username: email,
      enabled: true,
      //totp: false,
      emailVerified: false,
      firstName: email,
      lastName: email,
      email: email,
      disableableCredentialTypes: [],
      requiredActions: [],
      notBefore: 0,
      access: {
        manageGroupMembership: true,
        view: true,
        mapRoles: true,
        impersonate: true,
        manage: true,
      },
      //realmRoles: [], 
      realmRoles: ["mb-user"],
    };
    var encoded = btoa(JSON.stringify(raw));

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      data: encoded,
      redirect: "follow",
      url: `${config.keylock_url}/api/v1/orgUserRegistration`,

      // url:`${config.keylock_url}/auth/admin/realms/${config.realm}/users`
    };

    return Axios(requestOptions)
      .then((res) => {
        resolve(res);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

//delete roles
export const deleteRoleToKeyClock = (roleName = "") => {
  return new Promise((resolve, reject) => {
    var myHeaders = { "Content-Type": "text/plain" };

    // myHeaders.Authorization = "Bearer " + token;
    // myHeaders['Content-Type'] = "application/json";

    var raw = {
      name: roleName,
    };
    var encoded = btoa(JSON.stringify(raw));

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      data: encoded,
      redirect: "follow",
      url: `${config.keylock_url}/api/v1/deleteRealmRoles`,

      // url:`${config.keylock_url}/auth/admin/realms/${config.realm}/users`
    };

    return Axios(requestOptions)
      .then((res) => {
        resolve(res);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

//update role
export const updateRoleKeyClock = (newRoleName = "", oldRoleName = "") => {
  return new Promise((resolve, reject) => {
    var myHeaders = { "Content-Type": "text/plain" };

    // myHeaders.Authorization = "Bearer " + token;
    // myHeaders['Content-Type'] = "application/json";

    var raw = {
      newRolesName: newRoleName,
      oldRolesName: oldRoleName,
    };
    var encoded = btoa(JSON.stringify(raw));

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      data: encoded,
      redirect: "follow",
      url: `${config.keylock_url}/api/v1/updateRealmRoles`,

      // url:`${config.keylock_url}/auth/admin/realms/${config.realm}/users`
    };

    return Axios(requestOptions)
      .then((res) => {
        resolve(res);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
//delete users
export const deleteUserToKeyClock = (email = "") => {
  return new Promise((resolve, reject) => {
    var myHeaders = { "Content-Type": "text/plain" };

    // myHeaders.Authorization = "Bearer " + token;
    // myHeaders['Content-Type'] = "application/json";

    var raw = {
      username: email,
    };
    var encoded = btoa(JSON.stringify(raw));

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      data: encoded,
      redirect: "follow",
      url: `${config.keylock_url}/api/v1/deleteOrgUser`,

      // url:`${config.keylock_url}/auth/admin/realms/${config.realm}/users`
    };

    return Axios(requestOptions)
      .then((res) => {
        resolve(res);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

//UPDATE users
export const updateUserToKeyClock = (userName) => {
  return new Promise((resolve, reject) => {
    var myHeaders = { "Content-Type": "text/plain" };

    var raw = {
      username: userName,
      enabled: true,
      emailVerified: true,
      firstName: userName,
      lastName: userName,
      email: userName,
      disableableCredentialTypes: [],
      requiredActions: [],
      notBefore: 0,
      access: {
        manageGroupMembership: true,
        view: true,
        mapRoles: true,
        impersonate: true,
        manage: true,
      },
      realmRoles: ["mb-user"],
    };
    var encoded = btoa(JSON.stringify(raw));

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      data: encoded,
      redirect: "follow",
      url: `${config.keylock_url}/api/v1/updateOrgUser`,
    };

    return Axios(requestOptions)
      .then((res) => {
        resolve(res);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const getUserId = (token, emailId) => {
  return new Promise((resolve, reject) => {
    var myHeaders = {};
    myHeaders.Authorization = "Bearer " + token;

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
      url: `${config.keylock_url}/auth/admin/realms/${config.realm}/users?username=${emailId}`,
    };

    Axios(requestOptions)
      .then((response) => resolve(response))
      .catch((error) => reject(error));
  });
};

export const updateUser = (token, userId, email) => {
  return new Promise((resolve, reject) => {
    var myHeaders = {};
    myHeaders.Authorization = "Bearer " + token;
    myHeaders["Content-Type"] = "application/json";

    var raw = { email: email, username: email };

    var requestOptions = {
      method: "PUT",
      headers: myHeaders,
      data: raw,
      redirect: "follow",
      url: `${config.keylock_url}/auth/admin/realms/${config.realm}/users/${userId}`,
    };

    Axios(requestOptions)
      .then((result) => resolve(result))
      .catch((error) => reject(error));
  });
  // if (!userId) {
  //     return false;
  // }
};
//insert document to arango
export const upsertDocument = (params) => {
  return new Promise((resolve, reject) => {
    let dataList = {
      db_name: config.databaseName,
      entity: params.entity,
      is_metadata: true,
      metadataId: params.metadataId,
      doc: {
        // [params.upsertNameKeyId]: params.upsertNameValue,
        ...params.list,
      },
    };
    if (params.isedit) {
      dataList.filter = {
        [params.keyvalue]: params.id,
      };
    }
    let data = JSON.stringify([dataList]);
    let config = {
      method: "post",
      url: `${config.api_url}/api/upsert_document`,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };
    Axios(config)
      .then((response) => {
        resolve(response);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

//read document from arango database

export const readDocument = (params) => {
  return new Promise((resolve, reject) => {
    let data = {
      db_name: `${config.databaseName}`,
      entity: `${params.entity}`,
      // filter: `${params.entity}.${params.filterId} == '${params.filterValue}'`,
      return_fields: `{${params.entity}}`,
    };
    
    if(params.entity === "Person"){
      data.return_fields = "Merge(Person, {name: (for n in HumanNameMaster filter Person.name any == n._id return n)},{telecom: (for n in ContactPointMaster filter Person.telecom any == n._id return n)})" 
    }
   
    if(params.entity === "CodeableConceptMaster"){
      data.filter = "CodeableConceptMaster.Type=='PRACTROLE'";
 
       data.return_fields= "MERGE(CodeableConceptMaster,{coding:(for cod IN TO_ARRAY(CodeableConceptMaster.coding) RETURN DOCUMENT(cod))})"
      // data.return_fields = "{PractitionerRole:MERGE(PractitionerRole,{code:(FOR codab IN TO_ARRAY(PractitionerRole.code) RETURN MERGE(DOCUMENT(codab),{coding:(FOR cod IN DOCUMENT(codab).coding RETURN DOCUMENT(cod))})  )})}"
    }
    
    if (params?.isfilter) {
      if(params.entity==='PermissionRoleMapping' || params.entity==='Practitioner'){
        data.filter = `${params.entity}.${params.filterName} == ${params.filterValue}`;

      } else{
      data.filter = `${params.entity}.${params.filterName} == '${params.filterValue}'`;
      }
    }
    let config = {
      method: "post",
      url: `${config.api_url}/api/read_documents`,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };
    Axios(config)
      .then((res) => {
        resolve(res);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
//get practiesner role

export const getPractioner = (params) => {
  return new Promise((resolve, reject) => {
    let data = {
      db_name: `${config.databaseName}`,
      entity: `Practitioner,PractitionerRole`,
      filter : `Practitioner.PractitionerRoleID==PractitionerRole.id and Practitioner.PersonID==${params.personId}`,
      return_fields: `{Practitioner:MERGE(PractitionerRole,{code:(FOR codab IN TO_ARRAY(PractitionerRole.code) RETURN MERGE(DOCUMENT(codab),{coding:(FOR cod IN DOCUMENT(codab).coding RETURN DOCUMENT(cod))})  )})}`,
    };
    

    
    // if (params?.isfilter) {
    //   data.filter = `Practitioner.PractitionerRoleID==PractitionerRole.id and Practitioner.PersonID==${params.personId}`;
    // }
    let config = {
      method: "post",
      url: `${config.api_url}/api/read_documents`,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };
    Axios(config)
      .then((res) => {
        resolve(res);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
export const deleteDocument = (params) => {
  return new Promise((resolve, reject) => {
    let data = {
      db_name: `${config.databaseName}`,
      entity: `${params.entity}`,
      // filter: `${params.entity}.${params.filterId} == '${params.filterValue}'`,
      return_fields: `{${params.entity}}`,
    };
    if(params.entity==='Practitioner' || params.entity==='PractitionerRole'){
      data.filter = `${params.entity}.${[params.keyvalue[0]]}==${params.id[0]}`;

    }  else {
      data.filter = `${params.entity}.${[params.keyvalue[0]]}=='${params.id[0]}'`;

    }
    let config = {
      method: "post",
      url: `${config.api_url}/api/delete_document`,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };
    Axios(config)
      .then((res) => {
        resolve(res);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
