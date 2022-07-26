import { HomeContainer } from "../feature/Cabinet/Home/container";
import { UsersContainer } from "../feature/Cabinet/Users/container";

export const adminRoutes = [
  {
    path: "/home",
    component: HomeContainer,
    isAuth: true,
    exact: true,
  },
  {
    path: "/users",
    component: UsersContainer,
    isAuth: true,
    exact: true,
  },
];
