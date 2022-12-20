import { ErrorMessage, Formik } from "formik";
import { useState } from "react";
import * as Yup from "yup";
import * as S from "./ChangePassword.styled";

const validationSchema = Yup.object().shape({
  newPassword: Yup.string()
    .required("This field is required.")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
      "Password minimum 8 characters, at least 1 uppercase letter, 1 lowercase letter and 1 number."
    ),
  confirmPassword: Yup.string()
    .required("This field is required.")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
      "Password minimum 8 characters, at least 1 uppercase letter, 1 lowercase letter and 1 number."
    ),
});

const ChangePassword = () => {
  const initialValues = {
    newPassword: "",
    confirmPassword: "",
  };

  const [focus, setFocus] = useState("");
  const [input, setInput] = useState({
    newPassword: "",
    confirmPassword: "",
  });

  return (
    <S.ChangePassword>
      <S.Title>Change Password</S.Title>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(data) => {
          console.log("submits: ", data);
        }}
        enableReinitialize
      >
        <S.Form>
          <S.InputWrap>
            <S.Input
              name="newPassword"
              onFocus={(e) => setFocus(e.target.name)}
              onInput={(e) =>
                setInput({
                  ...input,
                  [e.currentTarget.name]: e.currentTarget.value,
                })
              }
              onBlur={(e) => setFocus("")}
            />
            <ErrorMessage name="newPassword" component={S.ErrorMsg} />
            <S.Label
              htmlFor="newPassword"
              active={focus === "newPassword" || input.newPassword !== ""}
            >
              New Password
            </S.Label>
          </S.InputWrap>
          <S.InputWrap>
            <S.Input
              type="password"
              name="confirmPassword"
              onFocus={(e) => setFocus(e.target.name)}
              onInput={(e) =>
                setInput({
                  ...input,
                  [e.currentTarget.name]: e.currentTarget.value,
                })
              }
              onBlur={() => setFocus("")}
            />
            <ErrorMessage name="confirmPassword" component={S.ErrorMsg} />
            <S.Label
              htmlFor="confirmPassword"
              active={focus === "confirmPassword" || input.confirmPassword !== ""}
            >
              Confirm Password
            </S.Label>
          </S.InputWrap>
          <S.ButtonWrap>
            <S.Button>Update</S.Button>
          </S.ButtonWrap>
        </S.Form>
      </Formik>
    </S.ChangePassword>
  );
};

export default ChangePassword;
