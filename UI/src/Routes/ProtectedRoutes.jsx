import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

const ProtectedRoute = () => {
  const { user, loading } = useAuth();

  if (loading) return null; // or spinner
  if (!user) return <Navigate to="/" replace />;

  return <Outlet />;
};

export default ProtectedRoute;
