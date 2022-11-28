import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  defaultReject,
  defaultState,
  __readDocumentUrl__,
  __uspsertUrl__,
  __deleteUrl__,
  __update__,
  __softDelete__
} from "../../../settings";
import { fetchData } from "../../../helpers";
import { queries } from "./query";
import moment from "moment";





const USER_UPSERT = createAsyncThunk(
  `userSlice/user_upsert`,
  async (payload = {}, { rejectWithValue }) => {
    try {
      const params = {
        _key: payload._key,
        ...payload
      };
      let queriesjson = queries.user_upsert(params);
      const data = await fetchData(
        { body: JSON.stringify(queriesjson) },
        __uspsertUrl__
      );
      return {
        ...defaultState.List,
        _key:data._key,
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

  const USER_DELETE = createAsyncThunk(
    `userSlice/user_delete`,
    async (payload = {}, { rejectWithValue }) => {
      try {
        const params = {
          _id: payload._id,
          ...payload
        };
        let queriesjson = queries.user_delete(params);
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
const USER_READ = createAsyncThunk(
  `userSlice/user_read`,
  async (payload = {}, { rejectWithValue }) => {
    try {
      let readqueries = queries.practitioner_by_id(payload)
      const data = await fetchData(
        { body: JSON.stringify(readqueries)},
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

const userSlice = createSlice({
  name: "userSlice",
  initialState: {
    user_upsert:{
      ...defaultState.List,
    },
    user_delete:{
      ...defaultState.List,
    },   
    user_read:{
      ...defaultState.List,
    },
  },
  extraReducers: {
    // USER_ROLE_UPSERT
    [USER_UPSERT.fulfilled]: (state, action) => {
      (state.user_upsert.loading = false);
      (state.user_upsert.error = false);
      (state.user_upsert = action.payload);
    },
    [USER_UPSERT.pending]: (state, action) => {
        (state.user_upsert.loading = true);
        (state.user_upsert.error = false);
        (state.user_upsert.loading = true);
    },
    [USER_UPSERT.rejected]: (state, action) => {
        (state.user_upsert.loading = false);
        (state.user_upsert.error = true);
        (state.user_upsert = action.payload);
    },
    [USER_DELETE.fulfilled]: (state, action) => {
      (state.user_delete.loading = false);
      (state.user_delete.error = false);
      (state.user_delete = action.payload);
    },
    [USER_DELETE.pending]: (state, action) => {
        (state.user_delete.loading = true);
        (state.user_delete.error = false);
        (state.user_delete.loading = true);
    },
    [USER_DELETE.rejected]: (state, action) => {
        (state.user_delete.loading = false);
        (state.user_delete.error = true);
        (state.user_delete = action.payload);
    },
    [USER_READ.fulfilled]: (state, action) => {
      (state.user_read.loading = false);
      (state.user_read.error = false);
      (state.user_read = action.payload);
    },
    [USER_READ.pending]: (state, action) => {
        (state.user_read.loading = true);
        (state.user_read.error = false);
        (state.user_read.loading = true);
    },
    [USER_READ.rejected]: (state, action) => {
        (state.user_read.loading = false);
        (state.user_read.error = true);
        (state.user_read = action.payload);
    },
   
  },
});
const userActions = {
  USER_READ,
  USER_DELETE,
  USER_UPSERT
};

export { userActions };

export default userSlice.reducer;
