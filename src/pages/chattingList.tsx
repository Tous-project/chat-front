import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { BsChatSquareQuoteFill } from "react-icons/bs";
import { useDisclosure } from "@chakra-ui/react";
import AddRoomModal from "./addRoomModal";

const Headerline = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 40px 30px;
  box-shadow: 2px 2px 20px 1px rgba(0, 0, 0, 0.1);
  margin-bottom: 25px;
`;

const HeaderLeft = styled.div`
  display: flex;
  /* flex-direction: column; */
`;

const HeaderTitle = styled.span`
  font-size: 28px;
  font-weight: bold;
`;

const HeaderIcon = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 20px;
`;

const LogOutButton = styled.button`
  border: none;
  border-radius: 6px;
  padding: 10px;
  cursor: pointer;
  transition-duration: 0.1s;
  background-color: #4783ff;
  color: white;
  box-shadow: 2px 2px 20px 1px rgba(0, 0, 0, 0.2);
  :active {
    background-color: #3561b9;
  }
`;

const AddRoomButton = styled.button`
  border: none;
  border-radius: 6px;
  padding: 10px;
  cursor: pointer;
  transition-duration: 0.1s;
  background-color: #4783ff;
  color: white;
  box-shadow: 2px 2px 20px 1px rgba(0, 0, 0, 0.2);
  :active {
    background-color: #3561b9;
  }
`;

const ChatList = styled.div`
  padding: 0px 10px;
`;

const ChatListLine = styled(Link)`
  position: relative;
  display: flex;
  align-items: center;
  height: 50px;
  width: 100%;
  padding: 13px 7px;
  text-decoration: none;
  /* border-radius: 10px; */
  &:hover {
    background-color: rgba(0, 0, 0, 0.05);
  }
`;

const ImageBox = styled.div`
  margin-left: 25px;
  margin-right: 12px;
  object-fit: cover;
  border-radius: 50%;
  box-shadow: 2px 2px 20px 1px rgba(0, 0, 0, 0.1);
  height: 50px;
  width: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  & > div {
    size: 5px;
    color: #4783ff;
  }
`;

const ChattingDiv = styled.div`
  margin-left: 10px;
`;

const ChatName = styled.div`
  color: black;
  font-size: 15px;
  font-weight: bold;
  margin-bottom: 2px;
`;

const NonReadBadge = styled.div`
  position: fixed;
  right: 0;
  margin: 40px;
  border-radius: 50%;
  background-color: lightgray;
  padding: 3px 7px;
  color: white;
  font-size: 10px;
`;

interface RoomType {
  room_id: number;
  name: string;
  description: string;
}

const ChattingRoom = ({ room }: { room: RoomType }) => {
  return (
    <ChatListLine to="/chatting-room">
      <ImageBox>
        <div>{room.room_id}</div>
      </ImageBox>
      <ChattingDiv>
        <ChatName>{room.name}</ChatName>
        <ChatName
          style={{
            color: "gray",
            fontWeight: "300",
            fontSize: "13px",
            marginLeft: "2px",
          }}
        >
          {room.description}
        </ChatName>
      </ChattingDiv>
      {/* <NonReadBadge>1</NonReadBadge> */}
    </ChatListLine>
  );
};

const chattingList = () => {
  const navigate = useNavigate();
  const session = localStorage.getItem("userSession");
  console.log(session);

  const logout = async () => {
    try {
      const response = await axios.delete(
        `http://chat.tryourself.com:30003/sessions`,
        {
          headers: {
            "x-session-id": session,
          },
        }
      );
      console.log(response.data);
    } catch (e: any) {
      alert(JSON.stringify(e.response?.data.error_message));
    }
    localStorage.removeItem("userId");
    localStorage.removeItem("userSession");
    alert("로그아웃되었습니다.");
    navigate("/");
    //웹소켓 종료
  };

  const [rooms, setRooms] = useState<RoomType[]>([]);
  const getRoomList = async () => {
    try {
      const response = await axios.get(
        "http://chat.tryourself.com:30003/rooms",
        {
          headers: {
            "x-session-id": session,
          },
        }
      );
      console.log(response.data.data);
      setRooms(response.data);
    } catch (e: any) {
      alert(JSON.stringify(e.response?.data.error_message));
    }
  };
  const {
    onOpen: onOpenAdd,
    isOpen: isOpenAdd,
    onClose: onCloseAdd,
  } = useDisclosure();

  useEffect(() => {
    getRoomList();
  }, []);

  return (
    <div>
      <Headerline>
        <HeaderLeft>
          <BsChatSquareQuoteFill size={20} style={{ color: "#4783ff" }} />
          <HeaderTitle>Chatting API</HeaderTitle>
        </HeaderLeft>
        <HeaderIcon>
          <AddRoomButton onClick={onOpenAdd}>추가</AddRoomButton>
          <LogOutButton onClick={logout}>LogOut</LogOutButton>
        </HeaderIcon>
      </Headerline>
      <AddRoomModal isOpen={isOpenAdd} onClose={onCloseAdd} />

      <ChatList>
        {rooms &&
          rooms.map((room: RoomType) => (
            <ChattingRoom room={room} key={room.room_id} />
          ))}
      </ChatList>
      <AddRoomModal isOpen={isOpenAdd} onClose={onCloseAdd} />
    </div>
  );
};

export default chattingList;
