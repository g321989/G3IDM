import { combineReducers } from "redux";




import organizationSlice from "../slices/organizationMaster/organization";
import rolesSlice from "../slices/userManagement/roles/role";
import repositorySlice from "../slices/userManagement/repository/repository";
import permissionSlice from "../slices/userManagement/permissions/permission";
import personSlice from "../slices/userManagement/persons/person";
import userSlice from "../slices/userManagement/users/user";
import personSlices from "../slices/userManagement/person/person";
import practitionerSlice from "./../slices/practitioner/practitioner";
import practitionerMasterSlice from "./../slices/practitioner/masters";



export default combineReducers({
  organizationSlice,
  rolesSlice,
  repositorySlice,
  permissionSlice,
  personSlice,
  userSlice,
  personSlices,
  practitionerSlice,
  practitionerMasterSlice, 
});
