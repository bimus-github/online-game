import {
  collection,
  getDocs,
  query,
  where,
  setDoc,
  doc,
} from "firebase/firestore";
import { db } from "..";
import { User_Type } from "../../type";

const collection_name = "users";

export const addUser = async (user: User_Type) => {
  try {
    await setDoc(doc(db, collection_name, user.id), user);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

export const getUser = async (email: string) => {
  try {
    const q = query(
      collection(db, collection_name),
      where("email", "==", email)
    );

    const querySnapshot = await getDocs(q);

    const data: User_Type[] = [];

    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      data.push(doc.data() as User_Type);
    });

    return data[0];
  } catch (error) {
    console.log("Error getting user: ", error);
  }
};
