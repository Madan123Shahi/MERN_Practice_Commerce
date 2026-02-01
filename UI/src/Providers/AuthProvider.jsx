import { useEffect, useState } from "react";
import { api } from "../Api/axios";
import { AuthContext } from "../Context/AuthContext";

export const AuthProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(null);
  const [user, setUser] = useState(null);
  const [expiresAt, setExpiresAt] = useState(null);
  const [phone, setPhone] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const restoreSession = async () => {
      try {
        const res = await api.post("/users/refresh-token");
        console.log("Restore session response:", res.data); // ← add this
        setAccessToken(res.data.accessToken);
        setUser(res.data.user);
      } catch {
        // not logged in
      } finally {
        setLoading(false);
      }
    };
    restoreSession();
  }, []);

  const sendOTP = async (phoneNumber) => {
    const res = await api.post("/users/send-otp", { phone: phoneNumber });
    setPhone(phoneNumber);
    setExpiresAt(res.data.expiresAt);
  };

  const verifyOTP = async (phone, otp) => {
    const res = await api.post("/users/verify-otp", { phone, otp });
    console.log("OTP verify response:", res.data); // log backend response
    setAccessToken(res.data.accessToken);
    setUser(res.data.safeUser);
    setPhone(null);
    setExpiresAt(null);
    return { success: true, user: res.data.safeUser }; // ✅ return user
  };

  const resendOTP = async (phoneNumber) => {
    const res = await api.post("/users/send-otp", { phone: phoneNumber });
    setExpiresAt(res.data.expiresAt);
    return { success: true };
  };

  const logout = async () => {
    try {
      await api.post("/users/logout");
    } finally {
      setAccessToken(null);
      setUser(null);
      setPhone(null);
      setExpiresAt(null);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        accessToken,
        loading,
        phone,
        expiresAt,
        sendOTP,
        verifyOTP,
        resendOTP,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
