import http from "../http";
import { API_URL } from "./urls";

export const RoomApi = {
  createGroup: async function (users: any): Promise<any> {
    return await http.post(API_URL.createGroup, { isGroup: true, users });
  },
  getRoomList: async function (): Promise<any> {
    return await http.get(API_URL.getRoomList);
  },
  getRoomInfo: async function (roomId: string): Promise<any> {
    return await http.get(`${API_URL.getRoomInfo}/${roomId}`);
  },
};
