export const isUserWinner = (winner: string, user: string) => {
  if (winner === user) {
    return true;
  } else {
    return false;
  }
};
