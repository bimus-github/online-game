import { useEffect, useState } from "react";

interface Cell_Type {
  id: number;
  value: CELL_VALUE_TYPE;
}
enum CELL_VALUE_TYPE {
  NULL = "",
  X = "X",
  O = "O",
}

enum ERROR_TYPE {
  FULL = "Already printed",
  NO = "",
  END = " The game is over!!!",
}

enum TURN_TYPE {
  X = "X",
  O = "O",
  START = "START",
  END = "END",
}

function GameBoard() {
  const [turnX, setTurnX] = useState<TURN_TYPE>(TURN_TYPE.START);

  const [cells, setCells] = useState<Cell_Type[]>([
    {
      id: 1,
      value: CELL_VALUE_TYPE.NULL,
    },
    {
      id: 2,
      value: CELL_VALUE_TYPE.NULL,
    },
    {
      id: 3,
      value: CELL_VALUE_TYPE.NULL,
    },
    {
      id: 4,
      value: CELL_VALUE_TYPE.NULL,
    },
    {
      id: 5,
      value: CELL_VALUE_TYPE.NULL,
    },
    {
      id: 6,
      value: CELL_VALUE_TYPE.NULL,
    },
    {
      id: 7,
      value: CELL_VALUE_TYPE.NULL,
    },
    {
      id: 8,
      value: CELL_VALUE_TYPE.NULL,
    },
    {
      id: 9,
      value: CELL_VALUE_TYPE.NULL,
    },
  ]);
  const [error, setError] = useState<ERROR_TYPE>(ERROR_TYPE.NO);
  const [win, setWin] = useState<string>("");

  useEffect(() => {
    // row 1
    if (
      cells[0].value === cells[1].value &&
      cells[1].value !== CELL_VALUE_TYPE.NULL &&
      cells[1].value === cells[2].value
    ) {
      if (turnX === TURN_TYPE.X) {
        setWin("O is win!!!");
        setTurnX(TURN_TYPE.END);
      }
      if (turnX === TURN_TYPE.O) {
        setTurnX(TURN_TYPE.END);

        setWin("X is win!!!");
      }
    }

    // row 2
    if (
      cells[3].value === cells[4].value &&
      cells[4].value !== CELL_VALUE_TYPE.NULL &&
      cells[4].value === cells[5].value
    ) {
      if (turnX === TURN_TYPE.X) {
        setWin("O is win!!!");
        setTurnX(TURN_TYPE.END);
      }
      if (turnX === TURN_TYPE.O) {
        setTurnX(TURN_TYPE.END);

        setWin("X is win!!!");
      }
    }

    // row 3
    if (
      cells[6].value === cells[7].value &&
      cells[7].value !== CELL_VALUE_TYPE.NULL &&
      cells[7].value === cells[8].value
    ) {
      if (turnX === TURN_TYPE.X) {
        setWin("O is win!!!");
        setTurnX(TURN_TYPE.END);
      }
      if (turnX === TURN_TYPE.O) {
        setTurnX(TURN_TYPE.END);

        setWin("X is win!!!");
      }
    }

    // col 1
    if (
      cells[0].value === cells[3].value &&
      cells[3].value !== CELL_VALUE_TYPE.NULL &&
      cells[3].value === cells[6].value
    ) {
      if (turnX === TURN_TYPE.X) {
        setWin("O is win!!!");
        setTurnX(TURN_TYPE.END);
      }
      if (turnX === TURN_TYPE.O) {
        setTurnX(TURN_TYPE.END);

        setWin("X is win!!!");
      }
    }

    // col 2
    if (
      cells[1].value === cells[4].value &&
      cells[4].value !== CELL_VALUE_TYPE.NULL &&
      cells[4].value === cells[7].value
    ) {
      if (turnX === TURN_TYPE.X) {
        setWin("O is win!!!");
        setTurnX(TURN_TYPE.END);
      }
      if (turnX === TURN_TYPE.O) {
        setTurnX(TURN_TYPE.END);

        setWin("X is win!!!");
      }
    }

    // col 3
    if (
      cells[2].value === cells[5].value &&
      cells[5].value !== CELL_VALUE_TYPE.NULL &&
      cells[5].value === cells[8].value
    ) {
      if (turnX === TURN_TYPE.X) {
        setWin("O is win!!!");
        setTurnX(TURN_TYPE.END);
      }
      if (turnX === TURN_TYPE.O) {
        setTurnX(TURN_TYPE.END);

        setWin("X is win!!!");
      }
    }

    // x - 1
    if (
      cells[0].value === cells[4].value &&
      cells[4].value !== CELL_VALUE_TYPE.NULL &&
      cells[4].value === cells[8].value
    ) {
      if (turnX === TURN_TYPE.X) {
        setWin("O is win!!!");
        setTurnX(TURN_TYPE.END);
      }
      if (turnX === TURN_TYPE.O) {
        setTurnX(TURN_TYPE.END);

        setWin("X is win!!!");
      }
    }

    // x - 2
    if (
      cells[2].value === cells[4].value &&
      cells[4].value !== CELL_VALUE_TYPE.NULL &&
      cells[4].value === cells[6].value
    ) {
      if (turnX === TURN_TYPE.X) {
        setWin("O is win!!!");
        setTurnX(TURN_TYPE.END);
      }
      if (turnX === TURN_TYPE.O) {
        setTurnX(TURN_TYPE.END);

        setWin("X is win!!!");
      }
    }
  }, [cells, turnX]);

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

    setCells(newCells);
  };

  const handelRestart = () => {
    window.location.reload();
  };

  return (
    <div className={styles.main}>
      <div className={styles.boardDiv}>
        {cells.map(({ id, value }, i) => (
          <button
            key={i}
            onClick={() => onClickCell(id)}
            className={styles.srclBtn}
          >
            <p className="text-[80px] md:text-[60px] absolute text-gray-600">
              {value}
            </p>
          </button>
        ))}
      </div>

      <div className={styles.messageDiv}>
        <button
          onClick={handelRestart}
          className="bg-bg-btn hover:bg-bg-btn-l p-2"
        >
          Restart
        </button>
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
        {win.length !== 0 && <p className="text-green-700">{win}</p>}
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
