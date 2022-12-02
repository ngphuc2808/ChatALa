export const BASEURL =
  process.env.NEXT_PUBLIC_API_ENDPOINT || "http://localhost:5000"; // Staging

const API_BASE = `${BASEURL}/api`;

export const API_URL = {
  checkUser: `${API_BASE}/user/checkUser`,
  register: `${API_BASE}/user/register`,
  login: `${API_BASE}/user/login`,
  logout: `${API_BASE}/user/logout`,
  resetPassword: `${API_BASE}/auth/password/reset`,
  getRoomList: `${API_BASE}/room`,
  getFriendList: `${API_BASE}/friend`,
  getRoomInfo: `${API_BASE}/room`,
  getLoggedUser: `${API_BASE}/user/getLoggedUser`,
  userFind: `${API_BASE}/user/find`,
  friendRequest: `${API_BASE}/friend/request`,
  friendAccept: `${API_BASE}/friend/accept`,
  friendDecline: `${API_BASE}/friend/decline`,
  sendMessage: `${API_BASE}/message`,
  getSignedKey: `${API_BASE}/util/signedKey`,
  createGroup: `${API_BASE}/room`,
  uploadFile: `https://api.cloudinary.com/v1_1`,
};
