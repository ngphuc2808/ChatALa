import { useRef, useEffect } from "react";

export const shorterText = (text: string, limit: number = 35) => {
  if (!text) return text;

  let _string = text.trim();
  if (_string.length <= limit) return _string;
  _string = _string.substring(0, limit);
  return _string.substring(0, _string.lastIndexOf(" ")) + "...";
};

export const useOutsideClick = (callback: () => void) => {
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
