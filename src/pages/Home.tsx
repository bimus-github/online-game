import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../store/hooks";

import { roomActions } from "../store/features/room";
import { userActions } from "../store/features/user";

import { socket } from "../socket";

import { ERROR_ENUM, PLAYER_ENUM, Room_Type, STATUS_ENUM } from "../type";

import { IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import Modal from "../components/Modal";

function Home() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const rooms = useAppSelector((state) => state.room);
  const currentId = useAppSelector((state) => state.currentId);
  const user = useAppSelector((state) => state.user);

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
      id: currentId,
      name: roomName,
      description,
      password,
      date,
      status: STATUS_ENUM.EMPTY,
      userX: currentId,
      userY: "",
      usernameX: user.email,
      usernameY: "",
    };

    dispatch(roomActions.createRoom(newRoom));
    dispatch(userActions.set({ ...user, as: PLAYER_ENUM.AS_X }));
    socket.emit("createRoom", newRoom);

    setError(ERROR_ENUM.NONE);
    setRoomName("");
    setDescription("");
    setPassword("");
    setIsRoomGenerateModalOpen(false);

    navigate(`/room/${currentId}`);
  };

  const handleOpenRoom = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    socket.emit("conectingWithUserY", {
      ...currentRoom,
      userY: currentId,
      usernameY: user.email,
      status: STATUS_ENUM.BUSY,
    });

    dispatch(userActions.set({ ...user, as: PLAYER_ENUM.AS_O }));
    dispatch(
      roomActions.update({
        ...currentRoom,
        userY: currentId,
        usernameY: user.email,
        status: STATUS_ENUM.BUSY,
      })
    );

    navigate(`/room/${currentRoom.id}`);
  };

  if (currentId.length === 0)
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
              disabled={room.status === STATUS_ENUM.BUSY}
              onClick={() => {
                openRoomModal();
                setCurrentRoom(rooms.filter((r) => r.id === room.id)[0]);
              }}
              className={`${styles.infoRoom} ${room.status ===
                STATUS_ENUM.BUSY && "border-[1px] border-red-500 hover:bg-bg"}`}
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
              Open
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
    "absolute top-[5%] right-[5%] h-[50px] md:h-[40px] md:ml-1 md:pr-2 md:text-[18px] bg-bg-btn hover:bg-bg-btn-l text-[22px] pl-2 pr-4 rounded shadow-md",

  roomListsDiv:
    "w-[60%] bg-bg-d rounded-md p-4 flex flex-col gap-4 shadow-lg overflow-y-auto h-[70%] md:h-[60%]",
  infoRoom:
    " w-full  bg-bg hover:bg-bg-l p-4 rounded-md shadow-sm flex flex-row justify-around gap-5",

  modal: "relative w-[500px] lg:w-[400px] md:w-[350px] sm:w-[270px]",
  modalTitle: "w-full flex justify-center items-center text-[25px]",

  modalForm:
    "flex flex-col gap-4 w-[500px] lg:w-[400px] md:w-[350px] sm:w-[270px]",
  modalInputDiv: " w-full flex flex-col gap-2",
  inputTitle: "",
  modalInput:
    " w-full overflow-hidden border-[1px] p-2 rounded-md border-slate-700 outline-none",
  createRoomBtn: " bg-bg-btn hover:bg-bg-btn-l p-3 rounded-lg",

  searchDiv:
    "pl-2 p-1 border-[1px] border-black w-[300px] md:w-[200px] mb-5 rounded-lg flex flex-row shadow-lg",
  searchInput: "w-full border-none outline-none",
};
