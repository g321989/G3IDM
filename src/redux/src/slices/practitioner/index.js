import { practitionerActions } from "./practitioner";
import { practitionerMasterActions } from "./masters";

export const practitioner_role_actions = {
    ...practitionerActions,
    ...practitionerMasterActions,
}