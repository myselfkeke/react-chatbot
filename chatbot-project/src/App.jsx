import { useState, useEffect, useRef } from "react";
import { Chatbot } from "supersimpledev";
import "./App.css";
import robotProfileImage from "../src/assets/robot.png";
import userProfileImage from "../src/assets/robot.png";
import loadingSpinner from "../src/assets/loading-spinner.gif";

function ChatInput({ chatMessages, setChatMessages }) {
  const [inputText, setInputText] = useState("");

  function saveInputText(e) {
    setInputText(e.target.value);
  }
  async function sendMessage() {
    setInputText(""); // to immidiatly remove message when uset hit enter or click send
    const newChatMessages = [
      ...chatMessages,
      {
        message: inputText,
        sender: "user",
        id: crypto.randomUUID(),
      },
    ];

    setChatMessages(newChatMessages);
    setChatMessages([
      ...newChatMessages,
      // This creates a temporaprofry Loading... message.
      // Because we don't save this message in newChatMessages,
      // it will be remove later, when we add the response.
      {
        message: (
          <img className="loading-spinner" src={loadingSpinner} alt="" />
        ),
        sender: "robot",
        id: crypto.randomUUID(),
      },
    ]);

    const response = await Chatbot.getResponseAsync(inputText);
    setChatMessages([
      ...newChatMessages,
      {
        message: response,
        sender: "robot",
        id: crypto.randomUUID(),
      },
    ]);

    setInputText("");
  }
  function handleKeyDown(e) {
    if (e.key === "Enter") {
      sendMessage();
    } else if (e.key === "Escape") {
      setInputText("");
    }
  }

  return (
    <div className="chat-input-container">
      <input
        className="chat-input"
        placeholder="Send a message to Chatbot"
        size="30"
        onChange={saveInputText}
        onKeyDown={handleKeyDown}
        value={inputText}
      />
      <button className="send-button" onClick={sendMessage}>
        Send
      </button>
    </div>
  );
}

function ChatMessage({ message, sender }) {
  return (
    <div
      className={sender === "user" ? "chat-message-user" : "chat-message-robot"}
    >
      {sender === "robot" && (
        <img
          src={robotProfileImage}
          className="profile-image"
          alt="Robot Profile image"
        />
      )}
      <div className="chat-message-text">{message}</div>
      {sender === "user" && (
        <img
          src={userProfileImage}
          className="profile-image"
          alt="User Profile image"
        />
      )}
    </div>
  );
}
function ChatMessages({ chatMessages }) {
  const chatMessagesRef = useRef(null);

  useEffect(() => {
    const containerElem = chatMessagesRef.current;

    if (containerElem) {
      containerElem.scrollTo({
        top: containerElem.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [chatMessages]);
  return (
    <div className="chat-messages-container" ref={chatMessagesRef}>
      {chatMessages.map((chatMessage) => {
        return (
          <ChatMessage
            message={chatMessage.message}
            sender={chatMessage.sender}
            key={chatMessage.id}
          />
        );
      })}
    </div>
  );
}

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
