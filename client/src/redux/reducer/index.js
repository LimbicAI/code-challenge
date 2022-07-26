import { combineReducers } from "redux";

import { authReducers } from "./authReducers";
import { cabinetReducers } from "./cabinetReducers";
import { dashboardReducer } from "./dashboardReducer";

export const reducers = combineReducers({
  auth: authReducers,
  cabinet: cabinetReducers,
  dashboard: dashboardReducer,
});
