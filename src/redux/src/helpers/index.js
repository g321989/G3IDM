import { defaultReject } from "../settings/commonSchema";
import { __baseUrl__, __readDocumentUrl__ } from "../settings";
import moment from "moment";
import { tenantid } from "../settings/url";
const validateNetworError = ({ res, rejectWithValue }) => {
  return new Promise((resolve, reject) => {
    if (!res.ok)
      return rejectWithValue({
        ...defaultReject,
        message: `${res?.statusText}`,
      });

    resolve();
  });
};

const returnException = ({ error, rejectWithValue }) => {
  return rejectWithValue({
    ...defaultReject,
    message: error.message,
  });
};

const fetchData = async (input, url = __baseUrl__, header = {}) => {
  let tenantid = localStorage.getItem("tenentid"); // get jwt token from local storage
  const __options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "tenantid":tenantid,
      ...header,
    },
    body: {},
  };
  const res = await fetch(url, {
    ...__options,
    ...input,
  });
  const data = await res.json();
  return data;
};

const fetchDataPdf = async (input, url = __baseUrl__, header = {}) => {
  let jwtToken = localStorage.getItem("userInfo");
  const __options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      jwttoken: jwtToken,
      ...header,
    },
    body: {},
  };
  const res = await fetch(url, {
    ...__options,
    ...input,
  });
  const data = await res.text();
  return data;
};

const makeName = (nameObj = {}) => {
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
  }${family && family + " "}${suffixVal && suffixVal}`;
};

const getUtcTime = (date) => {
  if (date) {
    return moment.utc(date).unix();
  } else {
    return moment.utc().unix();
  }
};

const utcTOLocal = (date, format) => {
  let Ndate = new Date();
  if (typeof date === "number") {
    Ndate = moment.unix(date);
  } else {
    Ndate = moment(date);
  }

  let fmt = format ? format : "DD-MM-YYYY";
  if (format) {
    return moment.utc(Ndate).local().format(fmt);
  } else {
    return moment.utc(Ndate).local();
  }
};

const getAge = (date) => {
  if (date) {
    const yearDiff = moment().diff(moment(date, "DD/MM/YYYY"), "years", false);
    if (yearDiff > 0) {
      return yearDiff + " Y";
    }
    const monthDiff = moment().diff(
      moment(date, "DD/MM/YYYY"),
      "months",
      false
    );
    if (monthDiff > 0) {
      return monthDiff + " M";
    }
    const dayDiff = moment().diff(moment(date, "DD/MM/YYYY"), "days", false);
    return dayDiff + " D";
  }
  return "";
};

const fetchDataApi = async (url = __baseUrl__, input) => {
  let jwtToken = localStorage.getItem("userInfo"); // get jwt token from local storage
  const __options = input || {};
  if (__options.headers) {
    __options.headers.jwttoken = jwtToken;
  } else {
    __options.headers = {
      "Content-Type": "application/json",
      Accept: "application/json",
      jwttoken: jwtToken,
    };
  }

  const res = await fetch(url, {
    ...__options,
  });
  return res;
};

const fetchDataQueueList = async (url = __baseUrl__, header = {}) => {
  let jwtToken = localStorage.getItem("userInfo"); // get jwt token from local storage
  const __options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      jwttoken: jwtToken,
      ...header,
    },
  };
  const res = await fetch(url, {
    ...__options,
  });
  const data = await res.json();
  return data;
};

export {
  validateNetworError,
  returnException,
  fetchData,
  getUtcTime,
  utcTOLocal,
  makeName,
  fetchDataPdf,
  getAge,
  fetchDataApi,
  fetchDataQueueList,
};
