 import styled, { keyframes } from "styled-components";

const fadeIn = keyframes`
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
`;

const growth = keyframes`
    from {
        transform: scale(0.7)
    }
    to {
        transform: scale(1)
    }
`;

export const ModalAvatar = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    animation: ${fadeIn} linear 0.15s;
    z-index: 9999;
`;

export const Modal = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    animation: ${fadeIn} linear 0.15s;
    z-index: 999;
`;

export const ModalOverlay = styled.div`
    width: 100%;
    height: 100%;
    position: absolute;
    background-color: rgba(0, 0, 0, 0.25);
    z-index: 0;
`;

export const ModalBody = styled.div`
    width: 400px;
    border-radius: 50px;
    background-color: #ECF2F7;
    box-shadow: 2px 2px 16px rgb(0 0 0 / 15%);
    z-index: 1;
    animation: ${growth} linear 0.15s;
`;

export const ModalAvatarBody = styled.div`
    min-width: 600px;
    min-height: 600px;
    max-width: 1000px;
    max-height: 1000px;
    border-radius: 50px;
    background-color: #ECF2F7;
    box-shadow: 2px 2px 16px rgb(0 0 0 / 15%);
    z-index: 1;
    animation: ${growth} linear 0.15s;
`;

export const Header = styled.div`
    position: relative;
`;

export const Title = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-radius-top: 50px;
    border-top-left-radius: 50px;
    border-top-right-radius: 50px;
    padding: 16px 32px;
    font-size: 20px;
    font-weight: bold;
    background-color: #7199BA;
    &:nth-child(1) svg {
        padding: 4px;
        font-size: 30px;
        border-radius: 50%;
        cursor: pointer;
        &:hover {
            background-color: rgba(0, 0, 0, 0.2);
        }
    }
`;

export const Figure = styled.figure`
    width: 100%;
    height: 100%;
    display: grid;
    padding: 40px;
`;

export const Banner = styled.figure`
    width: 100%;
    height: 150px;
    cursor: pointer;
    border-bottom-left-radius: 50px;
    border-bottom-right-radius: 50px;
    overflow: hidden;
`;

export const Avatar = styled.figure`
    width: 100px;
    height: 100px;
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translate(-50%, 50%);
    border-radius: 50%;
    border: 5px solid #ecf2f7;
    background-color: #000;
    cursor: pointer;
    overflow: hidden;
`;

export const Content = styled.div`
    width: 88%;
    display: flex;
    background-color: #7199BA;
    margin: 72px auto 32px;
    border-radius: 50px;
`;

export const Description = styled.div`
    color: #00317B;
    flex: 1;
    width: 30%;
    padding: 32px 0 32px 32px;
    & span {
        display: block;
        font-size: 18px;
    }
`;

export const Info = styled.div`
    padding: 32px 32px 32px 0;
    width: 60%;
    & span {
        display: block;
        font-size: 18px;
    }
`;

export const Button = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 60%;
    font-size: 18px;
    background-color: #7199BA;
    border-radius: 50px;
    padding: 4px 8px;
    margin: 12px auto 32px;
    & svg {
        margin-right: 4px;
    }
    &:hover {
        opacity: 0.8;
    }
`;