import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";

const Headerline = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 25px;
`;

const HeaderTitle = styled.h2`
  font-size: 28px;
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
  :active {
    background-color: lightgray;
  }
`;

const AddRoomButton = styled.button`
  border: none;
  border-radius: 6px;
  padding: 10px;
  cursor: pointer;
  transition-duration: 0.1s;
  :active {
    background-color: lightgray;
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
  border-radius: 10px;

  &:hover {
    background-color: rgba(0, 0, 0, 0.05);
  }
`;

const ImageBox = styled.div`
  margin-left: 10px;
  margin-right: 12px;
  object-fit: cover;
  border-radius: 50%;
  box-shadow: 0 10px 10px rgba(0, 0, 0, 0.1);
  height: 50px;
  width: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  &div {
    size: 5px;
  }
`;

const ChattingDiv = styled.div`
  margin-left: 10px;
`;

const ChatName = styled.div`
  color: black;
  font-size: 15px;
  margin-bottom: 2px;
`;

interface RoomType {
  room_id: number;
  name: string;
  owner: string;
}

const ChattingRoom = ({ room }: { room: RoomType }) => {
  return (
    <ChatListLine to="/chatting-room">
      <ImageBox>
        <div>{room.room_id}</div>
      </ImageBox>
      <ChattingDiv>
        <ChatName>{room.name}</ChatName>
        <ChatName style={{ color: "gray" }}>{room.owner}</ChatName>
      </ChattingDiv>
    </ChatListLine>
  );
};

const chattingList = () => {
  const navigate = useNavigate();

  const logout = () => {
    alert("로그아웃되었습니다.");
    navigate("/");
    //웹소켓 종료
  };

  const [rooms, setRooms] = useState<RoomType[]>([]);
  const getRoomList = async () => {
    const response = await axios.get(
      "http://127.0.0.1:5173/data/chattingRoomList.json"
    );
    setRooms(response.data.data);
  };

  useEffect(() => {
    getRoomList();
  }, []);

  return (
    <div>
      <Headerline>
        <HeaderTitle>Chats</HeaderTitle>
        <HeaderIcon>
          <AddRoomButton>추가</AddRoomButton>
          <LogOutButton onClick={logout}>LogOut</LogOutButton>
        </HeaderIcon>
      </Headerline>

      <ChatList>
        {rooms.map((room: RoomType) => (
          <ChattingRoom room={room} key={room.room_id} />
        ))}
      </ChatList>
    </div>
  );
};

export default chattingList;
