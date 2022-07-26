import { SigninContainer } from "../feature/Auth/Signin";
import { SignupContainer } from "../feature/Auth/Signup";
import { RestorePasswordContainer } from "../feature/Auth/RestorePassword";
import { ConfirmRestorePasswordContainer } from "../feature/Auth/ConfirmRestorePassword";
import { NotFound } from "../feature/NotFound/container";

export const authRoutes = [
  {
    path: "/",
    component: SigninContainer,
    isAuth: false,
    exact: true,
  },
  {
    path: "/signup",
    component: SignupContainer,
    isAuth: false,
    exact: true,
  },
  {
    path: "/restore-password",
    component: RestorePasswordContainer,
    isAuth: false,
    exact: true,
  },
  {
    path: "/confirm-restore-password/:token",
    component: ConfirmRestorePasswordContainer,
    isAuth: false,
    exact: true,
  },
];

export const notFoundRoute = {
  component: NotFound,
  isAuth: false,
  exact: true,
};
