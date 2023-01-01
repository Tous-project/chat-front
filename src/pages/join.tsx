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
  width: 500px;
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

const JoinTitle = styled.div`
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

const join = () => {
  const [userEmail, setUserEmail] = useState<string>("");
  const [userPassword, setUserPassword] = useState<string>("");
  const [userNickname, setUserNickname] = useState<string>("");

  const navigate = useNavigate();

  const getJoin = async () => {
    try {
      // console.log(userEmail);
      // console.log(userPassword);
      // console.log(userNickname);
      const response = await axios.post(
        `http://chat.tryourself.com:30003/users`,
        {
          email: userEmail,
          password: userPassword,
          name: userNickname,
        }
      );
      console.log(response.data);
      if (response.data.email === userEmail) {
        alert("회원가입이 완료되었습니다.");
        navigate("/");
      }
    } catch (e: any) {
      alert(JSON.stringify(e.response?.data.error_message));
    }
  };
  return (
    <Main>
      <Container>
        <JoinTitle>
          <BsChatSquareQuoteFill style={{ color: "#4783ff" }} />
          <span>Welcome!</span>
        </JoinTitle>
        <input
          type="email"
          placeholder="Please write new user email"
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
        <input
          placeholder="nickname"
          required
          onChange={(e) => {
            setUserNickname(e.target.value);
          }}
        ></input>
        <Button
          onClick={() => {
            getJoin();
          }}
        >
          회원가입하기
        </Button>
      </Container>
    </Main>
  );
};

export default join;
