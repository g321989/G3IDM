import { fetchData } from "../helpers";
import {
  __readDocumentUrl__,
  __uspsertUrl__,
  __softDelete__,
  __baseUrl__,
  dbName,
  __GetDispenseDuration__,
  __DispenseDoseStrength__,
  __DoseScheduleGeneration__,
  __AvailableStock__,
  __AvailableApiKey__,
  __AvailableSecretKey__,
} from "../settings";
import moment from "moment";
// import {
//   generateMedicationData,
//   generateUpdateAdditive,
//   generateVerifyData,
//   getBatches,
//   getCompoundBatch,
//   getUpdatedCompOrder,
// } from "../slices/pharmacyVerfier/generate";

export const removeDuplicates = (originalArray, prop) => {
  var newArray = [];
  var lookupObject = {};

  for (var i in originalArray) {
    lookupObject[originalArray[i]?.[prop]] = originalArray[i];
  }

  for (i in lookupObject) {
    newArray.push(lookupObject[i]);
  }
  return newArray;
};

export const defaultHeader = (access_token) => {
  const myHeaders = new Headers();

  myHeaders.append("Authorization", access_token);

  return myHeaders;
};

export const networkCall = async () => {
  return new Promise((resolve, reject) => {});
};

export const getDayDiff = (date1, date2) => {
  const dayStart = moment.unix(date1).startOf("day");
  const dayEnd = moment.unix(date2).startOf("day");

  return dayEnd.diff(dayStart, "days");
};

export const getDrugType = (drugType) => {
  switch (drugType) {
    case "IV-SY":
    case "IV-LV":
    case "IV-PB":
      return true;
    default:
      return false;
  }
};

export const getisCompound = (type) => {
  switch (type) {
    case "COMPOUND":
      return true;
    default:
      return false;
  }
};

export const TaskFetch = async (scenarioId, queueId, patientid, isCart) => {
  let taskQuery = {
    db_name: dbName,
    filter: {
      // scenarioId: scenarioId,
      queueId: queueId,
      patientid: patientid,
    },
    queryid: "f5c62a9e-0af2-4099-981e-a51e40ecf6f7",
  };

  if (isCart) {
    taskQuery.filter["scenarioid"] = scenarioId;
    taskQuery["queryid"] = "6f062fee-8e25-4bd7-a205-d4d423d7c54d";
  }
  let data = await fetchData(
    {
      body: JSON.stringify(taskQuery),
    },
    __baseUrl__
  );

  return data;
};

export const TaskFetchByState = async (
  scenarioId,
  queueid,
  stateid,
  patientid,
  isCart
) => {
  let obj = {};
  let taskagainstState = {
    db_name: dbName,
    queryid: isCart
      ? "69aaa18f-44f0-476e-a3c1-5c3291bb00b8"
      : "cfce738c-3820-4eba-a6f8-d18cfc4b222f",
    filter: {
      queueid: queueid,
      stateid: stateid,
      patientid: patientid,
      scenarioid: scenarioId,
    },
  };

  if (isCart) {
    obj["scenarioId"] = "queuescenarios/10029";
    obj["queueid"] = queueid;
    obj["stateid"] = stateid;
    obj["patientid"] = patientid;
    taskagainstState.filter = obj;
  }

  let data = await fetchData(
    {
      body: JSON.stringify(taskagainstState),
    },
    __baseUrl__
  );

  return data;
};

export const GetDispenseDuration = async (orders, practitionerData) => {
  //to get considerlate interval value from location master
  let latearrival = practitionerData?.location?.locconfig?.find(
    (val) => val?.code === "considerlatearrival"
  )?.value;

  let body = orders?.map((val) => {
    return {
      dosageDurationUOM: val?.dosageDurationUOM_id,
      dosageDurationValue: val?.nextrefilldate
        ? getDayDiff(val?.nextrefilldate, val?.occurEndDateTime) + 1
        : val?.dosageDurationValue,
      drug_id: val?.drug_id,
      OrderStartDate:
        val?.nextrefilldate > 0 ? val?.nextrefilldate : val?.occurStartDateTime,
      OrderEndDate: val?.occurEndDateTime,
      OrderId: val?._id,
      DispenseDurationValue: 0,
      disptype: val?.disptype?.code ?? "",
      IsFirstDuration: true,
      considerlatearrival: latearrival === "true" ? true : false,
    };
  });
  let data = await fetchData(
    {
      body: JSON.stringify(body),
    },
    __GetDispenseDuration__
  );

  return data;
};

export const calculateDispenseDoseStrength = async (
  params,
  patientid,
  dispenseDuration,
  key
) => {
  let body = params?.map((val) => {
    return {
      OrderId: val._id,
      OrderItemcode: val?.drug_id,
      OrderStrength: val?.dosageValue,
      OrderUOM: val?.dosageUOM_id,
      PatientId: patientid,
      Startdate: val?.occurStartDateTime,
      Enddate: val?.occurEndDateTime,
      freqcode: val?.dosageFreqCode,
      dosageDurationValue: val?.dosageDurationValue,
      dosageDurationUOM: val?.dosageDurationUOM,
      Isfirstdose: false,
      disptype: val?.disptype?.code,
      DispenseDetails: getDispense(
        key ? val?.brands : val?.mappedItems,
        val,
        key
      ),
      AdditiveDetails: getAdditive(
        key ? val?.additives : val?.addtictive,
        val,
        key
      ),
    };
  });

  let data = await fetchData(
    {
      body: JSON.stringify(body),
    },
    __DispenseDoseStrength__
  );

  return data;
};

export const getDispense = (data, singleOrder, key) => {
  let SortedData = data.sort((a, b) => {
    return a.seqno - b.seqno;
  });
  let Dispense = data
    ?.map((item) => {
      if (item?.dispensedrugcode === SortedData?.[0]?.dispensedrugcode || key) {
        return {
          DispenseItemCode: item?.dispensedrugcode,
          DispenseStrength: [0],
          DispenseUOM: singleOrder?.dosageUOM_id,
          DispenseUOMText: singleOrder?.dosageUOM,
          DrugType: item?.DrugType?.drugtype ?? "",
          AdminUOM: getSpecificUom(item?.packSizeApplicability, "Admin")?._id,
          IssueUOM: getSpecificUom(item?.packSizeApplicability, "Issue")?._id,
          BillUOM: getSpecificUom(item?.packSizeApplicability, "Bill")?._id,
          StockUOM: getSpecificUom(item?.packSizeApplicability, "Stock")?._id,
          drugreleaseType: item?.drugreleasetype,
          AdminUOMText: getSpecificUom(item?.packSizeApplicability, "Admin")
            ?.UOM,
          IssueUOMText: getSpecificUom(item?.packSizeApplicability, "Issue")
            ?.UOM,
          StockUOMText: getSpecificUom(item?.packSizeApplicability, "Stock")
            ?.UOM,
          BillUOMText: getSpecificUom(item?.packSizeApplicability, "Bill")?.UOM,
          addrugcode: "",
        };
      }
    })
    .filter((notUndefined) => notUndefined !== undefined);

  return Dispense;
};

export const getAdditive = (data, singleOrder, key) => {
  let name = key ? "brands" : "mappedeItems";
  let Attictives = [];
  data?.forEach((additive) => {
    let SortedData = additive?.[name]?.sort((a, b) => {
      return a.seqno - b.seqno;
    });
    let Dispense = additive?.[name].forEach((item) => {
      if (item?.dispensedrugcode === SortedData?.[0]?.dispensedrugcode || key) {
        Attictives.push({
          DispenseItemCode: item?.dispensedrugcode,
          DispenseStrength: [0],
          baseStrength: additive?.addose,
          DispenseUOM: additive?.addoseuom,
          DrugType: item?.DrugType?.drugtype ?? "",
          DispenseUOMText: additive?.addoseuomtext,
          AdminUOM: getSpecificUom(item?.packSizeApplicability, "Admin")?._id,
          IssueUOM: getSpecificUom(item?.packSizeApplicability, "Issue")?._id,
          BillUOM: getSpecificUom(item?.packSizeApplicability, "Bill")?._id,
          StockUOM: getSpecificUom(item?.packSizeApplicability, "Stock")?._id,
          AdminUOMText: getSpecificUom(item?.packSizeApplicability, "Admin")
            ?.UOM,
          IssueUOMText: getSpecificUom(item?.packSizeApplicability, "Issue")
            ?.UOM,
          StockUOMText: getSpecificUom(item?.packSizeApplicability, "Stock")
            ?.UOM,
          BillUOMText: getSpecificUom(item?.packSizeApplicability, "Bill")?.UOM,
          addrugcode: "",
        });
      }
    });
  });

  return Attictives;
};

export const getSpecificUom = (data, type) => {
  let uom = data?.find(
    (item) => item?.applicableInd?.display === type
  )?.packSizeUoM;
  return uom;
};

export const DoseScheduleGeneration = async (
  order,
  DoseStrength,
  isCart,
  isCartDetails
) => {
  debugger
  //To get Addictive
  let Addictive = [];
  order?.additives?.forEach((va) => {
    va?.brands?.forEach((val, i) => {
      debugger;
      Addictive.push({
        DispenseItemCode: val?.dispensedrugcode || val?.drugName,
        DispenseStrength: val?.dosageValue,
        DispenseUOM: val?.dosageUOM_id,
        DispenseUOMText: val?.dosageUOM,
        AdminUOM: getSpecificUom(val?.packSizeApplicability, "Admin")?._id,
        AdminUOMText: getSpecificUom(val?.packSizeApplicability, "Admin")?.UOM,
        IssueUOM: getSpecificUom(val?.packSizeApplicability, "Issue")?._id,
        IssueUOMText: getSpecificUom(val?.packSizeApplicability, "Issue")?.UOM,
        BillUOM: getSpecificUom(val?.packSizeApplicability, "Bill")?._id,
        BillUOMText: getSpecificUom(val?.packSizeApplicability, "Bill")?.UOM,
        StockUOM: getSpecificUom(val?.packSizeApplicability, "Stock")?._id,
        StockUOMText: getSpecificUom(val?.packSizeApplicability, "Stock")?.UOM,
        isAdditive: true,
        addrugcode: va?.addrugcode,
        drugreleaseType: val?.drugReleaseType ?? val?.drugreleasetype,
      });
    });
  });

  //To get Dispense
  let dispense = order?.brands?.map((val, i) => {
    return {
      DispenseItemCode: val?.dispensedrugcode || val?.drugName,
      DispenseStrength: val?.dosageValue,
      DispenseUOM: val?.dosageUOM_id,
      DispenseUOMText: val?.dosageUOM,
      AdminUOM: getSpecificUom(val?.packSizeApplicability, "Admin")?._id,
      AdminUOMText: getSpecificUom(val?.packSizeApplicability, "Admin")?.UOM,
      IssueUOM: getSpecificUom(val?.packSizeApplicability, "Issue")?._id,
      IssueUOMText: getSpecificUom(val?.packSizeApplicability, "Issue")?.UOM,
      BillUOM: getSpecificUom(val?.packSizeApplicability, "Bill")?._id,
      BillUOMText: getSpecificUom(val?.packSizeApplicability, "Bill")?.UOM,
      StockUOM: getSpecificUom(val?.packSizeApplicability, "Stock")?._id,
      StockUOMText: getSpecificUom(val?.packSizeApplicability, "Stock")?.UOM,
      isAdditive: false,
      addrugcode: "",
      drugreleaseType: val?.drugReleaseType ?? val?.drugreleasetype,
    };
  });

  //To get Compound

  let compound = order?.compounds?.map((val, i) => {
    return {
      DispenseItemCode: val?.dispensedrugcode || val?.drugName,
      DispenseStrength: [val?.dosageValue],
      DispenseUOM: val?.dosageUOM_id,
      DispenseUOMText: val?.dosageUOM,
      AdminUOM: getSpecificUom(val?.packSizeApplicability, "Admin")?._id,
      AdminUOMText: getSpecificUom(val?.packSizeApplicability, "Admin")?.UOM,
      IssueUOM: getSpecificUom(val?.packSizeApplicability, "Issue")?._id,
      IssueUOMText: getSpecificUom(val?.packSizeApplicability, "Issue")?.UOM,
      BillUOM: getSpecificUom(val?.packSizeApplicability, "Bill")?._id,
      BillUOMText: getSpecificUom(val?.packSizeApplicability, "Bill")?.UOM,
      StockUOM: getSpecificUom(val?.packSizeApplicability, "Stock")?._id,
      StockUOMText: getSpecificUom(val?.packSizeApplicability, "Stock")?.UOM,
      isAdditive: false,
      addrugcode: "",
      drugreleaseType: val?.drugReleaseType ?? val?.drugreleasetype, //"RCOMPOUND"
    };
  });

  //main Payload
  let payload = {
    EncounterType: order?.EncounterType,
    OrderId: order?._id,
    OrderItemcode: order?.dispenseDurationValue?.drug_id,
    OrderStrength: order?.dosageValue,
    OrderUOM: order?.dosageUOM_id,
    PatientId: order?.patient_Id,
    Startdate: order?.dispenseDurationValue?.dispStartDate,
    Enddate: order?.dispenseDurationValue?.dispEndDate,
    freqcode: order?.dosageFreqCode_id ?? "",
    dosageDurationValue: order?.dispenseDurationValue?.dispDuration,
    dosageDurationUOM: order?.dispenseDurationValue?.dosageDurationUOM,
    Isfirstdose: false,
    DispenseDetails: [
      ...(dispense || []),
      ...(Addictive || []),
      ...(compound || []),
    ],
    ivInfusionRateValue: order.ivInfusionRateValue,
    ivInfusionRateUOM: order?.ivInfusionRateUOM,
    ivInfusionTime: order?.ivInfusionTime,
    ivInfusionTimeUom: order?.ivInfusionTimeUom,
    // AdditiveDetails: [],
    //AdditiveDetails: Addictive,
    routeCode: order?.routeCode_id ?? "",
    disptype: order?.disptype?.code,
    dispenseDurationValue:
      order?.deliveringDispenseDuration?.length > 0
        ? parseInt(order?.deliveringDispenseDuration)
        : order?.dispenseDurationValue?.dispDuration,
    dispenseDurationUOM: order?.dosageUOM_id,
    RefillDate: order?.nextrefilldate,
  };
  if (isCart) {
    //payload["EncounterType"] = "IP";
    payload["Cartid"] = order?.Cartid || isCartDetails?.Cartid || "";
    payload["CartTransId"] =
      order?.CartTransId || isCartDetails?.CartTransId || "";
  }
  let data = await fetchData(
    {
      body: JSON.stringify([payload]),
    },
    __DoseScheduleGeneration__
  );

  return data;
};

export const ptAvailStock = async (
  params,
  selectedOrder,
  scheduleGeneration,
  practitionerData
) => {
  let selectedMedicine = [];

  let compcdId = practitionerData?.org?.alias?.find(
    (v) => v.aliasType.code === "EXQ"
  )?.aliasDesc;
  let facilityId = practitionerData?.facility?.alias?.find(
    (v) => v.aliasType.code === "EXQ"
  )?.aliasDesc;

  let SubstoreId =
    practitionerData?.location?.pharmacy?.[0]?.inventorySubStore?.locationID;
  //to get brand medicines
  params?.brands.forEach((val, i) => {
    if (
      !scheduleGeneration?.pH_OrderLineDispenseSchedule?.dispensedetails?.[i]
        ?.isAdditive &&
      scheduleGeneration?.pH_OrderLineDispenseSchedule?.dispensedetails?.[i]
        ?.drugreleaseTypeText !== "INGREDIENT" &&
      scheduleGeneration?.pH_OrderLineDispenseSchedule?.dispensedetails?.[i]
        ?.drugreleaseTypeText !== "RCOMPOUND"
    ) {
      let alisName = val?.alias?.find(
        (v) => v?.aliasType?.code === "AM002"
      )?.aliasCode;

      selectedMedicine.push({
        compcd: parseInt(compcdId),
        facilitycd: parseInt(facilityId),
        uniquekey: alisName || val?.name || "",
        attrcode: 0,
        substore: SubstoreId,
        uom: scheduleGeneration?.pH_OrderLineDispenseSchedule
          ?.dispensedetails?.[i]?.stockuomtext,
        reqdqty:
          scheduleGeneration?.pH_OrderLineDispenseSchedule?.dispensedetails?.[i]
            ?.totstkqty,
        isblock: "N",
        isgtn: "N",
        isallocated: "N",
      });
    }
  });

  let dispensedetails =
    scheduleGeneration?.pH_OrderLineDispenseSchedule?.dispensedetails?.filter(
      (val) => val?.isAdditive
    );
  //to get addictive medicines
  params?.additives?.forEach((v, pIndex) => {
    v.brands?.forEach((val, i) => {
      let alisName = val?.alias?.find(
        (v) => v?.aliasType?.code === "AM002"
      )?.aliasCode;

      if (v?.addrugcode === dispensedetails?.[pIndex]?.dispenseitemcode) {
        selectedMedicine.push({
          compcd: parseInt(compcdId),
          facilitycd: parseInt(facilityId),
          uniquekey: alisName || val?.name,
          attrcode: 0,
          substore: SubstoreId,
          uom: dispensedetails?.[pIndex]?.stockuomtext,
          reqdqty: dispensedetails?.[pIndex]?.totstkqty,
          isblock: "N",
          isgtn: "N",
          isallocated: "N",
        });
      }
    });
  });

  //to get compound

  let CompundDispDetails =
    scheduleGeneration?.pH_OrderLineDispenseSchedule?.dispensedetails?.filter(
      (val) => val?.drugreleaseTypeText === "INGREDIENT"
    );

  params?.compounds?.forEach((val, i) => {
    if (val?.dispensedrugcode === CompundDispDetails?.[i]?.dispenseitemcode) {
      let alisName = val?.alias?.find(
        (v) => v?.aliasType?.code === "AM002"
      )?.aliasCode;

      selectedMedicine.push({
        compcd: parseInt(compcdId),
        facilitycd: parseInt(facilityId),
        uniquekey: alisName || val?.name,
        attrcode: 0,
        substore: SubstoreId,
        uom: CompundDispDetails?.[i]?.stockuomtext,
        reqdqty: CompundDispDetails?.[i]?.totstkqty,
        isblock: "N",
        isgtn: "N",
        isallocated: "N",
      });
    }
  });

  let payload = {
    ptAvailStock: selectedMedicine,
  };
  let data = await fetchData(
    {
      body: JSON.stringify(payload),
    },
    __AvailableStock__,
    {
      APIKey: __AvailableApiKey__,
      SecretKey: __AvailableSecretKey__,
    }
  );

  return data;
};

export const ptAvailStockMultiBatch = async (
  params,
  selectedOrder,
  scheduleGeneration,
  practitionerData,
  isShowMulti,
  alisName,
  orderbatches
) => {
  let selectedMedicine = [];

  let compcdId = practitionerData?.org?.alias?.find(
    (v) => v.aliasType.code === "EXQ"
  )?.aliasDesc;

  let facilityId = practitionerData?.facility?.alias?.find(
    (v) => v.aliasType.code === "EXQ"
  )?.aliasDesc;

  let SubstoreId =
    practitionerData?.location?.pharmacy?.[0]?.inventorySubStore?.locationID;

  orderbatches.forEach((val, i) => {
    selectedMedicine.push({
      compcd: parseInt(compcdId),
      facilitycd: parseInt(facilityId),
      uniquekey: alisName || "",
      attrcode: 0,
      substore: SubstoreId,
      uom: val?.availableQuantityUOM ?? "",
      reqdqty: isShowMulti ? 0 : val?.chargeqty,
      isblock: "N",
      isgtn: "N",
      isallocated: "N",
    });
  });

  let payload = {
    ptAvailStock: selectedMedicine,
  };
  let data = await fetchData(
    {
      body: JSON.stringify(payload),
    },
    __AvailableStock__,
    {
      APIKey: __AvailableApiKey__,
      SecretKey: __AvailableSecretKey__,
    }
  );

  return data;
};

export const reIssueMedicationAvailStock = async (
  orderbatches,
  practitionerData,
  alisName
) => {
  let selectedMedicine = [];

  let compcdId = practitionerData?.org.alias?.find(
    (v) => v.aliasType?.code === "EXQ"
  )?.aliasDesc;

  let facilityId = practitionerData?.facility.alias?.find(
    (v) => v.aliasType?.code === "EXQ"
  )?.aliasDesc;

  let SubstoreId =
    practitionerData?.location?.pharmacy?.[0]?.inventorySubStore?.locationID;

  orderbatches?.forEach((val, i) => {
    selectedMedicine.push({
      compcd: parseInt(compcdId),
      facilitycd: parseInt(facilityId),
      uniquekey: alisName || "",
      attrcode: 0,
      substore: SubstoreId,
      uom: val?.issueuom ?? "",
      reqdqty: val?.issueqty,
      isblock: "N",
      isgtn: "N",
      isallocated: "N",
    });
  });

  let payload = {
    ptAvailStock: selectedMedicine,
  };
  let data = await fetchData(
    {
      body: JSON.stringify(payload),
    },
    __AvailableStock__,
    {
      APIKey: __AvailableApiKey__,
      SecretKey: __AvailableSecretKey__,
    }
  );

  return data;
};

export const issueMedicationStockUpdate = async (data, state) => {
  const updateSTOCK = async (a, b, c) => {
    const data = await reIssueMedicationAvailStock(a, b, c);
    const getBatchDetails = data?.Data?.map((val) => {
      return {
        id: val?.batchno,
        expiryDate: moment(val?.expdate).format("MM/DD/YYYY"),
        bin: {
          number: val?.binlocty,
          aisle: val?.binname,
          // shelf: val?.loccode,
          // level: val?.locrefno,
        },
        availableQuantity: val?.stockqty,
        availableQuantityUOM: val?.stockuom,
        heldQuantity: val?.blockqty,
        totalAmount: val?.chargeprice,
        Quantity: `${val?.chargeqty} ${val?.chargeuom}`,
        // isAittive: isAittive,
        ...val,
      };
    });

    return getBatchDetails;
  };
  var res = [];

  let practitionerData = state?.signInReducerApiSlice?.loggedUserInfo?.data;

  for (let i = 0; i < data.length; i++) {
    const v = data[i];
    const newData = {
      ...v,
      PH_OrderLineDispenseSchedule: [],
    };

    for (let j = 0; j < v.PH_OrderLineDispenseSchedule.length; j++) {
      const l = v.PH_OrderLineDispenseSchedule[j];
      const newInnerData = {
        ...l,
        dispensedetails: [],
      };

      for (let k = 0; k < l.dispensedetails.length; k++) {
        const c = l.dispensedetails[k];
        const data = await updateSTOCK(
          c?.batchdeatils ?? [],
          practitionerData,
          c?.dispenseitemaliascode
        );
        const newInnerDataBatch = {
          ...c,
          batchdeatils: data,
        };
        newInnerData.dispensedetails.push(newInnerDataBatch);
      }

      newData.PH_OrderLineDispenseSchedule.push(newInnerData);
    }

    res.push(newData);
  }

  return res;
};

const GetAllSchedule = async (orders, practitionerData, isCart) => {
  //To get Addictive
  let Addictive = [];
  const addtictives = (additives) => {
    additives?.forEach((va) => {
      va?.brands?.forEach((val, i) => {
        Addictive.push({
          DispenseItemCode: val?.dispensedrugcode || val?.drugName,
          DispenseStrength: val?.dosageValue,
          DispenseUOM: val?.dosageUOM_id,
          DispenseUOMText: val?.dosageUOM,
          AdminUOM: getSpecificUom(val?.packSizeApplicability, "Admin")?._id,
          AdminUOMText: getSpecificUom(val?.packSizeApplicability, "Admin")
            ?.UOM,
          IssueUOM: getSpecificUom(val?.packSizeApplicability, "Issue")?._id,
          IssueUOMText: getSpecificUom(val?.packSizeApplicability, "Issue")
            ?.UOM,
          BillUOM: getSpecificUom(val?.packSizeApplicability, "Bill")?._id,
          BillUOMText: getSpecificUom(val?.packSizeApplicability, "Bill")?.UOM,
          StockUOM: getSpecificUom(val?.packSizeApplicability, "Stock")?._id,
          StockUOMText: getSpecificUom(val?.packSizeApplicability, "Stock")
            ?.UOM,
          isAdditive: true,
          addrugcode: va?.addrugcode,
          drugreleaseType: val?.drugReleaseType ?? val?.drugreleasetype,
        });
      });
    });
    return Addictive;
  };

  //To get Dispense

  const dispense = (brands) => {
    return brands?.map((val, i) => {
      return {
        DispenseItemCode: val?.dispensedrugcode || val?.drugName,
        DispenseStrength: val?.dosageValue,
        DispenseUOM: val?.dosageUOM_id,
        DispenseUOMText: val?.dosageUOM,
        AdminUOM: getSpecificUom(val?.packSizeApplicability, "Admin")?._id,
        AdminUOMText: getSpecificUom(val?.packSizeApplicability, "Admin")?.UOM,
        IssueUOM: getSpecificUom(val?.packSizeApplicability, "Issue")?._id,
        IssueUOMText: getSpecificUom(val?.packSizeApplicability, "Issue")?.UOM,
        BillUOM: getSpecificUom(val?.packSizeApplicability, "Bill")?._id,
        BillUOMText: getSpecificUom(val?.packSizeApplicability, "Bill")?.UOM,
        StockUOM: getSpecificUom(val?.packSizeApplicability, "Stock")?._id,
        StockUOMText: getSpecificUom(val?.packSizeApplicability, "Stock")?.UOM,
        isAdditive: false,
        addrugcode: "",
        drugreleaseType: val?.drugReleaseType ?? val?.drugreleasetype,
      };
    });
  };

  //To get Compound

  const compound = (compounds) => {
    return compounds?.map((val, i) => {
      return {
        DispenseItemCode: val?.dispensedrugcode || val?.drugName,
        DispenseStrength: [val?.dosageValue],
        DispenseUOM: val?.dosageUOM_id,
        DispenseUOMText: val?.dosageUOM,
        AdminUOM: getSpecificUom(val?.packSizeApplicability, "Admin")?._id,
        AdminUOMText: getSpecificUom(val?.packSizeApplicability, "Admin")?.UOM,
        IssueUOM: getSpecificUom(val?.packSizeApplicability, "Issue")?._id,
        IssueUOMText: getSpecificUom(val?.packSizeApplicability, "Issue")?.UOM,
        BillUOM: getSpecificUom(val?.packSizeApplicability, "Bill")?._id,
        BillUOMText: getSpecificUom(val?.packSizeApplicability, "Bill")?.UOM,
        StockUOM: getSpecificUom(val?.packSizeApplicability, "Stock")?._id,
        StockUOMText: getSpecificUom(val?.packSizeApplicability, "Stock")?.UOM,
        isAdditive: false,
        addrugcode: "",
        drugreleaseType: val?.drugReleaseType ?? val?.drugreleasetype, //"RCOMPOUND"
      };
    });
  };

  //main Payload

  const SchedulePayload = orders?.map((order) => {
    let obj = {};
    if (isCart) {
      obj["Cartid"] = order?.Cartid || "";
      obj["CartTransId"] = order?.CartTransId || "";
    }
    return {
      EncounterType: order?.EncounterType,
      OrderId: order?._id,
      OrderItemcode: order?.dispenseDurationValue?.drug_id,
      OrderStrength: order?.dosageValue,
      OrderUOM: order?.dosageUOM_id,
      PatientId: order?.patient_Id,
      Startdate: order?.dispenseDurationValue?.dispStartDate,
      Enddate: order?.dispenseDurationValue?.dispEndDate,
      freqcode: order?.dosageFreqCode_id ?? "",
      dosageDurationValue: order?.dispenseDurationValue?.dispDuration,
      dosageDurationUOM: order?.dispenseDurationValue?.dosageDurationUOM,
      Isfirstdose: false,
      DispenseDetails: [
        ...(dispense(order?.brands) || []),
        ...(addtictives(order?.additives) || []),
        ...(compound(order?.compounds) || []),
      ],
      ivInfusionRateValue: order.ivInfusionRateValue,
      ivInfusionRateUOM: order?.ivInfusionRateUOM,
      routeCode: order?.routeCode_id ?? "",
      disptype: order?.disptype?.code,
      dispenseDurationValue:
        order?.deliveringDispenseDuration?.length > 0
          ? parseInt(order?.deliveringDispenseDuration)
          : order?.dispenseDurationValue?.dispDuration,
      dispenseDurationUOM: order?.dosageUOM_id,
      RefillDate: order?.nextrefilldate,
      ...obj,
    };
  });

  let data = await fetchData(
    {
      body: JSON.stringify(SchedulePayload),
    },
    __DoseScheduleGeneration__
  );

  return data;
};

const brandScheduleGeneration = (
  scheduleGeneration,
  brands,
  availableStock,
  order
) => {
  return brands
    .map((brnd, i) => {
      if (
        !scheduleGeneration?.pH_OrderLineDispenseSchedule?.dispensedetails?.[i]
          ?.isAdditive &&
        scheduleGeneration?.pH_OrderLineDispenseSchedule?.dispensedetails?.[i]
          ?.drugreleaseTypeText !== "INGREDIENT"
      ) {
        let alisName = brnd?.alias?.find(
          (v) => v?.aliasType?.code === "AM002"
        )?.aliasCode;
        let drugReleaseType =
          scheduleGeneration?.pH_OrderLineDispenseSchedule?.dispensedetails?.[i]
            ?.drugreleaseTypeText;
        return {
          id: brnd?.id,
          uniqueId: brnd?.uniqueId,
          alias: brnd?.alias,
          drugPhotoId: brnd?.drugPhotoId,
          drugreleasetype: brnd?.drugreleasetype,
          name: brnd?.name,
          DrugType: brnd?.DrugType,
          drugNameLong: brnd?.drugNameLong,
          dispensedrugcode: brnd?.id,
          dosageUOM_id:
            scheduleGeneration?.pH_OrderLineDispenseSchedule?.dispensedetails?.[
              i
            ]?.dispuom ?? brnd?.dosageUOM_id,
          strength: brnd?.strength,
          route: "Oral",
          doseCount:
            scheduleGeneration?.pH_OrderLineDispenseSchedule?.dispensedetails?.[
              i
            ]?.totnoofdose,
          tabPerDose:
            scheduleGeneration?.pH_OrderLineDispenseSchedule?.dispensedetails?.[
              i
            ]?.totissueqty,
          actualdoseCount:
            scheduleGeneration?.pH_OrderLineDispenseSchedule?.dispensedetails?.[
              i
            ]?.totbillqty,
          batches:
            drugReleaseType === "RCOMPOUND",
              // ? getCompoundBatch(
              //     scheduleGeneration?.pH_OrderLineDispenseSchedule
              //       ?.dispensedetails?.[i],
              //     order?.drugDetails?.[0]?.stability
              //   )
              // : getBatches(availableStock?.Data, alisName),
          option: brnd.option,
          dosageValue: brnd?.dosageValue,
          allStrength: brnd?.allStrength,
          dosageUOM: brnd?.dosageUOM,
          packSizeApplicability: brnd?.packSizeApplicability,
          totadmqty:
            scheduleGeneration?.pH_OrderLineDispenseSchedule?.dispensedetails?.[
              i
            ]?.totadmqty,
          totadmuom:
            scheduleGeneration?.pH_OrderLineDispenseSchedule?.dispensedetails?.[
              i
            ]?.adminuomext,
          totstkqty:
            scheduleGeneration?.pH_OrderLineDispenseSchedule?.dispensedetails?.[
              i
            ]?.totstkqty,

          totstkuom:
            scheduleGeneration?.pH_OrderLineDispenseSchedule?.dispensedetails?.[
              i
            ]?.stockuomtext,
          totbillqty:
            scheduleGeneration?.pH_OrderLineDispenseSchedule?.dispensedetails?.[
              i
            ]?.totbillqty,
          totbilluom:
            scheduleGeneration?.pH_OrderLineDispenseSchedule?.dispensedetails?.[
              i
            ]?.billuomtext,
          totissueqty:
            scheduleGeneration?.pH_OrderLineDispenseSchedule?.dispensedetails?.[
              i
            ]?.totissueqty,
          totissueuom:
            scheduleGeneration?.pH_OrderLineDispenseSchedule?.dispensedetails?.[
              i
            ]?.issueuomtext,
          perdoseadminqty:
            scheduleGeneration?.pH_OrderLineDispenseSchedule?.dispensedetails?.[
              i
            ]?.perdoseadminqty,
          pH_OrderLineDispenseSchedule:
            scheduleGeneration?.pH_OrderLineDispenseSchedule,
        };
      }
    })
    .filter((notUndefined) => notUndefined !== undefined);
};
export const getOrderSchedule = async (orders, practitionerData, isCart) => {
  let Orders = JSON.parse(JSON.stringify(orders));
  const getAllSchedule = await GetAllSchedule(orders, practitionerData, isCart);
  for (let index = 0; index < Orders.length; index++) {
    const order = Orders[index];
    const schedule = getAllSchedule[index];
    let brands;
    let updatedAdditive;
    let getCompOrder;
    if (schedule) {
      // fetching the Stock
      const availableStock = await ptAvailStock(
        order,
        order,
        schedule,
        practitionerData
      );
      // constructing value for the brands
      brands = await brandScheduleGeneration(
        schedule,
        order?.brands,
        availableStock,
        order
      );

      // constructing value for the Attictives

      if (schedule?.pH_OrderLineDispenseSchedule) {
        // updatedAdditive = generateUpdateAdditive(
        //   order,
        //   schedule,
        //   availableStock
        // );
      }

      // constructing value for the compound
      if (order?.isCompound) {
        if (schedule?.pH_OrderLineDispenseSchedule) {
          // getCompOrder = getUpdatedCompOrder(
          //   order?.compounds,
          //   schedule,
          //   availableStock
          // );
        }
      }
      //setting value in the brands
      order.brands = brands;
      //setting value in the Addictives
      order.additives = updatedAdditive;
      //setting value in the Compound
      order.compounds = getCompOrder;
      //schedule value in order
      order.pH_OrderLinePerdoseSchedule = schedule?.pH_OrderLinePerdoseSchedule;
      order.pH_OrderLineDispenseSchedule =
        schedule?.pH_OrderLineDispenseSchedule;
      //replacing the reconstructed order
      Orders[index] = order;
    }
  }

  return Orders;
};

export const isMultiOrderVerify = async (
  multiOrder,
  selectedState,
  patientId,
  action,
  status,
  practitionerData,
  reIssueReason,
  isReisse
) => {
  var arr = [];

  for (let index = 0; index < multiOrder.length; index++) {
    const singleOrder = multiOrder[index];

    // let data = await generateVerifyData(
    //   singleOrder,
    //   selectedState,
    //   patientId,
    //   action,
    //   status,
    //   practitionerData,
    //   reIssueReason,
    //   isReisse
    // );
    // arr.push(data);
  }
  return arr;
};

// export const isMultiOrderVerifyMedication = async (
//   multiOrder,
//   selectedState,
//   patientId,
//   action,
//   status,
//   practitionerData,
//   isApproval
// ) => {
//   var arr = [];

//   for (let index = 0; index < multiOrder.length; index++) {
//     const singleOrder = multiOrder[index];

//     let data = await generateMedicationData(
//       singleOrder,
//       selectedState,
//       patientId,
//       action,
//       status,
//       practitionerData,
//       true,
//       isApproval
//     );

//     arr.push(data);
//   }
//   return arr;
// };
