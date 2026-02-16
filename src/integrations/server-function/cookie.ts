import { createServerFn } from "@tanstack/react-start";
import { getCookie, setCookie } from "@tanstack/react-start/server";

export type UserDetails = {
  id: string;
};

export const fetchCookieDetails = createServerFn()
  .inputValidator((d: string) => d)
  .handler(({ data: cookiename }) => {
    const cookieValue = getCookie(cookiename);

    if (!cookieValue) {
      return null;
    }

    return JSON.parse(cookieValue) as UserDetails;
  });

export const setCookieDetails = createServerFn()
  .inputValidator((d: { cokieName: string; cookieValue: string }) => d)
  .handler(({ data: { cokieName, cookieValue } }) => {
    setCookie(cokieName, cookieValue);
  });
