export const shorterText = (text: string, limit: number = 35) => {
  if (!text) return text;

  let _string = text.trim();
  if (_string.length <= limit) return _string;
  _string = _string.substring(0, limit);
  return _string.substring(0, _string.lastIndexOf(" ")) + "...";
};
