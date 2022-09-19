import * as S from "./FormTemplate.styled";
import Image from "next/image";
import LogoFullLong from "../../../assets/imgs/LogoFullLong.png";

interface childrenProps {
    children: React.ReactNode
}
const FormTemplate = ({children}: childrenProps) => {
    return (
        <S.Content>
            <S.BgWhite>
                <S.Logo>
                    <Image src={LogoFullLong}/>
                </S.Logo>
                {children}
            </S.BgWhite>
            <S.BgBlue />
        </S.Content>
    );
}

export default FormTemplate;