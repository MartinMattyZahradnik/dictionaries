import React from "react";
import ReactModal from "react-modal";
import styled from "styled-components";

// Components
import CloseIcon from "@material-ui/icons/Close";

const StyledCloseButton = styled(CloseIcon)<{
  onClick: any;
}>`
  position: absolute;
  z-index: 1;
  top: 2.5rem;
  right: 2.5rem;
  width: 3rem;
  height: 3rem;
  cursor: pointer;
`;

const styles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "100%",
    height: "100%"
  }
};

interface ModalProps {
  isOpen: boolean;
  contentLabel?: string;
  closeButtonCallback: Function;
  children: JSX.Element;
}

const Modal = ({
  isOpen,
  contentLabel = "modal",
  closeButtonCallback,
  children
}: ModalProps) => {
  return (
    <ReactModal isOpen={isOpen} style={styles} contentLabel={contentLabel}>
      <StyledCloseButton onClick={closeButtonCallback} />
      {children}
    </ReactModal>
  );
};

if (process.env.NODE_ENV !== "test") {
  ReactModal.setAppElement("#root");
}

export default Modal;
