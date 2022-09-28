import ChatPreviewItem from "../ChatPreviewItem";
import * as S from "./TopNav.styled";
import { Dispatch, SetStateAction, useState } from "react";
import AddFriend from "./AddFriend";

interface ITopNav {
  setSelected: Dispatch<SetStateAction<number>>
}

const TopNav = ({setSelected} : ITopNav) => {

  const [toggleAddFriend, setToggleAddFriend] = useState(false)

  return (
    <S.Wrapper>
      <S.Options>
        <S.AddOption onClick={() =>setToggleAddFriend(true)} />
      </S.Options>
      <ChatPreviewItem
        id={-2}
        bgColor="#B1B2FF"
        msg="Halo halo niece and nephew, today uncle Roger"
        setSelected={setSelected}
      />
      {toggleAddFriend && <AddFriend setToggleAddFriend={setToggleAddFriend} />}
    </S.Wrapper>
  );
};

export default TopNav;
