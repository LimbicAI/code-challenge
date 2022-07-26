import { DashboardContainer } from "../feature/Dashboard";

export const userRoutes = [
  {
    path: "/dashboard",
    component: DashboardContainer,
    isAuth: true,
    exact: true,
  },
];
