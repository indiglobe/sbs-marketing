import { createServerFn } from "@tanstack/react-start";
import { setCookie } from "@tanstack/react-start/server";

export const signout = createServerFn().handler(() => {
  setCookie("user", "");
});
