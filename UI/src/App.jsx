import { Routes, Route } from "react-router-dom";
import RegistrationPage from "./Pages/Registration";
import VerifyOtp from "./Pages/VerifyOtp";
import Home from "./Pages/Home";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<RegistrationPage />} />
      <Route path="/VerifyOtp" element={<VerifyOtp />} />
      <Route path="/home" element={<Home />} />
    </Routes>
  );
};

export default App;
