import styled from "styled-components";
import { useState } from "react";
import axios from "axios";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Button,
} from "@chakra-ui/react";

const Content = styled(ModalContent)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
`;

const Body = styled(ModalBody)`
  width: 450px;
  justify-content: center;
  align-items: center;
  padding: 100px 30px;
  border-radius: 10px;
  background-color: white;
  box-shadow: 1px 1px 5px 1px #17429833;

  & > input {
    border: none;
    border: 1px solid black;
    padding: 8px;
    margin-bottom: 30px;
    width: 350px;
    font-size: 13px;
    &:focus {
      outline: none;
      border: 1px solid #4783ff;
      transition: 0.2s;
    }
  }
`;

const ModalButton = styled(Button)`
  border: none;
  padding: 10px 15px;
  border-radius: 6px;
  margin: 5px;
  box-shadow: 2px 2px 20px 1px rgba(0, 0, 0, 0.2);
`;

interface ModalBodyProps {
  isOpen: boolean;
  onClose: () => void;
}

const addRoomModal = (props: ModalBodyProps) => {
  const [ChatName, setChatName] = useState<string>();
  const [ChatDescription, setChatDescription] = useState<string>();
  const session = localStorage.getItem("userSession");
  const userId = localStorage.getItem("userId");
  console.log(userId);

  const addRoom = async () => {
    try {
      const response = await axios.post(
        `http://chat.tryourself.com:30003/rooms`,
        {
          owner: userId,
          name: ChatName,
          description: ChatDescription,
        },
        { headers: { "x-session-id": session } }
      );
      console.log(response.data.data);
      setChatName("");
      setChatDescription("");
      props.onClose();
    } catch (e: any) {
      alert(JSON.stringify(e.response?.data.error_message));
    }
  };
  return (
    <Modal
      closeOnOverlayClick={false}
      closeOnEsc={false}
      isOpen={props.isOpen}
      onClose={props.onClose}
      size="5xl"
    >
      <ModalOverlay />
      <Content>
        <Body>
          <ModalHeader style={{ margin: "30px 10px" }}>
            New Chatting room
          </ModalHeader>
          <input
            type="text"
            placeholder="Chatting room name"
            required
            onChange={(e) => {
              setChatName(e.target.value);
            }}
          ></input>
          <input
            type="text"
            placeholder="Write chatting room description"
            required
            onChange={(e) => {
              setChatDescription(e.target.value);
            }}
          ></input>
          <ModalFooter>
            <ModalButton
              onClick={addRoom}
              backgroundColor="#4783ff"
              color="white"
              _active={{ backgroundColor: "#3561b9" }}
              variant="ghost"
            >
              추가
            </ModalButton>
            <ModalButton
              onClick={() => {
                setChatName("");
                setChatDescription("");
                props.onClose();
              }}
              backgroundColor="#4783ff"
              color="white"
              _hover={{ backgroundColor: "#6E85EC" }}
              variant="ghost"
            >
              취소
            </ModalButton>
          </ModalFooter>
        </Body>
      </Content>
    </Modal>
  );
};

export default addRoomModal;
