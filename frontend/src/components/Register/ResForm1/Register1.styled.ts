import styled from "styled-components";
import { Form, Field } from "formik"

export const Suggest = styled.span`
    font-size: 18px;
    margin-top: 24px;
`;

export const NewForm = styled(Form)`
    width: 80%;
`;

export const InputGroup = styled.div <{ error: boolean }>`
    width: 100%;
    height: 50px;
    margin-top: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    ${({ error }) => error ? `margin-bottom: 24px;` : `margin-bottom: 0;`};
`;

export const ShortInputDiv = styled.div`
    width: 85%;
    height: 100%;
`;

export const ShortInput = styled(Field) <{ error: boolean }>`
    width: 100%;
    height: 100%;
    outline: none;
    padding: 8px 16px;
    border-bottom: 1px solid #0154b1;
    ${({ error }) => error === 1 ? `border: 1px solid red;` : `border-bottom: 1px solid #0154b1;`};
`;

export const Input = styled(Field) <{ error: boolean }>`
    width: 100%;
    height: 50px;
    outline: none;
    margin-top: 24px;
    padding: 8px 16px;
    ${({ error }) => error === 1 ? `border: 1px solid red;` : `border-bottom: 1px solid #0154b1;`};
`;

export const Select = styled(Field)`
    width: 10%;
    height: 100%;
    font-style: italic;
    outline: none;
    padding: 8px 0px;
    margin-right: 12px;
    border-bottom: 1px solid #0154b1;
    flex: 1;
    cursor: pointer;
`;

export const Button = styled.button`
    width: 32%;
    height: 44px;
    background-color: #0154b1;
    color: #fff;
    display: block;
    border-radius: 6px;
    padding: 8px 16px;
    font-weight: bold;
    margin: 76px auto 0 auto;
    &:hover {
        opacity: 0.8;
    }
`;

export const Login = styled.div`
    font-size: 14px;
    color: green;
    margin: 12px 0 30px;
    font-style: italic;
`;

export const ErrorMsg = styled.div`
    color: red;
    margin-top: 8px;
`;

export const SetWidth = styled.div`
    width: 100%;
`;