import { MainLayout } from "../Layouts/MainLayout";
import { Navigate, useRoutes } from "react-router";
import Home from "../Pages/Home/Home";
import SignInPage from "../Pages/SignInPage/SignInPage";
import RegisterPage from "../Pages/SignInPage/RegisterPage";
import { useSelector } from "react-redux";
import MainPage from "../Pages/MainPage/MainPage";

export default function Routes() {
  const { token } = useSelector((x) => x.auth);
  let routes = [
    {
      path: "/",
      element: <MainLayout />,
      children: [
        {
          path: "/Boards",
          element: token ? <Home /> : <Navigate to={"/SignIn"} />,
        },
        {
          path: "/",
          element: token ? <MainPage /> : <Navigate to={"/SignIn"} />,
        },
      ],
    },
    {
      path: "/",
      children: [
        {
          path: "/SignIn",
          element: <SignInPage />,
        },
        {
          path: "/CreateUser",
          element: <RegisterPage />,
        },
      ],
    },
  ];
  return useRoutes(routes);
}
