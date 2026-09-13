const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function clientApi(endpoint, option = {}) {
  const token = localStorage.getItem("token");

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    // 로그인 여부에 따라 같은 URL이어도 응답이 달라질 수 있어서, 브라우저가
    // 예전(다른 로그인 상태의) 응답을 재사용(304)하지 않게 캐시를 아예 안 쓴다.
    cache: "no-store",
    ...option,
    headers: {
      "Content-Type": "application/json",

      ...(token && {
        Authorization: `Bearer ${token}`,
      }),

      ...option.headers,
    },
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || `API Error : ${response.status}`);
  }
  return result;
}
