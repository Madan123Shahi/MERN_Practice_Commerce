import { Routes, Route } from "react-router-dom";
import RegistrationPage from "./Pages/RegistrationPage";
import Home from "./Pages/Home";
import ProtectedRoute from "./Routes/ProtectedRoutes";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<RegistrationPage />} />

      <Route element={<ProtectedRoute />}>
        <Route path="/home" element={<Home />} />
      </Route>
    </Routes>
  );
};

export default App;
