import { createContext } from "react";

const ModalContext = createContext({
  isModalOpened: false,
  setIsModalOpened: (modalOpened) => {},
  modalUrl: '',
  setModalUrl: (modalUrl) => {}
});

export default ModalContext;