import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { db } from "..";
import { Game_Type } from "../../type";

const collection_name = "games";

export const getGames = async (email: string) => {
  try {
    const q1 = query(
      collection(db, collection_name),
      where("usernameX", "==", email)
    );
    const q2 = query(
      collection(db, collection_name),
      where("usernameY", "==", email)
    );

    const querySnapshot1 = await getDocs(q1);
    const querySnapshot2 = await getDocs(q2);

    const data: Game_Type[] = [];

    querySnapshot1.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      data.push(doc.data() as Game_Type);
    });

    querySnapshot2.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      data.push(doc.data() as Game_Type);
    });

    return data;
  } catch (e) {
    console.log("Error while getting games:", e);
  }
};

export const addGame = async (game: Game_Type) => {
  try {
    await setDoc(doc(db, collection_name, game.id), game);
  } catch (e) {
    console.log("Error while adding game:", e);
  }
};
