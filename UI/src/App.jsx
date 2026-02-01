import { Routes, Route, Outlet } from "react-router-dom";
import RegistrationPage from "./Pages/RegistrationPage";
import ProtectedRoute from "./Routes/ProtectedRoutes";
import Header from "./Components/Header/Header";

// Layout component — renders Header + whatever child route matches
const Layout = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

const App = () => {
  return (
    <Routes>
      {/* Layout wraps everything that needs the header */}
      <Route element={<Layout />}>
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<RegistrationPage />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default App;
