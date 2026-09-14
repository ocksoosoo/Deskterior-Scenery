import { useState } from "react";
import { useTheme } from "@emotion/react";
import { Link } from "react-router";
import Badge from "../common/Badge";
import {
  ItemWrapper,
  ItemLeft,
  ItemCheckbox,
  ImageBox,
  ItemImage,
  ImageLoading,
  BadgeGroup,
  ImageOverlay,
  InfoBox,
  ItemName,
  ItemPrice,
  ItemRight,
  QuantityBox,
  QuantityButton,
  QuantityText,
  TotalPrice,
  TotalPriceText,
  DeleteButton,
} from "../../styles/CartStyles/CartItem.styles";

const CartItem = ({
  item,
  isChecked,
  isSoldOut,
  isBest,
  isNew,
  onToggleCheck,
  onIncrease,
  onDecrease,
  onDelete,
}) => {
  const theme = useTheme();

  const [imageLoaded, setImageLoaded] = useState(false);

  const badges = [
    isSoldOut && {
      text: "Sold out",
      size: "sm",
      background: theme.colors.error,
    },
    isBest && { text: "Best", size: "sm" },
    isNew && {
      text: "New",
      size: "sm",
      background: theme.colors.textMain,
    },
  ].filter(Boolean);

  return (
    <ItemWrapper>
      {/* 체크박스, 이미지(뺏지), 상품*/}
      <ItemLeft>
        <ItemCheckbox
          type="checkbox"
          checked={isChecked}
          onChange={() => onToggleCheck(item.cartItemId)}
          disabled={isSoldOut}
        />

        <Link to={`/products/${item.productId}`}>
          <ImageBox>
            {!imageLoaded && <ImageLoading>상품 불러오는 중...</ImageLoading>}
            <ItemImage
              src={item.imageUrl}
              alt={item.name}
              onLoad={() => setImageLoaded(true)}
              onError={() => setImageLoaded(true)}
              $isLoaded={imageLoaded}
            />
            {isSoldOut && <ImageOverlay />}
            {badges.length > 0 && (
              <BadgeGroup>
                {badges.map((badge) => (
                  <Badge key={badge.text} {...badge} />
                ))}
              </BadgeGroup>
            )}
          </ImageBox>
        </Link>

        <InfoBox>
          <Link to={`/products/${item.productId}`}>
            <ItemName>{item.name}</ItemName>
          </Link>
          <ItemPrice>₩ {item.price.toLocaleString()}</ItemPrice>
        </InfoBox>
      </ItemLeft>

      {/* 우측: 수량 + 합계 + 삭제 */}
      <ItemRight>
        <QuantityBox>
          <QuantityButton
            onClick={() => onDecrease(item.cartItemId)}
            disabled={isSoldOut || item.quantity <= 1}
          >
            -
          </QuantityButton>
          <QuantityText>{item.quantity}</QuantityText>
          <QuantityButton
            onClick={() => onIncrease(item.cartItemId)}
            disabled={isSoldOut}
          >
            +
          </QuantityButton>
        </QuantityBox>

        <TotalPrice>
          <TotalPriceText>
            ₩ {(item.price * item.quantity).toLocaleString()}
          </TotalPriceText>
        </TotalPrice>

        <DeleteButton
          onClick={() => onDelete(item.cartItemId)}
          aria-label={`${item.name} 삭제`}
        >
          <svg
            width="25"
            height="25"
            viewBox="0 0 25 25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M14.9953 9.99451L10.0037 14.9862"
              stroke="currentColor"
              strokeLinecap="square"
            />
            <path
              d="M14.9953 14.9894L9.99951 9.99248"
              stroke="currentColor"
              strokeLinecap="square"
            />

            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M12.4999 22.1354C17.8214 22.1354 22.1353 17.8215 22.1353 12.5C22.1353 7.1785 17.8214 2.86458 12.4999 2.86458C7.17842 2.86458 2.8645 7.1785 2.8645 12.5C2.8645 17.8215 7.17842 22.1354 12.4999 22.1354Z"
              stroke="currentColor"
              strokeLinecap="round"
            />
          </svg>
        </DeleteButton>
      </ItemRight>
    </ItemWrapper>
  );
};

export default CartItem;
