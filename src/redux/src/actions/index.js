


// Primarycare masters
import {
  organizationMasterActions,
  userManagementActions,
  practitionerActions,

} from "../slices";


const actions = {
  ...organizationMasterActions,
  ...userManagementActions,
  ...practitionerActions
};
export default actions;
