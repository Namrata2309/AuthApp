import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children }) {
  const { isAuth, loading } = useAuth();

  if (loading) return <p>Checking session...</p>;

  return isAuth ? children : <Navigate to="/login" />;
}
