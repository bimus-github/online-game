import { createBrowserRouter } from "react-router-dom";

// pages
import GameBoard from "../pages/GameBoard";
import Signup from "../pages/Signup";
import Login from "../pages/Login";
import Home from "../pages/Home";
import Games from "../pages/Games";

export const router = createBrowserRouter([
  {
    path: "/room/:roomId",
    element: <GameBoard />,
  },
  {
    path: "/games",
    element: <Games />,
  },
  {
    path: "/",
    element: <Home />,
  },
]);

export const onbordingRouter = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
]);
