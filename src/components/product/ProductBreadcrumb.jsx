import { useNavigate } from "react-router";
import { ArrowLeftIcon } from "../icons/Icons";
import * as S from "../../styles/ProductDetail/ProductBreadcrumb.styles";

//Home / 카테고리는 각각 홈·카테고리 페이지로 이동, 마지막(상품명)은 현재 위치라 텍스트만.

const ProductBreadcrumb = ({ category, categoryPath, productName }) => {
  const navigate = useNavigate();

  const trail = [
    { label: "Home", to: "/" },
    category && { label: category, to: categoryPath || undefined },
    productName && { label: productName },
  ].filter(Boolean);

  const handleBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate("/");
    }
  };

  return (
    <S.Nav aria-label="현재 위치">
      <S.BackButton type="button" onClick={handleBack}>
        <ArrowLeftIcon aria-hidden="true" focusable="false" />
        Prev
      </S.BackButton>

      <S.Trail>
        {trail.map((item, index) => {
          const isLast = index === trail.length - 1;
          return (
            <S.Crumb key={index} aria-current={isLast ? "page" : undefined}>
              {item.to ? (
                <S.CrumbLink to={item.to}>{item.label}</S.CrumbLink>
              ) : (
                item.label
              )}
            </S.Crumb>
          );
        })}
      </S.Trail>
    </S.Nav>
  );
};

export default ProductBreadcrumb;
