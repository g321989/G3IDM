import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  defaultReject,
  defaultState,
  __readDocumentUrl__,
  __uspsertUrl__,
  __deleteUrl__,
  __update__,
  __upsertPractitioner__,
  __personUpsert__,
  RESETKEYCLOCKUSER
} from "../../../settings";
import { fetchData } from "../../../helpers";
import { queries } from "./queries";
const PERSON_UPSERT = createAsyncThunk(
  `personSlices/person_upsert`,
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

      else {
        let queriesjson = queries.person_upsert(payload);
        const data = await fetchData(

          { body: JSON.stringify(queriesjson) },
          __personUpsert__
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
const PERSON_UPDATE = createAsyncThunk(
  `personSlices/person_update`,
  async (payload = {}, { rejectWithValue }) => {
    try {
      let queriesjson = queries.person_update(payload);
      const data = await fetchData(

        { body: JSON.stringify(queriesjson) },
        __personUpsert__
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
const personSlices = createSlice({
  name: "persionApiSlice",
  initialState: {
    person_upsert: {
      ...defaultState.List,
    },
    person_update: {
      ...defaultState.List,
    },
  },
  extraReducers: {
    // PERSON_UPSERT
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
    [PERSON_UPDATE.fulfilled]: (state, action) => {
      (state.person_update.loading = false);
        (state.person_update.error = false);
        (state.person_update = action.payload);
    },
    [PERSON_UPDATE.pending]: (state, action) => {
      (state.person_update.loading = true);
        (state.person_update.error = false);
        (state.person_update.loading = true);
    },
    [PERSON_UPDATE.rejected]: (state, action) => {
      (state.person_update.loading = false);
        (state.person_update.error = true);
        (state.person_update = action.payload);
    },
  },
});
export const personActions = {
  PERSON_UPSERT,
  PERSON_UPDATE
};

export default personSlices.reducer;
