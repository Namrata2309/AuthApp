import { useAuth } from "../context/AuthContext";

export default function RoleGuard({ allowedRoles, children }) {
  const { user } = useAuth();

  if (!user) return null;

  return allowedRoles.includes(user.role) ? children : null;
}
