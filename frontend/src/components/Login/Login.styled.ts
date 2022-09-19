import styled from "styled-components";
import { Form, Field } from "formik"

export const Suggest = styled.span`
    font-size: 18px;
    margin-top: 24px;
`;

export const NewForm = styled(Form)`
    width: 80%;
`;

export const Input = styled(Field)<{error: boolean}>`
    width: 100%;
    height: 50px;
    outline: none;
    margin-top: 24px;
    padding: 8px 16px;
    ${({error}) => error === 'true' ? `border: 1px solid red;` : `border-bottom: 1px solid #0154b1;`};
`;

export const Forgot = styled.div`
    width: 100%;
    color: #d92f2f;
    font-style: italic;
    font-size: 14px;
    margin-top: 24px;
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
    margin: 36px auto 0 auto;
    &:hover {
        opacity: 0.8;
    }
`;

export const Register = styled.div`
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