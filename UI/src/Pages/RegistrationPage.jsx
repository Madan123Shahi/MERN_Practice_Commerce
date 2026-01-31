import LoginForm from "./LoginForm"; // your current Registration UI
import VerifyOtp from "./VerifyOtp";
import { useAuth } from "../Context/AuthContext";

const RegistrationPage = () => {
  const { phone, expiresAt } = useAuth();

  // If OTP is sent → show OTP screen
  if (phone && expiresAt) {
    return <VerifyOtp />;
  }

  // Otherwise show login screen
  return <LoginForm />;
};

export default RegistrationPage;
