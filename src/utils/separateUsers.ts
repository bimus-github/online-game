import { ResultItem } from "../type";

export const separateUsers = (
  { usernameX, usernameY, numOfUserxAsWinner, numOfUseryAsWinner }: ResultItem,
  email: string
) => {
  if (usernameX === email) {
    return {
      you: usernameX,
      opponent: usernameY,
      yourShot: numOfUserxAsWinner,
      opponentsShot: numOfUseryAsWinner,
    };
  }

  if (usernameY === email) {
    return {
      opponent: usernameX,
      you: usernameY,
      opponentsShot: numOfUserxAsWinner,
      yourShot: numOfUseryAsWinner,
    };
  }
};
