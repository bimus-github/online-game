import { RouterProvider } from "react-router-dom";
import { useEffect, useState } from "react";
import { socket } from "./socket";
import { Room_Type } from "./type";
import { useAppDispatch } from "./store/hooks";
import { roomActions } from "./store/features/room";
import { currentIdActions } from "./store/features/currentId";
import { onbordingRouter, router } from "./router";
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";
import { userActions } from "./store/features/user";
import { getUser } from "./firebase/features/user";
import { cellActions } from "./store/features/cells";

function App() {
  const dispatch = useAppDispatch();

  // use states
  const [isLoged, setIsLoged] = useState<boolean>(false);

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user?.email) {
        setIsLoged(true);

        await getUser(user.email).then((data) => {
          if (data) {
            dispatch(userActions.set(data));
          }
        });
      }
    });
  }, [dispatch]);

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
      dispatch(roomActions.update(room));
    });

    socket.on("disconnect", () => {
      console.log("Disconnected from server");
      dispatch(currentIdActions.delete());
    });
  }, [dispatch]);

  if (isLoged) return <RouterProvider router={router} />;

  return <RouterProvider router={onbordingRouter} />;
}

export default App;
