import { ReviewStarIcon } from "./ReviewStars";
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

/**
 * 리뷰 삭제 확인 모달.
 * 공용 Modal 과 레이아웃·스타일은 동일하지만 상단 아이콘만 별(#EB6923)로 교체하려고
 * 공용 Modal.jsx 를 건드리지 않고 스타일만 재사용해 따로 구성한다.
 */
const ReviewDeleteModal = ({ onClose, onConfirm }) => {
  return (
    <ModalOverlay onClick={onClose}>
      <ModalBox onClick={(e) => e.stopPropagation()}>
        <IconWrapper>
          <ReviewStarIcon size={18.5} filled />
        </IconWrapper>

        <ModalTitle>Delete?</ModalTitle>
        <ModalDescription>이 리뷰를 삭제하시겠습니까?</ModalDescription>

        <ButtonGroup>
          <CancelButton onClick={onClose}>Cancel</CancelButton>
          <ConfirmButton onClick={onConfirm}>Delete</ConfirmButton>
        </ButtonGroup>
      </ModalBox>
    </ModalOverlay>
  );
};

export default ReviewDeleteModal;
