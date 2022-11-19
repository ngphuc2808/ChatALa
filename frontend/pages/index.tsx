import ChatArea from '../src/components/Home/ChatArea';
import * as S from '../src/components/Home/Home.styled';
import SideBar from '../src/components/Home/SideBar';
import TopBar from '../src/components/Home/TopBar';
import Welcome from '../src/components/Home/Welcome';
import { withRouter, useRouter } from 'next/router';
import { useEffect } from 'react';
import { RoomApi } from '../src/services/api/room';
import { useDispatch, useSelector } from 'react-redux';
import { roomListActions } from '../src/features/redux/slices/roomListSlice';
import { selectRoomInfoState } from '../src/features/redux/slices/roomInfoSlice';

const Home = () => {
  const router = useRouter();

  const dispatch = useDispatch();
  const roomInfo = useSelector(selectRoomInfoState)

  const getRoomData = async () => {
    try {
      dispatch(roomListActions.requestRoomList(null))
      const rooms = await RoomApi.getRoomList();
      dispatch(roomListActions.setRoomList(rooms.result))
    } catch (err: any) {
      if (err.errors?.error.statusCode === 401) {
        console.log(err);
        if (err.errors.message === 'Unauthorized!') {
          alert('Your session is over, please login again.');
          router.push('/login');
        }
      }
    }
  };

  useEffect(() => {
    getRoomData();
  }, []);

  return (
    <>
      <S.HomeContainer>
        <TopBar />
        <S.Wrapper>
          <SideBar />
          {roomInfo.info ? <ChatArea /> : <Welcome />}
        </S.Wrapper>
      </S.HomeContainer>
    </>
  );
};

export default withRouter(Home);
