import { Link } from "react-router";
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

  return (
    <CategoriesContainer>
      <CategoriesInner>

      <SectionTitle>CATEGORIES</SectionTitle>

      <CategoryList>
        {items.map((item) => {
          const category = categories.find((c) => c.id === item.categoryId);
          if(!category?.path) return null;

          return (
            <CategoryItem
              as={Link}
              to={category.path}
              key={item.id}
              title={`${category?.name ?? ""} 카테고리로 이동`}
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
