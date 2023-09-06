import { useRef } from "react";

interface ModalProps {
  isModalOpen: boolean;
  closeModal: () => void;
  children: JSX.Element;
}

function Modal(props: ModalProps) {
  const { isModalOpen, closeModal, children } = props;
  const modalRef = useRef<HTMLDivElement>(null);

  const handleOutsideClick = (event: React.MouseEvent<HTMLElement>) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      closeModal();
    }
  };
  if (!isModalOpen) return null;

  return (
    <div
      onClick={handleOutsideClick}
      className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center"
    >
      <div ref={modalRef} className="bg-white  rounded-lg p-6">
        {children}
      </div>
    </div>
  );
}

export default Modal;
