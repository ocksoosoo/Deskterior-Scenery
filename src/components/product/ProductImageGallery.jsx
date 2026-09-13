import { useState } from "react";
import { useTheme } from "@emotion/react";
import SafeImage from "../common/SafeImage";
import SceneryBox from "../common/SceneryBox";
import Badge from "../common/Badge";
import * as S from "../../styles/ProductDetail/ProductImageGallery.styles";

const ProductImageGallery = ({
  images,
  alt,
  soldOut = false,
  isBest = false,
  isNew = false,
}) => {
  const [current, setCurrent] = useState(0);
  const theme = useTheme();

  if (!images?.length) return null;

  const safeCurrent = current < images.length ? current : 0;

  return (
    <div>
      {/* 큰 사진 (없거나 실패하면 SCENERY) */}
      <S.MainImageFrame>
        <SafeImage
          src={images[safeCurrent]}
          alt={alt}
          fallback={
            <SceneryBox
              label="등록된 이미지가 없습니다"
              aspectRatio="25 / 27"
              big
            />
          }
          style={S.mainImage}
        />
        {soldOut && <S.ImageOverlay />}

        {(soldOut || isBest || isNew) && (
          <S.BadgeGroup>
            {soldOut && <Badge text="Sold out" />}
            {isBest && <Badge text="Best" size="sm" />}
            {isNew && (
              <Badge text="New" background={theme.colors.textMain} size="sm" />
            )}
          </S.BadgeGroup>
        )}
      </S.MainImageFrame>

      {/* 큰 사진 밑 작은 사진들 */}
      <S.ThumbRow>
        {images.map((src, i) => {
          const selected = i === safeCurrent;
          return (
            <S.ThumbButton
              key={i}
              type="button"
              $active={selected}
              onClick={() => setCurrent(i)}
              aria-current={selected ? "true" : undefined}
              aria-label={`${alt} ${i + 1}번 이미지 보기`}
            >
              <SafeImage
                src={src}
                alt=""
                fallback={<SceneryBox />}
                style={S.fillImage}
              />
            </S.ThumbButton>
          );
        })}
      </S.ThumbRow>
    </div>
  );
};

export default ProductImageGallery;
