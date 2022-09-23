import Image from "next/image";
import * as S from "./TopBar.styled";
import { UserAvatar, UserName } from "../../../utils/dataConfig";
import Logo from "../../../assets/imgs/LogoFullLong.png";
import * as React from 'react';
import { useState, useEffect } from 'react';
import NotiModal from "./NotiModal";

const TopBar = () => {

  const [activeNotiModal, setActiveNotiModal] = useState(false)

  return (
    <S.Container>
      <S.Wrapper>
        <S.LeftWrapper>
          <S.Avatar>
            <Image src={UserAvatar} alt="avatar" />
          </S.Avatar>
          <S.UserName>{UserName}</S.UserName>
        </S.LeftWrapper>
        <S.RightWrapper>
          <S.LogoContainer>
            <S.Logo>
              <Image src={Logo} alt="logo" />
            </S.Logo>
          </S.LogoContainer>
          <S.Search>
            <S.SearchIcon />
            <S.SearchInput placeholder="Search..." />
          </S.Search>
          <S.Option>
            <S.OptionNotify onClick={() => setActiveNotiModal(true)} />
            {activeNotiModal && <NotiModal setActiveNotiModal={setActiveNotiModal} />}
            <S.OptionSetting />
            <S.OptionLogOut />
          </S.Option>
        </S.RightWrapper>
      </S.Wrapper>
    </S.Container>
  );
};

export default TopBar;
