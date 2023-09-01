import { useEffect, useState } from "react";
import Modal from "../components/Modal";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { roomActions } from "../store/features/room";
import { ERROR_ENUM, Room_Type } from "../type";
import { IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { socket } from "../socket";

function Home() {
  const dispatch = useAppDispatch();
  const rooms = useAppSelector((state) => state.room);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const [roomName, setRoomName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<ERROR_ENUM>(ERROR_ENUM.NONE);

  useEffect(() => {
    socket.on("connect", () => {
      console.log("user connected");
    });

    socket.on("disconnect", () => {
      console.log("Disconnected from server");
    });
  }, []);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleCreateNewRoom = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setError(ERROR_ENUM.NONE);
    if (roomName.length === 0) return setError(ERROR_ENUM.NAME);
    const date = new Date();

    const newRoom: Room_Type = {
      id: `${roomName}${password}`,
      name: roomName,
      description,
      password,
      date,
    };

    dispatch(roomActions.createRoom(newRoom));
    setError(ERROR_ENUM.NONE);
    setRoomName("");
    setDescription("");
    setPassword("");
    setIsModalOpen(false);
  };
  return (
    <div className={styles.main}>
      {/* open modal btn */}
      <button onClick={openModal} className={styles.generateRoomBtn}>
        <p>Add room</p>
      </button>

      {/* search input */}
      <div className={styles.searchDiv}>
        <input
          className={styles.searchInput}
          type="text"
          placeholder="Search ..."
        />
        <IconButton>
          <SearchIcon />
        </IconButton>
      </div>

      {/* room lists */}
      <div className={styles.roomListsDiv}>
        {rooms.length !== 0 ? (
          rooms.map((room, key) => (
            <div className={styles.infoRoom} key={key}>
              <p>
                {key + 1}. {room.name}
              </p>
              <p>{room.description}</p>
              <p>{room.password.length === 0 ? "open" : "lock"}</p>
            </div>
          ))
        ) : (
          <div>there is no rooms, yet!</div>
        )}
      </div>

      {/* generate room modal */}
      <Modal closeModal={closeModal} isModalOpen={isModalOpen}>
        <div className={styles.modal}>
          <div className={styles.modalTitle}>Create Room</div>
          <form
            onSubmit={handleCreateNewRoom}
            action=""
            className={styles.modalForm}
          >
            <div className={styles.modalInputDiv}>
              <p className={styles.inputTitle}>Room Name</p>
              <input
                value={roomName}
                onChange={(e) => setRoomName(e.target.value)}
                className={`${styles.modalInput} ${
                  error === ERROR_ENUM.NAME ? "border-red-400" : ""
                }`}
                type="text"
                placeholder="eg: Game with Muhammad"
              />
            </div>
            <div className={styles.modalInputDiv}>
              <p className={styles.inputTitle}>Description</p>
              <input
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className={styles.modalInput}
                type="text"
                placeholder="eg: Please, do not disturb"
              />
            </div>
            <div className={styles.modalInputDiv}>
              <p className={styles.inputTitle}>Password</p>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={styles.modalInput}
                type="text"
                placeholder="eg: 123**"
              />
            </div>
            <button type="submit" className={styles.createRoomBtn}>
              Create
            </button>
            {error === ERROR_ENUM.NAME && (
              <p className="text-red-400">Pleas, create room name!</p>
            )}
          </form>
        </div>
      </Modal>
    </div>
  );
}

export default Home;

const styles = {
  main: "relative flex justify-center items-center flex-col h-screen",

  generateRoomBtn:
    "absolute top-[5%] right-[5%] h-[50px] bg-bg-btn hover:bg-bg-btn-l text-[22px] pl-2 pr-4 rounded shadow-md",

  roomListsDiv:
    "w-[60%] bg-bg-d rounded-md p-4 flex flex-col gap-4 shadow-lg overflow-y-auto h-[70%]",
  infoRoom:
    " w-full  bg-bg hover:bg-bg-l p-4 rounded-md shadow-sm flex flex-row justify-around gap-5",

  modal: "relative w-full",
  modalTitle: "w-full flex justify-center items-center text-[25px]",
  modalForm: " flex flex-col gap-4",
  modalInputDiv: " w-full flex flex-col gap-2",
  inputTitle: "",
  modalInput:
    " w-full overflow-hidden border-[1px] p-2 rounded-md border-slate-700 outline-none",
  createRoomBtn: " bg-bg-btn hover:bg-bg-btn-l p-3 rounded-lg",

  searchDiv:
    "pl-2 p-1 border-[1px] border-black w-[300px] mb-5 rounded-lg flex flex-row shadow-lg",
  searchInput: "w-full border-none outline-none",
};
