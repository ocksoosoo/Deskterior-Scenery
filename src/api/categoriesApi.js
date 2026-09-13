import { clientApi } from "./clientApi";
import categories from "../data/categories";

// 서버 응답(id, name) → path(프론트 라우팅 전용, 서버가 안 줌)까지 채운 모양으로 변환
function toCategory(raw) {
  const local = categories.find((category) => category.id === raw.id);
  return {
    id: raw.id,
    name: raw.name,
    path: local?.path,
  };
}

export function postCategories(data) {
  return clientApi("/categories", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function getCategories() {
  const res = await clientApi("/categories"); // { success, data }
  return res.data.map(toCategory);
}
