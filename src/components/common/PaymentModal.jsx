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

const PaymentModal = ({ onClose, onConfirm }) => {
  return (
    <ModalOverlay onClick={onClose}>
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
              fillRule="evenodd"
              clipRule="evenodd"
              d="M22.5547 5.73056L21.9076 6.10965C18.9254 7.85656 16.6201 10.1584 15.056 12.0344C14.2756 12.9705 13.684 13.7954 13.289 14.3839C13.0915 14.678 12.9435 14.9126 12.8458 15.072C12.7969 15.1517 12.7607 15.2125 12.7371 15.2525L12.7114 15.2967L12.7057 15.3066L12.7048 15.3081L12.4895 15.6891H11.6174L11.3953 15.3533L11.3928 15.3496L11.3818 15.3333C11.3716 15.3182 11.3556 15.2948 11.334 15.2639C11.291 15.2021 11.226 15.1106 11.1411 14.9958C10.9711 14.766 10.7224 14.4448 10.4111 14.0839C9.78228 13.3549 8.92555 12.4965 7.96988 11.8923L7.33594 11.4916L8.13749 10.2237L8.77143 10.6245C9.90478 11.341 10.873 12.3229 11.5469 13.1041C11.7094 13.2925 11.8564 13.4711 11.986 13.6339C12.0048 13.6058 12.0239 13.5771 12.0436 13.5479C12.4628 12.9233 13.0853 12.0558 13.9039 11.0738C15.5381 9.11374 17.971 6.67725 21.1494 4.81537L21.7965 4.43628L22.5547 5.73056Z"
              fill="#189C21"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M1.72119 12C1.72119 6.47715 6.19834 2 11.7212 2C17.244 2 21.7212 6.47715 21.7212 12C21.7212 17.5228 17.244 22 11.7212 22C6.19834 22 1.72119 17.5228 1.72119 12ZM11.7212 3.5C7.02677 3.5 3.22119 7.30558 3.22119 12C3.22119 16.6944 7.02677 20.5 11.7212 20.5C16.4156 20.5 20.2212 16.6944 20.2212 12C20.2212 7.30558 16.4156 3.5 11.7212 3.5Z"
              fill="#189C21"
            />
          </svg>
        </IconWrapper>

        <ModalTitle>Confirm Payment?</ModalTitle>
        <ModalDescription>결제를 진행하시겠습니까?</ModalDescription>

        <ButtonGroup>
          <CancelButton onClick={onClose}>Cancel</CancelButton>
          <ConfirmButton onClick={onConfirm}>Confirm</ConfirmButton>
        </ButtonGroup>
      </ModalBox>
    </ModalOverlay>
  );
};

export default PaymentModal;
