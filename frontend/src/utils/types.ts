export type userInfo = {
  _id: string;
  avatar: string;
  banner: string;
  name: string;
  phone: string;
  gender: string;
  dob: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export type messageSendType = {
  roomId: string;
  senderId: string;
  msg: string;
  files: File[];
  unSend: boolean;
};

export type messageType = {
  roomId: string;
  fromSender: boolean;
  msg: string;
  files: { name: string; url: string; type: string }[];
  unSend: boolean;
  deleted: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
  _id: string;
};

export type roomInfo = {
  roomName: string;
  roomAvatar: string;
  roomInfo: {
    createdAt: string;
    groupName: string;
    isGroup: boolean;
    lastMsg: string;
    updatedAt: string;
    users: roomUser[];
    __v: number;
    _id: string;
  };
};

export type roomUser = {
  avatar: string;
  nickName: string;
  role: boolean;
  uid: string;
  _id: string;
};

export type FormValue = {
  name: string;
  phone: string;
  password: string;
  confirmPassword: string;
  phomeNumberCode: string;
};

export type UserRegister = {
  name: string;
  phone: string;
};

export type UserLogin = {
  phone: string;
  password: string;
};
