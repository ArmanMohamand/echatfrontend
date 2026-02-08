import { createContext, useState, useContext, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "./Authcontext";

export const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [unseenMessages, setUnseenMessages] = useState({});

  const { socket, axios } = useContext(AuthContext);

  const getUsers = async () => {
    try {
      const { data } = await axios.get("/api/messages/users");
      if (data.success) {
        setUsers(data.users);
        setUnseenMessages(data.unseenMessage);
      }
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      toast.error(message, { position: "top-right", autoClose: 3000 });
    }
  };

  const getMessages = async (userId) => {
    try {
      const { data } = await axios.get(`/api/messages/${userId}`);
      if (data.success) {
        setMessages(data.messages);
      }
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      toast.error(message, { position: "top-right", autoClose: 3000 });
    }
  };

  const sendMessage = async (messageData) => {
    try {
      const { data } = await axios.post(
        `/api/messages/send/${selectedUser._id}`,
        messageData,
      );
      if (data.success) {
        setMessages((prev) => [...prev, data.newMessage]);
      } else {
        toast.error(data.message || "Failed to send message", {
          position: "top-right",
          autoClose: 3000,
        });
      }
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      toast.error(message, { position: "top-right", autoClose: 3000 });
    }
  };

  useEffect(() => {
    if (!socket) return;

    const handleNewMessage = async (newMessage) => {
      try {
        if (selectedUser && newMessage.senderId === selectedUser._id) {
          newMessage.seen = true;
          setMessages((prev) => [...prev, newMessage]);
          await axios.put(`/api/messages/mark/${newMessage._id}`);
        } else {
          setUnseenMessages((prev) => ({
            ...prev,
            [newMessage.senderId]: prev[newMessage.senderId]
              ? prev[newMessage.senderId] + 1
              : 1,
          }));
        }
      } catch (err) {
        console.error("Failed to mark message as seen:", err);
      }
    };

    socket.on("newMessage", handleNewMessage);
    return () => socket.off("newMessage", handleNewMessage);
  }, [socket, selectedUser]);

  const value = {
    messages,
    users,
    selectedUser,
    setSelectedUser,
    unseenMessages,
    setUnseenMessages,
    getUsers,
    setMessages,
    getMessages,
    sendMessage,
  };

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};
