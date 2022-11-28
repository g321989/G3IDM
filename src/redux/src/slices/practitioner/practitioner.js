import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  defaultReject,
  defaultState,
  __readDocumentUrl__,
  __uspsertUrl__,
  __deleteUrl__,
  __update__,
  __upsertPractitioner__,
} from "../../settings";
import { fetchData } from "../../helpers";
import { queries } from "./queries";
import { generateJSON } from "./createPractitonerJson";

const PRACTITIONER_ROLE_READ = createAsyncThunk(
  `practitionerSlice/practitionerlist`,
  async (payload = {}, { rejectWithValue }) => {
    try {
      let { type } = payload;
      const data = await fetchData(
        { body: JSON.stringify(queries.rolelist(type)) },
        __readDocumentUrl__
      );
      let arry = [];
      data.result.map((val) => {
        if (val.coding[0] && val.coding[0].code && val.coding[0].display) {
          arry.push({
            code_type: val.coding[0].code,
            description: val.coding[0].display,
            coding_key: val.coding[0]._key ?? null,
            id: val.coding[0].id,
            _key: val._key,
            status: val.status,
            activestatus: val.coding[0].activestatus,
          });
        }
      });
      return {
        ...defaultState.List,
        data: arry,
      };
    } catch (error) {
      return rejectWithValue({
        ...defaultReject,
        message: error.message,
      });
    }
  }
);

const PRACTITIONER_ROLE_UPSERT = createAsyncThunk(
  `practitionerSlice/practitionerRoleAdd`,
  async (payload = {}, { rejectWithValue }) => {
    try {
      const upsertkey = {
        code: payload.code,
        description: payload.description,
        type: payload.type,
        status: payload.status,
        _key: payload._key,
        id: payload.id,
        coding_key: payload.coding_key,
      };
      let queriesjson = queries.upsert(upsertkey);
      const data = await fetchData(
        { body: JSON.stringify(queriesjson) },
        __uspsertUrl__
      );
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

const PRACTITIONER_LIST_READ = createAsyncThunk(
  `practitionerSlice/practitioner`,
  async (payload = {}, { rejectWithValue }) => {
    try {
      const data = await fetchData(
        {
          body: JSON.stringify(
            queries.practitioner_list_teneteid(
              payload?.page,
              payload?.perPage,
              payload?.search ? payload?.search : "",
              payload?.tenantid
            )
          ),
        },
        __readDocumentUrl__
      );
      let arry = [];
      data.result.map((val) => {
        // if(val.name){
        console.log(val);
        arry.push({
          ...val,
          name: val?.name[0]?.text ? val?.name[0]?.text : "-",
          type: val?.roleid?.[0]?.rolename ? val?.roleid[0].rolename : "-",
          _key: val._key,
         
          // status: val.status,
        });
        // }
      });
      return {
        ...defaultState.List,
        data: arry,
      };
      // let getRoledetails = queries.getRoleDetails(payload?.roleid);

      // const Role = await fetchData(
      //   { body: JSON.stringify(getRoledetails) },
      //   __readDocumentUrl__
      // );
    //   if (Role?.result[0] === "Super Admin Role") {
    //   const data = await fetchData(
    //     {
    //       body: JSON.stringify(
    //         queries.practitioner_list_teneteid(
    //           payload?.page,
    //           payload?.perPage,
    //           payload?.search ? payload?.search : "",
    //           payload?.tenantid
    //         )
    //       ),
    //     },
    //     __readDocumentUrl__
    //   );
    //   let arry = [];
    //   data.result.map((val) => {
    //     // if(val.name){
    //     console.log(val);
    //     arry.push({
    //       ...val,
    //       name: val?.name[0]?.text ? val?.name[0]?.text : "-",
    //       type: val?.roleid?.[0]?.rolename ? val?.roleid[0].rolename : "-",
    //       _key: val._key,
         
    //       // status: val.status,
    //     });
    //     // }
    //   });
    //   return {
    //     ...defaultState.List,
    //     data: arry,
    //   };
    // }

    // else {

    //   const data = await fetchData(
    //     {
    //       body: JSON.stringify(
    //         queries.practitioner_list_teneteid(
    //           payload?.page,
    //           payload?.perPage,
    //           payload?.search ? payload?.search : "",
    //           payload?.tenantid
    //         )
    //       ),
    //     },
    //     __readDocumentUrl__
    //   );
    //   let arry = [];
    //   data.result.map((val) => {
    //     // if(val.name){
    //     console.log(val);
    //     arry.push({
    //       ...val,
    //       name: val?.name[0]?.text ? val?.name[0]?.text : "-",
    //       type: val?.roleid?.[0]?.rolename ? val?.roleid[0].rolename : "-",
    //       _key: val._key,
    //       // status: val.status,
    //     });
    //     // }
    //   });
    //   return {
    //     ...defaultState.List,
    //     data: arry,
    //   };
    // }
      
     
    } catch (error) {
      console.log(error);
      return rejectWithValue({
        ...defaultReject,
        message: error.message,
      });
    }
  }
);

const PRACTITIONER_UPSERT = createAsyncThunk(
  `practitionerSlice/practitionerAdd`,
  async (payload = {}, { rejectWithValue }) => {
    try {
      let { data, _key, personId, ID } = payload;
      let queriesjson = generateJSON(data, _key, personId, ID);

      const dataRes = await fetchData(
        { body: JSON.stringify(queriesjson) },
        __upsertPractitioner__
      );

      return {
        ...defaultState.List,
        data: dataRes,
      };
    } catch (error) {
      return rejectWithValue({
        ...defaultReject,
        message: error.message,
      });
    }
  }
);

const PRACTITIONER_STATUS_CHANGE = createAsyncThunk(
  `practitionerSlice/practitionerStatus`,
  async (payload = {}, { rejectWithValue }) => {
    try {
      const statuschange = {
        _key: payload._key,
        status: payload.status,
      };
      let queriesjson = queries.status_update_practitioner(statuschange);
      const data = await fetchData(
        { body: JSON.stringify(queriesjson) },
        __uspsertUrl__
      );
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

const GET_ENTITY_BY_ID = createAsyncThunk(
  `practitionerSlice/get_entity_id`,
  async (payload = {}, { rejectWithValue }) => {
    try {
      let { id } = payload;
      const data = await fetchData(
        { body: JSON.stringify(queries.get_entity_by_id(id)) },
        __readDocumentUrl__
      );
      let arry = [];
      data.result.map((value) => {
        arry.push({
          label: value?.name ?? "",
          value: value?._id ?? "",
          ...value,
        });
      });
      return {
        ...defaultState.List,
        data: arry,
      };
    } catch (error) {
      return rejectWithValue({
        ...defaultReject,
        message: error.message,
      });
    }
  }
);

const practitionerSlice = createSlice({
  name: "practitionerApiSlice",
  initialState: {
    practitioner_role_list: {
      ...defaultState.List,
    },
    practitioner_role_upsert: {
      ...defaultState.List,
    },
    practitioner_list: {
      ...defaultState.List,
    },
    practitioner_upsert: {
      ...defaultState.List,
    },
    practitioner_status_update: {
      ...defaultState.List,
    },
    get_entity_by_id: {
      ...defaultState.List,
    },
  },
  extraReducers: {
    // PRACTITIONER_ROLE_READ
    [PRACTITIONER_ROLE_READ.fulfilled]: (state, action) => {
      (state.practitioner_role_list.loading = false);
        (state.practitioner_role_list.error = false);
        (state.practitioner_role_list = action.payload);
    },
    [PRACTITIONER_ROLE_READ.pending]: (state, action) => {
      (state.practitioner_role_list.loading = true);
        (state.practitioner_role_list.error = false);
        (state.practitioner_role_list.loading = true);
    },
    [PRACTITIONER_ROLE_READ.rejected]: (state, action) => {
      (state.practitioner_role_list.loading = false);
        (state.practitioner_role_list.error = true);
        (state.practitioner_role_list = action.payload);
    },

    // PRACTITIONER_ROLE_UPSERT
    [PRACTITIONER_ROLE_UPSERT.fulfilled]: (state, action) => {
      (state.practitioner_role_upsert.loading = false);
        (state.practitioner_role_upsert.error = false);
        (state.practitioner_role_upsert = action.payload);
    },
    [PRACTITIONER_ROLE_UPSERT.pending]: (state, action) => {
      (state.practitioner_role_upsert.loading = true);
        (state.practitioner_role_upsert.error = false);
        (state.practitioner_role_upsert.loading = true);
    },
    [PRACTITIONER_ROLE_UPSERT.rejected]: (state, action) => {
      (state.practitioner_role_upsert.loading = false);
        (state.practitioner_role_upsert.error = true);
        (state.practitioner_role_upsert = action.payload);
    },

    // PRACTITIONER_LIST_READ
    [PRACTITIONER_LIST_READ.fulfilled]: (state, action) => {
      (state.practitioner_list.loading = false);
        (state.practitioner_list.error = false);
        (state.practitioner_list = action.payload);
    },
    [PRACTITIONER_LIST_READ.pending]: (state, action) => {
      (state.practitioner_list.loading = true);
        (state.practitioner_list.error = false);
        (state.practitioner_list.loading = true);
    },
    [PRACTITIONER_LIST_READ.rejected]: (state, action) => {
      (state.practitioner_list.loading = false);
        (state.practitioner_list.error = true);
        (state.practitioner_list = action.payload);
    },

    // PRACTITIONER_UPSERT
    [PRACTITIONER_UPSERT.fulfilled]: (state, action) => {
      (state.practitioner_upsert.loading = false);
        (state.practitioner_upsert.error = false);
        (state.practitioner_upsert = action.payload);
    },
    [PRACTITIONER_UPSERT.pending]: (state, action) => {
      (state.practitioner_upsert.loading = true);
        (state.practitioner_upsert.error = false);
        (state.practitioner_upsert.loading = true);
    },
    [PRACTITIONER_UPSERT.rejected]: (state, action) => {
      (state.practitioner_upsert.loading = false);
        (state.practitioner_upsert.error = true);
        (state.practitioner_upsert = action.payload);
    },

    // PRACTITIONER_STATUS_CHANGE
    [PRACTITIONER_STATUS_CHANGE.fulfilled]: (state, action) => {
      (state.practitioner_status_update.loading = false);
        (state.practitioner_status_update.error = false);
        (state.practitioner_status_update = action.payload);
    },
    [PRACTITIONER_STATUS_CHANGE.pending]: (state, action) => {
      (state.practitioner_status_update.loading = true);
        (state.practitioner_status_update.error = false);
        (state.practitioner_status_update.loading = true);
    },
    [PRACTITIONER_STATUS_CHANGE.rejected]: (state, action) => {
      (state.practitioner_status_update.loading = false);
        (state.practitioner_status_update.error = true);
        (state.practitioner_status_update = action.payload);
    },

    // GET_ENTITY_BY_ID
    [GET_ENTITY_BY_ID.fulfilled]: (state, action) => {
      (state.get_entity_by_id.loading = false);
        (state.get_entity_by_id.error = false);
        (state.get_entity_by_id = action.payload);
    },
    [GET_ENTITY_BY_ID.pending]: (state, action) => {
      (state.get_entity_by_id.loading = true);
        (state.get_entity_by_id.error = false);
        (state.get_entity_by_id.loading = true);
    },
    [GET_ENTITY_BY_ID.rejected]: (state, action) => {
      (state.get_entity_by_id.loading = false);
        (state.get_entity_by_id.error = true);
        (state.get_entity_by_id = action.payload);
    },
  },
});

const practitionerActions = {
  PRACTITIONER_ROLE_READ,
  PRACTITIONER_ROLE_UPSERT,
  PRACTITIONER_LIST_READ,
  PRACTITIONER_UPSERT,
  PRACTITIONER_STATUS_CHANGE,
  GET_ENTITY_BY_ID,
};

export { practitionerActions };

export default practitionerSlice.reducer;
