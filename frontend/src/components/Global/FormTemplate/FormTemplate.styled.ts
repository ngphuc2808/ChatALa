import styled from "styled-components";
import tw from "twin.macro";

export const BgWhite = styled.div`
  width: 550px;
  height: 500px;
  display: flex;
  align-items: center;
  flex-direction: column;
  background-color: #fff;
  box-shadow: 0 0 4px rgb(0 0 0 / 25%);
  border-radius: 50px;
  z-index: 1;
`;

export const BgBlue = styled.div`
  width: 550px;
  height: 500px;
  position: absolute;
  transform: translate(10px, 10px);
  background-color: #0154b1;
  box-shadow: 0 3px 6px rgb(0 0 0 / 25%);
  z-index: 0;
  border-radius: 50px;
`;

export const Logo = styled.figure `
  margin-top: 24px;
  width: 100%;
  text-align: center;
  top: 24px;
`;

export const Content = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
`;
