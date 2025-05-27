import type { UserInfoType } from "@/global";
import request from "@/utils/request";

export function login(data: { username: string; password: string }) {
  return request({
    url: "/user/login",
    method: "post",
    data,
  });
}

export function getUserInfo(): Promise<{ data: UserInfoType }> {
  // Return a promise that resolves to the user information
  return request({
    url: "/user/info",
    method: "get",
  });
}

export function logout() {
  return request({
    url: "/user/logout",
    method: "post",
  });
}
