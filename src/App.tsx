import { Route, Routes, BrowserRouter } from "react-router-dom";
import LogIn from "./pages/login";
import ChattingList from "./pages/chattingList";
import ChattingRoom from "./pages/chattingRoom";
import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
body {
  padding: 0;
  margin: 0;
}`;

function App() {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<LogIn />} />
        <Route path="/chatting-list" element={<ChattingList />} />
        <Route path="/chatting-room" element={<ChattingRoom />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
