import { roles_actions } from "./roles";
import { repository_actions } from "./repository";
import { permission_actions } from "./permissions";
import { person_actions } from "./persons";
import { user_actions } from "./users";
import { persons_action } from "./person";
export const user_management_actions = {
  ...roles_actions,
  ...repository_actions,
  ...permission_actions,
  ...person_actions,
  ...user_actions,
  ...persons_action,
};
