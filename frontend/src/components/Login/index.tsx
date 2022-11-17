import FormTemplate from '../Global/FormTemplate';
import { Formik, ErrorMessage } from 'formik';
import Link from 'next/link';
import * as S from './Login.styled';
import * as Yup from 'yup';
import { UserLogin, FormValueLogin } from '../../utils/types';
import { useRouter } from 'next/router';
import { UsersApi } from '../../services/api/users';
import { ClipLoader } from 'react-spinners';

const Login = () => {
  const router = useRouter();
  const initialValues = {
    phoneNumber: '',
    password: '',
  };
  const validationSchema = Yup.object().shape({
    phoneNumber: Yup.string()
      .required('This field is required.')
      .matches(
        /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/,
        'Phone number invalid.'
      ),

    password: Yup.string()
      .required('This field is required.')
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
        'Password minimum 8 characters, at least 1 uppercase letter, 1 lowercase letter and 1 number.'
      ),
  });
  const handleSubmit = async (
    values: FormValueLogin,
    { setSubmitting }: any
  ) => {
    try {
      const userLogin: UserLogin = {
        phone: values.phoneNumber,
        password: values.password,
      };
      await UsersApi.login(userLogin);

      router.push('/');
    } catch (error: any) {
      if (error.statusCode === 404) {
        setSubmitting(false);
        alert('Wrong password or phone number!');
      } else {
        alert('Call API failed!');
        console.log(error);
      }
    }
  };
  return (
    <FormTemplate>
      <S.Suggest>Signin to this fancy webchat!</S.Suggest>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched, isSubmitting }) => (
          <S.NewForm>
            <S.SetWidth>
              <S.Input
                placeholder='Phone number'
                name='phoneNumber'
                error={errors.phoneNumber && touched.phoneNumber ? 1 : 0}
              />
              <ErrorMessage name='phoneNumber' component={S.ErrorMsg} />

              <S.Input
                placeholder='Password'
                type='password'
                name='password'
                error={errors.password && touched.password ? 1 : 0}
              />
              <ErrorMessage name='password' component={S.ErrorMsg} />

              <S.Forgot>
                <Link href='/forgot-password'>Forgot Password?</Link>
              </S.Forgot>
              <S.Button type='submit'>
                {isSubmitting ? (
                  <ClipLoader color='#fff' size={25} />
                ) : (
                  'Sign in'
                )}
              </S.Button>
            </S.SetWidth>
          </S.NewForm>
        )}
      </Formik>
      <S.Register>
        <Link href='/register'>New here? Let's Sign Up!</Link>
      </S.Register>
    </FormTemplate>
  );
};

export default Login;
