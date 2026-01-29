import { createContext, useContext, useEffect, useState } from "react";
import { api } from "../Api/axios";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(null);
  const [user, setUser] = useState(null);
  const [expiresAt, setExpiresAt] = useState(null);
  const [phone, setPhone] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  // ------------------------------------
  // Restore login via refresh token
  // ------------------------------------
  useEffect(() => {
    const restore = async () => {
      try {
        const res = await api.post("/users/refresh-token");
        setAccessToken(res.data.accessToken);
        setUser(res.data.safeUser);
      } catch {
        // not logged in
      } finally {
        setLoading(false);
      }
    };
    restore();
  }, []);

  // ------------------------------------
  // Send OTP
  // ------------------------------------
  const sendOTP = async (phoneNumber) => {
    const res = await api.post("/users/send-otp", { phone: phoneNumber });
    setPhone(phoneNumber);
    setExpiresAt(res.data.expiresAt); // backend time
  };

  // ------------------------------------
  // Verify OTP
  // ------------------------------------
  const verifyOTP = async (phone, otp) => {
    try {
      const res = await api.post("/users/verify-otp", { phone, otp });
      setAccessToken(res.data.accessToken);
      setUser(res.data.safeUser);
      setExpiresAt(null);
      setPhone(null);
      return { success: true };
    } catch (err) {
      return {
        success: false,
        message: err.response?.data?.message || "OTP verification failed",
      };
    }
  };

  // ------------------------------------
  // Resend OTP
  // ------------------------------------
  const resendOTP = async (phoneNumber) => {
    try {
      const res = await api.post("/users/send-otp", { phone: phoneNumber });
      setExpiresAt(res.data.expiresAt);
      return { success: true };
    } catch (err) {
      return {
        success: false,
        message: err.response?.data?.message || "Failed to resend OTP",
      };
    }
  };

  // ------------------------------------
  // Logout
  // ------------------------------------
  const logout = async () => {
    try {
      await api.post("/users/logout");
    } catch {}
    setAccessToken(null);
    setUser(null);
    navigate("/");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        accessToken,
        phone,
        expiresAt,
        sendOTP,
        verifyOTP,
        resendOTP,
        logout,
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
