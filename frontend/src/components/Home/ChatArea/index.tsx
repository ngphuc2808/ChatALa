import Image from 'next/image';
import * as S from './ChatArea.styled';
import { UserAvatar, UserName } from '../../../utils/dataConfig';
import { FormEvent, useRef, useState } from 'react';
import ChatMsg from './ChatMsg';
import EmojiPicker, { EmojiStyle, EmojiClickData } from 'emoji-picker-react';
import MoreOptions from './MoreOptions';
import { useOutsideClick } from '../../Global/ProcessFunctions';
import * as Yup from 'yup';
import { Form, Formik } from 'formik';
import FilePreview from './FilePreview';
import DropZone from 'react-dropzone';
import { messageType } from '../../../utils/types';
import ChatImageZoom from './ChatMsgImageZoom';
import { useSelector } from 'react-redux';
import { selectMessageState } from '../../../features/redux/slices/messageSlice';
import { selectRoomInfoState } from '../../../features/redux/slices/roomInfoSlice';

type FormValues = {
  msg: string;
  files: Array<File>;
};

const ChatArea = () => {
  const status = 1;

  const messages = useSelector(selectMessageState)
  const roomInfo = useSelector(selectRoomInfoState)

  const [toggleEmoji, setToggleEmoji] = useState(false);
  const [toggleOption, setToggleOption] = useState(false);
  const [toggleImageZoom, setToggleImageZoom] = useState(false);
  const [imageZoomList, setImageZoomList] = useState<
    Array<{ name: string; url: string; type: string }>
  >([]);

  //chatInput
  const chatInput = useRef<HTMLSpanElement>(null);

  //Emoji
  const handleEmojiOutsideClick = () => {
    setToggleEmoji(false);
  };
  const emojiRef = useOutsideClick(handleEmojiOutsideClick);
  const emojiClicked = (emoData: EmojiClickData, setFieldValue: any) => {
    chatInput.current!.innerText = chatInput.current!.innerText + emoData.emoji;
    setFieldValue('msg', chatInput.current?.innerText);
  };

  //Message
  const setMessagePosition = (data: messageType, index: number) => {
    const list = messages.list;

    if (
      data.fromSender !== list[index + 1]?.fromSender &&
      data.fromSender === list[index - 1]?.fromSender
    )
      return 'top';
    else if (
      data.fromSender === list[index - 1]?.fromSender &&
      data.fromSender === list[index + 1]?.fromSender
    )
      return 'middle';
    else if (
      data.fromSender !== list[index - 1]?.fromSender &&
      data.fromSender !== list[index + 1]?.fromSender
    )
      return 'alone';
    else return 'bottom';
  };

  //Form
  const initialValues = {
    msg: '',
    files: [],
  };

  const validationSchema = Yup.object().shape({
    msg: Yup.string(),
    files: Yup.mixed(),
  });

  const fileChoosen = (
    e: FormEvent<HTMLInputElement>,
    values: FormValues,
    setFieldValue: any
  ) => {
    if (e.currentTarget.files) {
      const newFiles = e.currentTarget.files;

      const files = values.files;
      for (let i = 0; i < newFiles.length; i++) {
        files.push(newFiles[i]);
      }

      setFieldValue('files', files);
      e.currentTarget.value = '';
    }
  };

  const fileDropped = (
    newFiles: File[],
    values: FormValues,
    setFieldValue: any
  ) => {
    const files = values.files;
    for (let i = 0; i < newFiles.length; i++) {
      files.push(newFiles[i]);
    }

    setFieldValue('files', files);
  };

  const onSubmit = (values: FormValues, { setFieldValue }: any) => {
    if (values.msg !== '' || values.files.length > 0) {
      console.log(values);
      setToggleEmoji(false);
      if (values.msg !== '') {
      }
      chatInput.current!.innerText = '';

      setFieldValue('msg', '');
      setFieldValue('files', []);
    }
  };

  return (
    <S.ChatArea>
      <S.ChatAreaHead>
        <S.ChatAreaHeadInfo>
          <S.ChatAreaHeadAvatar>
            <Image
              src={roomInfo.info!.roomAvatar}
              alt='avatar'
              layout='fill'
              objectFit='cover'
            />
          </S.ChatAreaHeadAvatar>
          <S.ChatAreaHeadNameWrapper>
          {roomInfo.info!.roomName !== '-1' && (
              <S.ChatAreaHeadName>
                {roomInfo.info!.roomName}
              </S.ChatAreaHeadName>
            )}
            <S.ChatAreaHeadStatus>
              {status ? 'Online' : 'Offline'}
              <S.ChatAreaHeadStatusIcon status={status} />
            </S.ChatAreaHeadStatus>
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
                <S.ChatAreaMainMsg>
                  <S.ChatAreaMainMsgInner>
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
                <Form>
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
                    <S.ChatAreaMainInputFile htmlFor='fileInput'>
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
                        onInput={(e) =>
                          setFieldValue('msg', e.currentTarget.innerText)
                        }
                        onKeyDown={(e) => {
                          if (e.code === 'Enter' && !e.shiftKey) {
                            e.preventDefault();
                            submitForm();
                          }
                        }}
                      />
                      <S.ChatAreaMainInputButtonSend type='submit'>
                        <S.ChatAreaMainInputSendIcon />
                      </S.ChatAreaMainInputButtonSend>
                    </S.ChatAreaMainInputMsg>
                  </S.ChatAreaMainInput>
                  <input
                    {...getInputProps({
                      type: 'file',
                      id: 'fileInput',
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
                </Form>
              </S.ChatAreaMain>
            )}
          </DropZone>
        )}
      </Formik>
    </S.ChatArea>
  );
};

export default ChatArea;
