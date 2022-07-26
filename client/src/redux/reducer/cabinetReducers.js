import { combineReducers } from "redux";

import { usersReducer as users } from "./usersReducer";
import { homeReducer as home } from "./homeReducer";

export const cabinetReducers = combineReducers({
  users,
  home,
});
