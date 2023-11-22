import React from "react";
import Modal, {closeStyle} from "simple-react-modal";

const IFrameModal = ({ isModalOpened, setIsModalOpened, iFrameUrl }) => (
  <Modal
    style={{
      background: 'rgba(0, 0, 0, 0.3)',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center'
    }}
    containerStyle={{
      width: '100%',
      height: '80%',
      margin: 'auto',
      maxWidth: '1200px',
      borderRadius: '10px'
    }}
    closeOnOuterClick={true}
    show={isModalOpened}
    transitionSpeed={500}
    onClose={() => { setIsModalOpened(false) }}>

    <a style={closeStyle} onClick={() => { setIsModalOpened(false) }}>X</a>
    <iframe title="news-iframe" src={iFrameUrl} />
  </Modal>
);

export default IFrameModal;