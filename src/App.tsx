import { RouterProvider } from "react-router-dom";
import { useEffect, useState } from "react";
import { socket } from "./socket";
import { Room_Type } from "./type";
import { useAppDispatch } from "./store/hooks";
import { roomActions } from "./store/features/room";
import { currentRoomActions } from "./store/features/currentRoom";
import { currentIdActions } from "./store/features/currentId";
import { onbordingRouter, router } from "./router";

function App() {
  const dispatch = useAppDispatch();

  // use states
  const [isLoged, setIsLoged] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);

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

  if (isLoged) return <RouterProvider router={onbordingRouter} />;

  return <RouterProvider router={router} />;
}

export default App;
