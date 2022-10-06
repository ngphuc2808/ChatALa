import styled, { keyframes, createGlobalStyle } from "styled-components";
import { Form, Field } from "formik";

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
    width: 400px;
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

export const Button = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 60%;
    font-size: 18px;
    background-color: #7199BA;
    border-radius: 50px;
    padding: 4px 8px;
    & svg {
        margin-right: 4px;
    }
    &:hover {
        opacity: 0.8;
    }
`;

export const Content = styled.div`
    width: 88%;
    display: flex;
    margin: 72px auto 32px;
`;

export const GroupButton = styled.div`
    display: flex;
    width: 75%;
    margin: 32px auto 0;
    > * {
        &:first-child {
          margin-right: 4px;
        }
        &:last-child {
            margin-left: 4px;
        }
    }
`;

export const NewForm = styled(Form)`
    width: 90%;
    margin: auto;
`;

export const Input = styled(Field)<{error: boolean}>`
    width: 100%;
    height: 50px;
    outline: none;
    margin-top: 8px;
    padding: 8px 16px;
    border-radius: 50px;
    ${({error}) => error === 1 ? `border: 1px solid red;` : `border-bottom: 1px solid #0154b1;`};
`;

export const SetWidth = styled.div`
    position: relative;
    width: 100%;
`;

export const GenderTitle = styled.span`
    display: block;
    margin-top: 24px;
`;

export const DOBTitle = styled.span`
    display: block;
    margin-top: 24px;
`;

export const Label = styled.label`
    display: flex;
    align-items: center;
    margin-right: 24px;
`;

export const GroupLabel = styled.div`
    display: flex;
    margin-top: 8px;
`;

export const Radio = styled(Field)<{error: boolean}>`
    width: 20px;    
    height: 20px;
    margin-right: 8px;
    outline: none;
    padding: 8px 16px;
    ${({error}) => error === 1 ? `border: 1px solid red;` : `border-bottom: 1px solid #0154b1;`};
`;

export const DatePickerWrapperStyles = createGlobalStyle`
    .date_picker input {
        width: 100%;
        height: 50px;
        outline: none;
        margin-top: 8px;
        padding: 8px 16px;
        border-bottom: 1px solid #0154b1;
    }
`;

export const DatePickerElement = styled.div`
    input {
        border-radius: 50px;
    }
`;

export const ErrorMsg = styled.div`
    color: red;
    margin-top: 8px;
`;

export const UpdateAvatar = styled.label`
    position: absolute;
    width: 26px;
    height: 26px;
    border-radius: 50px;
    background-color: #ddd;
    padding: 4px;
    left: 55%;
    top: -16%;
    border: 1px solid #000;
    cursor: pointer;
    input {
        display: none;
    }
`;

export const AvatarLabel = styled.label`
    cursor: pointer;
`;