import ChatPreviewItem from "../ChatPreviewItem";
import * as S from "./TopNav.styled";

const TopNav = () => {
  return (
    <S.Wrapper>
      <S.Options>
        <S.AddOption />
      </S.Options>
      <ChatPreviewItem
        id={-99}
        bgColor="#B1B2FF"
        msg="Halo halo niece and nephew, today uncle Roger"
      />
    </S.Wrapper>
  );
};

export default TopNav;
