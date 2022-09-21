import Image from "next/image";
import * as S from "./TopBar.styled";
import { UserAvatar, UserName } from "../../../utils/dataConfig";
import Logo from "../../../assets/imgs/LogoFullLong.png";

const TopBar = () => {
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
            <S.OptionSetting />
            <S.OptionLogOut />
          </S.Option>
        </S.RightWrapper>
      </S.Wrapper>
    </S.Container>
  );
};

export default TopBar;
