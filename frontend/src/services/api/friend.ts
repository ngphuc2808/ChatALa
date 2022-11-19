import http from '../http';

import { API_URL } from './urls';

export const FriendApi = {
  friendRequest: async function (id: any): Promise<any> {
    return await http.post(`${API_URL.friendRequest}/${id}`);
  },
};
