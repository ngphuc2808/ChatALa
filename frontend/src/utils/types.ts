export type messageSendType = {
  roomId: string;
  senderId: string;
  msg: string;
  files: File[];
  unSend: boolean;
};

export type messageType = {
  roomId: string;
  senderId: string;
  msg: string;
  files: { url: string; type: string }[];
  unSend: boolean;
};

export type roomType = {
  roomName: string;
  isGroup: boolean;
  users: { avatar: string; role: boolean; name: string }[];
};

export type registerType = {
  name: string;
  phoneNumber: string;
  password: string;
};
