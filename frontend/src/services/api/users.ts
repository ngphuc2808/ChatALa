import http from '../http'
import { UserRegister, UserLogin } from "../../utils/types";

import { API_URL } from './urls'

export const UsersApi = {
    checkUser: async function (phone?: any): Promise<any> {
        return await http.get(API_URL.checkUser, { params: { phone } });
    },
    register: async function (user: UserRegister): Promise<any> {
        return await http.post(API_URL.register, user);
    },
    login: async function (user: UserLogin): Promise<any> {
        return await http.post(API_URL.login, user);
    },
//   list: async function (params?: any): Promise<any> {
//     return await http.get(API_URL.login, { params: params })
//   },
//   detail: async function (username: string): Promise<any> {
//     return await http.get(${API_URL.users}${username}/)
//   },
//   me: async function (): Promise<User> {
//     return await http.get(${API_URL.users}me/)
//   },
//   update: async function (user: any): Promise<any> {
//     return await http.patch(${API_URL.users}${user.username}/, user)
//   },
//   resetPassword: async function (
//     username: string,
//     data: UpdatePasswordUserParams
//   ): Promise<any> {
//     return await http.post(${API_URL.users}${username}/reset-password/, data)
//   },
}
