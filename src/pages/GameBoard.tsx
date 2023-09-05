/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-restricted-globals */
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { CELL_VALUE_TYPE, ERROR_TYPE, PLAYER_ENUM, TURN_TYPE } from "../type";
import { socket } from "../socket";
import { cellActions } from "../store/features/cells";
import Modal from "../components/Modal";
import { roomActions } from "../store/features/room";
import { userActions } from "../store/features/user";
import { turnActions } from "../store/features/turn";

interface Cell_Type {
  id: number;
  value: CELL_VALUE_TYPE;
}

enum WIN {
  X = "X",
  O = "O",
  NONE = "NONE",
}

function GameBoard() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const rooms = useAppSelector((state) => state.room);
  const user = useAppSelector((state) => state.user);
  const cells = useAppSelector((state) => state.cells);
  const turn = useAppSelector((state) => state.turn);

  const { roomId } = useParams();

  const currentRoom = rooms.filter((room) => room.id === roomId)[0];

  const [cursorWait, setCursorWait] = useState<boolean>(true);

  const [openResetModal, setOpenResetModal] = useState<boolean>(false);

  const [message, setMessage] = useState<string>("");

  const [error, setError] = useState<ERROR_TYPE>(ERROR_TYPE.NO);
  const [win, setWin] = useState<WIN>(WIN.NONE);

  console.log(turn);
  console.log(turn === TURN_TYPE.START || turn === TURN_TYPE.END);

  useEffect(() => {
    window.onpopstate = null;
    const beforeClosing = (e: PopStateEvent) => {
      e.preventDefault();
      console.log("befo closing");

      if (user.as === PLAYER_ENUM.AS_X) {
        console.log(turn);

        if (turn === TURN_TYPE.START || turn === TURN_TYPE.END) {
          const result = confirm(
            "If you leave this room, room will be closed, so please wait your opponent!"
          );

          if (result) {
            socket.emit("deleteRoom", currentRoom.id);
            dispatch(roomActions.deleteRoom(currentRoom.id));
            dispatch(cellActions.reset());
            dispatch(userActions.set({ ...user, as: PLAYER_ENUM.NONE }));
          } else {
            navigate(`/room/${currentRoom.id}`);
          }

          return;
        }

        const result = confirm(
          "If you leave this room, the room will be closed and you will LOST!"
        );

        if (result) {
          socket.emit("deleteRoom", currentRoom.id);
          dispatch(roomActions.deleteRoom(currentRoom.id));
          dispatch(cellActions.reset());
          dispatch(userActions.set({ ...user, as: PLAYER_ENUM.NONE }));
        } else {
          navigate(`/room/${currentRoom.id}`);
        }

        return;
      }

      if (user.as === PLAYER_ENUM.AS_O) {
        if (turn === TURN_TYPE.O || turn === TURN_TYPE.X) {
          const result = confirm("If you leave this room, you will be lost!");
          if (result) {
            socket.emit("deleteRoom", currentRoom.id);
            dispatch(
              roomActions.update({ ...currentRoom, usernameY: "", userY: "" })
            );
            dispatch(userActions.set({ ...user, as: PLAYER_ENUM.NONE }));
            dispatch(cellActions.reset());
          } else {
            navigate(`/room/${currentRoom.id}`);
          }

          return;
        }
        socket.emit("deleteRoom", currentRoom.id);
        dispatch(
          roomActions.update({ ...currentRoom, usernameY: "", userY: "" })
        );
      }
    };

    window.onpopstate = beforeClosing;
  }, [currentRoom, dispatch, navigate, turn, user]);

  useEffect(() => {
    socket.on("deleteRoom", (id) => {
      dispatch(roomActions.createRoom(currentRoom));

      if (currentRoom.id === id) {
        if (user.as === PLAYER_ENUM.AS_O) {
          if (turn === TURN_TYPE.O || turn === TURN_TYPE.X) {
            setWin(WIN.O);
            dispatch(turnActions.end());

            const goBack = () => {
              dispatch(roomActions.deleteRoom(currentRoom.id));
              dispatch(cellActions.reset());
              dispatch(userActions.set({ ...user, as: PLAYER_ENUM.NONE }));
              navigate("/");
            };
            dispatch(roomActions.update({ ...currentRoom, userX: "" }));
            window.onpopstate = goBack;
          }
        }

        if (user.as === PLAYER_ENUM.AS_X) {
          setWin(WIN.X);
          dispatch(turnActions.end());
          dispatch(
            roomActions.update({ ...currentRoom, userY: "", usernameY: "" })
          );
          return;
        }

        dispatch(cellActions.reset());
        dispatch(userActions.set({ ...user, as: PLAYER_ENUM.NONE }));
        navigate("/");
      }
      dispatch(roomActions.deleteRoom(currentRoom.id));
    });
  }, [currentRoom, dispatch, navigate, turn, user]);

  useEffect(() => {
    socket.on("updateCell", (cells) => {
      dispatch(cellActions.set(cells));
      if (user.as === PLAYER_ENUM.AS_X) dispatch(turnActions.turnX());
      if (user.as === PLAYER_ENUM.AS_O) dispatch(turnActions.turnO());
    });

    socket.on("askForResetCell", () => {
      setOpenResetModal(true);
    });

    socket.on("resetCell", () => {
      dispatch(cellActions.reset());
      dispatch(turnActions.start);
      setWin(WIN.NONE);
    });

    socket.on("yes", () => {
      dispatch(cellActions.reset());
      dispatch(turnActions.start());
      setWin(WIN.NONE);
      setMessage("");
    });

    socket.on("no", () => {
      setCursorWait(false);
      setMessage("");
    });
  }, [cells, currentRoom, dispatch, navigate, turn, user]);

  useEffect(() => {
    if (user.as === PLAYER_ENUM.AS_X) {
      if (currentRoom.userY.length === 0) return setCursorWait(true);
      if (turn === TURN_TYPE.START || turn === TURN_TYPE.X)
        return setCursorWait(false);
      return setCursorWait(true);
    }
    if (user.as === PLAYER_ENUM.AS_O) {
      if (currentRoom.userX.length === 0) return setCursorWait(true);
      if (turn === TURN_TYPE.O) return setCursorWait(false);
      return setCursorWait(true);
    }
  }, [currentRoom, turn, user.as]);

  useEffect(() => {
    // row 1
    if (
      cells[0].value === cells[1].value &&
      cells[1].value === CELL_VALUE_TYPE.X &&
      cells[1].value === cells[2].value
    ) {
      setWin(WIN.X);

      dispatch(turnActions.end());
    }
    if (
      cells[0].value === cells[1].value &&
      cells[1].value === CELL_VALUE_TYPE.O &&
      cells[1].value === cells[2].value
    ) {
      setWin(WIN.O);

      dispatch(turnActions.end());
    }

    // row 2
    if (
      cells[3].value === cells[4].value &&
      cells[4].value === CELL_VALUE_TYPE.X &&
      cells[4].value === cells[5].value
    ) {
      setWin(WIN.X);
      dispatch(turnActions.end());
    }
    if (
      cells[3].value === cells[4].value &&
      cells[4].value === CELL_VALUE_TYPE.O &&
      cells[4].value === cells[5].value
    ) {
      setWin(WIN.O);
      dispatch(turnActions.end());
    }

    // row 3
    if (
      cells[6].value === cells[7].value &&
      cells[7].value === CELL_VALUE_TYPE.X &&
      cells[7].value === cells[8].value
    ) {
      setWin(WIN.X);
      dispatch(turnActions.end());
    }
    if (
      cells[6].value === cells[7].value &&
      cells[7].value === CELL_VALUE_TYPE.O &&
      cells[7].value === cells[8].value
    ) {
      setWin(WIN.O);
      dispatch(turnActions.end());
    }

    // col 1
    if (
      cells[0].value === cells[3].value &&
      cells[3].value === CELL_VALUE_TYPE.X &&
      cells[3].value === cells[6].value
    ) {
      setWin(WIN.X);
      dispatch(turnActions.end());
    }
    if (
      cells[0].value === cells[3].value &&
      cells[3].value === CELL_VALUE_TYPE.O &&
      cells[3].value === cells[6].value
    ) {
      setWin(WIN.O);
      dispatch(turnActions.end());
    }

    // col 2
    if (
      cells[1].value === cells[4].value &&
      cells[4].value === CELL_VALUE_TYPE.X &&
      cells[4].value === cells[7].value
    ) {
      setWin(WIN.X);
      dispatch(turnActions.end());
    }
    if (
      cells[1].value === cells[4].value &&
      cells[4].value === CELL_VALUE_TYPE.O &&
      cells[4].value === cells[7].value
    ) {
      setWin(WIN.O);
      dispatch(turnActions.end());
    }

    // col 3
    if (
      cells[2].value === cells[5].value &&
      cells[5].value === CELL_VALUE_TYPE.X &&
      cells[5].value === cells[8].value
    ) {
      setWin(WIN.X);
      dispatch(turnActions.end());
    }
    if (
      cells[2].value === cells[5].value &&
      cells[5].value === CELL_VALUE_TYPE.O &&
      cells[5].value === cells[8].value
    ) {
      setWin(WIN.O);
      dispatch(turnActions.end());
    }

    // x - 1
    if (
      cells[0].value === cells[4].value &&
      cells[4].value === CELL_VALUE_TYPE.X &&
      cells[4].value === cells[8].value
    ) {
      setWin(WIN.X);
      dispatch(turnActions.end());
    }
    if (
      cells[0].value === cells[4].value &&
      cells[4].value === CELL_VALUE_TYPE.O &&
      cells[4].value === cells[8].value
    ) {
      setWin(WIN.O);
      dispatch(turnActions.end());
    }

    // x - 2
    if (
      cells[2].value === cells[4].value &&
      cells[4].value === CELL_VALUE_TYPE.X &&
      cells[4].value === cells[6].value
    ) {
      setWin(WIN.X);
      dispatch(turnActions.end());
    }
    if (
      cells[2].value === cells[4].value &&
      cells[4].value === CELL_VALUE_TYPE.O &&
      cells[4].value === cells[6].value
    ) {
      setWin(WIN.O);
      dispatch(turnActions.end());
    }
  }, [cells, turn]);

  const onClickCell = (id: number) => {
    if (turn === TURN_TYPE.END) return setError(ERROR_TYPE.END);

    const newCells: Cell_Type[] = cells.map((cell) => {
      if (cell.id === id) {
        if (turn === TURN_TYPE.X || turn === TURN_TYPE.START) {
          if (cell.value.length !== 0) {
            setError(ERROR_TYPE.FULL);
            return cell;
          }

          dispatch(turnActions.turnO());
          setError(ERROR_TYPE.NO);
          return { id, value: CELL_VALUE_TYPE.X };
        } else {
          if (cell.value.length !== 0) {
            setError(ERROR_TYPE.FULL);
            return cell;
          }

          dispatch(turnActions.turnX());
          setError(ERROR_TYPE.NO);
          return { id, value: CELL_VALUE_TYPE.O };
        }
      }
      return cell;
    });

    dispatch(cellActions.set(newCells));

    socket.emit("updateCell", {
      cells: newCells,
      id: user.as === PLAYER_ENUM.AS_X ? currentRoom.userY : currentRoom.userX,
    });
  };

  const handelRestart = () => {
    if (turn !== TURN_TYPE.END) {
      socket.emit(
        "askForResetCell",
        user.as === PLAYER_ENUM.AS_X ? currentRoom.userY : currentRoom.userX
      );
      setCursorWait(true);
      setMessage("Wait for your opponent's answer!");
      return;
    }

    dispatch(cellActions.reset());

    socket.emit(
      "resetCell",
      user.as === PLAYER_ENUM.AS_X ? currentRoom.userY : currentRoom.userX
    );

    dispatch(turnActions.start());
  };

  const handleYes = () => {
    socket.emit(
      "yes",
      user.as === PLAYER_ENUM.AS_X ? currentRoom.userY : currentRoom.userX
    );
    dispatch(cellActions.reset());
    dispatch(turnActions.start());
    setWin(WIN.NONE);
    setMessage("");
    setOpenResetModal(false);
  };
  const handleNo = () => {
    socket.emit(
      "no",
      user.as === PLAYER_ENUM.AS_X ? currentRoom.userY : currentRoom.userX
    );
    setCursorWait(false);
    setMessage("");
    setOpenResetModal(false);
  };

  if (currentRoom.id !== roomId)
    return <div>There is no room with such ID!</div>;

  return (
    <>
      <div
        className={`${styles.main} 
    `}
      >
        <div className={styles.contanier}>
          <div className="w-full flex justify-center ">
            {user.as === PLAYER_ENUM.AS_O && (
              <div className="p-2 rounded-md bg-white pl-3 pr-5">You are O</div>
            )}
            {user.as === PLAYER_ENUM.AS_X && (
              <div className="p-2 rounded-md bg-white pl-3 pr-5">You are X</div>
            )}
          </div>
          {currentRoom.userX.length === 0 ? (
            <p className="text-red-400">Wait until User O joins the game!</p>
          ) : (
            <div className={styles.user}>User X: {currentRoom.usernameX}</div>
          )}
          <div className={styles.boardDiv}>
            {cells.map(({ id, value }, i) => (
              <button
                disabled={cursorWait}
                key={i}
                onClick={() => onClickCell(id)}
                className={`${styles.srclBtn}     
            
            `}
              >
                <p className="text-[80px] md:text-[60px] absolute text-gray-600">
                  {value}
                </p>
              </button>
            ))}
          </div>

          {currentRoom.userY.length === 0 ? (
            <p className="text-red-400">Wait until User O joins the game!</p>
          ) : (
            <div className={styles.user}>User O: {currentRoom.usernameY}</div>
          )}
        </div>

        <div className={styles.messageDiv}>
          <div className="w-full flex justify-center">
            Room: {currentRoom.name}
          </div>
          <button
            disabled={turn === TURN_TYPE.END ? false : cursorWait}
            onClick={handelRestart}
            className={`bg-bg-btn hover:bg-bg-btn-l p-2     
    `}
          >
            Restart
          </button>
          {turn === TURN_TYPE.START && (
            <p>
              Let's start new game <br /> First X will start!
            </p>
          )}
          {turn === TURN_TYPE.END && <p>Game is over!</p>}
          {turn === TURN_TYPE.O && <p>Turn: O</p>}
          {turn === TURN_TYPE.X && <p>Turn: X</p>}
          Messages:
          {message.length !== 0 && <p className="text-red-700">{message}</p>}
          {win === WIN.X && user.as === PLAYER_ENUM.AS_X && (
            <p className="text-green-700">You are win!</p>
          )}
          {win === WIN.X && user.as !== PLAYER_ENUM.AS_X && (
            <p className="text-green-700">You lost!</p>
          )}
          {win === WIN.O && user.as === PLAYER_ENUM.AS_O && (
            <p className="text-green-700">You are win!</p>
          )}
          {win === WIN.O && user.as !== PLAYER_ENUM.AS_O && (
            <p className="text-green-700">You lost win!</p>
          )}
          {error !== ERROR_TYPE.NO && <p className="text-red-700">{error}</p>}
        </div>

        {/* modal for reset cells */}

        <Modal
          closeModal={() => setOpenResetModal(false)}
          isModalOpen={openResetModal}
        >
          <div className={styles.modalMain}>
            <div className={styles.modalTitle}>Message</div>
            <div className={styles.modalText}>
              Your opponent wants to start over, dou you agree?!
            </div>
            <div className={styles.modalBtnsDiv}>
              <button className={styles.modalBtn} onClick={handleYes}>
                Yes
              </button>
              <button className={styles.modalBtn} onClick={handleNo}>
                No
              </button>
            </div>
          </div>
        </Modal>
      </div>
    </>
  );
}

export default GameBoard;

const styles = {
  main:
    " w-screen relative h-screen flex flex-row sm:flex-col gap-10 justify-around items-center",

  contanier:
    "sm:absolute sm:bottom-4 p-2 items-center  justify-center  bg-bg-d rounded-lg shadow-lg gap-2 flex flex-col",

  user: "p-2 bg-white rounded-lg",

  boardDiv:
    "w-[500px] h-[500px]   sm:bottom-[10%] grid grid-cols-3  gap-4 p-4 rounded-lg  lg:w-[400px] lg:h-[400px] md:w-[300px] md:h-[300px]",

  messageDiv:
    "w-[300px] lg:w-[250px] md:w-[200px] sm:absolute sm:top-2 sm:right-2 bg-bg-d shadow-lg shadow-gray-300  rounded-lg flex flex-col gap-4 p-3",

  srclBtn:
    "h-full relative bg-bg-l flex justify-center items-center  rounded-full shadow-sm hover:bg-white",

  modalMain: "w-full h-full flex flex-col gap-2 items-center",
  modalTitle: "text-[27px] font-semibold",
  modalText: "text-green-500 font-semibold",
  modalBtnsDiv: "w-full gap-3 flex",
  modalBtn: "w-[50%] bg-bg-btn hover:bg-bg-btn-l p-1 rounded-lg",
};
