import { Routes, Route } from "react-router-dom";
import RegistrationPage from "./Pages/Registration";
import VerifyOtp from "./Pages/VerifyOtp";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<RegistrationPage />} />
      <Route path="/VerifyOtp" element={<VerifyOtp />} />
    </Routes>
  );
};

export default App;
