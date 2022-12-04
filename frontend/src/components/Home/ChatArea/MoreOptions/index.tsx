import * as S from "./MoreOptions.styled";
import { useOutsideClick } from "../../../Global/ProcessFunctions";
import { roomInfo } from "../../../../utils/types";
import Image from "next/image";
import { UserAvatar } from "../../../../utils/dataConfig";
import { IoMdArrowDropdown } from "react-icons/io";
import { useState } from "react";

interface IMoreOptions {
  setToggleOption: (toggle: boolean) => void;
  toggleOption: boolean;
  roomInfo: roomInfo;
}

const MoreOptions = ({
  setToggleOption,
  roomInfo,
  toggleOption,
}: IMoreOptions) => {
  const handleOutsideClick = () => {
    setToggleOption(false);
  };

  const moreOptionsRef = useOutsideClick(handleOutsideClick);

  const [mediaExtend, setMediaExtend] = useState(false);

  return (
    <S.MoreOptions ref={moreOptionsRef} toggleOption={toggleOption}>
      <S.RoomInfo>
        <S.RoomInfoAvatar>
          <Image
            src={roomInfo.roomInfo.users[0].avatar}
            alt="avatar"
            layout="fill"
          />
        </S.RoomInfoAvatar>
        <S.RoomInfoNameWrap>
          <S.RoomInfoName>
            {roomInfo.roomInfo.isGroup
              ? roomInfo.roomInfo.groupName
              : roomInfo.roomName}
          </S.RoomInfoName>
          {roomInfo.roomInfo.isGroup && <S.RoomInfoNameEditIcon />}
        </S.RoomInfoNameWrap>
      </S.RoomInfo>
      <S.OptionWrap>
        <S.WhiteBox>
          {!roomInfo.roomInfo.isGroup && (
            <S.NormalItem>Friend&apos;s profile</S.NormalItem>
          )}
          {!roomInfo.roomInfo.isGroup && (
            <S.NormalItem>Change Nickname</S.NormalItem>
          )}
          {roomInfo.roomInfo.isGroup && (
            <S.NormalItem>Group Members</S.NormalItem>
          )}
          {!roomInfo.roomInfo.isGroup && <S.DeleteItem>Block</S.DeleteItem>}
          <S.DeleteItem>Delete this chat</S.DeleteItem>
        </S.WhiteBox>
        <S.WhiteBox>
          <S.Title>
            Photos/Videos
            <IoMdArrowDropdown
              style={{
                fontSize: "24px",
                transition: "300ms",
                cursor: "pointer",
                transform: !mediaExtend ? "rotate(-90deg)" : "none",
              }}
              onClick={() => setMediaExtend(!mediaExtend)}
            />
          </S.Title>
          <S.ExtendContent visible={mediaExtend}>
            <S.PhotoWrap>
              <S.UploadedMedia>
                <Image
                  src={roomInfo.roomInfo.users[0].avatar}
                  alt="avatar"
                  layout="fill"
                  objectFit="cover"
                />
              </S.UploadedMedia>
              <S.UploadedMedia>
                <Image
                  src={roomInfo.roomInfo.users[0].avatar}
                  alt="avatar"
                  layout="fill"
                  objectFit="cover"
                />
              </S.UploadedMedia>
              <S.UploadedMedia>
                <Image
                  src={roomInfo.roomInfo.users[0].avatar}
                  alt="avatar"
                  layout="fill"
                  objectFit="cover"
                />
              </S.UploadedMedia>
            </S.PhotoWrap>
            <S.MoreButton>View More</S.MoreButton>
          </S.ExtendContent>
        </S.WhiteBox>
      </S.OptionWrap>
    </S.MoreOptions>
  );
};

export default MoreOptions;
