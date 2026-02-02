import { Routes, Route, Outlet } from "react-router-dom";
import RegistrationPage from "./Pages/RegistrationPage";
import ProtectedRoute from "./Routes/ProtectedRoutes";
import Header from "./Components/Header/Header";
import Home from "./Pages/Home";

// Layout component
const Layout = () => (
  <>
    <Header />
    <Outlet />
  </>
);

const App = () => {
  return (
    <Routes>
      {/* Layout */}
      <Route element={<Layout />}>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<RegistrationPage />} />

        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<div>Dashboard</div>} />
        </Route>
      </Route>
    </Routes>
  );
};

export default App;
