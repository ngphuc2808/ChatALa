import Image from "next/image";
import * as S from "./ChatArea.styled";
import {
  FormEvent,
  useRef,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import ChatMsg from "./ChatMsg";
import EmojiPicker, { EmojiStyle, EmojiClickData } from "emoji-picker-react";
import MoreOptions from "./MoreOptions";
import {
  useOutsideClick,
  validImageTypes,
} from "../../Global/ProcessFunctions";
import * as Yup from "yup";
import { Form, Formik } from "formik";
import FilePreview from "./FilePreview";
import DropZone from "react-dropzone";
import {
  ClientToServerEvents,
  messageSendType,
  messageType,
  ServerToClientEvents,
} from "../../../utils/types";
import ChatImageZoom from "./ChatMsgImageZoom";
import { useDispatch, useSelector } from "react-redux";
import {
  messageActions,
  selectMessageState,
} from "../../../features/redux/slices/messageSlice";
import { selectRoomInfoState } from "../../../features/redux/slices/roomInfoSlice";
import { API_KEY, MessageApi } from "../../../services/api/messages";
import { Socket } from "socket.io-client";
import { PulseLoader } from "react-spinners";
import { debounce } from "lodash";
import { selectRoomListState } from "../../../features/redux/slices/roomListSlice";
import { selectUserState } from "../../../features/redux/slices/userSlice";
import { FiChevronsDown } from "react-icons/fi";

interface IChatArea {
  socket: Socket<ServerToClientEvents, ClientToServerEvents>;
}

const ChatArea = ({ socket }: IChatArea) => {
  const dispatch = useDispatch();

  const messages = useSelector(selectMessageState);
  const roomInfo = useSelector(selectRoomInfoState);
  const roomList = useSelector(selectRoomListState);
  const user = useSelector(selectUserState);

  const [toggleEmoji, setToggleEmoji] = useState(false);
  const [toggleOption, setToggleOption] = useState(false);
  const [toggleImageZoom, setToggleImageZoom] = useState(false);
  const [imageZoomList, setImageZoomList] = useState<
    Array<{ name: string; url: string; type: string }>
  >([]);
  const [toggleTyping, setToggleTyping] = useState(false);
  const [sendTyping, setSendTyping] = useState(false);
  const [newMsgNoti, setNewMsgNoti] = useState(false);
  const [chatAtBottom, setChatAtBottom] = useState(true);
  const [chatScrollBottom, setChatScrollBottom] = useState(false);
  const [status, setStatus] = useState(1);

  //Handle status
  const handleStatus = () => {
    const roomSelectedIndex = roomList.list.findIndex(
      (room) => room.roomInfo._id === roomInfo.info?.roomInfo._id
    );
    setStatus(roomList.activeList[roomSelectedIndex]);
  };
  useEffect(() => {
    handleStatus();
  }, [roomList.activeList]);

  //Handle Typing and Receive new messages
  useEffect(() => {
    if (socket) {
      //@ts-ignore
      socket.on("typing", () => {
        setToggleTyping((val) => !val);
      });
      // @ts-ignore
      socket.on("receiveMessage", (result) => {
        //add new message if not sender
        if (result.senderId !== user.info._id) {
          dispatch(messageActions.newMessage(result));
        }
      });
    }
  }, []);
  const debounceTyping = useCallback(
    debounce(() => {
      //@ts-ignore
      socket.emit("typing", roomInfo.info?.roomInfo._id);
      setSendTyping(false);
    }, 1500),
    []
  );
  const onInputChange = (setFieldValue: any) => {
    setFieldValue("msg", chatInput.current?.innerText);
    if (!sendTyping) {
      setSendTyping(true);
      //@ts-ignore
      socket.emit("typing", roomInfo.info?.roomInfo._id);
    }
    debounceTyping();
  };

  //chatInput
  const chatInput = useRef<HTMLSpanElement>(null);
  const bottomDiv = useRef<HTMLDivElement>(null);

  //Handle scroll to new msg
  const scrollToNewMsg = () => {
    if (bottomDiv.current)
      bottomDiv.current.scrollIntoView({ behavior: "smooth" });
  };
  const newMsgNotiClick = () => {
    scrollToNewMsg();
    setNewMsgNoti(false);
  };
  const checkChatScrollBottom = (e: any) => {

    //e.target.scrollTop is bottom when value is 0, scroll up cause value goes negative
    //Check if chat scroll at bottom
    if (e.target.scrollTop === 0) {
      setChatAtBottom(true);
    } else {
      setChatAtBottom(false);
    }

    //Check if chat scroll smaller than -500px then show scroll down button
    if(e.target.scrollTop > -500){
      setChatScrollBottom(false)
    }
    else{
      setChatScrollBottom(true)
    }
  };
  useEffect(() => {
    if (messages.list.length > 0) {
      if (
        messages.list[messages.list.length - 1].senderId !== user.info._id &&
        !chatAtBottom
      ) {
        setNewMsgNoti(true);
      } else {
        scrollToNewMsg();
      }
    }
  }, [messages]);

  //Emoji
  const handleEmojiOutsideClick = () => {
    setToggleEmoji(false);
  };
  const emojiRef = useOutsideClick(handleEmojiOutsideClick);
  const emojiClicked = (emoData: EmojiClickData, setFieldValue: any) => {
    chatInput.current!.innerText = chatInput.current!.innerText + emoData.emoji;
    setFieldValue("msg", chatInput.current?.innerText);
  };

  //Message
  const setMessagePosition = (data: messageType, index: number) => {
    const list = messages.list;

    if (
      data.senderId !== list[index + 1]?.senderId &&
      data.senderId === list[index - 1]?.senderId
    )
      return "top";
    else if (
      data.senderId === list[index - 1]?.senderId &&
      data.senderId === list[index + 1]?.senderId
    )
      return "middle";
    else if (
      data.senderId !== list[index - 1]?.senderId &&
      data.senderId !== list[index + 1]?.senderId
    )
      return "alone";
    else return "bottom";
  };

  //Form
  const initialValues = {
    roomId: roomInfo.info?.roomInfo._id || "",
    msg: "",
    files: [],
  };

  const validationSchema = Yup.object().shape({
    msg: Yup.string(),
    files: Yup.mixed(),
  });

  //File
  const fileChoosen = (
    e: FormEvent<HTMLInputElement>,
    values: messageSendType,
    setFieldValue: any
  ) => {
    if (e.currentTarget.files) {
      const newFiles = e.currentTarget.files;

      const files = values.files;
      for (let i = 0; i < newFiles.length; i++) {
        files.push(newFiles[i]);
      }

      setFieldValue("files", files);
      e.currentTarget.value = "";
    }
  };

  const fileDropped = (
    newFiles: File[],
    values: messageSendType,
    setFieldValue: any
  ) => {
    const files = values.files;
    for (let i = 0; i < newFiles.length; i++) {
      files.push(newFiles[i]);
    }

    setFieldValue("files", files);
  };

  const uploadFile = async (
    file: File,
    signedKey: { signature: string; timestamp: number }
  ) => {
    const name = validImageTypes.includes(file.type) ? "Image" : file.name;
    const type = validImageTypes.includes(file.type) ? "image" : "file";

    const form = new FormData();
    form.append("file", file);
    form.append("api_key", API_KEY);
    form.append("timestamp", signedKey.timestamp.toString());
    form.append("signature", signedKey.signature);
    const uploadedFile = await MessageApi.uploadFile(form);

    return { name, url: uploadedFile.secure_url, type };
  };

  //Upload files
  const uploadFiles = async (files: File[]) => {
    const signedKey = await MessageApi.getSignedKey();

    const uploadedFiles = [];

    // This for loop won't run if no files are selected
    for (let i = 0; i < files.length; i++) {
      const uploadedFile = await uploadFile(files[i], signedKey);
      uploadedFiles.push(uploadedFile);
    }

    return uploadedFiles;
  };

  //Submit
  const onSubmit = async (values: messageSendType, { setFieldValue }: any) => {
    if (values.msg !== "" || values.files.length > 0) {
      setToggleEmoji(false);

      // const uploadedFiles = await uploadFiles(values.files);
      // console.log(uploadedFiles);

      try {
        const res = await MessageApi.send(values);

        dispatch(messageActions.newMessage(res.result));
        chatInput.current!.innerText = "";
        setFieldValue("msg", "");
        setFieldValue("files", []);
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <S.ChatArea>
      <S.ChatAreaHead>
        <S.ChatAreaHeadInfo>
          {roomInfo.info?.roomInfo.isGroup ? (
            <S.ChatGroupAvatar />
          ) : (
            <S.ChatAreaHeadAvatar>
              <Image
                src={roomInfo.info!.roomAvatar}
                alt="avatar"
                layout="fill"
                objectFit="cover"
              />
            </S.ChatAreaHeadAvatar>
          )}
          <S.ChatAreaHeadNameWrapper>
            <S.ChatAreaHeadName>
              {roomInfo.info?.roomInfo.isGroup
                ? roomInfo.info.roomInfo.groupName
                : roomInfo.info?.roomName}
            </S.ChatAreaHeadName>
            {!roomInfo.info?.roomInfo.isGroup && (
              <S.ChatAreaHeadStatus>
                {status ? "Online" : "Offline"}
                <S.ChatAreaHeadStatusIcon status={status} />
              </S.ChatAreaHeadStatus>
            )}
          </S.ChatAreaHeadNameWrapper>
        </S.ChatAreaHeadInfo>
        <S.ChatAreaHeadOption onClick={() => setToggleOption(true)} />
      </S.ChatAreaHead>
      {toggleOption && (
        <MoreOptions
          roomInfo={roomInfo.info!}
          setToggleOption={setToggleOption}
          toggleOption={toggleOption}
        />
      )}
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
        enableReinitialize
      >
        {({ values, setFieldValue, submitForm }) => (
          <DropZone
            onDrop={(acceptedFiles) =>
              fileDropped(acceptedFiles, values, setFieldValue)
            }
            noClick
            noKeyboard
          >
            {({ getRootProps, getInputProps, isDragActive }) => (
              <S.ChatAreaMain {...getRootProps()}>
                {toggleImageZoom && (
                  <ChatImageZoom
                    imageZoomList={imageZoomList}
                    setToggleImageZoom={setToggleImageZoom}
                  />
                )}
                <S.ChatAreaMainMsg onScroll={(e) => checkChatScrollBottom(e)}>
                  <S.ChatAreaMainMsgInner>
                    <S.ChatAreaMainMsgInnerBottom
                      ref={bottomDiv}
                    ></S.ChatAreaMainMsgInnerBottom>
                    {messages.list.map((data, index) => (
                      <ChatMsg
                        data={data}
                        position={setMessagePosition(data, index)}
                        key={index}
                        setToggleImageZoom={setToggleImageZoom}
                        setImageZoomList={setImageZoomList}
                      />
                    ))}
                  </S.ChatAreaMainMsgInner>
                </S.ChatAreaMainMsg>
                {chatScrollBottom && <S.ChatAreaMainScrollBottom onClick={scrollToNewMsg} />}
                {toggleTyping && (
                  <S.ChatAreaMainTyping>
                    <PulseLoader
                      speedMultiplier={0.5}
                      size={7}
                      color="#769FCD"
                      margin={2}
                    />
                  </S.ChatAreaMainTyping>
                )}
                {newMsgNoti && (
                  <S.ChatAreaMainNewNoti onClick={() => newMsgNotiClick()}>
                    New message
                    <FiChevronsDown size={20} />
                  </S.ChatAreaMainNewNoti>
                )}
                {values.files.length > 0 && (
                  <S.ChatChatAreaFilePreview>
                    <S.ChatChatAreaFilePreviewInner>
                      {values.files.map((data, index) => (
                        <FilePreview
                          files={values.files}
                          setFieldValue={setFieldValue}
                          index={index}
                          key={index}
                        />
                      ))}
                    </S.ChatChatAreaFilePreviewInner>
                  </S.ChatChatAreaFilePreview>
                )}
                <S.ChatAreaMainForm>
                  <S.ChatAreaMainInput>
                    {toggleEmoji && (
                      <S.ChatAreaMainInputEmojiPicker ref={emojiRef}>
                        <EmojiPicker
                          skinTonesDisabled={true}
                          emojiStyle={EmojiStyle.TWITTER}
                          height={400}
                          width={400}
                          onEmojiClick={(emoData) =>
                            emojiClicked(emoData, setFieldValue)
                          }
                        />
                      </S.ChatAreaMainInputEmojiPicker>
                    )}
                    <S.ChatAreaMainInputFile htmlFor="fileInput">
                      +
                    </S.ChatAreaMainInputFile>
                    <S.ChatAreaMainInputMsg>
                      <S.ChatAreaMainInputEmoji
                        onClick={() => setToggleEmoji(true)}
                      />
                      <S.ChatAreaMainInputText
                        username={roomInfo.info!.roomName}
                        contentEditable
                        ref={chatInput}
                        onInput={() => onInputChange(setFieldValue)}
                        onKeyDown={(e) => {
                          if (e.code === "Enter" && !e.shiftKey) {
                            e.preventDefault();
                            submitForm();
                          }
                        }}
                      />
                      <S.ChatAreaMainInputButtonSend type="submit">
                        <S.ChatAreaMainInputSendIcon />
                      </S.ChatAreaMainInputButtonSend>
                    </S.ChatAreaMainInputMsg>
                  </S.ChatAreaMainInput>
                  <input
                    {...getInputProps({
                      type: "file",
                      id: "fileInput",
                      hidden: true,
                      multiple: true,
                      onChange: (e) => fileChoosen(e, values, setFieldValue),
                    })}
                  />
                  {isDragActive && (
                    <S.ChatAreaMainDropZone>
                      Drop files here
                    </S.ChatAreaMainDropZone>
                  )}
                </S.ChatAreaMainForm>
              </S.ChatAreaMain>
            )}
          </DropZone>
        )}
      </Formik>
    </S.ChatArea>
  );
};

export default ChatArea;
