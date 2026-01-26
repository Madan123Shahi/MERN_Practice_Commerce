import { createContext, useContext, useState } from "react";
import { api } from "../Api/axios.js";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [status, setStatus] = useState("Idle");
  const [phone, setPhone] = useState(null);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  // Method inside context to fetch from backend
  const sendOTP = async (phoneNumber) => {
    try {
      const res = await api.post("/users/send-otp", {
        phone: phoneNumber,
      });
      setPhone(phoneNumber);
      setStatus("OTP_Sent");
    } catch (error) {
      throw new Error(error?.response?.data?.message || "Failed to send OTP");
    }
  };
  // Here we pass only Methods and initial state
  return (
    <AuthContext.Provider
      value={{
        status,
        phone,
        user,
        token,
        sendOTP,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside RegisterProvider");
  return context;
};
