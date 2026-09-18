import { HeartIcon } from "../icons/Icons";
import { getWishLabel, getCheckoutText, getCheckoutTitle } from "./ctaLabels";
import * as S from "../../styles/ProductDetail/MobileCtaBar.styles";

//모바일 전용 하단 고정(fixed) CTA 바 — 찜 · Add to Cart · CheckOut.

const MobileCtaBar = ({
  isWished = false,
  onToggleWish,
  wishPending = false,
  onAddToCart,
  onCheckout,
  soldOut = false,
  isSubmitting = false,
}) => (
  <S.Bar>
    <S.WishButton
      type="button"
      onClick={onToggleWish}
      disabled={wishPending}
      aria-label={getWishLabel(isWished)}
      aria-pressed={isWished}
      title={getWishLabel(isWished)}
    >
      <HeartIcon filled={isWished} width={24} height={24} />
    </S.WishButton>

    <S.CartButton
      type="button"
      onClick={onAddToCart}
      disabled={isSubmitting}
      title="장바구니 담기"
    >
      Add to Cart
    </S.CartButton>

    <S.CheckoutButton
      type="button"
      onClick={onCheckout}
      disabled={isSubmitting || soldOut}
      title={getCheckoutTitle(soldOut)}
    >
      {getCheckoutText(soldOut)}
    </S.CheckoutButton>
  </S.Bar>
);

export default MobileCtaBar;
