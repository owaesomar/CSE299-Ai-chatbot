import React, { useState, useEffect, useRef, useContext } from "react";
import axios from "axios";
import Message from "../Message/Message";
import "./ChatWindow.css";
import { AuthContext } from "../AuthProvider";
import Navbar from "../Navbar/Navbar";
import sendIcon from "../../components/ChatWindow/arrow-up.svg";

const ChatWindow = () => {
  const { user, logout } = useContext(AuthContext);
  const [sessions, setSessions] = useState([]);
  const [currentSession, setCurrentSession] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isBotTyping, setIsBotTyping] = useState(false);
  const chatHistoryRef = useRef(null);

  // Fetch chat history when the component mounts or user changes
  useEffect(() => {
    const fetchChatHistory = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/api/chat-history/",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
          }
        );
        const fetchedSessions = response.data.reverse();
        setSessions(fetchedSessions);
        if (fetchedSessions.length > 0) {
          setCurrentSession(fetchedSessions[0]);
          setMessages(fetchedSessions[0].messages || []);
        }
      } catch (error) {
        console.error("Error fetching chat history:", error);
        if (error.response && error.response.status === 401) {
          logout();
        }
      }
    };
    if (user) fetchChatHistory();
  }, [user, logout]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { text: input, sender: "user" };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput("");
    setIsBotTyping(true);

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/chatbot/",
        { message: input },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
      const botMessage = { text: response.data.response, sender: "bot" };
      const newMessages = [...updatedMessages, botMessage];
      setMessages(newMessages);

      // Update current session with the new messages
      if (currentSession) {
        const updatedSession = { ...currentSession, messages: newMessages };
        setCurrentSession(updatedSession);
        const updatedSessions = sessions.map((session) =>
          session.id === updatedSession.id ? updatedSession : session
        );
        setSessions(updatedSessions);
      }
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setIsBotTyping(false);
    }
  };

  const startNewSession = () => {
    const newSession = { id: Date.now(), messages: [] };
    setSessions([newSession, ...sessions]);
    setCurrentSession(newSession);
    setMessages([]);
  };

  const loadSession = (session) => {
    setCurrentSession(session);
    setMessages(session.messages || []);
  };

  useEffect(() => {
    if (chatHistoryRef.current) {
      chatHistoryRef.current.scrollTop = chatHistoryRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="chat-container">
      <div className="Navpos">
        <Navbar />
      </div>
      <div className="chat-sidebar">
        <button className="new-chat" onClick={startNewSession}>
          Begin a New Chat
        </button>
        <h3 className="recChat">Recent Chats</h3>
        <ul className="chatHis">
          {sessions.slice(0, 3).map((session, index) => {
            const chatPreview =
              session.messages && session.messages.length > 0
                ? session.messages[0].text.substring(0, 20) + "..."
                : "New Chat";
            return (
              <div className="chatli" key={session.id}>
                <li
                  className={session.id === currentSession?.id ? "active" : ""}
                  onClick={() => loadSession(session)}
                >
                  {chatPreview}
                </li>
              </div>
            );
          })}
        </ul>
      </div>
      <div className="chat-window">
        <div className="chat-history" ref={chatHistoryRef}>
          {/* Show default message if there are no messages */}
          {messages.length === 0 && (
            <div className="default-message">
              <div className="def1">
                How can we <span className="assist">assist</span> you today?
              </div>
              <div className="def2">
                Meet your virtual companion! Our chat-bot offers friendly,
              </div>
              <div className="def2">
                empathetic conversations, guiding you through tough days.
              </div>
            </div>
          )}
          {messages.map((msg, index) => (
            <Message key={index} text={msg.text} sender={msg.sender} />
          ))}
          {isBotTyping && (
            <div className="message bot typing-indicator">
              <span>.</span>
              <span>.</span>
              <span>.</span>
            </div>
          )}
        </div>
        <div className="chat-input">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask anything..."
            onKeyPress={(e) => e.key === "Enter" && handleSend()}
          />
          <button onClick={handleSend}>
            <img src={sendIcon} alt="Send" width="24" height="24" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;
