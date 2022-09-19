import styled from "styled-components";
import tw from "twin.macro";

export const Wrapper = styled.div`
  width: 550px;
  display: flex;
  position: relative;
  align-items: center;
  flex-direction: column;
  background-color: #0154b1;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.25);
  border-radius: 50px;
  z-index: 1;
  &::before {
    content: '';
    width: 100%;
    height: 100%;
    background-color: #fff;
    transform: translate(-10px, -10px);
    border-radius: 50px;
    position: absolute;
    z-index: -1;
  }
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
