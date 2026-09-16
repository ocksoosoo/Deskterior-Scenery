import SceneryBox from "../common/SceneryBox";
import { toResizedImageUrl } from "../../utils/imageProxy";
import * as S from "../../styles/ProductDetail/ProductDetailContent.styles";

const DETAIL_IMAGE_WIDTH = 1000;

const ProductDetailContent = ({ sections = [] }) => {
  if (!sections.length) return null;

  return (
    <S.Section>
      <S.Inner>
        <S.Title>Item Detail</S.Title>

        {sections.map((section) => (
          <S.Article key={section.id}>
            {section.image && (
              <S.DetailImage
                src={toResizedImageUrl(section.image, DETAIL_IMAGE_WIDTH)}
                alt={section.title || ""}
                loading="lazy"
                fallback={
                  <SceneryBox
                    aspectRatio="3 / 2"
                    radius={8}
                    label="이미지를 불러올 수 없습니다"
                    big
                  />
                }
              />
            )}

            {section.title && <S.SectionTitle>{section.title}</S.SectionTitle>}

            {section.body && <S.SectionBody>{section.body}</S.SectionBody>}
          </S.Article>
        ))}
      </S.Inner>
    </S.Section>
  );
};

export default ProductDetailContent;
