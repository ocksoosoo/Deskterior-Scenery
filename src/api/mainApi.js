import { clientApi } from "./clientApi";

export function postMain(data) {
  return clientApi("/main", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export function getMain() {
  return clientApi("/main");
}
