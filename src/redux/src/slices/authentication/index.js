import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  defaultState,
  defaultReject,
  dbName,
  __SignInCreateUser__,
} from "../../settings";
import { fetchData } from "../../helpers";


const USER_UPSERT = createAsyncThunk(
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
  

const signInReducerApiSlice = createSlice({
  name: "signInReducerApiSlice",
  initialState: {
    userupsert: { ...defaultState.Info },
  },
  extraReducers: {

    /* SEARCH_PRACTIONER */
    [USER_UPSERT.fulfilled]: (state, action) => {
      state.userupsert = action?.payload ?? {};
    },
    [USER_UPSERT.pending]: (state, action) => {
      state.userupsert.loading = true;
    },
    [USER_UPSERT.rejected]: (state, action) => {
      state.userupsert = action?.payload ?? {};
    },

    
  },
});
const signInActions = {
    USER_UPSERT,
  
};
export { signInActions };
export default signInReducerApiSlice.reducer;
