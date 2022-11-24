import ChatArea from "../src/components/Home/ChatArea";
import * as S from "../src/components/Home/Home.styled";
import SideBar from "../src/components/Home/SideBar";
import TopBar from "../src/components/Home/TopBar";
import Welcome from "../src/components/Home/Welcome";
import { withRouter, useRouter } from "next/router";
import { useEffect, useRef } from "react";
import { RoomApi } from "../src/services/api/room";
import { useDispatch, useSelector } from "react-redux";
import { roomListActions } from "../src/features/redux/slices/roomListSlice";
import { selectRoomInfoState } from "../src/features/redux/slices/roomInfoSlice";
import { io, Socket } from "socket.io-client";
import { BASEURL } from "../src/services/api/urls";
import { ClientToServerEvents, ServerToClientEvents } from "../src/utils/types";
import { selectUserState } from "../src/features/redux/slices/userSlice";
import { messageActions } from "../src/features/redux/slices/messageSlice";

const Home = () => {
  const router = useRouter();

  const dispatch = useDispatch();
  const roomInfo = useSelector(selectRoomInfoState);
  const user = useSelector(selectUserState);

  //socket client
  const socket = useRef<Socket<ServerToClientEvents, ClientToServerEvents>>();

  useEffect(() => {
    socket.current = io(BASEURL);
  }, []);

  useEffect(() => {
    if (user.loading === false && user.info._id !== "") {
      // @ts-ignore
      socket.current.emit("newUserConnect", user.info._id);
      // @ts-ignore
      socket.current.on("getUsers", (users) => {
        console.log(users);
      });
      // @ts-ignore
      socket.current.on("receiveMessage", (result) => {
        //add new message if not sender
        if (result.senderId !== user.info._id) {
          dispatch(messageActions.newMessage(result));
          // dispatch(roomListActions.setNewLastMsg(result));
        }
      });
      // @ts-ignore
      socket.current.on("newLastMsg", (result) => {
        dispatch(roomListActions.setNewLastMsg(result));
      });
    }
  }, [user]);

  const getRoomData = async () => {
    try {
      dispatch(roomListActions.requestRoomList(null));
      const rooms = await RoomApi.getRoomList();
      dispatch(roomListActions.setRoomList(rooms.result));
    } catch (err: any) {
      if (err.errors?.error.statusCode === 401) {
        console.log(err);
        if (err.errors.message === "Unauthorized!") {
          alert("Your session is over, redirecting to login page.");
          router.push("/login");
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
        {/* @ts-ignore */}
        <TopBar socket={socket.current} />
        <S.Wrapper>
          {/* @ts-ignore */}
          <SideBar socket={socket.current} />
          {/* @ts-ignore */}
          {roomInfo.info ? <ChatArea socket={socket.current} /> : <Welcome />}
        </S.Wrapper>
      </S.HomeContainer>
    </>
  );
};

export default withRouter(Home);
