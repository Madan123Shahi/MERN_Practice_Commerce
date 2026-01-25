import { createContext, useContext, useState } from "react";
import { api } from "../Api/axios";

const RegisterContext = createContext(null);

export const registerProvider = ({ children }) => {
  const [status, setStatus] = useState("Idle");
  const [phone, setPhone] = useState(null);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  const sendOTP = async (phoneNumber) => {
    try {
      const res = await api.post("/users/send-otp", {
        phone: phoneNumber,
      });
      setPhone(phone);
      setStatus("OTP_Sent");
    } catch (error) {
      throw new Error(error?.res?.data?.message || "Failed to send OTP");
    }
  };
  return (
    <RegisterContext.Provider
      value={{
        status,
        phone,
        user,
        token,
        sendOTP,
      }}
    >
      {children}
    </RegisterContext.Provider>
  );
};
