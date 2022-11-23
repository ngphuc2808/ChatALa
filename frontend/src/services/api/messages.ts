import Axios from "axios";
import { messageSendType } from "../../utils/types";
import http from "../http";
import { API_URL } from "./urls";

export const CLOUD_NAME = "dzikgumce";
export const API_KEY = "883356262461341";
export const CLOUD_PRESET = "ml_default";

const instance = Axios.create();

export const MessageApi = {
  send: async function (message: messageSendType): Promise<any> {
    return await http.post(API_URL.sendMessage, message);
  },
  getSignedKey: async function (): Promise<any> {
    return await http.get(API_URL.getSignedKey);
  },
  uploadFile: async function (
    form: FormData,
    cloud_name: string
  ): Promise<any> {
    return await instance.post(
      `${API_URL.uploadFile}/${cloud_name}/auto/upload`,
      {
        form,
      },
      { headers: { "Content-Type": "multipart/form-data" } }
    );
  },
};
