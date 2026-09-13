import { HeartIcon } from "../icons/Icons";
import * as S from "../../styles/ProductDetail/MobileCtaBar.styles";

//모바일 전용 하단 고정(fixed) CTA 바 — 찜 · Add to Cart · CheckOut.

const MobileCtaBar = ({
  isWished = false,
  onToggleWish,
  onAddToCart,
  onCheckout,
  soldOut = false,
  isSubmitting = false,
}) => (
  <S.Bar>
    <S.WishButton
      type="button"
      onClick={onToggleWish}
      aria-label={isWished ? "찜 해제" : "찜하기"}
      aria-pressed={isWished}
    >
      <HeartIcon filled={isWished} width={24} height={24} />
    </S.WishButton>

    <S.CartButton type="button" onClick={onAddToCart} disabled={isSubmitting}>
      Add to Cart
    </S.CartButton>

    <S.CheckoutButton
      type="button"
      onClick={onCheckout}
      disabled={isSubmitting || soldOut}
    >
      {soldOut ? "Sold Out" : "CheckOut"}
    </S.CheckoutButton>
  </S.Bar>
);

export default MobileCtaBar;
