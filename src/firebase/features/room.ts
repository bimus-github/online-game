import {
  collection,
  doc,
  getDocs,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { Room_Type } from "../../type";
import { db } from "..";

const collection_name = "rooms";

export const addRoom = async (room: Room_Type) => {
  try {
    await setDoc(doc(db, collection_name, room.id), room);
  } catch (e) {
    console.log("Error adding room:", e);
  }
};

export const getRooms = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, collection_name));

    const data: Room_Type[] = [];

    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      data.push(doc.data() as Room_Type);
    });

    return data;
  } catch (e) {
    console.log("Error getting rooms: ", e);
  }
};

export const updateRoom = async (room: Room_Type) => {
  try {
    const data = doc(db, collection_name, room.id);

    // Set the "capital" field of the city 'DC'
    await updateDoc(data, { room });
  } catch (e) {
    console.log("Error updating user: ", e);
  }
};
