import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { api } from "../Api/axios.js";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [status, setStatus] = useState("IDLE");
  const [phone, setPhone] = useState(null);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [otpExpiresAt, setOtpExpiresAt] = useState(null);

  // Fetch user data when token exists
  const fetchUser = useCallback(async (authToken) => {
    try {
      const res = await api.get("/users/me", {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      setUser(res.data.user);
      setStatus("AUTHENTICATED");
    } catch (error) {
      console.error("Failed to fetch user:", error);
      localStorage.removeItem("token");
      setStatus("IDLE");
    }
  }, []);

  // RESTORE SESSION ON REFRESH
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
      // Don't set status yet - wait for user fetch
      fetchUser(storedToken);
    }
  }, [fetchUser]);

  // 🔹 Send OTP
  const sendOTP = async (phoneNumber) => {
    try {
      const res = await api.post("/users/send-otp", {
        phone: phoneNumber,
      });

      setPhone(phoneNumber);
      setOtpExpiresAt(res.data?.expiresAt);
      setStatus("OTP_SENT");
      return res.data;
    } catch (error) {
      throw new Error(error?.response?.data?.message || "Failed to send OTP");
    }
  };

  // 🔹 Verify OTP
  const verifyOTP = async (otp) => {
    try {
      if (!phone) {
        throw new Error("Phone number missing. Please resend OTP.");
      }

      setStatus("VERIFYING");

      const res = await api.post("/users/verify-otp", {
        phone,
        otp,
      });

      const authToken = res.data.token;
      const userData = res.data.user;

      // Store in localStorage
      localStorage.setItem("token", authToken);

      // Update state
      setUser(userData);
      setToken(authToken);
      setStatus("AUTHENTICATED");

      return res.data;
    } catch (error) {
      setStatus("ERROR");
      throw new Error(
        error?.response?.data?.message || "OTP verification failed",
      );
    }
  };

  // 🔹 Logout
  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setToken(null);
    setPhone(null);
    setStatus("IDLE");
  };

  return (
    <AuthContext.Provider
      value={{
        status,
        phone,
        user,
        token,
        otpExpiresAt,
        sendOTP,
        verifyOTP,
        logout,
        fetchUser, // Optional: expose if needed
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
