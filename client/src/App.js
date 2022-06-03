import { useState } from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import StartPage from "./components/StartPage";
import NotExistingPage from "./components/NotExistingPage";
import Messages from "./components/Messages";
import Message from "./components/Message";
import SendMessage from "./components/SendMessage";
import './App.css';

function App() {
  const [currentUser, setCurrentUser] = useState(null);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<StartPage currentUser={currentUser} setCurrentUser={setCurrentUser} />} />
          <Route path="/messages" element={<Messages currentUser={currentUser} />} />
          <Route path="/send-message" element={<SendMessage currentUser={currentUser} />} />
          <Route path="/messages/:id" element={<Message currentUser={currentUser} setCurrentUser={setCurrentUser} />} />
          <Route path="*" element={<NotExistingPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
