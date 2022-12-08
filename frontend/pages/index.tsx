import ChatArea from "../src/components/Home/ChatArea";
import * as S from "../src/components/Home/Home.styled";
import SideBar from "../src/components/Home/SideBar";
import TopBar from "../src/components/Home/TopBar";
import Welcome from "../src/components/Home/Welcome";
import { withRouter, useRouter } from "next/router";
import { useEffect } from "react";
import { RoomApi } from "../src/services/api/room";
import { useDispatch, useSelector } from "react-redux";
import { roomListActions } from "../src/features/redux/slices/roomListSlice";
import { selectRoomInfoState } from "../src/features/redux/slices/roomInfoSlice";
import { messageActions } from "../src/features/redux/slices/messageSlice";
import { friendListActions } from "../src/features/redux/slices/friendListSlice";
import { FriendApi } from "../src/services/api/friend";
import { useSocketContext } from "../src/contexts/socket";
import Script from "next/script";

const Home = () => {
  const router = useRouter();

  const dispatch = useDispatch();
  const roomInfo = useSelector(selectRoomInfoState);

  //socket client
  // const socket = useRef<Socket<ServerToClientEvents, ClientToServerEvents>>();
  const socket = useSocketContext();

  useEffect(() => {
    // @ts-ignore
    socket.on("newLastMsg", (result) => {
      dispatch(roomListActions.setNewLastMsg(result));
    });
    socket.on("new room", () => {
      getRoomList();
    });
    socket.on("unsend msg", (msgId) => {
      dispatch(messageActions.unsend(msgId));
    });
    socket.on("delete msg", (msgId) => {
      dispatch(messageActions.delete(msgId));
    });
  }, []);

  const getRoomList = async () => {
    try {
      dispatch(roomListActions.requestRoomList(null));
      const rooms = await RoomApi.getRoomList();
      dispatch(roomListActions.setRoomList(rooms.result));
    } catch (err: any) {
      console.log(err);
      if (err?.error.statusCode === 401) {
        if (err.message === "Unauthorized!") {
          alert("Your session is over, redirecting to login page.");
          router.push("/login");
        }
      }
    }
  };

  const getFriendList = async () => {
    try {
      dispatch(friendListActions.requestFriendList(null));
      const friends = await FriendApi.friendList();
      dispatch(friendListActions.setFriendList(friends));
    } catch (err: any) {
      if (err?.error.statusCode === 400) {
        alert(err.error.message);
      }
    }
  };

  useEffect(() => {
    getRoomList();
    getFriendList();
  }, []);

  return (
    <>
      <S.HomeContainer>
        <TopBar />
        <S.Wrapper>
          <SideBar />
          {roomInfo.info ? <ChatArea /> : <Welcome />}
        </S.Wrapper>
        <div
          id="rasa-chat-widget"
          data-websocket-url="https://rasa-bot-api-xwnzyf6ivq-ue.a.run.app"
          style={{
            bottom: "50px",
            right: "50px",
          }}
        ></div>
        <Script
          src="https://unpkg.com/@rasahq/rasa-chat"
          type="application/javascript"
        ></Script>
      </S.HomeContainer>
    </>
  );
};

export default withRouter(Home);
