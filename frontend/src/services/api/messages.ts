import { messageSendType } from '../../utils/types';
import http from '../http';
import { API_URL } from './urls';

export const CLOUD_NAME = 'dzikgumce';
export const API_KEY = '883356262461341';

export const MessageApi = {
  send: async function (message: messageSendType): Promise<any> {
    return await http.post(API_URL.sendMessage, message);
  },
  getSignedKey: async function (): Promise<any> {
    return await http.get(API_URL.getSignedKey);
  },
  uploadFile: async function (formData: FormData): Promise<any> {
    return await http.post(
      `${API_URL.uploadFile}/${CLOUD_NAME}/auto/upload`,
      formData,
      {
        headers: { 'content-type': 'multipart/form-data' },
      }
    );
  },
};
