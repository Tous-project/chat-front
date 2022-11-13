import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  background-color: lightgray;
  display: flex;
  flex-direction: column;
`;

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

const LeaveRoomButton = styled.button`
  border: none;
  border-radius: 6px;
  padding: 10px;
  cursor: pointer;
  transition-duration: 0.1s;
  :active {
    background-color: lightgray;
  }
`;

const ChatDiv = styled.div``;
const WritingDiv = styled.form`
  position: fixed;
  bottom: 0;
  width: 100%;
  margin: 30px;
`;
const InputDiv = styled.input`
  border-radius: 20px;
  padding: 13px;
  margin-right: 10px;
  width: 80%;
`;
const SendButton = styled.button`
  border: none;
  border-radius: 50%;
  padding: 12px;
  cursor: pointer;
  transition-duration: 0.1s;
  :active {
    background-color: lightgray;
  }
`;

const chattingRoom = () => {
  const navigate = useNavigate();
  //   const ws = new WebSocket(`ws://localhost:8000//ws/${id}`);
  //   const submit = () => {};
  return (
    <Container>
      <Headerline>
        <HeaderTitle>ChattingRoom</HeaderTitle>
        <HeaderIcon>
          <LeaveRoomButton onClick={() => navigate("/chatting-list")}>
            퇴장{/* 해당 유저리스트에서 삭제되어야함 */}
          </LeaveRoomButton>
        </HeaderIcon>
      </Headerline>
      <ChatDiv></ChatDiv>
      <WritingDiv>
        <InputDiv type="text" placeholder="메세지를 입력하세요."></InputDiv>
        <SendButton>전송</SendButton>
      </WritingDiv>
    </Container>
  );
};

export default chattingRoom;
