/**
 * @author AUTHOR_NAME
 * @email AUTHOR_EMAIL
 * @create date
 * @modify date
 * @desc Collection of all helper functions.
 */

import Config from "../config";
import moment from "moment";
import { fromUnixTime, format } from "date-fns";

// import { toast } from "react-toastify";


// export const ToastMessage = (message, severity, position) => {
//   toast(message, {
//     position: position ?? "top-right",
//     hideProgressBar: false,
//     closeOnClick: true,
//     pauseOnHover: true,
//     draggable: true,
//     type: severity,
//   });
// };

/**
 * Object with role as key and value, which is used for
 * comparison of role in different place.
 */
export const UserRoles = {
  role: "role",
};

/**
 * Object which has the proper name of all the role
 * used in the application.
 */
export let UserRolesName = {
  role: "Role",
};

/**
 * Object which has the different themes used in
 * the application.
 */
export let Themes = {
  default: "default",
  dark: "dark",
  darkgreen: "darkgreen",
  defaultgreen: "defaultgreen",
  darkpurple: "darkpurple",
  defaultpurple: "defaultpurple",
};

/**
 * Object which has the different props for the Alert Component (/src/component/alert)
 * which is used via AlertContext (/src/contexts) and provided at /src/App.alert.js.
 */
export let AlertProps = {
  vertical: {
    top: "top",
    bottom: "bottom",
  },
  horizontal: {
    left: "left",
    right: "right",
    center: "center",
  },
  severity: {
    success: "success",
    error: "error",
    warning: "warning",
    info: "info",
  },
};

/**
 * Object which has the different props for the Drawer Component (/src/App.drawer.js)
 * which is used via DrawerContext (/src/contexts) and provided at /src/App.drawer.js.
 */
export const DrawerProps = {
  direction: {
    top: "top",
    bottom: "bottom",
    left: "left",
    right: "right",
  },
  variant: {
    permanent: "permanent",
    persistent: "persistent",
    temporary: "temporary",
  },
};

/**
 * Object has the key and value pair of all the keys which
 * are used to store some values in the local storage.
 */
export let LocalStorageKeys = {
  authToken: "auth_token",
  version: "version",
};

/**
 * Object has the key and value pair of all the HTTP method
 * used for an network call.
 */
export let NetWorkCallMethods = {
  get: "GET",
  post: "POST",
  put: "PUT",
  delete: "DELETE",
  update: "UPDATE",
};

/**
 * The below function convert the normal array of object to
 * {label: "",value:1} pair which is suitable for React Select
 * component.
 */
export let ConvertToReactSelect = (data, valueKey, labelKey) => {
  if (!data || !data?.length) {
    return [];
  }

  return data.map((val) => {
    return {
      ...val,
      value: val[valueKey],
      label: val[labelKey],
    };
  });
};

/**
 * The below function convert the uploaded file to base64 file.
 */
export let ToBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

/**
 * The below function capitalize the given string.
 */
export let CapitalizeString = (string) => {
  if (!string) {
    return string;
  }
  return string.charAt(0).toUpperCase() + string.slice(1);
};

/**
 * The below function convert the HEX code to RGBA
 */
export let ConvertHexToRGBA = (hex, opacity) => {
  if (hex) {
    let tempHex = hex.replace("#", "");
    let r = parseInt(tempHex.substring(0, 2), 16);
    let g = parseInt(tempHex.substring(2, 4), 16);
    let b = parseInt(tempHex.substring(4, 6), 16);

    return `rgba(${r},${g},${b},${opacity / 100})`;
  }
  return null;
};

/**
 * The below function will open an document node in a full screen.
 */
export let OpenFullScreen = (id) => {
  let elem = document.getElementById(id);
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.mozRequestFullScreen) {
    /* Firefox */
    elem.mozRequestFullScreen();
  } else if (elem.webkitRequestFullscreen) {
    /* Chrome, Safari & Opera */
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) {
    /* IE/Edge */
    elem.msRequestFullscreen();
  }
};

/**
 * The below function will close the full screen of an document
 * node.
 */
export let CloseFullScreen = (id) => {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  } else if (document.mozCancelFullScreen) {
    document.mozCancelFullScreen();
  } else if (document.msExitFullscreen) {
    document.msExitFullscreen();
  }
};

/**
 * The below function will scroll the page to the Top.
 */
export let ScrollToTop = () => {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
};

export const makeName = (nameObj = {}) => {
  const {
    prefix = "",
    given = "",
    text = "",
    suffix = "",
    family = "",
  } = nameObj;
  let prefixVal = prefix?.coding?.[0]?.display || prefix?.display || "";
  let suffixVal = suffix?.coding?.[0]?.display || suffix?.display || "";
  return `${prefixVal && prefixVal + "."}${text && text + " "}${
    given && given + " "
  }${(family ?? "") + " "}${suffixVal ?? ""}`;
};

export const makeNameForPract = (nameObj = {}) => {
  const {
    prefix = "",
    given = "",
    text = "",
    suffix = "",
    family = "",
  } = nameObj;
  let prefixVal = prefix?.[0]?.display || "";
  let suffixVal = suffix?.[0]?.display || "";
  return `${prefixVal && prefixVal + "."}${text && text + " "}${
    given && given + " "
  }${family && family + " "}${suffixVal && suffixVal}`;
};

export const getImgUrl = (fileId) =>
  fileId ? `${Config.downloadUrl}${fileId}` : "";

export const Logout = () => {
  sessionStorage.clear();
  localStorage.clear();
  window.location.replace("/login");
};

export const UploadFun = async (file) => {
  return new Promise(async (resolve, reject) => {
    let formData = new FormData();
    formData.append("files", file);
    await fetch(Config.uploadUrl, {
      method: "POST",
      body: formData,
      redirect: "follow",
    })
      .then((response) => response.json())
      .then((res) => {
        resolve({
          fileid: res.fileid,
          fileName: file.name,
          filetype: file.type,
          objectid: res.objectid,
          date: file?.lastModified,
        });
      })
      .catch((err) => {
        resolve({});
      });
  });
};

export const uploadFileList = (fileList) => {
  return new Promise(async (resolve, reject) => {
    if (!fileList && !Array.isArray(fileList)) {
      resolve([]);
      return;
    }
    let calls = fileList.map(async (file) => {
      return await UploadFun(file);
    });
    Promise.all(calls)
      .then((data) => {
        let dataList = [];
        data.map((val) => {
          if (val.fileid) {
            dataList.push({
              fileid: val.fileid,
              filetype: val.filetype,
              objectid: val.objectid,
              fileName: val.fileName,
              date: val?.date?.toString(),
            });
          }
          return false;
        });
        resolve(dataList);
      })
      .catch((err) => {
        resolve([]);
        console.log(err);
      });
  });
};

export function getOrderName(val = {}, loggedName) {
  const { accessionNum, userName } = val;
  if (accessionNum) {
    if (accessionNum === loggedName) {
      return accessionNum + " (You)";
    }
    return accessionNum;
  }

  if (userName) {
    if (userName === loggedName) {
      return userName + " (You)";
    }
    return userName;
  }
  return loggedName + " (You)";
}

export const GenerateLabelPayload = (
  // patientInfo,
  // vitals,
  // allergies,
  // diagnosis,
  // orderLine
  data
) => {
  let payload = {
    reportid: `${process.env.REACT_APP_PRESCRIPTION_PRINT}`,
    inputparams: {},
    result: [
      {
        Mandatory: { ...data },
      },
    ],
    // result: [
    //   {
    //     Mandatory: {
    //       MRN: patientInfo.alias,
    //       PatientName: makeName(patientInfo?.name?.[0]),
    //       Height: JSON.stringify(
    //         vitals?.component.find((val) => val.obscode === "HEIGHT")?.obsvalue
    //       ),
    //       Weight: JSON.stringify(
    //         vitals?.component.find((val) => val.obscode === "WEIGHT")?.obsvalue
    //       ),
    //       Sex: patientInfo?.gender?.display ?? "",
    //       DateOfBirth: patientInfo?.birthDate,
    //       Allergy: allergies?.map((val) => {
    //         return val?.shortdesc;
    //       }) ?? [""],
    //       Diagnosis: diagnosis?.map((val) => {
    //         return val?.icdshortname;
    //       }),
    //       HospitalLogo: "10012",
    //       PolicyDetails: "",
    //       RxDate_format: TimeFormatConversion(
    //         moment().unix(),
    //         getFormatForDateTimePicker("date")
    //       ), //TimeFormatConversion(moment().unix()),
    //       Orderline: getOrderLine(orderLine),
    //     },
    //     optional: {},
    //   },
    // ],
  };

  return payload;
};

const getOrderLine = (orderLine) => {
  let ConstructOrder = {};
  orderLine.forEach((val) => {
    let feqCode = val?.prescripionTypeName;
    if (feqCode in ConstructOrder) {
      // let ConstructedRxitem = getRxItems(orderLine);
      // ConstructOrder[val?.prescripionTypeName].RxItems = [
      //   ...ConstructOrder[val?.prescripionTypeName].RxItems,
      // ];
      return;
    } else {
      ConstructOrder[val?.prescripionTypeName] = {
        RxType: val?.prescripionTypeName ?? "",
        RxItems: getRxItems(orderLine, feqCode),
      };
    }
  });
  return Object.values(ConstructOrder);
};

const getRxItems = (rxItems, feqCode) => {
  return rxItems
    ?.map((val) => {
      if (feqCode === val?.prescripionTypeName) {
        return {
          Rx: val?.name,
          Route: val?.routeCode,
          Dose: val?.doseStrength,
          Frequency: val?.dosageFreqCode,
          Duration: val?.dosageDurationValue,
          StartDate_format: TimeFormatConversion(val?.occurStartDateTime),
          ScheduleTable: val?.pH_OrderLinePerdoseSchedule?.map((v) => {
            return {
              Schedule: v?.doseday,
              scdose: JSON.stringify(v?.dose),
              scfrequency: moment(v?.dosedate).format("DD/MM/YYYY"),
            };
          }),
        };
      }
    })
    .filter((notUndefined) => notUndefined !== undefined);
};

export const getEntityTypeCode = (type) => {
  switch (type) {
    case "OT002": // Organization
      return "OT001"; // Enterprise
    case "OT003": // Facility
      return "OT002"; // Organization
    default:
      break;
  }
};

export const valitationFunc = (state, list) => {
  let error = false;
  let errorState = {};
  list.forEach((val) => {
    if (state[val] === null || state[val] === undefined) {
      errorState[val] = true;
      error = true;
    } else {
      if (typeof state[val] === "string") {
        if (!state[val]) {
          errorState[val] = true;
          error = true;
        }
      } else if (typeof state[val] === "object") {
        if (Array.isArray(state[val])) {
          if (state[val]?.length === 0) {
            errorState[val] = true;
            error = true;
          }
        } else {
          if (Object.keys(state[val])?.length === 0) {
            errorState[val] = true;
            error = true;
          }
        }
      }
    }
  });

  return {
    error,
    errorState,
  };
};

export const validationForm = (list, states) => {
  let error = false;
  let errorState = {};
  list.forEach((val) => {
    if (val.required) {
      if (
        val?.componet_type !== "select" &&
        states[val?.state_name]?.length === 0
      ) {
        errorState[val.state_name] = true;
      } else if (val?.componet_type === "select") {
        if (
          states[val?.state_name]
            ? Object.keys(states[val?.state_name])?.length === 0
            : true
        )
          errorState[val.state_name] = true;
      } else if (val?.componet_type === "textField_select") {
        if (
          states[val?.state_name]?.type
            ? Object.keys(states[val?.state_name]?.type)?.length === 0
            : true
        ) {
          errorState[val.state_name] = true;
        }
        if (states[val?.state_name]?.value?.length === 0) {
          errorState[val.state_name] = true;
        }
      }
    } else {
      errorState[val.state_name] = false;
    }
  });
  if (
    errorState &&
    Object.keys(errorState).length > 0 &&
    Object.keys(errorState).filter((val) => errorState[val] === true).length > 0
  ) {
    error = true;
  } else {
    error = false;
  }
  return {
    error,
    errorState,
  };
};

export const uploadImage = (fileList) => {
  return new Promise(async (resolve, reject) => {
    if (!fileList && !Array.isArray(fileList)) {
      resolve([]);
      return;
    }
    let calls = fileList.map(async (file) => {
      return await UploadFun(file);
    });
    Promise.all(calls)
      .then((data) => {
        let dataList = [];
        data.map((val) => {
          if (val.fileid) {
            dataList.push({
              fileid: val.fileid,
              filetype: val.filetype,
              objectid: val.objectid,
              filename: val.fileName,
            });
          }
          return false;
        });

        resolve(dataList);
      })
      .catch((err) => {
        resolve([]);
        console.log(err);
      });
  });
  // fetch("http://164.52.210.54:5000/primarycare/11", requestOptions)
};

export let checkError = (data) => {
  const isError = data?.error || data?.data?.error;
  let errMsg = "Something went wrong! Try Again.";
  if (
    data?.data?.error ||
    data?.data?.errorMessage ||
    data?.data?.error_description
  ) {
    if (typeof data?.data?.error === "string") {
      errMsg =
        data?.data?.error ||
        data?.data?.errorMessage ||
        data?.data?.error_description;
    } else {
      errMsg = data?.data?.errorMessage || data?.data?.error_description;
    }
  }
  if (errMsg === "invalid_grant" || errMsg === "Invalid user credentials") {
    errMsg = "Invalid OTP";
  }
  return {
    isError: !!isError,
    errMsg,
  };
};

export const getTimeSlot = (date, type = "date", isUpdate = false) => {
  const currentTime = new Date();
  let comparedate = date;
  if (type === "unix") {
    comparedate = convertTime(date, type, "DD-MM-YYYY");
  }
  let time = 0;
  // if (!date) {
  //   comparedate = this.state.date;
  // }
  if (moment().format("DD-MM-YYYY") === comparedate || isUpdate) {
    let currentHour = currentTime.getHours();
    if (isUpdate) {
      currentHour = new Date(date * 1000).getHours();
    }
    if (currentHour <= 12) {
      time = 0;
    } else if (currentHour > 12 && currentHour <= 15) {
      time = 1;
    } else if (currentHour > 15 && currentHour <= 18) {
      time = 2;
    } else {
      time = 3;
    }
  }
  return time;
};

export const getTimeString = (hour, minutes) => {
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  if (hour === 0) {
    return `12:${minutes} AM`;
  }
  if (hour === 12) {
    return `12:${minutes} PM`;
  }
  if (hour <= 11) {
    if (hour < 10) {
      hour = `0${hour}`;
    }
    return `${hour}:${minutes} AM`;
  }
  return `${hour - 12 < 10 ? "0" : ""}${hour - 12}:${minutes} PM`;
};

export const convertTime = (time, inputFormat, outputFormat, type = "date") => {
  if (type === "date") {
    if (inputFormat !== "unix") {
      return moment(time, inputFormat).format(outputFormat);
    }
    const date = new Date(time * 1000);
    return moment(date).format(outputFormat);
  }
  if (type === "diff") {
    if (inputFormat === "unix") {
      return moment().diff(moment.unix(time), outputFormat);
    }
  }
  return moment().diff(moment(time, inputFormat), outputFormat);
};

export const isIntegerValue = (value) => {
  const integerPattern = /^[0-9]*$/;
  return integerPattern.test(value);
};

export const validationFormEnbty = (list, states) => {
  let error = false;
  let errorState = {};

  list.forEach((val) => {
    // if (val.required) {
    if (
      val?.componet_type !== "select" &&
      states[val?.state_name]?.length > 0
    ) {
      errorState[val.state_name] = false;
    } else if (val?.componet_type === "select") {
      if (
        states[val?.state_name]
          ? Object.keys(states[val?.state_name])?.length > 0
          : false
      )
        errorState[val.state_name] = false;
    } else if (val?.componet_type === "textField_select") {
      if (
        states[val?.state_name]?.type
          ? Object.keys(states[val?.state_name]?.type)?.length > 0
          : false
      ) {
        errorState[val.state_name] = false;
      }
      if (states[val?.state_name]?.value?.length > 0) {
        errorState[val.state_name] = false;
      }
    } else if (val?.componet_type === "date") {
      if (states[val?.state_name] ? states[val?.state_name] : false)
        errorState[val.state_name] = false;
    }
    // }
  });

  if (
    errorState &&
    Object.keys(errorState).length > 0 &&
    Object.keys(errorState).filter((val) => errorState[val] === false).length >
      0
  ) {
    error = false;
  } else {
    error = true;
  }

  return {
    error,
    errorState: [],
  };
};

export const treeData = [
  {
    id: 1,
    name: "Apollo group of hospitals",
    checkedValue: "unchecked",
    children: [
      {
        id: 2,
        name: "Apollo hospitals - India",
        checkedValue: "unchecked",
        children: [
          {
            id: 3,
            name: "Apollo hospitals - India",
            checkedValue: "unchecked",
          },
          {
            id: 4,
            name: "Apollo hospitals - India",
            checkedValue: "unchecked",
          },
        ],
      },
      {
        id: 5,
        name: "Apollo hospitals - China",
        checkedValue: "unchecked",
      },
      {
        id: 6,
        name: "Apollo hospitals - Canada",
        checkedValue: "unchecked",
      },
      {
        id: 7,
        name: "Apollo hospitals - USA",
        checkedValue: "unchecked",
      },
      {
        id: 8,
        name: "Apollo hospitals - Japan",
        checkedValue: "unchecked",
      },
      {
        id: 9,
        name: "Apollo hospitals - Brazil",
        checkedValue: "unchecked",
      },
      {
        id: 10,
        name: "Apollo hospitals - France",
        checkedValue: "unchecked",
      },
    ],
  },
];
export const TimeFormatConversion = (date, formatPattern) => {
  debugger;
  if (!date) {
    return;
  }
  let Ndate = new Date();
  if (typeof date === "number") {
    // Ndate = moment.unix(date);
    Ndate = fromUnixTime(date);
  } else {
    Ndate = Ndate;
  }

  let fmt = formatPattern ? formatPattern : "dd/MM/yyyy";
  if (formatPattern) {
    return format(new Date(Ndate), fmt);
  } else {
    return format(new Date(Ndate), fmt);
  }
};

// Check the versions
export let semverGreaterThan = (versionA, versionB) => {
  const versionsA = versionA ? versionA.split(/\./g) : ["0", "0", "0"];
  const versionsB = versionB ? versionB.split(/\./g) : ["0", "0", "0"];

  while (versionsA.length || versionsB.length) {
    const a = Number(versionsA.shift());

    const b = Number(versionsB.shift());
    // eslint-disable-next-line no-continue
    if (a === b) continue;
    // eslint-disable-next-line no-restricted-globals
    return a > b || isNaN(b);
  }
  return false;
};

// Refresh the cache by clearing the cache and reload
export const refreshCacheAndReload = async () => {
  if (caches) {
    // Service worker cache should be cleared with caches.delete()
    const names = await caches.keys();
    const promArr = [];
    for (const name of names) {
      promArr.push(caches.delete(name));
    }
    await Promise.all(promArr);
  }
  // delete browser cache and hard reload
  window.location.reload(true);
};
export const optionsFormatter = (options = [], labelKey, valueKey = "_id") => {
  return options.map((option) => {
    return {
      ...option,
      label: option?.[labelKey],
      value: option?.[valueKey],
    };
  });
};

export const getDifferenceByLeftArray = (arr1, arr2, prop) => {
  return arr1.filter((item) => arr2.indexOf(item) === -1);
};

export const UserInfo = (
  location,
  facilitystate,
  organisation,
  enterprise,
  rolestate,
  code,
  practitonerId,
  personId
) => {
  switch (code) {
    case "OT001":
      return {
        roleid: rolestate?._id,
        facilityid: facilitystate?._id,
        locationid: location?._id,
        orgid: organisation?._id,
        enterpriseid: enterprise?._id,
        practitionerid: practitonerId,
        personid: personId,
      };
    case "OT002":
      return {
        roleid: rolestate?._id,
        facilityid: facilitystate?._id,
        locationid: location?._id,
        orgid: organisation?._id,
        enterpriseid: organisation?.ParentOrgID?._id,
        practitionerid: practitonerId,
        personid: personId,
      };
    case "OT003":
      return {
        roleid: rolestate?._id,
        facilityid: facilitystate?._id,
        locationid: location?._id,
        orgid: facilitystate?.ParentOrgID?._id,
        enterpriseid: facilitystate?.Parentofparent?.[0]?._id,
        practitionerid: practitonerId,
        personid: personId,
      };
    default:
      return null;
  }
};

export const userInfoKeys = (
  location,
  facilitystate,
  organisation,
  enterprise,
  rolestate,
  code,
  practitonerId,
  personId
) => {
  switch (code) {
    case "OT001":
      return {
        role: rolestate,
        facility: facilitystate,
        location: location,
        org: organisation,
        enterprise: enterprise,
        practitioner: practitonerId,
        personid: personId,
      };
    case "OT002":
      return {
        role: rolestate,
        facility: facilitystate,
        location: location,
        org: organisation,
        enterprise: organisation?.ParentOrgID,
        practitioner: practitonerId,
        personid: personId,
      };
    case "OT003":
      return {
        role: rolestate,
        facility: facilitystate,
        location: location,
        org: facilitystate?.ParentOrgID,
        enterprise: facilitystate?.Parentofparent?.[0],
        practitioner: practitonerId,
        personid: personId,
      };
    default:
      return null;
  }
};
export const getFilteredData = (value, stateName, result, stateList) => {
  let data = null;
  if (result?.[value]) {
    data = stateList?.[stateName]?.data.filter(
      (val) => val.value === result[value]
    )[0];
  }
  if (
    !data &&
    (value === "ivInfusionRateUOM" || value === "ivInfusionTimeUom")
  ) {
    data = stateList.DurationType_masters.data.filter(
      (val) => val.label === "min"
    )[0];
  }
  if (!data && value === "priority") {
    data = stateList.Priority_masters.data.filter(
      (val) => val.label === "1"
    )[0];
  }
  if (!data && value === "presMode") {
    data = stateList.OrderMode_masters.data.filter(
      (val) => val.label === "Regular"
    )[0];
  }
  return data;
};

export const checkMaxDateValidation = (maxDate, value) => {
  let errorMessage = null;
  if (moment(value).diff(maxDate) >= 0) {
    return errorMessage;
  }
  return (errorMessage = `date must be ${moment(maxDate).format(
    "DD/MM/YYYY"
  )} or greater`);
};

export function getDateValue(value) {
  if (value === undefined) {
    return;
  } else if (value === null) {
    return;
  } else if (value == "") {
    return;
  }
}

//
export const CustomaddDays = (days) => {
  const newDate = new Date();
  newDate.setDate(newDate.getDate() + days);
  return newDate;
};

export const getFormatForDateTimePicker = (formatType) => {
  let orgFormat = "";
  if (localStorage.getItem("orgFormat") !== "undefined") {
    orgFormat = JSON.parse(localStorage.getItem("orgFormat"));
  } else {
    orgFormat = "";
  }
  //const orgFormat = JSON.parse(localStorage.getItem("orgFormat"));

  switch (formatType) {
    case "date":
      return (
        orgFormat?.orgdateformat?.shortdesc
          ?.replace(new RegExp("Y", "g"), "y")
          ?.replace(new RegExp("D", "g"), "d") ?? "dd/MM/yyyy"
      );

    case "time":
      return (
        orgFormat?.orgtimeformat?.shortdesc
          ?.replace(new RegExp("Y", "g"), "y")
          ?.replace(new RegExp("D", "g"), "d") ?? "HH:mm"
      );

    case "datetime":
      return (
        orgFormat?.orgdatetimeformat?.shortdesc
          ?.replace(new RegExp("Y", "g"), "y")
          ?.replace(new RegExp("D", "g"), "d") ?? "dd/MM/yyyy HH:mm"
      );

    default:
      return "dd/MM/yyyy";
  }
};

export const getDayDifference = (date1, date2) => {
  // let TodayDate = moment().startOf("day").unix();
  // if (TodayDate > occurStartDateTime) {
  //   date2 = date1;
  //   date1 = date2;
  // }
  const dayStart = moment(date1).startOf("day");
  const dayEnd = moment(date2).startOf("day");
  return dayEnd.diff(dayStart, "days");
};

// // Replace all in a string. e.g dd/mm/YYYY to dd/mm/yyyy
// export const replaceAll = (str, find, replace) => {
//   return str.replace(new RegExp(find, "g"), replace);
// }

export const FrequencyFieldsByScheduleType = (type) => {
  switch (type) {
    case "DBA":
      return ["Day", "Base schedule", "Remarks"];
    case "UDE":
      return ["Base schedule", "From Day", "To Day", "Dosage", "Remarks"];
    case "DET":
      return ["Time", "Remarks"];
    case "INT":
    case "SEQ":
      return ["Base schedule", "Remarks"];
    default:
      return [
        "Day",
        "Time",
        "Base schedule",
        "Start date",
        "End date",
        "Dosage",
        "Remarks",
      ];
  }
};

export const FrequencyDetailsByScheduleType = (FreqDetls) => {
  let data = FreqDetls?.map((v) => {
    return {
      Day: v?.weekDay ? v?.weekDay : "-",
      Time: v?.time ? v?.time : "-",
      "Base schedule": v?.baseFreq ?? "-",
      "Start date":
        v?.fromDate === 0
          ? "-"
          : moment(v?.fromDate * 1000).format("DD-MM-YYYY"),

      "End date":
        v?.toDate === 0 ? "-" : moment(v?.toDate * 1000).format("DD-MM-YYYY"),
      Dosage: v?.dose ? v?.dose : "-",
      "From Day": v?.fromDay,

      "To Day": v?.toDay,
      Remarks: v?.remarks ?? "-",
    };
  });
  return data;
};

export const SCHEDULE_TYPES = {
  DBA: "Day Based",
  DET: "Detail",
  INT: "Interval",
  SEQ: "Sequential",
  UDE: "User Defined",
  TID: "Three times daily",
};

export function isIterable(obj) {
  // checks for null and undefined
  if (obj == null) {
    return false;
  }
  return typeof obj[Symbol.iterator] === "function";
}

export const checkDosageFulfilled = (drug) => {
  if (drug?.dosageValue === 0) {
    return true;
  }
  let Split = drug?.dosageUOM?.split("/");
  if (Split?.length > 1) {
    return true;
  } else {
    var num = 0;
    let totalDose = 0;
    const a = (drug?.brands || [])?.forEach((v) => {
      if (v?.dosageValue?.length > 0 && v.DrugType?.drugtype !== "DISPOSABLE") {
        v.dosageValue.map((c) => {
          totalDose += c;
        });
        // num = num + totalDose;
      }
    });
    return totalDose === drug?.dosageValue ? true : false;
  }
};

export const getBrand = (brands, compound, addtictive, isCompound, isIV) => {
  let Brands = [];
  if (brands?.length >= 0 && !isCompound) {
    Brands = [...brands];
  }
  if (compound?.length >= 0) {
    Brands = [...Brands, ...compound];
  }
  if (addtictive?.length >= 0 && isIV) {
    addtictive.forEach((val) => {
      Brands = [...Brands, ...val.brands];
    });
  }

  return Brands;
};

export const WEEKDAYS = [
  {
    label: "Sunday",
    value: "Sunday",
  },
  {
    label: "Monday",
    value: "Monday",
  },
  {
    label: "Tuesday",
    value: "Tuesday",
  },
  {
    label: "Wednesday",
    value: "Wednesday",
  },
  {
    label: "Thursday",
    value: "Thursday",
  },
  {
    label: "Friday",
    value: "Friday",
  },
  {
    label: "Saturday",
    value: "Saturday",
  },
];

export const getDateTime = () => {
  let date = new Date();
  let epochestr = Math.floor(date.getTime() / 1000);
  return epochestr.toString();
};

export const getCurrentDate = (Date) => {
  const today = Date;
  const yyyy = today.getFullYear();
  let mm = today.getMonth() + 1; // Months start at 0!
  let dd = today.getDate();

  if (dd < 10) dd = "0" + dd;
  if (mm < 10) mm = "0" + mm;

  const formattedToday = dd + "/" + mm + "/" + yyyy;
  return formattedToday;
};

export const getTmrwDate = () => {
  const tmrw = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
  return tmrw;
};

export const getTmrwDateformat = (Date) => {
  const today = new Date(Date + 24 * 60 * 60 * 1000);
  const yyyy = today.getFullYear();
  let mm = today.getMonth() + 1; // Months start at 0!
  let dd = today.getDate();

  if (dd < 10) dd = "0" + dd;
  if (mm < 10) mm = "0" + mm;

  const formattedToday = dd + "/" + mm + "/" + yyyy;
  return formattedToday;
};

export function todaydate() {
  var today = new Date();

  var dd = today.getDate();

  var mm = today.getMonth() + 1; //January is 0!

  var yyyy = today.getFullYear();

  if (dd < 10) {
    dd = "0" + dd;
  }

  if (mm < 10) {
    mm = "0" + mm;
  }

  return (yyyy + "-" + mm + "-" + dd).toString();
}