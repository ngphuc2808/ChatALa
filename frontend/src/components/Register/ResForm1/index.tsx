import FormTemplate from "../../Global/FormTemplate/FormTemplate"
import { Formik, ErrorMessage } from "formik"
import Link from "next/link";
import * as S from "./Register1.styled";
import * as Yup from "yup";

const Register = () => {
    const initialValues = {
        name: '',
        phoneNumber: '',
        password: '',
        confirmPassword: ''
    }
    const validationSchema = Yup.object().shape({
        name: Yup.string()
                .required('This field is required.')
                .min(3, 'Name must be at least 3 characters.')
                .matches( 
                    /^[a-z ,.'-]+$/i, 
                    'Please enter the correct name format.'
                ),

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

        confirmPassword: Yup.string()
                .required('This field is required.')
                .oneOf([Yup.ref('password'), null], 'Passwords must match.'),
    })
    return (
        <FormTemplate>
            <S.Suggest>
                Create your account!
            </S.Suggest>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={(data) => {
                    console.log("submits: ", data)
                }}
            >
                {({ errors, touched }) => (
                    <S.NewForm>
                        <S.SetWidth>
                            <S.InputGroup
                                error={errors.phoneNumber && touched.phoneNumber ? true : false}
                            >
                                <S.Select as="select" name="color">
                                    <option value="vietnam">+ 84</option>
                                </S.Select>
                                <S.ShortInputDiv>
                                    <S.ShortInput
                                        placeholder='Phone number'
                                        name="phoneNumber"
                                        error={errors.phoneNumber && touched.phoneNumber ? 1 : 0}
                                    />
                                    <ErrorMessage name='phoneNumber' component={S.ErrorMsg} />
                                </S.ShortInputDiv>
                            </S.InputGroup>
                            <S.Input 
                                placeholder="Your name"
                                name="name"
                                error={errors.name && touched.name ? 1 : 0}
                            />
                            <ErrorMessage name='name' component={S.ErrorMsg} />
                            <S.Input 
                                placeholder="Password"
                                type="password"
                                name="password"
                                error={errors.password && touched.password ? 1 : 0}
                            />
                            <ErrorMessage name='password' component={S.ErrorMsg} />
                            <S.Input 
                                placeholder="Confirm password"
                                type="password"
                                name="confirmPassword"
                                error={errors.confirmPassword && touched.confirmPassword ? 1 : 0}
                            />    
                            <ErrorMessage name='confirmPassword' component={S.ErrorMsg} />
                            <S.Button type="submit">Continue</S.Button>
                        </S.SetWidth>
                    </S.NewForm>
                )}
            </Formik>
            <S.Login>
                <Link href="/login">
                    Already have one? Let's Sign In!
                </Link>
            </S.Login>
        </FormTemplate>
    );
}

export default Register;