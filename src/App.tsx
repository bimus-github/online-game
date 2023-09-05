import { RouterProvider } from "react-router-dom";
import { useEffect, useState } from "react";
import { socket } from "./socket";
import { Room_Type } from "./type";
import { useAppDispatch, useAppSelector } from "./store/hooks";
import { roomActions } from "./store/features/room";
import { currentIdActions } from "./store/features/currentId";
import { onbordingRouter, router } from "./router";
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";
import { userActions } from "./store/features/user";
import { getUser } from "./firebase/features/user";
import { turnActions } from "./store/features/turn";
import { cellActions } from "./store/features/cells";

function App() {
  const dispatch = useAppDispatch();
  const currentId = useAppSelector((state) => state.currentId);
  const user = useAppSelector((state) => state.user);

  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      event.returnValue = ""; // Chrome requires a non-empty string

      return "Are you sure you want to leave this page?";
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

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
    socket.on("deleteRoom", (room) => {
      if (user.email) {
        console.log(user);
        console.log(room);

        if (room.userY !== user.email) {
          dispatch(roomActions.deleteRoom(room.id));
        }
      }
    });

    socket.on("updateRoom", (room) => {
      dispatch(roomActions.update(room));
    });
  }, [dispatch, user]);

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
      dispatch(turnActions.start());
      dispatch(cellActions.reset());
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
