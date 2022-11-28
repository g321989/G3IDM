import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  defaultReject,
  defaultState,
  __readDocumentUrl__,
  __uspsertUrl__,
  __deleteUrl__,
  __update__,
  __softDelete__,
} from "../../../settings";
import { fetchData } from "../../../helpers";
import { queries } from "./query";
import moment from "moment";
const PATIENTCATEGORY = createAsyncThunk(
  `personSlice/patientcategory`,
  async (payload = {}, { rejectWithValue }) => {
    try {
      let queriesjson = queries.patientcategory();
      const data = await fetchData(
        { body: JSON.stringify(queriesjson) },
        __readDocumentUrl__
      );
      return {
        ...defaultState.List,
        data: data.result,
      };
    } catch (error) {
      return rejectWithValue({
        ...defaultReject,
        message: error.message,
      });
    }
  }
);
const MEALTYPE = createAsyncThunk(
  `personSlice/mealtype`,
  async (payload = {}, { rejectWithValue }) => {
    try {
      let queriesjson = queries.mealtype();
      const data = await fetchData(
        { body: JSON.stringify(queriesjson) },
        __readDocumentUrl__
      );
      return {
        ...defaultState.List,
        data: data.result,
      };
    } catch (error) {
      return rejectWithValue({
        ...defaultReject,
        message: error.message,
      });
    }
  }
);
const DAYLIST = createAsyncThunk(
  `personSlice/day`,
  async (payload = {}, { rejectWithValue }) => {
    try {
      let queriesjson = queries.day();
      const data = await fetchData(
        { body: JSON.stringify(queriesjson) },
        __readDocumentUrl__
      );
      return {
        ...defaultState.List,
        data: data.result,
      };
    } catch (error) {
      return rejectWithValue({
        ...defaultReject,
        message: error.message,
      });
    }
  }
);
const ORGNAME = createAsyncThunk(
  `personSlice/orgname`,
  async (payload = {}, { rejectWithValue }) => {
    try {
      let queriesjson = queries.orgname();
      const data = await fetchData(
        { body: JSON.stringify(queriesjson) },
        __readDocumentUrl__
      );
      return {
        ...defaultState.List,
        data: data.result,
      };
    } catch (error) {
      return rejectWithValue({
        ...defaultReject,
        message: error.message,
      });
    }
  }
);
const FACILITYLIST = createAsyncThunk(
  `personSlice/facilityList`,
  async (payload = {}, { rejectWithValue }) => {
    try {
      console.log(payload);
      let queriesjson = queries.facilityList(payload);
      const data = await fetchData(
        { body: JSON.stringify(queriesjson) },
        __readDocumentUrl__
      );
      return {
        ...defaultState.List,
        data: data.result,
      };
    } catch (error) {
      return rejectWithValue({
        ...defaultReject,
        message: error.message,
      });
    }
  }
);

const PERSON_UPSERT = createAsyncThunk(
  `personSlice/person_upsert`,
  async (payload = {}, { rejectWithValue }) => {
    try {
     
      let Query = queries.isPersonExist(payload);
      const data1 = await fetchData(
        { body: JSON.stringify(Query) },
        __readDocumentUrl__
      )
      if (data1?.result?.length > 0) {
        return rejectWithValue({
          ...defaultReject,
          message: "Email Already Exist",
        });
      }

      else{
      const params = {
        _key: payload._key,
        ...payload,
      };
      let queriesjson = queries.person_upsert(params);
      const data = await fetchData(
        { body: JSON.stringify(queriesjson) },
        __uspsertUrl__
      );
      return {
        ...defaultState.List,
        data: data,
      };
    }
    } catch (error) {
      return rejectWithValue({
        ...defaultReject,
        message: error.message,
      });
    }
  }
);

const PERSON_DELETE = createAsyncThunk(
  `personSlice/person_delete`,
  async (payload = {}, { rejectWithValue }) => {
    try {
      const params = {
        _id: payload._id,
        ...payload,
      };
      let queriesjson = queries.person_delete(params);
      const data = await fetchData(
        { body: JSON.stringify(queriesjson) },
        __deleteUrl__
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
const PERSON_READ = createAsyncThunk(
  `personSlice/person_read`,
  async (payload = {}, { rejectWithValue }) => {
    try {
      let readqueries = queries.person_read(payload);
      const data = await fetchData(
        { body: JSON.stringify(readqueries) },
        __readDocumentUrl__
      );

      return {
        ...defaultState.List,
        data: data.result,
      };
    } catch (error) {
      return rejectWithValue({
        ...defaultReject.List,
        message: error.message,
      });
    }
  }
);
//single read person

const SINGLE_PERSON_READ = createAsyncThunk(
  `personSlice/single_read_person`,
  async (payload = {}, { rejectWithValue }) => {
    try {
      let readqueries = queries.single_read_person(payload);
      const data = await fetchData(
        { body: JSON.stringify(readqueries) },
        __readDocumentUrl__
      );

      return {
        ...defaultState.List,
        data: data.result,
      };
    } catch (error) {
      return rejectWithValue({
        ...defaultReject.List,
        message: error.message,
      });
    }
  }
);
//contact_system_master
const CONTACTSYSTEMMASTER = createAsyncThunk(
  `personSlice/contact_system_master`,
  async (payload = {}, { rejectWithValue }) => {
    try {
      let readqueries = queries.contact_system_master(payload);
      const data = await fetchData(
        { body: JSON.stringify(readqueries) },
        __readDocumentUrl__
      );
      let arry = [];
      data.result.map((val) => {
        arry.push({
          ...val,
          label: val.display,
          value: val._id,
        });
      });
      return {
        ...defaultState.List,
        data: arry,
      };
    } catch (error) {
      return rejectWithValue({
        ...defaultReject.List,
        message: error.message,
      });
    }
  }
);
//entity_name_master
const ENTITYNAMEMASTER = createAsyncThunk(
  `personSlice/entity_name_master`,
  async (payload = {}, { rejectWithValue }) => {
    try {
      let readqueries = queries.entity_name_master(payload);
      const data = await fetchData(
        { body: JSON.stringify(readqueries) },
        __readDocumentUrl__
      );
      let arry = [];
      data.result.map((val) => {
        arry.push({
          ...val,
          label: val.name,
          value: val._id,
        });
      });
      return {
        ...defaultState.List,
        data: arry,
      };
    } catch (error) {
      return rejectWithValue({
        ...defaultReject.List,
        message: error.message,
      });
    }
  }
);
//entity_type_master
const ENTITYTYPEMASTER = createAsyncThunk(
  `personSlice/entity_type_master`,
  async (payload = {}, { rejectWithValue }) => {
    try {
      let readqueries = queries.entity_type_master(payload);
      const data = await fetchData(
        { body: JSON.stringify(readqueries) },
        __readDocumentUrl__
      );
      let arry = [];
      data.result.map((val) => {
        arry.push({
          ...val,
          label: val.display,
          value: val._id,
        });
      });
      return {
        ...defaultState.List,
        data: arry,
      };
    } catch (error) {
      return rejectWithValue({
        ...defaultReject.List,
        message: error.message,
      });
    }
  }
);
//gender_master
const GENDERMASTER = createAsyncThunk(
  `personSlice/gender_master`,
  async (payload = {}, { rejectWithValue }) => {
    try {
      let readqueries = queries.gender_master(payload);
      const data = await fetchData(
        { body: JSON.stringify(readqueries) },
        __readDocumentUrl__
      );
      let arry = [];
      data.result.map((val) => {
        arry.push({
          ...val,
          label: val.display,
          value: val._id,
        });
      });
      return {
        ...defaultState.List,
        data: arry,
      };
    } catch (error) {
      return rejectWithValue({
        ...defaultReject.List,
        message: error.message,
      });
    }
  }
);
//id_type_master
const IDTYPEMASTER = createAsyncThunk(
  `personSlice/id_type_master`,
  async (payload = {}, { rejectWithValue }) => {
    try {
      let readqueries = queries.id_type_master(payload);
      const data = await fetchData(
        { body: JSON.stringify(readqueries) },
        __readDocumentUrl__
      );
      let arry = [];
      data.result.map((val) => {
        arry.push({
          ...val,
          label: val.display,
          value: val._id,
        });
      });
      return {
        ...defaultState.List,
        data: arry,
      };
    } catch (error) {
      return rejectWithValue({
        ...defaultReject.List,
        message: error.message,
      });
    }
  }
);
//prefix_master
const PREFIXMASTER = createAsyncThunk(
  `personSlice/prefix_master`,
  async (payload = {}, { rejectWithValue }) => {
    try {
      let readqueries = queries.prefix_master(payload);
      const data = await fetchData(
        { body: JSON.stringify(readqueries) },
        __readDocumentUrl__
      );
      let arry = [];
      data.result.map((val) => {
        arry.push({
          ...val,
          label: val.display,
          value: val._id,
        });
      });
      return {
        ...defaultState.List,
        data: arry,
      };
    } catch (error) {
      return rejectWithValue({
        ...defaultReject.List,
        message: error.message,
      });
    }
  }
);
//priority_master
const PRIORITYMASTER = createAsyncThunk(
  `personSlice/priority_master`,
  async (payload = {}, { rejectWithValue }) => {
    try {
      let readqueries = queries.priority_master(payload);
      const data = await fetchData(
        { body: JSON.stringify(readqueries) },
        __readDocumentUrl__
      );
      let arry = [];
      data.result.map((val) => {
        arry.push({
          ...val,
          label: val.display,
          value: val._id,
        });
      });
      return {
        ...defaultState.List,
        data: arry,
      };
    } catch (error) {
      return rejectWithValue({
        ...defaultReject.List,
        message: error.message,
      });
    }
  }
);
//surffix_master
const SURFFIXMASTER = createAsyncThunk(
  `personSlice/surffix_master`,
  async (payload = {}, { rejectWithValue }) => {
    try {
      let readqueries = queries.surffix_master(payload);
      const data = await fetchData(
        { body: JSON.stringify(readqueries) },
        __readDocumentUrl__
      );
      let arry = [];
      data.result.map((val) => {
        arry.push({
          ...val,
          label: val.display,
          value: val._id,
        });
      });
      return {
        ...defaultState.List,
        data: arry,
      };
    } catch (error) {
      return rejectWithValue({
        ...defaultReject.List,
        message: error.message,
      });
    }
  }
);
//use_master
const USEMASTER = createAsyncThunk(
  `personSlice/use_master`,
  async (payload = {}, { rejectWithValue }) => {
    try {
      let readqueries = queries.use_master(payload);
      const data = await fetchData(
        { body: JSON.stringify(readqueries) },
        __readDocumentUrl__
      );
      let arry = [];
      data.result.map((val) => {
        arry.push({
          ...val,
          label: val.display,
          value: val._id,
        });
      });
      return {
        ...defaultState.List,
        data: arry,
      };
    } catch (error) {
      return rejectWithValue({
        ...defaultReject.List,
        message: error.message,
      });
    }
  }
);
const personSlice = createSlice({
  name: "personSlice",
  initialState: {
    patientcategory: {
      ...defaultState.List,
    },
    day: {
      ...defaultState.List,
    },
    mealtype: {
      ...defaultState.List,
    },
    facilityList: {
      ...defaultState.List,
    },
    orgname: {
      ...defaultState.List,
    },
    person_upsert: {
      ...defaultState.List,
    },
    person_delete: {
      ...defaultState.List,
    },
    person_read: {
      ...defaultState.List,
    },
    contact_system_master: {
      ...defaultState.List,
    },
    entity_name_master: {
      ...defaultState.List,
    },
    entity_type_master: {
      ...defaultState.List,
    },
    gender_master: {
      ...defaultState.List,
    },
    id_type_master: {
      ...defaultState.List,
    },
    prefix_master: {
      ...defaultState.List,
    },
    priority_master: {
      ...defaultState.List,
    },
    surffix_master: {
      ...defaultState.List,
    },
    use_master: {
      ...defaultState.List,
    },
    single_read_person: {
      ...defaultState.List,
    },
  },
  extraReducers: {
    // PERSON_ROLE_UPSERT

    [PATIENTCATEGORY.fulfilled]: (state, action) => {
      (state.patientcategory.loading = false);
        (state.patientcategory.error = false);
        (state.patientcategory = action.payload);
    },
    [PATIENTCATEGORY.pending]: (state, action) => {
      (state.patientcategory.loading = true);
        (state.patientcategory.error = false);
        (state.patientcategory.loading = true);
    },
    [PATIENTCATEGORY.rejected]: (state, action) => {
      (state.orgname.loading = false);
        (state.orgname.error = true);
        (state.orgname = action.payload);
    },
    [MEALTYPE.fulfilled]: (state, action) => {
      (state.mealtype.loading = false);
        (state.mealtype.error = false);
        (state.mealtype = action.payload);
    },
    [MEALTYPE.pending]: (state, action) => {
      (state.mealtype.loading = true);
        (state.mealtype.error = false);
        (state.mealtype.loading = true);
    },
    [MEALTYPE.rejected]: (state, action) => {
      (state.mealtype.loading = false);
        (state.mealtype.error = true);
        (state.mealtype = action.payload);
    },
    [DAYLIST.fulfilled]: (state, action) => {
      (state.day.loading = false);
        (state.day.error = false);
        (state.day = action.payload);
    },
    [DAYLIST.pending]: (state, action) => {
      (state.day.loading = true);
        (state.day.error = false);
        (state.day.loading = true);
    },
    [DAYLIST.rejected]: (state, action) => {
      (state.day.loading = false);
        (state.day.error = true);
        (state.day = action.payload);
    },
    [ORGNAME.fulfilled]: (state, action) => {
      (state.orgname.loading = false);
        (state.orgname.error = false);
        (state.orgname = action.payload);
    },
    [ORGNAME.pending]: (state, action) => {
      (state.orgname.loading = true);
        (state.orgname.error = false);
        (state.orgname.loading = true);
    },
    [ORGNAME.rejected]: (state, action) => {
      (state.orgname.loading = false);
        (state.orgname.error = true);
        (state.orgname = action.payload);
    },
    [FACILITYLIST.fulfilled]: (state, action) => {
      (state.facilityList.loading = false);
        (state.facilityList.error = false);
        (state.facilityList = action.payload);
    },
    [FACILITYLIST.pending]: (state, action) => {
      (state.facilityList.loading = true);
        (state.facilityList.error = false);
        (state.facilityList.loading = true);
    },
    [FACILITYLIST.rejected]: (state, action) => {
      (state.facilityList.loading = false);
        (state.facilityList.error = true);
        (state.facilityList = action.payload);
    },
    [PERSON_UPSERT.fulfilled]: (state, action) => {
      (state.person_upsert.loading = false);
        (state.person_upsert.error = false);
        (state.person_upsert = action.payload);
    },
    [PERSON_UPSERT.pending]: (state, action) => {
      (state.person_upsert.loading = true);
        (state.person_upsert.error = false);
        (state.person_upsert.loading = true);
    },
    [PERSON_UPSERT.rejected]: (state, action) => {
      (state.person_upsert.loading = false);
        (state.person_upsert.error = true);
        (state.person_upsert = action.payload);
    },
    [PERSON_DELETE.fulfilled]: (state, action) => {
      (state.person_delete.loading = false);
        (state.person_delete.error = false);
        (state.person_delete = action.payload);
    },
    [PERSON_DELETE.pending]: (state, action) => {
      (state.person_delete.loading = true);
        (state.person_delete.error = false);
        (state.person_delete.loading = true);
    },
    [PERSON_DELETE.rejected]: (state, action) => {
      (state.person_delete.loading = false);
        (state.person_delete.error = true);
        (state.person_delete = action.payload);
    },
    [PERSON_READ.fulfilled]: (state, action) => {
      (state.person_read.loading = false);
        (state.person_read.error = false);
        (state.person_read = action.payload);
    },
    [PERSON_READ.pending]: (state, action) => {
      (state.person_read.loading = true);
        (state.person_read.error = false);
        (state.person_read.loading = true);
    },
    [PERSON_READ.rejected]: (state, action) => {
      (state.person_read.loading = false);
        (state.person_read.error = true);
        (state.person_read = action.payload);
    },

    [CONTACTSYSTEMMASTER.fulfilled]: (state, action) => {
      (state.contact_system_master.loading = false);
        (state.contact_system_master.error = false);
        (state.contact_system_master = action.payload);
    },
    [CONTACTSYSTEMMASTER.pending]: (state, action) => {
      (state.contact_system_master.loading = true);
        (state.contact_system_master.error = false);
        (state.contact_system_master.loading = true);
    },
    [CONTACTSYSTEMMASTER.rejected]: (state, action) => {
      (state.contact_system_master.loading = false);
        (state.contact_system_master.error = true);
        (state.contact_system_master = action.payload);
    },

    [ENTITYNAMEMASTER.fulfilled]: (state, action) => {
      (state.entity_name_master.loading = false);
        (state.entity_name_master.error = false);
        (state.entity_name_master = action.payload);
    },
    [ENTITYNAMEMASTER.pending]: (state, action) => {
      (state.entity_name_master.loading = true);
        (state.entity_name_master.error = false);
        (state.entity_name_master.loading = true);
    },
    [ENTITYNAMEMASTER.rejected]: (state, action) => {
      (state.entity_name_master.loading = false);
        (state.entity_name_master.error = true);
        (state.entity_name_master = action.payload);
    },

    [ENTITYTYPEMASTER.fulfilled]: (state, action) => {
      (state.entity_type_master.loading = false);
        (state.entity_type_master.error = false);
        (state.entity_type_master = action.payload);
    },
    [ENTITYTYPEMASTER.pending]: (state, action) => {
      (state.entity_type_master.loading = true);
        (state.entity_type_master.error = false);
        (state.entity_type_master.loading = true);
    },
    [ENTITYTYPEMASTER.rejected]: (state, action) => {
      (state.entity_type_master.loading = false);
        (state.entity_type_master.error = true);
        (state.entity_type_master = action.payload);
    },

    [GENDERMASTER.fulfilled]: (state, action) => {
      (state.gender_master.loading = false);
        (state.gender_master.error = false);
        (state.gender_master = action.payload);
    },
    [GENDERMASTER.pending]: (state, action) => {
      (state.gender_master.loading = true);
        (state.gender_master.error = false);
        (state.gender_master.loading = true);
    },
    [GENDERMASTER.rejected]: (state, action) => {
      (state.gender_master.loading = false);
        (state.gender_master.error = true);
        (state.gender_master = action.payload);
    },

    [IDTYPEMASTER.fulfilled]: (state, action) => {
      (state.id_type_master.loading = false);
        (state.id_type_master.error = false);
        (state.id_type_master = action.payload);
    },
    [IDTYPEMASTER.pending]: (state, action) => {
      (state.id_type_master.loading = true);
        (state.id_type_master.error = false);
        (state.id_type_master.loading = true);
    },
    [IDTYPEMASTER.rejected]: (state, action) => {
      (state.id_type_master.loading = false);
        (state.id_type_master.error = true);
        (state.id_type_master = action.payload);
    },

    [PREFIXMASTER.fulfilled]: (state, action) => {
      (state.prefix_master.loading = false);
        (state.prefix_master.error = false);
        (state.prefix_master = action.payload);
    },
    [PREFIXMASTER.pending]: (state, action) => {
      (state.prefix_master.loading = true);
        (state.prefix_master.error = false);
        (state.prefix_master.loading = true);
    },
    [PREFIXMASTER.rejected]: (state, action) => {
      (state.prefix_master.loading = false);
        (state.prefix_master.error = true);
        (state.prefix_master = action.payload);
    },

    [PRIORITYMASTER.fulfilled]: (state, action) => {
      (state.priority_master.loading = false);
        (state.priority_master.error = false);
        (state.priority_master = action.payload);
    },
    [PRIORITYMASTER.pending]: (state, action) => {
      (state.priority_master.loading = true);
        (state.priority_master.error = false);
        (state.priority_master.loading = true);
    },
    [PRIORITYMASTER.rejected]: (state, action) => {
      (state.priority_master.loading = false);
        (state.priority_master.error = true);
        (state.priority_master = action.payload);
    },

    [SURFFIXMASTER.fulfilled]: (state, action) => {
      (state.surffix_master.loading = false);
        (state.surffix_master.error = false);
        (state.surffix_master = action.payload);
    },
    [SURFFIXMASTER.pending]: (state, action) => {
      (state.surffix_master.loading = true);
        (state.surffix_master.error = false);
        (state.surffix_master.loading = true);
    },
    [SURFFIXMASTER.rejected]: (state, action) => {
      (state.surffix_master.loading = false);
        (state.surffix_master.error = true);
        (state.surffix_master = action.payload);
    },

    [USEMASTER.fulfilled]: (state, action) => {
      (state.use_master.loading = false);
        (state.use_master.error = false);
        (state.use_master = action.payload);
    },
    [USEMASTER.pending]: (state, action) => {
      (state.use_master.loading = true);
        (state.use_master.error = false);
        (state.use_master.loading = true);
    },
    [USEMASTER.rejected]: (state, action) => {
      (state.use_master.loading = false);
        (state.use_master.error = true);
        (state.use_master = action.payload);
    },
    [SINGLE_PERSON_READ.fulfilled]: (state, action) => {
      (state.single_read_person.loading = false);
        (state.single_read_person.error = false);
        (state.single_read_person = action.payload);
    },
    [SINGLE_PERSON_READ.pending]: (state, action) => {
      (state.single_read_person.loading = true);
        (state.single_read_person.error = false);
        (state.single_read_person.loading = true);
    },
    [SINGLE_PERSON_READ.rejected]: (state, action) => {
      (state.single_read_person.loading = false);
        (state.single_read_person.error = true);
        (state.single_read_person = action.payload);
    },
  },
});
const personActions = {
  PERSON_READ,
  PERSON_DELETE,
  PERSON_UPSERT,
  CONTACTSYSTEMMASTER,
  ENTITYNAMEMASTER,
  ENTITYTYPEMASTER,
  GENDERMASTER,
  IDTYPEMASTER,
  PREFIXMASTER,
  PRIORITYMASTER,
  SURFFIXMASTER,
  USEMASTER,
  SINGLE_PERSON_READ,
  ORGNAME,
  FACILITYLIST,
  PATIENTCATEGORY,
  DAYLIST,
  MEALTYPE,
};

export { personActions };

export default personSlice.reducer;
