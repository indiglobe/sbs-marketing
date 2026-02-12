import { createServerFn } from "@tanstack/react-start";
import { getCookie, setCookie } from "@tanstack/react-start/server";

export const getCookieValue = createServerFn()
  .inputValidator((data: string) => data)
  .handler(async ({ data }) => {
    const cookie = getCookie(data);

    return cookie;
  });

export type SetCookieParams = Parameters<typeof setCookie>;
type SetCookieParamsName = SetCookieParams[0];
type SetCookieParamsValue = SetCookieParams[1];
// type SetCookieParamsOptions = SetCookieParams[2];

export const setCookieValue = createServerFn()
  .inputValidator(
    (data: {
      cookieName: SetCookieParamsName;
      cookieValue: SetCookieParamsValue;
      // options: SetCookieParamsOptions;
    }) => data,
  )
  .handler(async ({ data: { cookieName, cookieValue } }) => {
    setCookie(cookieName, cookieValue);
  });
