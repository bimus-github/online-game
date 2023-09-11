import React from "react";
import { useAppSelector } from "../store/hooks";
import { findSameGames } from "../utils/findSameGames";
import { separateUsers } from "../utils/separateUsers";

function Games() {
  const games = useAppSelector((state) => state.game);
  const user = useAppSelector((state) => state.user);

  const sameGames = findSameGames(games);
  return (
    <div className={styles.main}>
      <div className={styles.listsDiv}>
        <div className={styles.headerDiv}>Games</div>
        <div className="flex w-full p-2 gap-2">
          <div className=" flex-1 flex justify-center text-[19px] font-semibold font-mono">
            You
          </div>
          <div className=" flex-2 flex justify-center text-[19px] font-semibold font-mono">
            RESULT
          </div>
          <div className=" flex-1 flex justify-center text-[19px] font-semibold font-mono">
            Opponent
          </div>
        </div>

        {sameGames.length === 0 && (
          <div className=" text-red-500">You haven't tried anyone yet</div>
        )}

        {sameGames.map((game, i) => {
          const { opponent, opponentsShot, you, yourShot } = separateUsers(
            game,
            user.email
          )!;
          return (
            <div className="flex w-full p-2 gap-2" key={i}>
              <div className=" flex-1 flex justify-center">{you}</div>
              <div className=" flex-2 flex gap-3">
                <div className="">{yourShot}</div>
                <div className="w-[2px] h-full bg-black" />
                <div className="">{opponentsShot}</div>
              </div>
              <div className=" flex-1 flex justify-center">{opponent}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Games;

const styles = {
  main: " w-full h-screen flex flex-col justify-center items-center",
  listsDiv:
    "w-[600px] h-[450px] bg-bg shadow-md rounded-lg flex flex-col items-center p-4",
  headerDiv:
    "w-full border-b-[1px] border-black flex flex-col items-center p-1 text-[24px] font-semibold",
  itemDiv: "",
};
