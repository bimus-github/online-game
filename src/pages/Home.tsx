import { useState } from "react";
import Modal from "../components/Modal";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { roomActions } from "../store/features/room";
import { ERROR_ENUM, Room_Type, TURN_TYPE } from "../type";
import { IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { socket } from "../socket";
import { useNavigate } from "react-router-dom";
import { currentRoomActions } from "../store/features/currentRoom";

function Home() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const rooms = useAppSelector((state) => state.room);
  const currenId = useAppSelector((state) => state.currentId);

  const [isRoomGenerateModalOpen, setIsRoomGenerateModalOpen] = useState<
    boolean
  >(false);
  const [isOpenRoomModal, setIsOpenRoomModal] = useState<boolean>(false);

  const [roomName, setRoomName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<ERROR_ENUM>(ERROR_ENUM.NONE);

  const [currentRoom, setCurrentRoom] = useState<Room_Type>({} as Room_Type);
  const [isPassword, setIsPassword] = useState<boolean>(false);

  const openRoomGenerateModal = () => {
    setIsRoomGenerateModalOpen(true);
  };

  const closeRoomGenerateModal = () => {
    setIsRoomGenerateModalOpen(false);
  };
  const openRoomModal = () => {
    setIsOpenRoomModal(true);
  };

  const closeRoomModal = () => {
    setIsOpenRoomModal(false);
  };

  const handleCreateNewRoom = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setError(ERROR_ENUM.NONE);
    if (roomName.length === 0) return setError(ERROR_ENUM.NAME);
    const date = new Date();

    const newRoom: Room_Type = {
      id: currenId,
      name: roomName,
      description,
      password,
      date,
      userX: currenId,
      userY: "",
      turn: TURN_TYPE.START,
    };

    dispatch(roomActions.createRoom(newRoom));
    dispatch(currentRoomActions.setRoom(newRoom));
    socket.emit("createRoom", newRoom);

    setError(ERROR_ENUM.NONE);
    setRoomName("");
    setDescription("");
    setPassword("");
    setIsRoomGenerateModalOpen(false);

    navigate(`/room/${currenId}`);
  };

  const handleOpenRoom = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    dispatch(currentRoomActions.setRoom({ ...currentRoom, userY: currenId }));

    socket.emit("conectingWithUserY", { ...currentRoom, userY: currenId });

    navigate(`/room/${currentRoom.id}`);
  };

  if (currenId.length === 0)
    return <div>Please, check internet connections!!!</div>;

  return (
    <div className={styles.main}>
      {/* open modal btn */}
      <button
        onClick={openRoomGenerateModal}
        className={styles.generateRoomBtn}
      >
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
            <button
              onClick={() => {
                openRoomModal();
                setCurrentRoom(rooms.filter((r) => r.id === room.id)[0]);
              }}
              className={styles.infoRoom}
              key={key}
            >
              <p>
                {key + 1}. {room.name}
              </p>
              <p>{room.description}</p>
              <p>{room.password.length === 0 ? "open" : "lock"}</p>
            </button>
          ))
        ) : (
          <div>there is no rooms, yet!</div>
        )}
      </div>

      {/* generate room modal */}
      <Modal
        closeModal={closeRoomGenerateModal}
        isModalOpen={isRoomGenerateModalOpen}
      >
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

      {/* open room Modal */}

      <Modal closeModal={closeRoomModal} isModalOpen={isOpenRoomModal}>
        <form action="" onSubmit={handleOpenRoom} className={styles.modalForm}>
          <div className={styles.modalInputDiv}>
            <p className={styles.inputTitle}>Password</p>
            <input
              onChange={(e) => {
                setIsPassword(false);
                if (e.target.value === currentRoom.password) {
                  setIsPassword(true);
                }
              }}
              className={`${styles.modalInput} ${
                error === ERROR_ENUM.PASSWORD ? "border-red-400" : ""
              }`}
              type="text"
              placeholder="eg: 123***"
            />
          </div>
          {isPassword && (
            <button type="submit" className={styles.createRoomBtn}>
              Create
            </button>
          )}
        </form>
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
