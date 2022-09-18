import Image from "next/image";
import * as S from "./TopBar.styled";
import { HomeTopBar } from "../../../utils/dataConfig";
import Logo from "../../../assets/imgs/LogoFullLong.png";

const TopBar = () => {
  const { UserAvatar, UserName } = HomeTopBar;

  return (
    <S.Container>
      <S.Avatar>
        <Image src={UserAvatar} alt="avatar" />
      </S.Avatar>
      <S.Wrapper>
        <S.UserName>{UserName}</S.UserName>
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
          <S.OptionSetting />
          <S.OptionLogOut />
        </S.Option>
      </S.Wrapper>
    </S.Container>
  );
};

export default TopBar;
