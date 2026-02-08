import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { io } from "socket.io-client";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const backendurl = import.meta.env.VITE_BACKEND_URL;
axios.defaults.baseURL = backendurl;

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, settoken] = useState(localStorage.getItem("token"));
  const [authUser, setauthUser] = useState(null);
  const [onlineUser, setonlineUser] = useState([]);
  const [socket, setsocket] = useState(null);
  const [loading, setLoading] = useState(true);

  // check authentication
  const checkAuth = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get("/api/auth/check");
      if (data.success) {
        setauthUser(data.user);
      }
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      toast.error(message, { position: "top-right", autoClose: 3000 });
    } finally {
      setLoading(false);
    }
  };

  // login function
  const login = async (state, credentials) => {
    try {
      const { data } = await axios.post(`/api/auth/${state}`, credentials);
      if (data.success) {
        setauthUser(data.userData);
        axios.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;
        settoken(data.token);
        localStorage.setItem("token", data.token);
        toast.success(data.message, { position: "top-right", autoClose: 3000 });
      } else {
        toast.error(data.message || "Login failed", {
          position: "top-right",
          autoClose: 3000,
        });
      }
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      toast.error(message, { position: "top-right", autoClose: 3000 });
    }
  };

  // logout function
  const logout = () => {
    setauthUser(null);
    settoken(null);
    setonlineUser([]);
    localStorage.removeItem("token");
    delete axios.defaults.headers.common["Authorization"];
    if (socket) socket.disconnect();
    toast.info("Logged out successfully", {
      position: "top-right",
      autoClose: 3000,
    });
  };

  // update profile
  const updateProfile = async (body) => {
    try {
      const { data } = await axios.put("/api/auth/updateProfile", body); // <-- fixed
      if (data.success) {
        setauthUser(data.user);
        toast.success("Profile Updated successfully", {
          position: "top-right",
          autoClose: 3000,
        });
      }
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      toast.error(message, { position: "top-right", autoClose: 3000 });
    }
  };

  // socket lifecycle
  useEffect(() => {
    if (!authUser) return;
    const newSocket = io(backendurl, { query: { userId: authUser._id } });
    setsocket(newSocket);
    newSocket.on("getOnlineUsers", (userIds) => {
      setonlineUser(userIds);
    });
    return () => {
      newSocket.disconnect();
    };
  }, [authUser]);

  // check auth when token changes
  useEffect(() => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      checkAuth();
    } else {
      delete axios.defaults.headers.common["Authorization"];
      setLoading(false);
    }
  }, [token]);

  const value = {
    axios,
    authUser,
    onlineUser,
    socket,
    token,
    login,
    logout,
    loading,
    settoken,
    setauthUser,
    setonlineUser,
    setsocket,
    updateProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
