import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  defaultReject,
  defaultState,
  __readDocumentUrl__,
  __uspsertUrl__,
  __deleteUrl__,
  __update__,
  __softDelete__,
  __ListIDMRepositories__,
  __ListIDMRepositoriesClientID__,
} from "../../../settings";
import { fetchData } from "../../../helpers";
import { queries } from "./query";

const REPOSITORY_READ_DOCUMENT = createAsyncThunk(
  `repositorySlice/repository_read`,
  async (payload = {}, { rejectWithValue }) => {
    const { Roleid, tenantid } = payload
    try {

      let getRoledetails = queries.getRoleDetails(Roleid);

      const Role = await fetchData(
        { body: JSON.stringify(getRoledetails) },
        __readDocumentUrl__
      );

      if (Role?.result[0] === "Super Admin Role") {
        let readqueries = queries.repository_read();
        const data = await fetchData(
          { body: JSON.stringify(readqueries) },
          __ListIDMRepositories__
        );
        return {
          ...defaultState.List,
          data: data,
        };

      }

      else {
        let readquery = queries.repositary_read_client(tenantid);
        const datas = await fetchData(
          {body: JSON.stringify(readquery)},
          __ListIDMRepositoriesClientID__
        )
        return {
          ...defaultState.List,
          data: datas,
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

const repositorySlice = createSlice({
  name: "repositorySlice",
  initialState: {
    repository_read: {
      ...defaultState.List,
    },
  },
  extraReducers: {
    // PERMISSION_ROLE_UPSERT
    [REPOSITORY_READ_DOCUMENT.fulfilled]: (state, action) => {
      (state.repository_read.loading = false);
        (state.repository_read.error = false);
        (state.repository_read = action.payload);
    },
    [REPOSITORY_READ_DOCUMENT.pending]: (state, action) => {
      (state.repository_read.loading = true);
        (state.repository_read.error = false);
        (state.repository_read.loading = true);
    },
    [REPOSITORY_READ_DOCUMENT.rejected]: (state, action) => {
      (state.repository_read.loading = false);
        (state.repository_read.error = true);
        (state.repository_read = action.payload);
    },
  },
});

const repositoryActions = {
  REPOSITORY_READ_DOCUMENT,
};

export { repositoryActions };

export default repositorySlice.reducer;
