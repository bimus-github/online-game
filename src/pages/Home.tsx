import { useState } from "react";
import Modal from "../components/Modal";

function Home() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  return (
    <div className={styles.main}>
      <button onClick={openModal} className={styles.generateRoomBtn}>
        <p>Add room</p>
      </button>
      <div className={styles.roomListsDiv}>
        {["", "", "", "", "", "", "", ""].map((_, key) => (
          <div className={styles.infoRoom} key={key}>
            <p>{key + 1}. Room Name</p>
            <p>Description</p>
            <p>lock</p>
          </div>
        ))}
      </div>

      {/* generate room modal */}
      <Modal closeModal={closeModal} isModalOpen={isModalOpen}>
        <div className={styles.modal}>
          <div className={styles.modalTitle}>Create Room</div>
          <form action="" className={styles.modalForm}>
            <div className={styles.modalInputDiv}>
              <p className={styles.inputTitle}>Room Name</p>
              <input
                className={styles.modalInput}
                type="text"
                placeholder="eg: Game with Muhammad"
              />
            </div>
            <div className={styles.modalInputDiv}>
              <p className={styles.inputTitle}>Description</p>
              <input
                className={styles.modalInput}
                type="text"
                placeholder="eg: Please, do not disturb"
              />
            </div>
            <div className={styles.modalInputDiv}>
              <p className={styles.inputTitle}>Password</p>
              <input
                className={styles.modalInput}
                type="text"
                placeholder="***"
              />
            </div>
            <button className={styles.createRoomBtn}>Create</button>
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
    "absolute top-[5%] right-[5%] h-[50px] bg-slate-400 hover:bg-slate-300 text-[22px] pl-2 pr-4 rounded shadow-md",
  roomListsDiv:
    "w-[60%] bg-slate-400 rounded-md p-4 flex flex-col gap-4 shadow-lg overflow-y-auto max-h-[70%]",
  infoRoom:
    " w-full  bg-slate-200 hover:bg-slate-100 p-4 rounded-md shadow-sm flex flex-row justify-around gap-5",
  modal: "relative w-full ",
  modalTitle: "w-full flex justify-center items-center text-[25px]",
  modalForm: " flex flex-col gap-4",
  modalInputDiv: " w-full flex flex-col gap-2",
  inputTitle: "",
  modalInput:
    " w-full overflow-hidden border-[1px] p-2 rounded-md border-slate-700 outline-none",
  createRoomBtn: " bg-blue-400 hover:bg-blue-300 p-3 rounded-lg",
};
