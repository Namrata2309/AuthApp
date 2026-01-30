import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import RoleGuard from "../auth/RoleGuard";

export default function Navbar() {
  const { user, logout } = useAuth();

  if (!user) return null;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600;700&family=Archivo+Black&display=swap');

        :root {
          --nav-dark: #0f0f23;
          --nav-purple: #8b5cf6;
          --nav-cyan: #06b6d4;
          --nav-pink: #ec4899;
          --nav-amber: #f59e0b;
        }

        /* ===== FULL WIDTH NAV ===== */
        .navbar {
          position: sticky;
          top: 0;
          z-index: 1000;
          width: 100%;
          background: rgba(15, 15, 35, 0.88);
          backdrop-filter: blur(20px);
          border-bottom: 1px solid rgba(139, 92, 246, 0.25);
          animation: navSlideDown 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
          overflow: hidden;
        }

        @keyframes navSlideDown {
          from {
            transform: translateY(-100%);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        /* ===== INNER CONTAINER ===== */
        .navbar-inner {
          max-width: 1400px;
          margin: 0 auto;
          padding: 1rem 2rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          position: relative;
        }

        /* ===== SHIMMER LINE ===== */
        .navbar::before {
          content: "";
          position: absolute;
          top: 0;
          left: -100%;
          width: 200%;
          height: 2px;
          background: linear-gradient(
            90deg,
            transparent,
            var(--nav-cyan),
            var(--nav-purple),
            var(--nav-pink),
            transparent
          );
          animation: shimmer 8s linear infinite;
        }

        @keyframes shimmer {
          to {
            left: 100%;
          }
        }

        /* ===== NAV LINKS ===== */
        .nav-links {
          display: flex;
          gap: 0.5rem;
          align-items: center;
        }

        .nav-link {
          font-family: "JetBrains Mono", monospace;
          font-size: 0.875rem;
          font-weight: 600;
          color: rgba(255, 255, 255, 0.75);
          text-decoration: none;
          padding: 0.625rem 1.25rem;
          border-radius: 10px;
          position: relative;
          transition: all 0.3s ease;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          overflow: hidden;
        }

        .nav-link::before {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(
            135deg,
            var(--nav-purple),
            var(--nav-cyan)
          );
          opacity: 0;
          transition: opacity 0.3s;
          z-index: -1;
        }

        .nav-link:hover {
          color: #fff;
          transform: translateY(-2px);
        }

        .nav-link:hover::before {
          opacity: 1;
        }

        /* ===== RIGHT SIDE ===== */
        .nav-right {
          display: flex;
          align-items: center;
          gap: 1.5rem;
        }

        .user-badge {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.5rem 1rem;
          background: rgba(139, 92, 246, 0.15);
          border: 1px solid rgba(139, 92, 246, 0.3);
          border-radius: 12px;
        }

        .user-avatar {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: linear-gradient(
            135deg,
            var(--nav-purple),
            var(--nav-pink)
          );
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: "Archivo Black", sans-serif;
          font-size: 0.875rem;
          color: white;
        }

        .user-name {
          font-family: "JetBrains Mono", monospace;
          font-size: 0.875rem;
          color: rgba(255, 255, 255, 0.9);
          font-weight: 600;
        }

        /* ===== LOGOUT BUTTON ===== */
        .logout-button {
          font-family: "JetBrains Mono", monospace;
          font-size: 0.875rem;
          font-weight: 700;
          color: white;
          background: linear-gradient(135deg, #ef4444, #dc2626);
          border: none;
          padding: 0.625rem 1.5rem;
          border-radius: 10px;
          cursor: pointer;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          transition: all 0.3s ease;
        }

        .logout-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(239, 68, 68, 0.6);
        }

        /* ===== GLOW EFFECT ===== */
        .nav-glow {
          position: absolute;
          width: 200px;
          height: 200px;
          background: radial-gradient(
            circle,
            var(--nav-purple) 0%,
            transparent 70%
          );
          opacity: 0.15;
          filter: blur(40px);
          pointer-events: none;
        }

        .nav-glow.left {
          top: -100px;
          left: 20%;
        }

        .nav-glow.right {
          top: -100px;
          right: 20%;
          background: radial-gradient(
            circle,
            var(--nav-cyan) 0%,
            transparent 70%
          );
        }

        /* ===== RESPONSIVE ===== */
        @media (max-width: 768px) {
          .navbar-inner {
            flex-direction: column;
            gap: 1rem;
            padding: 0.75rem 1rem;
          }

          .nav-right {
            width: 100%;
            justify-content: space-between;
          }

          .user-name {
            display: none;
          }
        }
      `}</style>

      <nav className="navbar">
        <div className="nav-glow left" />
        <div className="nav-glow right" />

        <div className="navbar-inner">
          <div className="nav-links">
            <Link to="/dashboard" className="nav-link">
              Dashboard
            </Link>

            <RoleGuard allowedRoles={["ADMIN"]}>
              <Link to="/admin" className="nav-link">
                Admin
              </Link>
            </RoleGuard>
          </div>

          <div className="nav-right">
            <div className="user-badge">
              <div className="user-avatar">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <span className="user-name">{user.name}</span>
            </div>

            <button onClick={logout} className="logout-button">
              Logout
            </button>
          </div>
        </div>
      </nav>
    </>
  );
}
