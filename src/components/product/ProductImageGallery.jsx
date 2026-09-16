import { useState } from "react";
import { useTheme } from "@emotion/react";
import SafeImage from "../common/SafeImage";
import SceneryBox from "../common/SceneryBox";
import Badge from "../common/Badge";
import { toResizedImageUrl } from "../../utils/imageProxy";
import useIsMobile from "../../hook/useIsMobile";
import * as S from "../../styles/ProductDetail/ProductImageGallery.styles";

const MAIN_IMAGE_WIDTH_MOBILE = 600;
const MAIN_IMAGE_WIDTH = 900;
const THUMB_IMAGE_WIDTH = 150;

const ProductImageGallery = ({
  images,
  alt,
  soldOut = false,
  isBest = false,
  isNew = false,
}) => {
  const [current, setCurrent] = useState(0);
  const theme = useTheme();
  const isMobile = useIsMobile();

  if (!images?.length) return null;

  const safeCurrent = current < images.length ? current : 0;
  // 3장 이하는 원래 고정 크기로, 4장 이상일 때만 남는 폭을 균등하게 나눠 채움
  const fillThumbs = images.length >= 4;
  const mainImageWidth = isMobile ? MAIN_IMAGE_WIDTH_MOBILE : MAIN_IMAGE_WIDTH;

  return (
    <div>
      {/* 큰 사진 (없거나 실패하면 SCENERY) */}
      <S.MainImageFrame>
        <SafeImage
          src={toResizedImageUrl(images[safeCurrent], mainImageWidth)}
          alt={alt}
          fallback={
            <SceneryBox
              label="등록된 이미지가 없습니다"
              aspectRatio="25 / 27"
              big
            />
          }
          style={S.mainImage}
          fetchPriority="high"
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
      <S.ThumbRow $fill={fillThumbs}>
        {images.map((src, i) => {
          const selected = i === safeCurrent;
          return (
            <S.ThumbButton
              key={i}
              type="button"
              $active={selected}
              $fill={fillThumbs}
              onClick={() => setCurrent(i)}
              aria-current={selected ? "true" : undefined}
              aria-label={`${alt} ${i + 1}번 이미지 보기`}
            >
              <SafeImage
                src={toResizedImageUrl(src, THUMB_IMAGE_WIDTH)}
                alt=""
                fallback={<SceneryBox />}
                style={S.fillImage}
                loading="lazy"
              />
            </S.ThumbButton>
          );
        })}
      </S.ThumbRow>
    </div>
  );
};

export default ProductImageGallery;
