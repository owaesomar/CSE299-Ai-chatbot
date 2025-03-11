import { useState } from "react";

const ChatPage = () => {
  // Store conversations as objects: { title, messages }
  const [conversations, setConversations] = useState([]);
  // Track the active conversation index (null means none selected)
  const [activeChatIndex, setActiveChatIndex] = useState(null);
  const [input, setInput] = useState("");

  // Send message in the active conversation
  const sendMessage = async () => {
    if (activeChatIndex === null || !input.trim()) return;

    const userMessage = { role: "user", content: input };

    // Update active conversation with the new user message
    const updatedConversations = conversations.map((conv, idx) => {
      if (idx === activeChatIndex) {
        return { ...conv, messages: [...conv.messages, userMessage] };
      }
      return conv;
    });
    setConversations(updatedConversations);
    setInput("");

    try {
      const response = await fetch("http://127.0.0.1:8000/api/chat/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });
      const data = await response.json();
      const botMessage = { role: "bot", content: data.response };

      const updatedConversationsWithBot = updatedConversations.map(
        (conv, idx) => {
          if (idx === activeChatIndex) {
            return { ...conv, messages: [...conv.messages, botMessage] };
          }
          return conv;
        }
      );
      setConversations(updatedConversationsWithBot);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // Create a new conversation thread and set it as active
  const handleNewChat = () => {
    const newChat = { title: `Chat ${conversations.length + 1}`, messages: [] };
    // Add new chat to the front of the array and set it active
    setConversations([newChat, ...conversations]);
    setActiveChatIndex(0);
  };

  // Switch active conversation from the sidebar
  const switchChat = (index) => {
    setActiveChatIndex(index);
  };

  // Active conversation (default to empty if none is selected)
  const activeConversation =
    activeChatIndex !== null
      ? conversations[activeChatIndex]
      : { messages: [] };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-1/4 bg-white shadow-md p-6 hidden md:block">
        <h2 className="text-2xl font-semibold mb-6">Chat History</h2>
        <div className="space-y-4 overflow-y-auto max-h-[80vh]">
          {conversations.map((chat, index) => (
            <div
              key={index}
              onClick={() => switchChat(index)}
              className={`p-3 rounded cursor-pointer hover:bg-gray-300 ${
                index === activeChatIndex ? "bg-blue-200" : "bg-gray-200"
              }`}
            >
              {chat.title}
            </div>
          ))}
        </div>
        <button
          onClick={handleNewChat}
          className="mt-6 w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
        >
          New Chat
        </button>
      </div>

      {/* Main Chat Window */}
      <div className="flex-1 flex flex-col">
        <div className="flex-1 p-6 overflow-y-auto space-y-4">
          {activeConversation.messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${
                msg.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-md p-4 rounded-lg shadow ${
                  msg.role === "user"
                    ? "bg-blue-500 text-white rounded-br-none"
                    : "bg-gray-200 text-gray-800 rounded-bl-none"
                }`}
              >
                {msg.content}
              </div>
            </div>
          ))}
        </div>

        {/* Chat Input */}
        <div className="p-4 bg-white border-t border-gray-300">
          <div className="flex">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 border border-gray-300 rounded-l-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Type your message..."
            />
            <button
              onClick={sendMessage}
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 rounded-r-lg transition"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
