import { combineReducers } from "redux";

import { signinReducer as signin } from "./signinReducer";
import { signupReducer as signup } from "./signupReducer";
import { restorePasswordReducer as restorePassword } from "./restorePasswordReducer";
import { confirmRestorePasswordReducer as confirmRestorePassword } from "./confirmRestorePasswordReducer";

export const authReducers = combineReducers({
  signin,
  signup,
  restorePassword,
  confirmRestorePassword,
});
