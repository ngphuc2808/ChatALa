import FormTemplate from "../Global/FormTemplate/FormTemplate"
import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage} from "formik"
import Link from "next/link";
import * as S from "./Login.styled";
import * as Yup from "yup";

const Login = () => {
    const [numberphone, setNumberphone] = useState('')
    const [passsword, setPassword] = useState('')
    const initialValues = {
        numberphone: '',
        password: '',
    }
    const validationSchema = Yup.object().shape({
        numberphone: Yup.string().required('This field is required.').matches(
            /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/,
            'Number phone invalid!'
        ),
        password: Yup.string().required('This field is required.')
    })
    console.log(numberphone)
    return (
        <FormTemplate>
            <S.Suggest>
                Signin to this fancy webchat!
            </S.Suggest>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={(data) => {
                    console.log("submits: ", data)
                }} 
            >
                {({errors}) => (
                    <S.NewForm className={S.Forgot}>
                        <S.SetWidth>
                            <S.Input 
                                placeholder='Number phone'
                                name="numberphone"
                                error={errors.numberphone ? true : false}
                            />
                            <ErrorMessage name='numberphone' component={S.ErrorMsg}/>

                            <S.Input 
                                placeholder="Password"
                                type="password"
                                name="password"
                                error={errors.password ? true : false}
                            />
                            <ErrorMessage name='password' component={S.ErrorMsg}/>

                            <S.Forgot>
                                <Link href="/about">
                                    Forgot Password?
                                </Link>
                            </S.Forgot>
                            <S.Button type="submit">Sign in</S.Button>
                        </S.SetWidth>
                    </S.NewForm>
                )}
            </Formik>
            <S.Register>
                <Link href="/register">
                    New here?
                    Let's Sign Up!
                </Link>
            </S.Register>
        </FormTemplate>
    );
}

export default Login;