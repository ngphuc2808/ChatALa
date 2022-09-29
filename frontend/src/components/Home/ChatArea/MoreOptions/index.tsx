import * as S from "./MoreOptions.styled";
import { useRef, useEffect } from "react";

interface IMoreOptions {
  setToggleOption: (toggle: boolean) => void;
}

const useOutsideClick = (callback: () => void) => {
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleClick = (event: any) => {
      if (ref.current && !ref.current.contains(event.target)) {
        callback();
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, [ref]);
  return ref;
};

const MoreOptions = ({ setToggleOption }: IMoreOptions) => {
  const handleOutsideClick = () => {
    setToggleOption(false);
  };

  const moreOptionsRef = useOutsideClick(handleOutsideClick);

  return (
    <S.MoreOptions ref={moreOptionsRef}>
      <S.Wrapper>
        <S.NormalItem>Friend's profile</S.NormalItem>
        <S.DeteleItem>Delete this chat</S.DeteleItem>
      </S.Wrapper>
    </S.MoreOptions>
  );
};

export default MoreOptions;
