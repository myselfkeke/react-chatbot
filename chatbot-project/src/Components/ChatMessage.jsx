import robotProfileImage from "../../src/assets/robot.png";
import userProfileImage from "../../src/assets/user.png";
import "./ChatMessage.css";

export function ChatMessage({ message, sender }) {
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
