import * as S from "./MoreOptions.styled";
import { useRef, useState, useEffect } from "react";

interface IMoreOptions {
  setActiveModal: (id: number) => void;
  activeModal: number;
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

const MoreOptions = ({ setActiveModal, activeModal }: IMoreOptions) => {
  const handleOutsideClick = () => {
    if (activeModal !== -1) {
      setActiveModal(-1);
    }
  };

  const moreOptionsRef = useOutsideClick(handleOutsideClick);
  // const wrapperRef = useRef<HTMLInputElement>(null);
  // const [isOverBottom, setIsOverBottom] = useState(0)

  // useEffect(() => {
  //   const rect = wrapperRef.current?.getBoundingClientRect();
  //   if (rect) {
  //     const isOverBottom =
  //       rect.bottom >=
  //       (window.innerHeight || document.documentElement.clientHeight) - 50;
  //     if(isOverBottom) setIsOverBottom(1)
  //     else setIsOverBottom(0)
  //   }
  // }, []);

  return (
    <S.MoreOptions ref={moreOptionsRef}>
      <S.Wrapper>
        <S.NormalItem>Normal option</S.NormalItem>
        <S.NormalItem>Normal option</S.NormalItem>
        <S.NormalItem>Normal option</S.NormalItem>
        <S.DeteleItem>Delete this chat</S.DeteleItem>
      </S.Wrapper>
    </S.MoreOptions>
  );
};

export default MoreOptions;
