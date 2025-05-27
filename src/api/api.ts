import request from "@/utils/request";

export interface DownloadParams {
  id: string | number;
}

export function getDownload(params: DownloadParams) {
  return request({
    url: "/captcha",
    method: "get",
    params,
    responseType: "blob",
  });
}