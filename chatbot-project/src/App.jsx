import { useState } from "react";
import { ChatInput } from "./Components/ChatInput.jsx";
import { ChatMessages } from "./Components/ChatMessages.jsx";
import "./App.css";

function App() {
  const [chatMessages, setChatMessages] = useState([]);

  return (
    <div className="app-container">
      <p className="welcome-msg">
        {chatMessages.length === 0 &&
          " Welcome to the chatbot project! Send a message using the textbox below."}
      </p>
      <ChatMessages chatMessages={chatMessages} />
      <ChatInput
        chatMessages={chatMessages}
        setChatMessages={setChatMessages}
      />
    </div>
  );
}

export default App;
