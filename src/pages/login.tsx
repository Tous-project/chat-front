import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { BsChatSquareQuoteFill } from "react-icons/bs";

const Main = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
`;

const Container = styled.div`
  width: 450px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 100px 30px;
  border-radius: 10px;
  box-shadow: 1px 1px 20px 1px #17429833;

  & > input {
    border: none;
    border-bottom: 1px solid black;
    padding: 8px;
    margin-bottom: 30px;
    width: 350px;
    font-size: 15px;
    &:focus {
      outline: none;
      border-bottom: 1px solid #4783ff;
      transition: 0.2s;
    }
  }
`;

const LoginTitle = styled.div`
  margin-bottom: 50px;
  display: flex;
  & > span {
    font-weight: bold;
    font-size: x-large;
  }
`;

const Button = styled.button`
  border: none;
  width: 350px;
  cursor: pointer;
  margin: 10px 5px 5px 5px;
  background-color: #4783ff;
  color: white;
  border-radius: 8px;
  padding: 10px 20px;
  font-size: 14px;
  transition-duration: 0.1s;
  box-shadow: 2px 2px 20px 1px rgba(0, 0, 0, 0.2);
  &:active {
    background-color: #3561b9;
  }
`;

const FindButton = styled.button`
  border: none;
  cursor: pointer;
  margin-top: 10px;
  background-color: white;
  /* border-bottom: 1px solid black; */
`;

const login = () => {
  const [userEmail, setUserEmail] = useState<string>("");
  const [userPassword, setUserPassword] = useState<string>("");

  const navigate = useNavigate();

  const getLogin = async () => {
    try {
      const response = await axios.post(
        `http://chat.tryourself.com:30003/sessions`,
        {
          email: userEmail,
          password: userPassword,
        }
      );
      console.log(response.data);
      if (response.data.session_id !== null) {
        localStorage.setItem("userId", response.data.user_id);
        localStorage.setItem("userSession", response.data.session_id);
        // setIsLoggedIn(true);
        navigate("/chatting-list");
      }
    } catch (e: any) {
      alert(JSON.stringify(e.response?.data.error_message));
    }
  };

  return (
    <Main>
      <Container>
        <LoginTitle>
          <BsChatSquareQuoteFill style={{ color: "#4783ff" }} />
          <span>Chatting API</span>
        </LoginTitle>
        <input
          type="email"
          placeholder="user email"
          required
          onChange={(e) => {
            setUserEmail(e.target.value);
          }}
        ></input>
        <input
          type="password"
          placeholder="password"
          required
          onChange={(e) => {
            setUserPassword(e.target.value);
          }}
        ></input>
        <Button onClick={() => getLogin()}>?????????</Button>
        <Button onClick={() => navigate("/join")}>????????????</Button>
        <FindButton>?????????/???????????? ??????</FindButton>
      </Container>
    </Main>
  );
};

export default login;
