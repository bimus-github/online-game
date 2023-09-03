import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { CELL_VALUE_TYPE, ERROR_TYPE, PLAYER_ENUM, TURN_TYPE } from "../type";
import { socket } from "../socket";
import { cellActions } from "../store/features/cells";

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

  const rooms = useAppSelector((state) => state.room);
  const user = useAppSelector((user) => user.user);
  const cells = useAppSelector((state) => state.cells);

  const { roomId } = useParams();

  const currentRoom = rooms.filter((room) => room.id === roomId)[0];

  const [cursorWait, setCursorWait] = useState<boolean>(true);

  const [turnX, setTurnX] = useState<TURN_TYPE>(TURN_TYPE.START);

  const [error, setError] = useState<ERROR_TYPE>(ERROR_TYPE.NO);
  const [win, setWin] = useState<WIN>(WIN.NONE);

  useEffect(() => {
    if (user.as === PLAYER_ENUM.AS_X) {
      if (currentRoom.userY.length === 0) return setCursorWait(true);
      if (turnX === TURN_TYPE.START || turnX === TURN_TYPE.X)
        return setCursorWait(false);
      return setCursorWait(true);
    }
    if (user.as === PLAYER_ENUM.AS_O) {
      if (currentRoom.userX.length === 0) return setCursorWait(true);
      if (turnX === TURN_TYPE.O) return setCursorWait(false);
      return setCursorWait(true);
    }
  }, [currentRoom.userX.length, currentRoom.userY.length, turnX, user.as]);

  useEffect(() => {
    // row 1
    if (
      cells[0].value === cells[1].value &&
      cells[1].value === CELL_VALUE_TYPE.X &&
      cells[1].value === cells[2].value
    ) {
      setWin(WIN.X);

      setTurnX(TURN_TYPE.END);
    }
    if (
      cells[0].value === cells[1].value &&
      cells[1].value === CELL_VALUE_TYPE.O &&
      cells[1].value === cells[2].value
    ) {
      setWin(WIN.O);

      setTurnX(TURN_TYPE.END);
    }

    // row 2
    if (
      cells[3].value === cells[4].value &&
      cells[4].value === CELL_VALUE_TYPE.X &&
      cells[4].value === cells[5].value
    ) {
      setWin(WIN.X);
      setTurnX(TURN_TYPE.END);
    }
    if (
      cells[3].value === cells[4].value &&
      cells[4].value === CELL_VALUE_TYPE.O &&
      cells[4].value === cells[5].value
    ) {
      setWin(WIN.O);
      setTurnX(TURN_TYPE.END);
    }

    // row 3
    if (
      cells[6].value === cells[7].value &&
      cells[7].value === CELL_VALUE_TYPE.X &&
      cells[7].value === cells[8].value
    ) {
      setWin(WIN.X);
      setTurnX(TURN_TYPE.END);
    }
    if (
      cells[6].value === cells[7].value &&
      cells[7].value === CELL_VALUE_TYPE.O &&
      cells[7].value === cells[8].value
    ) {
      setWin(WIN.O);
      setTurnX(TURN_TYPE.END);
    }

    // col 1
    if (
      cells[0].value === cells[3].value &&
      cells[3].value === CELL_VALUE_TYPE.X &&
      cells[3].value === cells[6].value
    ) {
      setWin(WIN.X);
      setTurnX(TURN_TYPE.END);
    }
    if (
      cells[0].value === cells[3].value &&
      cells[3].value === CELL_VALUE_TYPE.O &&
      cells[3].value === cells[6].value
    ) {
      setWin(WIN.O);
      setTurnX(TURN_TYPE.END);
    }

    // col 2
    if (
      cells[1].value === cells[4].value &&
      cells[4].value === CELL_VALUE_TYPE.X &&
      cells[4].value === cells[7].value
    ) {
      setWin(WIN.X);
      setTurnX(TURN_TYPE.END);
    }
    if (
      cells[1].value === cells[4].value &&
      cells[4].value === CELL_VALUE_TYPE.O &&
      cells[4].value === cells[7].value
    ) {
      setWin(WIN.O);
      setTurnX(TURN_TYPE.END);
    }

    // col 3
    if (
      cells[2].value === cells[5].value &&
      cells[5].value === CELL_VALUE_TYPE.X &&
      cells[5].value === cells[8].value
    ) {
      setWin(WIN.X);
      setTurnX(TURN_TYPE.END);
    }
    if (
      cells[2].value === cells[5].value &&
      cells[5].value === CELL_VALUE_TYPE.O &&
      cells[5].value === cells[8].value
    ) {
      setWin(WIN.O);
      setTurnX(TURN_TYPE.END);
    }

    // x - 1
    if (
      cells[0].value === cells[4].value &&
      cells[4].value === CELL_VALUE_TYPE.X &&
      cells[4].value === cells[8].value
    ) {
      setWin(WIN.X);
      setTurnX(TURN_TYPE.END);
    }
    if (
      cells[0].value === cells[4].value &&
      cells[4].value === CELL_VALUE_TYPE.O &&
      cells[4].value === cells[8].value
    ) {
      setWin(WIN.O);
      setTurnX(TURN_TYPE.END);
    }

    // x - 2
    if (
      cells[2].value === cells[4].value &&
      cells[4].value === CELL_VALUE_TYPE.X &&
      cells[4].value === cells[6].value
    ) {
      setWin(WIN.X);
      setTurnX(TURN_TYPE.END);
    }
    if (
      cells[2].value === cells[4].value &&
      cells[4].value === CELL_VALUE_TYPE.O &&
      cells[4].value === cells[6].value
    ) {
      setWin(WIN.O);
      setTurnX(TURN_TYPE.END);
    }
  }, [cells, turnX]);

  useEffect(() => {
    socket.on("updateCell", (cells) => {
      console.log(cells);

      dispatch(cellActions.set(cells));
      if (user.as === PLAYER_ENUM.AS_X) setTurnX(TURN_TYPE.X);
      if (user.as === PLAYER_ENUM.AS_O) setTurnX(TURN_TYPE.O);
    });
  }, [dispatch, user.as]);

  const onClickCell = (id: number) => {
    if (turnX === TURN_TYPE.END) return setError(ERROR_TYPE.END);

    const newCells: Cell_Type[] = cells.map((cell) => {
      if (cell.id === id) {
        if (turnX === TURN_TYPE.X || turnX === TURN_TYPE.START) {
          if (cell.value.length !== 0) {
            setError(ERROR_TYPE.FULL);
            return cell;
          }

          setTurnX(TURN_TYPE.O);
          setError(ERROR_TYPE.NO);
          return { id, value: CELL_VALUE_TYPE.X };
        } else {
          if (cell.value.length !== 0) {
            setError(ERROR_TYPE.FULL);
            return cell;
          }

          setTurnX(TURN_TYPE.X);
          setError(ERROR_TYPE.NO);
          return { id, value: CELL_VALUE_TYPE.O };
        }
      }
      return cell;
    });

    dispatch(cellActions.set(newCells));

    console.log(currentRoom.userX);

    socket.emit("updateCell", {
      cells: newCells,
      id: user.as === PLAYER_ENUM.AS_X ? currentRoom.userY : currentRoom.userX,
    });
  };

  const handelRestart = () => {
    // window.location.reload();
  };

  if (currentRoom.id !== roomId)
    return <div>There is no room with such ID!</div>;

  return (
    <div
      className={`${styles.main} 
    `}
    >
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

      <div className={styles.messageDiv}>
        <div className="w-full flex justify-center">
          Room: {currentRoom.name}
        </div>
        <div className="w-full flex justify-center">
          {user.as === PLAYER_ENUM.AS_O && "You are O"}
          {user.as === PLAYER_ENUM.AS_X && "You are X"}
        </div>
        <button
          disabled={cursorWait}
          onClick={handelRestart}
          className={`bg-bg-btn hover:bg-bg-btn-l p-2     
    `}
        >
          Restart
        </button>
        {currentRoom.userY.length === 0 && (
          <p className="text-red-400">Wait until User O joins the game!</p>
        )}
        {currentRoom.userY.length !== 0 && user.as === PLAYER_ENUM.AS_X && (
          <p className="text-red-400">User O is active now!</p>
        )}
        {currentRoom.userX.length !== 0 && user.as === PLAYER_ENUM.AS_O && (
          <p className="text-red-400">User X is active now!</p>
        )}
        {turnX === TURN_TYPE.START && (
          <p>
            Let's start new game <br /> First X will start!
          </p>
        )}
        {turnX === TURN_TYPE.END && <p>Game is over!</p>}
        {turnX === TURN_TYPE.O && <p>Turn: O</p>}
        {turnX === TURN_TYPE.X && <p>Turn: X</p>}
        Messages:
        {error !== ERROR_TYPE.NO && <p className="text-red-700">{error}</p>}
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
      </div>
    </div>
  );
}

export default GameBoard;

const styles = {
  main:
    "@tailwind w-screen relative h-screen flex flex-row sm:flex-col gap-10 justify-around items-center",

  boardDiv:
    "w-[500px] h-[500px]  bg-bg-d sm:absolute sm:bottom-[10%] sm: shadow-lg shadow-gray-300 grid grid-cols-3 items-center  justify-center gap-4 p-4 rounded-lg  lg:w-[400px] lg:h-[400px] md:w-[300px] md:h-[300px]",

  messageDiv:
    "w-[300px] lg:w-[250px] md:w-[200px] sm:absolute sm:top-2 sm:right-2 bg-bg-d shadow-lg shadow-gray-300  rounded-lg flex flex-col gap-4 p-3",

  srclBtn:
    "h-full relative bg-bg-l flex justify-center items-center  rounded-full shadow-sm hover:bg-white",
};
