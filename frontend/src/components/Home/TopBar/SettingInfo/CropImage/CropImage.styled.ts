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
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    width: 500px;
    border-radius: 50px;
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
    box-shadow: 2px 2px 16px rgb(0 0 0 / 15%);
    animation: ${fadeIn} linear 0.15s;
    z-index: 999;
`;

export const Content = styled.div`
    width: 100%;
    height: 400px;
    position: relative;
    background-color: #000;
    z-index: 10;
`;

export const Title = styled.span`
    padding: 18px 24px;
    font-size: 20px;
`;

export const Action = styled.div`
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    padding: 8px;
    -webkit-box-pack: end;
    justify-content: flex-end;
    flex: 0 0 auto;
    flex-direction: column;
    margin: 16px 24px;
`;

export const ZoomAndRotate = styled.div`
    width: 100%;
    & p {
        font-weight: bold;
    }
`;

export const Button = styled.button`
    width: 125px;
    border-radius: 50px;
    background-color: #7098b9;
    padding: 6px 0;
    color: #fff;
    margin-top: 24px;
    letter-spacing: 1px;
    font-weight: bold;
    display: flex;
    justify-content: center;
    align-items: center;
    &:hover {
        opacity: 0.8;
    }
    & p {
        margin-left: 6px;
    }
    & svg {
        font-size: 22px;
    }
`;

export const Slider = styled.input`
    -webkit-appearance: none;
    width: 100%;
    height: 10px;
    margin: 18px 0;
    border-radius: 10px;
    background: #d3d3d3;
    outline: none;
    opacity: 0.7;
    -webkit-transition: .2s;
    transition: opacity .2s;
    cursor: pointer;
    &::-webkit-slider-thumb {
        -webkit-appearance: none;
        appearance: none;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background: #7098b9;
        cursor: pointer;
    }
    &::-moz-range-thumb {
        width: 25px;
        height: 25px;
        background: #04AA6D;
        cursor: pointer;
    }
`;

export const ButtonCropZone = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    > * {
        &:first-child {
          margin-right: 4px;
        }
        &:last-child {
            margin-left: 4px;
        }
      }
`;