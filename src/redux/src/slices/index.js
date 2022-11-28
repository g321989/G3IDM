

// Primarycare

import { organization_role_actions } from "./organizationMaster";
import { practitioner_role_actions } from "./practitioner";
import { user_management_actions } from "./userManagement";
export * from "./userManagement/roles";


export const organizationMasterActions = {
  ...organization_role_actions,
};

export const practitionerActions = {
  ...practitioner_role_actions,
};
export const userManagementActions = {
  ...user_management_actions,
};
