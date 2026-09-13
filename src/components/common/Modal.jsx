import {
  ModalOverlay,
  ModalBox,
  IconWrapper,
  ModalTitle,
  ModalDescription,
  ButtonGroup,
  CancelButton,
  ConfirmButton,
} from "../../styles/CommonStyles/Modal.styles";

const Modal = ({ title, description, confirmText, onClose, onConfirm }) => {
  return (
    <ModalOverlay onClick={onClose}>
      {/* 이벤트 버블팝 */}
      <ModalBox onClick={(e) => e.stopPropagation()}>
        <IconWrapper>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M21.25 19.8131L20.8869 20.2902H3.07885L2.75006 19.8131L11.9294 3.70984H12.0756L21.25 19.8131Z"
              stroke="#C8473F"
              strokeLinecap="round"
            />
            <path
              d="M12.0177 14.0161V11.215"
              stroke="#C8473F"
              strokeLinecap="square"
            />
            <path
              d="M12.0112 16.8036H12.0202"
              stroke="#C8473F"
              strokeWidth="1.5"
              strokeLinecap="square"
            />
          </svg>
        </IconWrapper>

        {/* 텍스트 */}
        <ModalTitle>{title}</ModalTitle>
        <ModalDescription>{description}</ModalDescription>

        {/* 버튼 */}
        <ButtonGroup>
          <CancelButton onClick={onClose}>Cancel</CancelButton>
          <ConfirmButton onClick={onConfirm}>{confirmText}</ConfirmButton>
        </ButtonGroup>
      </ModalBox>
    </ModalOverlay>
  );
};

export default Modal;
