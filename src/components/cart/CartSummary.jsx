import { useState } from "react";
import {
  SummaryContainer,
  SummaryInfoBox,
  SubtotalRow,
  DeliveryRow,
  TotalRow,
  LabelText,
  IconWrapper,
  TooltipBox,
  PriceText,
  TotalLabel,
  TotalPriceText,
  CheckoutButton,
} from "../../styles/CartStyles/CartSummary.styles";

const CartSummary = ({ subtotal, deliveryFee, total, isAllSoldOut }) => {
  const [isTooltipOpen, setIsTooltipOpen] = useState(false);

  return (
    <SummaryContainer>
      <SummaryInfoBox>
        {/* 소계 */}
        <SubtotalRow>
          <LabelText>Subtotal</LabelText>
          <PriceText>₩ {subtotal.toLocaleString()}</PriceText>
        </SubtotalRow>

        {/* 배송비 */}
        <DeliveryRow>
          <LabelText>
            Delivery Fee
            <IconWrapper
              onMouseEnter={() => setIsTooltipOpen(true)}
              onMouseLeave={() => setIsTooltipOpen(false)}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M9 2.625C5.47891 2.625 2.625 5.47891 2.625 9C2.625 12.5204 5.47895 15.375 9 15.375C12.5203 15.375 15.375 12.5203 15.375 9C15.375 5.47895 12.5204 2.625 9 2.625ZM1.5 9C1.5 4.85759 4.85759 1.5 9 1.5C13.1416 1.5 16.5 4.85755 16.5 9C16.5 13.1417 13.1417 16.5 9 16.5C4.85755 16.5 1.5 13.1416 1.5 9Z"
                  fill="#74766F"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M9.55884 5.59058V10.0298H8.43384V5.59058H9.55884Z"
                  fill="#74766F"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M8.43378 11.2844H9.56628V12.4094H8.43378V11.2844Z"
                  fill="#74766F"
                />
              </svg>

              {isTooltipOpen && (
                <TooltipBox>
                  80,000원 이상 구매 시 무료로 배송되며,
                  <br />
                  미만 주문 건은 기본 배송비 3,000원이 부과됩니다.
                </TooltipBox>
              )}
            </IconWrapper>
          </LabelText>
          <PriceText>₩ {deliveryFee.toLocaleString()}</PriceText>
        </DeliveryRow>

        {/* 총계 */}
        <TotalRow>
          <TotalLabel>Total</TotalLabel>
          <TotalPriceText>₩ {total.toLocaleString()}</TotalPriceText>
        </TotalRow>
      </SummaryInfoBox>

      {/* 결제 버튼 */}
      <CheckoutButton disabled={isAllSoldOut}>
        {isAllSoldOut ? "Sold Out" : "Checkout"}
      </CheckoutButton>
    </SummaryContainer>
  );
};

export default CartSummary;
