import React from "react";
import { Room_Type, STATUS_ENUM } from "../../type";

interface RoomListProps {
  rooms: Room_Type[];
  openRoomModal: () => void;
  setCurrentRoom: (v: Room_Type) => void;
}

function RoomList(props: RoomListProps) {
  const { openRoomModal, rooms, setCurrentRoom } = props;
  return (
    <div className={styles.roomListsDiv}>
      {rooms.length !== 0 ? (
        rooms.map((room, key) => (
          <button
            disabled={room.status === STATUS_ENUM.BUSY}
            onClick={() => {
              openRoomModal();
              setCurrentRoom(rooms.filter((r) => r.id === room.id)[0]);
            }}
            className={`${styles.infoRoom} ${room.status === STATUS_ENUM.BUSY &&
              "border-[1px] border-red-500 hover:bg-bg"}`}
            key={key}
          >
            <p>
              {key + 1}. {room.name}
            </p>
            <p>{room.description}</p>
            <p>{room.status === STATUS_ENUM.BUSY ? "Busy" : "Open"}</p>
          </button>
        ))
      ) : (
        <div>there is no room, yet!</div>
      )}
    </div>
  );
}

export default RoomList;

const styles = {
  roomListsDiv:
    "w-[60%] bg-bg-d rounded-md p-4 flex flex-col gap-4 shadow-lg overflow-y-auto h-[70%] md:h-[60%]",
  infoRoom:
    " w-full  bg-bg hover:bg-bg-l p-4 rounded-md shadow-sm flex flex-row justify-around gap-5",
};
