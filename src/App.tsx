import GameBoard from "./pages/GameBoard";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import { useEffect } from "react";
import { socket } from "./socket";
import { Room_Type } from "./type";
import { useAppDispatch } from "./store/hooks";
import { roomActions } from "./store/features/room";

const router = createBrowserRouter([
  {
    path: "/room",
    element: <GameBoard />,
  },
  {
    path: "/",
    element: <Home />,
  },
]);

function App() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    socket.on("connect", () => {
      console.log("user connected");
    });

    socket.on("createRoom", (room: Room_Type) => {
      console.log(room);
      dispatch(roomActions.createRoom(room));
    });

    socket.on("disconnect", () => {
      console.log("Disconnected from server");
    });
  }, []);

  return <RouterProvider router={router} />;
}

export default App;
