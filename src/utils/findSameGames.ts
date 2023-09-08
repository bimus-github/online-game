import { Game_Type } from "../type";
interface ResultItem {
  usernameX: string;
  usernameY: string;
  numOfUserxAsWinner: number;
  numOfUseryAsWinner: number;
}

export function findSameGames(arr: Game_Type[]) {
  const resultMap: { [key: string]: ResultItem } = {};
  const newArray: ResultItem[] = [];

  for (let i = 0; i < arr.length; i++) {
    const { usernameX, usernameY, winnerName } = arr[i];

    const key = `${usernameX}-${usernameY}`;
    if (!resultMap[key]) {
      resultMap[key] = {
        usernameX,
        usernameY,
        numOfUserxAsWinner: 0,
        numOfUseryAsWinner: 0,
      };
    }

    if (winnerName === usernameX) {
      resultMap[key].numOfUserxAsWinner++;
    }
    if (winnerName === usernameY) {
      resultMap[key].numOfUseryAsWinner++;
    }
  }

  for (const key in resultMap) {
    newArray.push(resultMap[key]);
  }

  return newArray;
}
