import * as S from "./AddFriend.styled";

interface IAddFriend {
  setToggleAddFriend: (toggle: boolean) => void;
}

const AddFriend = ({ setToggleAddFriend }: IAddFriend) => {
  return (
    <S.AddFriendModal>
      <S.AddFriendOverlay onClick={() => setToggleAddFriend(false)} />
      <S.AddFriendBody>
        asdasd
      </S.AddFriendBody>
    </S.AddFriendModal>
  );
};

export default AddFriend;
