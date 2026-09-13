import { clientApi } from "./clientApi";

// 리뷰 목록 — GET /products/{productId}/reviews
export async function getReviews(productId) {
  const res = await clientApi(`/products/${productId}/reviews`);
  return res.data; // { reviews, totalCount, averageRating }
}

// 리뷰 작성 — POST /products/{productId}/reviews  (로그인 필요)
export async function createReview(productId, body) {
  const res = await clientApi(`/products/${productId}/reviews`, {
    method: "POST",
    body: JSON.stringify(body), // { rating, content }
  });
  return res.data;
}

// 리뷰 수정 — PATCH /reviews/{reviewId}  (본인만)
export async function updateReview(reviewId, body) {
  const res = await clientApi(`/reviews/${reviewId}`, {
    method: "PATCH",
    body: JSON.stringify(body),
  });
  return res.data;
}

// 리뷰 삭제 — DELETE /reviews/{reviewId}  (본인만)
export async function deleteReview(reviewId) {
  const res = await clientApi(`/reviews/${reviewId}`, { method: "DELETE" });
  return res.data;
}
