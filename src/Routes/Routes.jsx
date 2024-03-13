
import { MainLayout } from "../Layouts/MainLayout";
import { useRoutes } from "react-router";
import Home from "../Pages/Home/Home";
import SignInPage from "../Pages/SignInPage/SignInPage";
import RegisterPage from "../Pages/SignInPage/RegisterPage";

export default function Routes() {
  let routes = [
    {
      path: "/",
      element: <MainLayout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/SignIn",
          element: <SignInPage />,
        },
        {
          path: "/CreateUser",
          element: <RegisterPage />,
        },
      ],
    }
  ];
  return useRoutes(routes);
}
