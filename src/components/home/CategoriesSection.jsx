import { useNavigate } from "react-router";
import {
  SectionTitle,
  CategoriesContainer,
  CategoryList,
  CategoryItem,
  CategoryName,
  CategoryImage,
  CategoriesInner,
} from "../../styles/MainStyles/CategoriesSection.styles";
import { toResizedImageUrl } from "../../utils/imageProxy";

function CategoriesSection({ items = [], categories = [] }) {
  const navigate = useNavigate();

  return (
    <CategoriesContainer>
      <CategoriesInner>

      <SectionTitle>CATEGORIES</SectionTitle>

      <CategoryList>
        {items.map((item) => {
          const category = categories.find((c) => c.id === item.categoryId);

          return (
            <CategoryItem
              key={item.id}
              type="button"
              title={`${category?.name ?? ""} 카테고리로 이동`}
              onClick={() => {
                if (category?.path) {
                  navigate(category.path);
                }
              }}
            >
              <CategoryImage
                src={toResizedImageUrl(item.imageUrl, 200)}
                alt={`${category?.name ?? ""} 카테고리`}
              />
              <CategoryName>{category?.name}</CategoryName>
            </CategoryItem>
          );
        })}
      </CategoryList>

      </CategoriesInner>
    </CategoriesContainer>
  );
}

export { CategoriesSection };
