import FormTemplate from "../../Global/FormTemplate/FormTemplate"
import { Formik, ErrorMessage } from "formik"
import Link from "next/link";
import * as S from "./ResForm2.styled";

const OTPCode = () => {
    const initialValues = {
        otpCode: ''
    }
    return (
        <FormTemplate>
            <Link href='/register'><S.BackIcon/></Link>
            <S.Suggest>
                Make sure your phone number is real!
            </S.Suggest>
            <S.Notify>
                Please check verification OTP code sent to your phone and write below
            </S.Notify>
            <Formik
                initialValues={initialValues}
                onSubmit={(data) => {
                    console.log("submits: ", data)
                }}
            >
                {() => (
                    <S.NewForm>
                        <S.SetWidth>
                            <S.Input 
                                placeholder="Verification OTP code"
                                name="otpCode"
                            />
                            <S.TimeRemaining>
                                Thời gian còn lại: 05s
                            </S.TimeRemaining>
                            <S.Button type="submit">Sign up</S.Button>
                        </S.SetWidth>
                    </S.NewForm>
                )}
            </Formik>
        </FormTemplate>
    );
}

export default OTPCode;