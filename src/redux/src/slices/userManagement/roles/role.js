import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  defaultReject,
  defaultState,
  __readDocumentUrl__,
  __uspsertUrl__,
  __deleteUrl__,
  __update__,
  __softDelete__,
  __GetRoleById__,
  __RoleSoftDelete__,
  __idmroleadd__,
  __GetAllClientRoles__
} from "../../../settings";
import { fetchData } from "../../../helpers";
import { queries } from "./query";
import moment from "moment";

const PERMISSION_ROLE_UPSERT = createAsyncThunk(
  `rolesSlice/permission_role_upsert`,
  async (payload = {}, { rejectWithValue }) => {
    try {
      if(payload?._key)
      {
        const params = {
          _key: payload._key,
          ...payload,
        };
        let queriesjson = queries.permission_role_upsert(params);
        const data = await fetchData(
          { body: JSON.stringify(queriesjson) },
          __idmroleadd__
        );
        return {
          ...defaultState.List,
          data: data,
        };
      }
      else{
      let Query = queries.isRoleExist(payload);
      const data1 = await fetchData(
        {body: JSON.stringify(Query)},
        __readDocumentUrl__
      )
      if(data1?.result?.length > 0)
      {
        return {
          ...defaultReject,
          message: "Role Name Already Exist",
        };
      }
      else{
      const params = {
        _key: payload._key,
        ...payload,
      };
      let queriesjson = queries.permission_role_upsert(params);
      const data = await fetchData(
        { body: JSON.stringify(queriesjson) },
        __idmroleadd__
      );
      return {
        ...defaultState.List,
        data: data,
      };
    }
    }
    } catch (error) {
      return rejectWithValue({
        ...defaultReject,
        message: error.message,
      });
    }
  }
);

const CODABALE_CONCEPT_UPSERT = createAsyncThunk(
  `rolesSlice/codable_concept_upsert`,
  async (payload = {}, { rejectWithValue }) => {
    try {
      const params = {
        _key: payload._key,
        ...payload,
      };
      let queriesjson = queries.role_upsert(params);
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
//coding_update

const ROLE_SOFT_DELETE = createAsyncThunk(
  `rolesSlice/role_soft_delete`,
  async ({ _key }, { rejectWithValue }) => {
    try {
      let queriesjson = queries.role_soft_delete(_key);
      const data = await fetchData(
        { body: JSON.stringify(queriesjson) },
        __RoleSoftDelete__
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

const CODING_UPSERT = createAsyncThunk(
  `rolesSlice/coding_upsert`,
  async (payload = {}, { rejectWithValue }) => {
    try {
      const params = {
        _key: payload._key,
        ...payload,
      };
      let queriesjson = queries.coding_update(params);
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

const CODABALE_CONCEPT_DELETE = createAsyncThunk(
  `rolesSlice/codable_concept_delete`,
  async (payload = {}, { rejectWithValue }) => {
    try {
      const params = {
        _id: payload._id,
        ...payload,
      };
      let queriesjson = queries.role_delete(params);
      const data = await fetchData(
        { body: JSON.stringify(queriesjson) },
        __softDelete__
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

const GET_ROLE_BY_ID = createAsyncThunk(
  `rolesSlice/get_role_by_id`,
  async ({ roleid }, { rejectWithValue }) => {
    try {
      let readqueries = queries.get_role_by_id(roleid);
      const data = await fetchData(
        { body: JSON.stringify(readqueries) },
        __GetRoleById__
      );
      return {
        ...defaultState.List,
        data: data,
      };
    } catch (error) {
      return rejectWithValue({
        ...defaultReject.List,
        message: error.message,
      });
    }
  }
);
const PERMISSION_MANAGEMENT_READ = createAsyncThunk(
  `rolesSlice/permission_management_read`,
  async (payload = {}, { rejectWithValue }) => {
    try {
      let readqueries = queries.permission_management_read(payload);
      const data = await fetchData(
        { body: JSON.stringify(readqueries) },
        __readDocumentUrl__
      );
      let arry = [];
      data.result.map((val) => {
        if (val.PermissionManagement) {
          arry.push({
            ...val.PermissionManagement,
          });
        }
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
const PERMISSION_MANAGEMENT_ROLE_READ = createAsyncThunk(
  `rolesSlice/permission_management_role_read`,
  async (payload = {}, { rejectWithValue }) => {
    try {
      let readqueries = queries.permission_role_read(payload);
      const data = await fetchData(
        { body: JSON.stringify(readqueries) },
        __readDocumentUrl__
      );
      let arry = [];
      data.result.map((val) => {
        if (val.PermissionRoleMapping) {
          arry.push({
            ...val.PermissionRoleMapping,
          });
        }
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

const ROLE_READ = createAsyncThunk(
  `rolesSlice/role_read`,
  async (payload = {}, { rejectWithValue }) => {
    try {
      const {Roleid , tenantid} = payload;

      let getRoledetails = queries.getRoleDetails(Roleid);

      const Role = await fetchData(
        { body: JSON.stringify(getRoledetails) },
        __readDocumentUrl__
      );
      if (Role?.result[0] === "Super Admin Role") {
      let readqueries = queries.role_read_tenetid(payload);
      
      const data = await fetchData(
        { body: JSON.stringify(readqueries) },
        __readDocumentUrl__
      );

      return {
        ...defaultState.List,
        data: data.result,
      };
    }
   else {

    let readqueries = queries.role_read_tenetid(payload);
      const data = await fetchData(
        { body: JSON.stringify(readqueries) },
        __readDocumentUrl__,
        
      );
      return {
        ...defaultState.List,
        data: data.result,
      };
   }

    } catch (error) {
      return rejectWithValue({
        ...defaultReject.List,
        message: error.message,
      });
    }
  }
);

const rolesSlice = createSlice({
  name: "rolesSlice",
  initialState: {
    permission_role_upsert: {
      ...defaultState.List,
    },
    codable_concept_upsert: {
      ...defaultState.List,
    },
    permission_management_read: {
      ...defaultState.List,
    },
    permission_management_role_read: {
      ...defaultState.List,
    },
    role_read: {
      ...defaultState.List,
    },
    codable_concept_delete: {
      ...defaultState.List,
    },
    coding_upsert: {
      ...defaultState.List,
    },
    get_role_by_id: {
      ...defaultState.List,
    },
    role_soft_delete: {
      ...defaultState.List,
    },
  },
  extraReducers: {
    // PERMISSION_ROLE_UPSERT
    [PERMISSION_ROLE_UPSERT.fulfilled]: (state, action) => {
      (state.permission_role_upsert.loading = false);
        (state.permission_role_upsert.error = false);
        (state.permission_role_upsert = action.payload);
    },
    [PERMISSION_ROLE_UPSERT.pending]: (state, action) => {
      (state.permission_role_upsert.loading = true);
        (state.permission_role_upsert.error = false);
        (state.permission_role_upsert.loading = true);
    },
    [PERMISSION_ROLE_UPSERT.rejected]: (state, action) => {
      (state.permission_role_upsert.loading = false);
        (state.permission_role_upsert.error = true);
        (state.permission_role_upsert = action.payload);
    },

    // HOLIDAY_READ
    [CODABALE_CONCEPT_UPSERT.fulfilled]: (state, action) => {
      (state.codable_concept_upsert.loading = false);
        (state.codable_concept_upsert.error = false);
        (state.codable_concept_upsert = action.payload);
    },
    [CODABALE_CONCEPT_UPSERT.pending]: (state, action) => {
      (state.codable_concept_upsert.loading = true);
        (state.codable_concept_upsert.error = false);
        (state.codable_concept_upsert.loading = true);
    },
    [CODABALE_CONCEPT_UPSERT.rejected]: (state, action) => {
      (state.codable_concept_upsert.loading = false);
        (state.codable_concept_upsert.error = true);
        (state.codable_concept_upsert = action.payload);
    },

    // HOLIDAY_UPSERT
    [PERMISSION_MANAGEMENT_READ.fulfilled]: (state, action) => {
      (state.permission_management_read.loading = false);
        (state.permission_management_read.error = false);
        (state.permission_management_read = action.payload);
    },
    [PERMISSION_MANAGEMENT_READ.pending]: (state, action) => {
      (state.permission_management_read.loading = true);
        (state.permission_management_read.error = false);
        (state.permission_management_read.loading = true);
    },
    [PERMISSION_MANAGEMENT_READ.rejected]: (state, action) => {
      (state.permission_management_read.loading = false);
        (state.permission_management_read.error = true);
        (state.permission_management_read = action.payload);
    },
    // HOLIDAY_MASTERS
    [PERMISSION_MANAGEMENT_ROLE_READ.fulfilled]: (state, action) => {
      (state.permission_management_role_read.loading = false);
        (state.permission_management_role_read.error = false);
        (state.permission_management_role_read = action.payload);
    },
    [PERMISSION_MANAGEMENT_ROLE_READ.pending]: (state, action) => {
      (state.permission_management_role_read.loading = true);
        (state.permission_management_role_read.error = false);
        (state.permission_management_role_read.loading = true);
    },
    [PERMISSION_MANAGEMENT_ROLE_READ.rejected]: (state, action) => {
      (state.permission_management_role_read.loading = false);
        (state.permission_management_role_read.error = true);
        (state.permission_management_role_read = action.payload);
    },
    [ROLE_READ.fulfilled]: (state, action) => {
      (state.role_read.loading = false);
        (state.role_read.error = false);
        (state.role_read = action.payload);
    },
    [ROLE_READ.pending]: (state, action) => {
      (state.role_read.loading = true);
        (state.role_read.error = false);
        (state.role_read.loading = true);
    },
    [ROLE_READ.rejected]: (state, action) => {
      (state.role_read.loading = false);
        (state.role_read.error = true);
        (state.role_read = action.payload);
    },
    [CODABALE_CONCEPT_DELETE.fulfilled]: (state, action) => {
      (state.role_read.loading = false);
        (state.role_read.error = false);
        (state.role_read = action.payload);
    },
    [CODABALE_CONCEPT_DELETE.pending]: (state, action) => {
      (state.role_read.loading = true);
        (state.role_read.error = false);
        (state.role_read.loading = true);
    },
    [CODABALE_CONCEPT_DELETE.rejected]: (state, action) => {
      (state.role_read.loading = false);
        (state.role_read.error = true);
        (state.role_read = action.payload);
    },

    [CODING_UPSERT.fulfilled]: (state, action) => {
      (state.coding_upsert.loading = false);
        (state.coding_upsert.error = false);
        (state.coding_upsert = action.payload);
    },
    [CODING_UPSERT.pending]: (state, action) => {
      (state.coding_upsert.loading = true);
        (state.coding_upsert.error = false);
        (state.coding_upsert.loading = true);
    },
    [CODING_UPSERT.rejected]: (state, action) => {
      (state.coding_upsert.loading = false);
        (state.coding_upsert.error = true);
        (state.coding_upsert = action.payload);
    },
    [GET_ROLE_BY_ID.fulfilled]: (state, action) => {
      (state.get_role_by_id.loading = false);
        (state.get_role_by_id.error = false);
        (state.get_role_by_id = action.payload);
    },
    [GET_ROLE_BY_ID.pending]: (state, action) => {
      (state.get_role_by_id.loading = true);
        (state.get_role_by_id.error = false);
        (state.get_role_by_id.loading = true);
    },
    [GET_ROLE_BY_ID.rejected]: (state, action) => {
      (state.get_role_by_id.loading = false);
        (state.get_role_by_id.error = true);
        (state.get_role_by_id = action.payload);
    },
    [ROLE_SOFT_DELETE.fulfilled]: (state, action) => {
      (state.role_soft_delete.loading = false);
        (state.role_soft_delete.error = false);
        (state.role_soft_delete = action.payload);
    },
    [ROLE_SOFT_DELETE.pending]: (state, action) => {
      (state.role_soft_delete.loading = true);
        (state.role_soft_delete.error = false);
        (state.role_soft_delete.loading = true);
    },
    [ROLE_SOFT_DELETE.rejected]: (state, action) => {
      (state.role_soft_delete.loading = false);
        (state.role_soft_delete.error = true);
        (state.role_soft_delete = action.payload);
    },
  },
});

const roleActions = {
  CODING_UPSERT,
  PERMISSION_ROLE_UPSERT,
  CODABALE_CONCEPT_UPSERT,
  PERMISSION_MANAGEMENT_READ,
  PERMISSION_MANAGEMENT_ROLE_READ,
  ROLE_READ,
  CODABALE_CONCEPT_DELETE,
  GET_ROLE_BY_ID,
  ROLE_SOFT_DELETE,
};

export { roleActions };

export default rolesSlice.reducer;
