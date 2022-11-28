import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
    defaultReject,
    defaultState,
    __readDocumentUrl__,
    __uspsertUrl__,
    __deleteUrl__,
} from "../../settings";
import { fetchData } from "../../helpers";
import { masterQuery, masterqueries } from "./masterQuery";
import { queries } from './queries';
import { generateReadJSON } from "./readPractitionerJson";

const location = ["nationality", "city", "district", "state", "country"];

const loopMasters = () => {
    return new Promise(async (resolve, reject) => {
        let calls = Object.keys(masterQuery).map(async (val) => {
            return await fetchMaster(val, masterQuery[val])
        })
        Promise.all(calls).then(data => {
            let json = {};
            data.map(val => {
                let arr = [];
                val.data.map(value => {
                    if ("country_code" === val.name) {
                        arr.push({
                            label: value.GeoLocationISDCode,
                            value: value._id,
                            ...value
                        })
                    } else if ("location" === val.name) {
                        if (value.shortdesc) {
                            arr.push({
                                label: value.shortdesc,
                                value: value._id,
                                ...value,
                            });
                        }
                    } else if ("entity" === val.name) {
                        arr.push({
                            label: value.coding ? value.coding[0] ? value.coding[0].display : "" : val,
                            value: value.coding ? value.coding[0] ? value.coding[0]._id : "" : val,
                            ...value
                        })
                    } else if (["entity_name"].indexOf(val.name) === 0) {
                        arr.push({
                            label: value.name ? value.name : "",
                            value: value._id ? value._id : "",
                            // value: value.OrgID ? value.OrgID : "",
                            ...value
                        })
                    } else if (location.indexOf(val.name) === -1) {
                        if (val.name === "Address_use" || val.name === "address_type" || val.name === "contact_mode") {
                            arr.push({
                                label: value.coding ? value.coding[0] ? value.coding[0].display : "" : val,
                                value: value.coding?.[0]?._id,
                                ...value
                            })
                        } else {
                            arr.push({
                                label: value.coding ? value.coding[0] ? value.coding[0].display : "" : val,
                                value: value._id,
                                ...value
                            })
                        }
                    } else {
                        arr.push({
                            label: value.geogLevelName,
                            value: value._id,
                            ...value
                        })
                    }
                })
                json[val.name] = arr
                resolve(json)
            })
        }).catch(err => {
            resolve([]);
        })
    })
}

const fetchMaster = (name, query) => {
    return new Promise(async (resolve, reject) => {
        const data = await fetchData(
            { body: query },
            __readDocumentUrl__
        );
        resolve({ data: data.result, name });
    })
}

const PRACTITIONER_MASTERS = createAsyncThunk(
    `practitionerMasterSlice/practitionerlist`,
    async (payload = {}, { rejectWithValue }) => {
        try {
            let { type } = payload;
            let data = await loopMasters()
            return {
                ...defaultState.Info,
                data: data
            };
        } catch (error) {
            return rejectWithValue({
                ...defaultReject,
                message: error.message,
            });
        }
    }
);

const PRACTITIONER_LOCATION_MASTERS = createAsyncThunk(
    `practitionerMasterSlice/practitionerLocationMaster`,
    async (payload = {}, { rejectWithValue }) => {
        try {
            let { type } = payload;

            const data = await fetchData(
                { body: JSON.stringify(masterqueries.practitioner_location_rule(type)) },
                __readDocumentUrl__
            );

            let arr = [];
            if (data?.result?.length > 0) {
                data.result.map(v => {
                    arr.push({
                        label: v?.longdesc ?? '',
                        value: v?._id ?? ''
                    })
                })
            }
            return {
                ...defaultState.List,
                data: arr,
            };
        } catch (error) {
            return rejectWithValue({
                ...defaultReject,
                message: error.message,
            });
        }
    }
);

const PRACTITIONER_GET_BY_ID = createAsyncThunk(
    `practitionerMasterSlice/practitionerbyid`,
    async (payload = {}, { rejectWithValue }) => {

        try {
            let { id } = payload;
            let masterlist = await loopMasters();
            const data = await fetchData(
                { body: JSON.stringify(queries.practitioner_by_id(id)) },
                __readDocumentUrl__
            );

            const country_data = await fetchData(
                { body: JSON.stringify(masterqueries.country()) },
                __readDocumentUrl__
            );

            const state_data = await fetchData(
                { body: JSON.stringify(masterqueries.state_by_country_()) },
                __readDocumentUrl__
            );

            const district_data = await fetchData(
                { body: JSON.stringify(masterqueries.district_by_state_()) },
                __readDocumentUrl__
            );

            const city_data = await fetchData(
                { body: JSON.stringify(masterqueries.city_by_district_()) },
                __readDocumentUrl__
            );

            const pincode_data = await fetchData(
                { body: JSON.stringify(masterqueries.pincode_by_city_()) },
                __readDocumentUrl__
            );

            let readJSON = generateReadJSON(
                data.result[0] ? data.result[0] : null,
                masterlist,
                country_data?.result,
                state_data?.result,
                district_data?.result,
                city_data?.result,
                pincode_data?.result
            );
            return {
                ...defaultState.List,
                data: readJSON,
            };
        } catch (error) {
            return rejectWithValue({
                ...defaultReject,
                message: error.message,
            });
        }
    }
);

const PRACTITIONER_COUNTRY_MASTER = createAsyncThunk(
    `practitionerMasterSlice/practitioner_country_master`,
    async (payload = {}, { rejectWithValue }) => {
        try {
            let { } = payload;
            const data = await fetchData(
                { body: JSON.stringify(masterqueries.country()) },
                __readDocumentUrl__
            );
            let arr = [];
            if (Array.isArray(data.result) && data?.result?.length > 0) {
                data?.result.map(val => {
                    arr.push({
                        label: val.geogLevelName,
                        value: val._id,
                        ...val
                    })
                })
            }
            return {
                ...defaultState.List,
                data: arr,
            };
        } catch (error) {
            return rejectWithValue({
                ...defaultReject,
                message: error.message,
            });
        }
    }
);

const PRACTITIONER_STATE_MASTER = createAsyncThunk(
    `practitionerMasterSlice/practitioner_state_master`,
    async (payload = {}, { rejectWithValue }) => {
        try {
            let { geogLevelCode } = payload;
            const data = await fetchData(
                { body: JSON.stringify(masterqueries.state_by_country(geogLevelCode)) },
                __readDocumentUrl__
            );
            let arr = [];
            if (Array.isArray(data.result) && data?.result?.length > 0) {
                data?.result.map(val => {
                    arr.push({
                        label: val.geogLevelName,
                        value: val._id,
                        ...val
                    })
                })
            }
            return {
                ...defaultState.List,
                data: arr,
            };
        } catch (error) {
            return rejectWithValue({
                ...defaultReject,
                message: error.message,
            });
        }
    }
);

const PRACTITIONER_DISTRICT_MASTER = createAsyncThunk(
    `practitionerMasterSlice/practitioner_district_master`,
    async (payload = {}, { rejectWithValue }) => {
        try {
            let { geogLevelCode } = payload;
            const data = await fetchData(
                { body: JSON.stringify(masterqueries.district_by_state(geogLevelCode)) },
                __readDocumentUrl__
            );
            let arr = [];
            if (Array.isArray(data.result) && data?.result?.length > 0) {
                data?.result.map(val => {
                    arr.push({
                        label: val.geogLevelName,
                        value: val._id,
                        ...val
                    })
                })
            }
            return {
                ...defaultState.List,
                data: arr,
            };
        } catch (error) {
            return rejectWithValue({
                ...defaultReject,
                message: error.message,
            });
        }
    }
);

const PRACTITIONER_CITY_MASTER = createAsyncThunk(
    `practitionerMasterSlice/practitioner_city_master`,
    async (payload = {}, { rejectWithValue }) => {
        try {
            let { geogLevelCode } = payload;
            const data = await fetchData(
                { body: JSON.stringify(masterqueries.city_by_district(geogLevelCode)) },
                __readDocumentUrl__
            );
            let arr = [];
            if (Array.isArray(data.result) && data?.result?.length > 0) {
                data?.result.map(val => {
                    arr.push({
                        label: val.geogLevelName,
                        value: val._id,
                        ...val
                    })
                })
            }
            return {
                ...defaultState.List,
                data: arr,
            };
        } catch (error) {
            return rejectWithValue({
                ...defaultReject,
                message: error.message,
            });
        }
    }
);

const PRACTITIONER_PINCODE_MASTER = createAsyncThunk(
    `practitionerMasterSlice/practitioner_pincode_master`,
    async (payload = {}, { rejectWithValue }) => {
        try {
            let { geogLevelCode } = payload;
            const data = await fetchData(
                { body: JSON.stringify(masterqueries.pincode_by_city(geogLevelCode)) },
                __readDocumentUrl__
            );
            let arr = [];
            if (Array.isArray(data.result) && data?.result?.length > 0) {
                data?.result.map(val => {
                    arr.push({
                        label: val.geogLevelName,
                        value: val._id,
                        ...val
                    })
                })
            }
            return {
                ...defaultState.List,
                data: arr,
            };
        } catch (error) {
            return rejectWithValue({
                ...defaultReject,
                message: error.message,
            });
        }
    }
);

const practitionerMasterSlice = createSlice({
    name: "practitionerMasterSlice",
    initialState: {
        practitioner_masters: {
            ...defaultState.Info,
        },
        practitionerbyid: {
            ...defaultState.Info,
        },
        practitioner_country_master: {
            ...defaultState.Info,
        },
        practitioner_state_master: {
            ...defaultState.Info,
        },
        practitioner_district_master: {
            ...defaultState.Info,
        },
        practitioner_city_master: {
            ...defaultState.Info,
        },
        practitioner_pincode_master: {
            ...defaultState.Info,
        },
        practitioner_location: {
            ...defaultState.List,
        }
    },
    extraReducers: {

        // PRACTITIONER_LOCATION_MASTERS
        [PRACTITIONER_LOCATION_MASTERS.fulfilled]: (state, action) => {
            (state.practitioner_location.loading = false);
                (state.practitioner_location.error = false);
                (state.practitioner_location = action.payload);
        },
        [PRACTITIONER_LOCATION_MASTERS.pending]: (state, action) => {
            (state.practitioner_location.loading = true);
                (state.practitioner_location.error = false);
                (state.practitioner_location.loading = true);
        },
        [PRACTITIONER_LOCATION_MASTERS.rejected]: (state, action) => {
            (state.practitioner_location.loading = false);
                (state.practitioner_location.error = true);
                (state.practitioner_location = action.payload);
        },

        // PRACTITIONER_MASTERS 
        [PRACTITIONER_MASTERS.fulfilled]: (state, action) => {
            (state.practitioner_masters.loading = false);
                (state.practitioner_masters.error = false);
                (state.practitioner_masters = action.payload);
        },
        [PRACTITIONER_MASTERS.pending]: (state, action) => {
            (state.practitioner_masters.loading = true);
                (state.practitioner_masters.error = false);
                (state.practitioner_masters.loading = true);
        },
        [PRACTITIONER_MASTERS.rejected]: (state, action) => {
            (state.practitioner_masters.loading = false);
                (state.practitioner_masters.error = true);
                (state.practitioner_masters = action.payload);
        },

        // PRACTITIONER_GET_BY_ID
        [PRACTITIONER_GET_BY_ID.fulfilled]: (state, action) => {
            (state.practitionerbyid.loading = false);
                (state.practitionerbyid.error = false);
                (state.practitionerbyid = action.payload);
        },
        [PRACTITIONER_GET_BY_ID.pending]: (state, action) => {
            (state.practitionerbyid.loading = true);
                (state.practitionerbyid.error = false);
                (state.practitionerbyid.loading = true);
        },
        [PRACTITIONER_GET_BY_ID.rejected]: (state, action) => {
            (state.practitionerbyid.loading = false);
                (state.practitionerbyid.error = true);
                (state.practitionerbyid = action.payload);
        },
        // PRACTITIONER_COUNTRY_MASTER
        [PRACTITIONER_COUNTRY_MASTER.fulfilled]: (state, action) => {
            (state.practitioner_country_master.loading = false);
                (state.practitioner_country_master.error = false);
                (state.practitioner_country_master = action.payload);
        },
        [PRACTITIONER_COUNTRY_MASTER.pending]: (state, action) => {
            (state.practitioner_country_master.loading = true);
                (state.practitioner_country_master.error = false);
                (state.practitioner_country_master.loading = true);
        },
        [PRACTITIONER_COUNTRY_MASTER.rejected]: (state, action) => {
            (state.practitioner_country_master.loading = false);
                (state.practitioner_country_master.error = true);
                (state.practitioner_country_master = action.payload);
        },

        // PRACTITIONER_STATE_MASTER
        [PRACTITIONER_STATE_MASTER.fulfilled]: (state, action) => {
            (state.practitioner_state_master.loading = false);
                (state.practitioner_state_master.error = false);
                (state.practitioner_state_master = action.payload);
        },
        [PRACTITIONER_STATE_MASTER.pending]: (state, action) => {
            (state.practitioner_state_master.loading = true);
                (state.practitioner_state_master.error = false);
                (state.practitioner_state_master.loading = true);
        },
        [PRACTITIONER_STATE_MASTER.rejected]: (state, action) => {
            (state.practitioner_state_master.loading = false);
                (state.practitioner_state_master.error = true);
                (state.practitioner_state_master = action.payload);
        },
        // PRACTITIONER_DISTRICT_MASTER
        [PRACTITIONER_DISTRICT_MASTER.fulfilled]: (state, action) => {
            (state.practitioner_district_master.loading = false);
                (state.practitioner_district_master.error = false);
                (state.practitioner_district_master = action.payload);
        },
        [PRACTITIONER_DISTRICT_MASTER.pending]: (state, action) => {
            (state.practitioner_district_master.loading = true);
                (state.practitioner_district_master.error = false);
                (state.practitioner_district_master.loading = true);
        },
        [PRACTITIONER_DISTRICT_MASTER.rejected]: (state, action) => {
            (state.practitioner_district_master.loading = false);
                (state.practitioner_district_master.error = true);
                (state.practitioner_district_master = action.payload);
        },
        // PRACTITIONER_CITY_MASTER
        [PRACTITIONER_CITY_MASTER.fulfilled]: (state, action) => {
            (state.practitioner_city_master.loading = false);
                (state.practitioner_city_master.error = false);
                (state.practitioner_city_master = action.payload);
        },
        [PRACTITIONER_CITY_MASTER.pending]: (state, action) => {
            (state.practitioner_city_master.loading = true);
                (state.practitioner_city_master.error = false);
                (state.practitioner_city_master.loading = true);
        },
        [PRACTITIONER_CITY_MASTER.rejected]: (state, action) => {
            (state.practitioner_city_master.loading = false);
                (state.practitioner_city_master.error = true);
                (state.practitioner_city_master = action.payload);
        },
        // PRACTITIONER_PINCODE_MASTER
        [PRACTITIONER_PINCODE_MASTER.fulfilled]: (state, action) => {
            (state.practitioner_pincode_master.loading = false);
                (state.practitioner_pincode_master.error = false);
                (state.practitioner_pincode_master = action.payload);
        },
        [PRACTITIONER_PINCODE_MASTER.pending]: (state, action) => {
            (state.practitioner_pincode_master.loading = true);
                (state.practitioner_pincode_master.error = false);
                (state.practitioner_pincode_master.loading = true);
        },
        [PRACTITIONER_PINCODE_MASTER.rejected]: (state, action) => {
            (state.practitioner_pincode_master.loading = false);
                (state.practitioner_pincode_master.error = true);
                (state.practitioner_pincode_master = action.payload);
        }
    },
});

const practitionerMasterActions = {
    PRACTITIONER_MASTERS,
    PRACTITIONER_GET_BY_ID,
    PRACTITIONER_COUNTRY_MASTER,
    PRACTITIONER_STATE_MASTER,
    PRACTITIONER_DISTRICT_MASTER,
    PRACTITIONER_CITY_MASTER,
    PRACTITIONER_PINCODE_MASTER,
    PRACTITIONER_LOCATION_MASTERS
};

export { practitionerMasterActions };

export default practitionerMasterSlice.reducer;
