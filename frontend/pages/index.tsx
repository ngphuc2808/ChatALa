import ChatArea from "../src/components/Home/ChatArea";
import * as S from "../src/components/Home/Home.styled";
import SideBar from "../src/components/Home/SideBar";
import TopBar from "../src/components/Home/TopBar";
import Welcome from "../src/components/Home/Welcome";

const Home = () => {
  return (
    <>
      <S.HomeContainer>
        <TopBar />
        <S.Wrapper>
          <SideBar />
          {/* <ChatArea /> */}
          <Welcome />
        </S.Wrapper>
      </S.HomeContainer>
    </>
  );
};

export default Home;
