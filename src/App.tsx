import GameBoard from "./pages/GameBoard";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import { useEffect } from "react";
import { socket } from "./socket";
import { Room_Type } from "./type";
import { useAppDispatch } from "./store/hooks";
import { roomActions } from "./store/features/room";
import { currentRoomActions } from "./store/features/currentRoom";
import { currentIdActions } from "./store/features/currentId";

const router = createBrowserRouter([
  {
    path: "/room/:roomId",
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

    socket.emit("gettingId");
    socket.on("gettingId", (id: string) => {
      dispatch(currentIdActions.set(id));
    });

    socket.on("createRoom", (room: Room_Type) => {
      dispatch(roomActions.createRoom(room));
    });

    socket.on("conectingWithUserY", (room: Room_Type) => {
      console.log(room);

      dispatch(currentRoomActions.setRoom(room));
    });

    socket.on("disconnect", () => {
      console.log("Disconnected from server");
      dispatch(currentIdActions.delete());
    });
  }, [dispatch]);

  return <RouterProvider router={router} />;
}

export default App;
