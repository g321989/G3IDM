import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  defaultReject,
  defaultState,
  __readDocumentUrl__,
  __uspsertUrl__,
  __deleteUrl__,
  __update__,
  __softDelete__,
  __GetAllPermissions__,
  __GetPermissionByID__,
  __UpsertPermission__,
  __DeletePermission__,
  __GetAllClientPermissions__,
  
} from "../../../settings";
import { fetchData } from "../../../helpers";
import { queries } from "./query";
import moment from "moment";

const PERMISSION_UPSERT = createAsyncThunk(
  `permissionSlice/permission_upsert`,
  async (payload = {}, { rejectWithValue }) => {
    try {
      const params = {
        _key: payload._key,
        ...payload,
      };
      let queriesjson = queries.permission_upsert(params);
      
      const data = await fetchData(
        { body: JSON.stringify(queriesjson) },
        __UpsertPermission__
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

const PERMISSION_DELETE = createAsyncThunk(
  `permissionSlice/permission_delete`,
  async ({ _key }, { rejectWithValue }) => {
    try {
      let queriesjson = queries.permission_delete(_key);
      const data = await fetchData(
        { body: JSON.stringify(queriesjson) },
        __DeletePermission__
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
const PERMISSION_READ = createAsyncThunk(
  `permissionSlice/permission_read`,
  async (payload = {}, { rejectWithValue }) => {
    
    try {

      const {Roleid , tenantid} = payload;

      let getRoledetails = queries.getRoleDetails(Roleid);

      const Role = await fetchData(
        { body: JSON.stringify(getRoledetails) },
        __readDocumentUrl__
      );
      
      if (Role?.result[0] === "Super Admin Role") {
      let readqueries = queries.permission_read(payload);
      const data = await fetchData(
        { body: JSON.stringify(readqueries) },
        __GetAllClientPermissions__
        
      );

      return {
        ...defaultState.List,
        data: data,
      };
      }

      else {
        let readqueries = queries.permission_read(payload);
        const data = await fetchData(
          { body: JSON.stringify(readqueries) },
          __GetAllClientPermissions__
        
        );

        return {
          ...defaultState.List,
          data: data,
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

const PERMISSION_READ_AS_OPTIONS = createAsyncThunk(
  `permissionSlice/permission_read_as_options`,
  async (payload = {}, { rejectWithValue }) => {
    
    try {

      
      const {Roleid , tenantid} = payload;

      let getRoledetails = queries.getRoleDetails(Roleid);
      const Role = await fetchData(
        { body: JSON.stringify(getRoledetails) },
        __readDocumentUrl__
      );
      if (Role?.result[0] === "Super Admin Role") {

      let readqueries = queries.permission_read(payload);
      const data = await fetchData(
        { body: JSON.stringify(readqueries) },
        __GetAllClientPermissions__
      );
    
      const res = data?.result?.map((item) => {
        const { permsn_repo, ...rest } = item;
        return {
          ...rest,
          label: rest?.permsnname,
          value: rest?._id,
        };
      });
      return {
        ...defaultState.List,
        data: res,
      };
    }

    else {
      let readqueries = queries.permission_read(payload);
      const data = await fetchData(
        { body: JSON.stringify(readqueries) },
        __GetAllClientPermissions__,
      );
    
      const res = data?.result?.map((item) => {
        const { permsn_repo, ...rest } = item;
        return {
          ...rest,
          label: rest?.permsnname,
          value: rest?._id,
        };
      });
      return {
        ...defaultState.List,
        data: res,
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

const PERMISSION_READ_BY_ID = createAsyncThunk(
  `permissionSlice/permission_read_by_id`,
  async ({ _id }, { rejectWithValue }) => {
    
    try {
      let readqueries = queries.permission_read_by_id(_id);
      const data = await fetchData(
        { body: JSON.stringify(readqueries) },
        __GetPermissionByID__
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

const permissionSlice = createSlice({
  name: "permissionSlice",
  initialState: {
    permission_upsert: {
      ...defaultState.List,
    },
    permission_delete: {
      ...defaultState.List,
    },
    permission_read: {
      ...defaultState.List,
    },
    permission_read_by_id: {
      ...defaultState.List,
    },
    permission_read_as_options: {
      ...defaultState.List,
    },
  },
  extraReducers: {
    // PERMISSION_ROLE_UPSERT
    [PERMISSION_UPSERT.fulfilled]: (state, action) => {
      (state.permission_upsert.loading = false);
        (state.permission_upsert.error = false);
        (state.permission_upsert = action.payload);
    },
    [PERMISSION_UPSERT.pending]: (state, action) => {
      (state.permission_upsert.loading = true);
        (state.permission_upsert.error = false);
        (state.permission_upsert.loading = true);
    },
    [PERMISSION_UPSERT.rejected]: (state, action) => {
      (state.permission_upsert.loading = false);
        (state.permission_upsert.error = true);
        (state.permission_upsert = action.payload);
    },
    [PERMISSION_DELETE.fulfilled]: (state, action) => {
      (state.permission_delete.loading = false);
        (state.permission_delete.error = false);
        (state.permission_delete = action.payload);
    },
    [PERMISSION_DELETE.pending]: (state, action) => {
      (state.permission_delete.loading = true);
        (state.permission_delete.error = false);
        (state.permission_delete.loading = true);
    },
    [PERMISSION_DELETE.rejected]: (state, action) => {
      (state.permission_delete.loading = false);
        (state.permission_delete.error = true);
        (state.permission_delete = action.payload);
    },
    [PERMISSION_READ.fulfilled]: (state, action) => {
      (state.permission_read.loading = false);
        (state.permission_read.error = false);
        (state.permission_read = action.payload);
    },
    [PERMISSION_READ.pending]: (state, action) => {
      (state.permission_read.loading = true);
        (state.permission_read.error = false);
        (state.permission_read.loading = true);
    },
    [PERMISSION_READ.rejected]: (state, action) => {
      (state.permission_read.loading = false);
        (state.permission_read.error = true);
        (state.permission_read = action.payload);
    },
    [PERMISSION_READ_BY_ID.fulfilled]: (state, action) => {
      (state.permission_read_by_id.loading = false);
        (state.permission_read_by_id.error = false);
        (state.permission_read_by_id = action.payload);
    },
    [PERMISSION_READ_BY_ID.pending]: (state, action) => {
      (state.permission_read_by_id.loading = true);
        (state.permission_read_by_id.error = false);
        (state.permission_read_by_id.loading = true);
    },
    [PERMISSION_READ_BY_ID.rejected]: (state, action) => {
      (state.permission_read_by_id.loading = false);
        (state.permission_read_by_id.error = true);
        (state.permission_read_by_id = action.payload);
    },
    [PERMISSION_READ_AS_OPTIONS.fulfilled]: (state, action) => {
      (state.permission_read_as_options.loading = false);
        (state.permission_read_as_options.error = false);
        (state.permission_read_as_options = action.payload);
    },
    [PERMISSION_READ_AS_OPTIONS.pending]: (state, action) => {
      (state.permission_read_as_options.loading = true);
        (state.permission_read_as_options.error = false);
        (state.permission_read_as_options.loading = true);
    },
    [PERMISSION_READ_AS_OPTIONS.rejected]: (state, action) => {
      (state.permission_read_as_options.loading = false);
        (state.permission_read_as_options.error = true);
        (state.permission_read_as_options = action.payload);
    },
  },
});
const permissionActions = {
  PERMISSION_READ,
  PERMISSION_READ_BY_ID,
  PERMISSION_DELETE,
  PERMISSION_UPSERT,
  PERMISSION_READ_AS_OPTIONS,
};

export { permissionActions };

export default permissionSlice.reducer;
