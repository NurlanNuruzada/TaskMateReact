import { MainLayout } from "../Layouts/MainLayout";
import { Navigate, useRoutes } from "react-router";
import Home from "../Pages/Home/Home";
import SignInPage from "../Pages/SignInPage/SignInPage";
import RegisterPage from "../Pages/SignInPage/RegisterPage";
import { useSelector } from "react-redux";
import MainPage from "../Pages/MainPage/MainPage";
import Members from "../Components/Members/Members";
import Invite from "../Pages/Invite/Invite";
import InviteBoard from "../Pages/InviteBoard/InviteBoard";

export default function Routes() {
  const { token } = useSelector((x) => x.auth);
  let routes = [
    {
      path: "/",
      element: <MainLayout />,
      children: [
        {
          path: "/Boards/:id",
          element: token ? <Home /> : <Navigate to={"/SignIn"} />,
        },
        {
          path: "/",
          element: token ? <MainPage /> : <Navigate to={"/SignIn"} />,
        },
        {
          path: "/Members",
          element: token ? <Members /> : <Navigate to={"/SignIn"} />,
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
        {
          path: "/Invite/:generateGuidId/:linkSelectedWorkspaceId/:userId",
          element: <Invite />,
        },
        {
          path: "/InviteBoard/:generateGuidId/:linkSelectedWorkspaceId/:linkBoardId/:userId",
          element: <InviteBoard />,
        },
      ],
    },
  ];
  return useRoutes(routes);
}
