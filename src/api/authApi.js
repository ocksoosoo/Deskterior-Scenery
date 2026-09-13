import { clientApi } from "./clientApi";

export async function signUp(data) {
  return clientApi("/auth/signup", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export function checkId(id) {
  return clientApi("/auth/check-id", {
    method: "POST",
    body: JSON.stringify({
      id,
    }),
  });
}

export async function login(data) {
  return clientApi("/auth/login", {
    method: "POST",
    body: JSON.stringify({
      id: data.id,
      password: data.password,
    }),
  });
}

export function logout() {
  return clientApi("/auth/logout", {
    method: "POST",
  });
}

export function getMe() {
  return clientApi("/auth/me");
}
