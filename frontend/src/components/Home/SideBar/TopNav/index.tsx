import ChatPreviewItem from "../ChatPreviewItem";
import * as S from "./TopNav.styled";
import { Dispatch, SetStateAction } from "react";

interface ITopNav {
  setSelected: Dispatch<SetStateAction<number>>
}

const TopNav = ({setSelected} : ITopNav) => {
  return (
    <S.Wrapper>
      <S.Options>
        <S.AddOption />
      </S.Options>
      <ChatPreviewItem
        id={-2}
        bgColor="#B1B2FF"
        msg="Halo halo niece and nephew, today uncle Roger"
        setSelected={setSelected}
      />
    </S.Wrapper>
  );
};

export default TopNav;
