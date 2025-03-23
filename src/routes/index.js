import PrivateRoutes from "../components/PrivateRoutes";
import LayoutDefault from "../Layout/LayoutDefault";
import Answers from "../pages/Answers";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Logout from "../pages/Logout";
import Quiz from "../pages/Quiz";
import Register from "../pages/Register";
import Result from "../pages/Result";
import Topic from "../pages/Topic";

export const routes = [
  {
    path: "/",
    element: <LayoutDefault />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        element: <PrivateRoutes />,
        children: [
          {
            path: "topic",
            element: <Topic />,
          },
          {
            path: "quiz/:id",
            element: <Quiz />,
          },
          {
            path: "answers",
            element: <Answers />,
          },
          {
            path: "result/:id",
            element: <Result />,
          },
          {
            path: "logout",
            element: <Logout />,
          },
        ],
      },
    ],
  },
];
