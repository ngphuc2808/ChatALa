import { useOutsideClick } from '../../../../Global/ProcessFunctions';
import * as S from './ChatMsgOption.styled';
import { MessageApi } from '../../../../../services/api/messages'
import { useDispatch } from 'react-redux';
import { messageActions } from '../../../../../features/redux/slices/messageSlice';
interface IChatMsgOption {
  msgId: string;
  setToggleOption: (toogle: boolean) => void;
}

const ChatMsgOption = ({ msgId, setToggleOption }: IChatMsgOption) => {

  const dispatch = useDispatch();

  const handleOutsideClick = () => {
    setToggleOption(false);
  };

  const chatMsgOptionRef = useOutsideClick(handleOutsideClick);

  const unsendMsg = async () => {
    await MessageApi.unsend(msgId);
    dispatch(messageActions.unsend(msgId));
    setToggleOption(false);
  }

  const deleteMsg = async () => {
    await MessageApi.delete(msgId);
    dispatch(messageActions.delete(msgId));
    setToggleOption(false);
  }

  return (
    <S.ChatMsgOption ref={chatMsgOptionRef}>
      <S.NormalItem onClick={() => unsendMsg()}>Unsend</S.NormalItem>
      <S.DeteleItem onClick={() => deleteMsg()}>Delete</S.DeteleItem>
    </S.ChatMsgOption>
  );
};

export default ChatMsgOption;
