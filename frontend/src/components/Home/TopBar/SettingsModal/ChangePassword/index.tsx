import { ErrorMessage, Formik } from 'formik';
import { useEffect, useState } from 'react';
import * as Yup from 'yup';
import * as S from './ChangePassword.styled';

const validationSchema = Yup.object().shape({
  password: Yup.string()
    .required('This field is required.')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
      'Password minimum 8 characters, at least 1 uppercase letter, 1 lowercase letter and 1 number.'
    ),
  passwordConfirm: Yup.string()
    .required('This field is required.')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
      'Password minimum 8 characters, at least 1 uppercase letter, 1 lowercase letter and 1 number.'
    ),
});

const ChangePassword = () => {
  const initialValues = {
    phoneNumber: '',
    password: '',
  };

  const [focus, setFocus] = useState('');
  const [input, setInput] = useState({
    phoneNumber: '',
    password: '',
  });

  const focusChange = (e: any) => {
    setFocus(e.target.name);
  };

  const inputChange = (e: any) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    console.log(input);
  });

  return (
    <S.ChangePassword>
      <S.Title>Change Password</S.Title>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(data) => {
          console.log('submits: ', data);
        }}
      >
        <S.Form>
          <S.InputWrap>
            <S.Input
              name='phoneNumber'
              onFocus={(e) => focusChange(e)}
              onInput={(e) => inputChange(e)}
            />
            <ErrorMessage name='phoneNumber' component={S.ErrorMsg} />
            <S.Label
              htmlFor='phoneNumber'
              active={focus === 'phoneNumber' || input.phoneNumber !== ''}
            >
              Phone number
            </S.Label>
          </S.InputWrap>
          <S.InputWrap>
            <S.Input
              type='password'
              name='password'
              onFocus={(e) => focusChange(e)}
              onInput={(e) => inputChange(e)}
            />
            <ErrorMessage name='password' component={S.ErrorMsg} />
            <S.Label
              htmlFor='password'
              active={focus === 'password' || input.password !== ''}
            >
              Password
            </S.Label>
          </S.InputWrap>
        </S.Form>
      </Formik>
    </S.ChangePassword>
  );
};

export default ChangePassword;
