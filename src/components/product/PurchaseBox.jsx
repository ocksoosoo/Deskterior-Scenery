import { HeartIcon } from "../icons/Icons";
import * as S from "../../styles/ProductDetail/PurchaseBox.styles";

const PurchaseBox = ({
  quantity = 1,
  onQuantityChange,
  onAddToCart,
  onCheckout,
  isWished = false,
  onToggleWish,
  maxQuantity = 99,
  isSubmitting = false,
  soldOut = false,
}) => {
  const safeQty = Math.min(
    maxQuantity,
    Math.max(1, Math.floor(Number(quantity) || 1)),
  );

  const decrease = () => onQuantityChange(Math.max(1, safeQty - 1));
  const increase = () => onQuantityChange(Math.min(maxQuantity, safeQty + 1));

  return (
    <S.Wrapper>
      <S.Stepper>
        <S.StepButton
          type="button"
          onClick={decrease}
          disabled={safeQty <= 1}
          aria-label="수량 감소"
        >
          −
        </S.StepButton>
        <S.Qty aria-live="polite">{safeQty}</S.Qty>
        <S.StepButton
          type="button"
          onClick={increase}
          disabled={safeQty >= maxQuantity}
          aria-label="수량 증가"
        >
          +
        </S.StepButton>
      </S.Stepper>

      <S.ButtonRow>
        <S.CartButton
          type="button"
          onClick={onAddToCart}
          disabled={isSubmitting}
        >
          Add to Cart
        </S.CartButton>
        <S.WishButton
          type="button"
          onClick={onToggleWish}
          aria-label={isWished ? "찜 해제" : "찜하기"}
          aria-pressed={isWished}
        >
          <HeartIcon filled={isWished} width={24} height={24} />
        </S.WishButton>
      </S.ButtonRow>

      <S.CheckoutButton
        type="button"
        onClick={onCheckout}
        disabled={isSubmitting || soldOut}
      >
        {soldOut ? "Sold Out" : "CheckOut"}
      </S.CheckoutButton>
    </S.Wrapper>
  );
};

export default PurchaseBox;
