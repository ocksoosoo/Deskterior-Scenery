const categories = [
  {
    id: "lighting",
    name: "Lighting",
    path: "/lightingpage",
  },
  {
    id: "organization",
    name: "Organization",
    path: "/organizationpage",
  },
  {
    id: "digital-electronics",
    name: "Digital / Electronics",
    path: "/digitalelectronicspage",
  },
  {
    id: "desk-accessories",
    name: "Desk Accessories",
    path: "/deskaccessoriespage",
  },
  {
    id: "objects-stationery",
    name: "Stationery",
    path: "/stationerypage",
  },
];

export const getCategoryById = (categoryId) =>
  categories.find((category) => category.id === categoryId);

export default categories;
