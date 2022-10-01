import Image from "next/image";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { ChangeEvent, useState } from "react";
import { HiOutlineX } from "react-icons/hi";
import { AiFillCamera } from "react-icons/ai";

import * as Yup from "yup";
import { Formik, ErrorMessage } from "formik";

import * as S from "./SettingInfo.styled";
import { UserAvatar } from "../../../../utils/dataConfig";

interface ISetingInfo {
  name: string;
  gender: string;
  dob: string;
  avatar: string;
  setEditInfo: (settingInfo: boolean) => void;
}

const SettingInfo = ({
  name,
  gender,
  dob,
  avatar,
  setEditInfo,
}: ISetingInfo) => {
  const [previewAvt, setPreviewAvt] = useState<any>(UserAvatar);

  const initialValues = {
    name: name || "",
    gender: gender || "male",
    dob: dob || new Date(),
    avatar: avatar || "",
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .min(3, "Name must be at least 3 characters.")
      .required("This field is required."),
  });

  const toggleEvent = () => {
    setEditInfo(false);
  };

  const handleAvatar = (
    e: ChangeEvent,
    setFieldValue: (field: string, value: any) => void
  ) => {
    const input = e.target as HTMLInputElement;
    if (input.files?.length) {
      setFieldValue("avatar", input.files[0]);
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        setPreviewAvt(reader.result);
      });
      reader.readAsDataURL(input.files[0]);
    }
  };

  const onSubmit = (values: {
    name: string;
    gender: string;
    dob: string | Date;
    avatar: string;
  }) => {
    const newData = values;
    newData.name = values.name.trim().replace(/ +/g, " ");
    console.log("submits: ", newData);
  };

  return (
    <S.Modal>
      <S.ModalOverlay onClick={() => toggleEvent()} />
      <S.ModalBody>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({ setFieldValue, values, errors, touched }) => (
            <>
              <S.Header>
                <S.Title>
                  Update information
                  <HiOutlineX onClick={() => toggleEvent()} />
                </S.Title>
                <S.Banner>
                  <Image src={UserAvatar} />
                </S.Banner>
                <S.Avatar>
                  <Image layout="fill" src={previewAvt} />
                </S.Avatar>
              </S.Header>
              <S.Content>
                <S.NewForm>
                  <S.SetWidth>
                    <S.UpdateAvatar htmlFor="avatar">
                      <AiFillCamera />
                      <input
                        type="file"
                        id="avatar"
                        name="avatar"
                        onChange={(e) => handleAvatar(e, setFieldValue)}
                      />
                    </S.UpdateAvatar>
                    <S.Label htmlFor="name">Full name</S.Label>
                    <S.Input
                      id="name"
                      name="name"
                      error={errors.name && touched.name ? 1 : 0}
                    />
                    <ErrorMessage name="name" component={S.ErrorMsg} />
                    <S.GenderTitle>Gender</S.GenderTitle>
                    <S.GroupLabel>
                      <S.Label>
                        <S.Radio type="radio" value="male" name="gender" />
                        Male
                      </S.Label>
                      <S.Label>
                        <S.Radio type="radio" value="female" name="gender" />
                        Female
                      </S.Label>
                    </S.GroupLabel>
                    <S.DOBTitle>Date of Birth</S.DOBTitle>
                    <S.DatePickerElement>
                      <DatePicker
                        name="dob"
                        dateFormat="d MMMM, yyyy"
                        wrapperClassName="date_picker"
                        selected={new Date(values.dob)}
                        onChange={(value) => {
                          setFieldValue("dob", value);
                        }}
                      />
                      <S.DatePickerWrapperStyles />
                    </S.DatePickerElement>
                    <S.GroupButton>
                      <S.Button type="submit">Update</S.Button>
                      <S.Button onClick={() => toggleEvent()}>Cancel</S.Button>
                    </S.GroupButton>
                  </S.SetWidth>
                </S.NewForm>
              </S.Content>
            </>
          )}
        </Formik>
      </S.ModalBody>
    </S.Modal>
  );
};

export default SettingInfo;
