export const BASEURL =
  process.env.NEXT_PUBLIC_API_ENDPOINT || 'http://localhost:5000'; // Staging

const API_BASE = `${BASEURL}/api`;

export const API_URL = {
  checkUser: `${API_BASE}/user/checkUser`,
  register: `${API_BASE}/user/register`,
  login: `${API_BASE}/user/login`,
  logout: `${API_BASE}/user/logout`,
  authSocialSettings: `${API_BASE}/auth/social/settings/`,
  resetPassword: `${API_BASE}/auth/password/reset/`,
  facebookLogin: `${API_BASE}/auth/facebook/`,
  googleLogin: `${API_BASE}/auth/google/`,
  linkedinLogin: `${API_BASE}/auth/linkedin/`,
  getRoomList: `${API_BASE}/room`,
  getRoomInfo: `${API_BASE}/room`,
  getLoggedUser: `${API_BASE}/user/getLoggedUser`,
  userFind: `${API_BASE}/user/find`,
  friendRequest: `${API_BASE}/friend/request`,
  friendAccept: `${API_BASE}/friend/accept`,
  friendDecline: `${API_BASE}/friend/decline`,
  sendMessage: `${API_BASE}/message/`,
  getSignedKey: `${API_BASE}/util/signedKey`,
  uploadFile: `https://api.cloudinary.com/v1_1`
};
