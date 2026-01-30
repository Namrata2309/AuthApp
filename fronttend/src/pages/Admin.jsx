import { useEffect, useState } from "react";
import api from "../api/api";

export default function Admin() {
  const [admin, setAdmin] = useState(null);
  const [users, setUsers] = useState([]);


  const [adminSerial] = useState(
    () => `${Date.now().toString(36).toUpperCase()}`
  );
  const [usersSerial] = useState(
    () => `${Date.now().toString(36).toUpperCase()}`
  );
  useEffect(() => {
    api.get("/api/admin").then((res) => setAdmin(res.data.admin));
    api.get("/api/users").then((res) => setUsers(res.data.users));
  }, []);

  if (!admin)
    return (
      <>
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=IBM+Plex+Mono:wght@400;500&display=swap');

          .loading-container {
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            background: #f8f7f4;
            font-family: 'IBM Plex Mono', monospace;
            color: #2c2c2c;
            font-size: 0.875rem;
            letter-spacing: 0.05em;
          }

          .loading-dots::after {
            content: '';
            animation: dots 1.5s steps(4, end) infinite;
          }

          @keyframes dots {
            0%, 20% { content: ''; }
            40% { content: '.'; }
            60% { content: '..'; }
            80%, 100% { content: '...'; }
          }
        `}</style>

        <div className="loading-container">
          <span className="loading-dots">Loading</span>
        </div>
      </>
    );

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=IBM+Plex+Mono:wght@400;500&display=swap');

        :root {
          --editorial-cream: #f8f7f4;
          --editorial-dark: #2c2c2c;
          --editorial-gray: #6b6b6b;
          --editorial-accent: #c7493a;
          --editorial-gold: #d4af37;
        }

        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .admin-container {
          min-height: 100vh;
          background: var(--editorial-cream);
          padding: 4rem 2rem;
          position: relative;
        }

        .admin-container::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 1px;
          background: linear-gradient(90deg,
            transparent 0%,
            var(--editorial-dark) 50%,
            transparent 100%
          );
          animation: expandLine 1.5s ease-out;
        }

        @keyframes expandLine {
          from { transform: scaleX(0); }
          to { transform: scaleX(1); }
        }

        .admin-content {
          max-width: 800px;
          margin: 0 auto;
        }

        .admin-header {
          margin-bottom: 4rem;
          padding-bottom: 2rem;
          border-bottom: 1px solid rgba(44, 44, 44, 0.15);
          position: relative;
        }

        .section-label {
          font-family: 'IBM Plex Mono', monospace;
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.2em;
          color: var(--editorial-gray);
          margin-bottom: 1rem;
          animation: fadeIn 0.8s ease-out;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .admin-title {
          font-family: 'Playfair Display', serif;
          font-size: 5rem;
          font-weight: 400;
          line-height: 1;
          color: var(--editorial-dark);
          margin-bottom: 1rem;
          animation: slideInTitle 1s cubic-bezier(0.22, 1, 0.36, 1);
        }

        @keyframes slideInTitle {
          from {
            opacity: 0;
            transform: translateY(30px);
            letter-spacing: 0.2em;
          }
          to {
            opacity: 1;
            transform: translateY(0);
            letter-spacing: normal;
          }
        }

        .title-accent {
          display: inline-block;
          position: relative;
        }

        .title-accent::after {
          content: '';
          position: absolute;
          bottom: 0.2em;
          left: 0;
          right: 0;
          height: 0.15em;
          background: var(--editorial-accent);
          transform: scaleX(0);
          transform-origin: left;
          animation: underlineGrow 0.8s cubic-bezier(0.22, 1, 0.36, 1) 0.5s forwards;
        }

        @keyframes underlineGrow {
          to { transform: scaleX(1); }
        }

        .admin-subtitle {
          font-family: 'IBM Plex Mono', monospace;
          font-size: 0.875rem;
          color: var(--editorial-gray);
          letter-spacing: 0.05em;
          animation: fadeIn 0.8s ease-out 0.3s backwards;
        }

        .decorative-line {
          position: absolute;
          bottom: -1px;
          left: 0;
          width: 120px;
          height: 3px;
          background: var(--editorial-gold);
          animation: slideInLine 1s cubic-bezier(0.22, 1, 0.36, 1) 0.6s backwards;
        }

        @keyframes slideInLine {
          from { width: 0; }
          to { width: 120px; }
        }

        .info-card {
          background: white;
          padding: 3rem;
          position: relative;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06);
          animation: floatIn 1s cubic-bezier(0.22, 1, 0.36, 1) 0.4s backwards;
        }

        @keyframes floatIn {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .info-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 4px;
          height: 100%;
          background: linear-gradient(180deg,
            var(--editorial-accent) 0%,
            var(--editorial-gold) 100%
          );
          transform: scaleY(0);
          transform-origin: top;
          animation: barGrow 0.6s cubic-bezier(0.22, 1, 0.36, 1) 0.8s forwards;
        }

        @keyframes barGrow {
          to { transform: scaleY(1); }
        }

        .info-grid {
          display: grid;
          gap: 2.5rem;
        }

        .info-item {
          animation: fadeInItem 0.6s ease-out backwards;
        }

        .info-item:nth-child(1) { animation-delay: 1s; }
        .info-item:nth-child(2) { animation-delay: 1.15s; }

        @keyframes fadeInItem {
          from { opacity: 0; transform: translateX(-15px); }
          to { opacity: 1; transform: translateX(0); }
        }

        .info-label {
          font-family: 'IBM Plex Mono', monospace;
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          color: var(--editorial-gray);
          margin-bottom: 0.75rem;
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .info-label::before {
          content: '';
          width: 24px;
          height: 1px;
          background: var(--editorial-gray);
        }

        .info-value {
          font-family: 'Playfair Display', serif;
          font-size: 2rem;
          font-weight: 700;
          color: var(--editorial-dark);
          line-height: 1.3;
        }

        .serial-number {
          position: absolute;
          top: 3rem;
          right: 3rem;
          font-family: 'IBM Plex Mono', monospace;
          font-size: 0.625rem;
          color: var(--editorial-gray);
          opacity: 0.5;
          letter-spacing: 0.1em;
        }

        .background-text {
          position: absolute;
          bottom: 2rem;
          right: 2rem;
          font-family: 'Playfair Display', serif;
          font-size: 8rem;
          font-weight: 700;
          color: var(--editorial-cream);
          opacity: 0.5;
          line-height: 1;
          pointer-events: none;
          user-select: none;
        }
      `}</style>

      <div className="admin-container">
        <div className="admin-content">
          <div className="admin-header">
            <p className="section-label">Administrative Access</p>
            <h1 className="admin-title">
              Admin <span className="title-accent">Panel</span>
            </h1>
            <p className="admin-subtitle">Privileged interface · System oversight</p>
            <div className="decorative-line"></div>
          </div>

          {/* ADMIN INFO CARD */}
          <div className="info-card">
            <div className="serial-number">ADM-{adminSerial}</div>

            <div className="info-grid">
              <div className="info-item">
                <p className="info-label">Administrator Name</p>
                <p className="info-value">{admin.name}</p>
              </div>

              <div className="info-item">
                <p className="info-label">Access Level</p>
                <p className="info-value">{admin.role}</p>
              </div>
            </div>

            <div className="background-text">A</div>
          </div>

          {/* USERS LIST CARD */}
          <div className="info-card" style={{ marginTop: "4rem" }}>
            <div className="serial-number">
              USR-{usersSerial}
            </div>

            <div className="info-grid">
              <div className="info-item">
                <p className="info-label">Registered Users</p>
                <p className="info-value">{users.length}</p>
              </div>
            </div>

            <div style={{ marginTop: "2.5rem" }}>
              {users.map((user, index) => (
                <div
                  key={user._id}
                  style={{
                    padding: "1rem 0",
                    borderBottom: "1px solid rgba(44,44,44,0.1)",
                    animation: "fadeInItem 0.6s ease-out backwards",
                    animationDelay: `${index * 0.05}s`,
                  }}
                >
                  <p className="info-label">User {index + 1}</p>
                  <p className="info-value" style={{ fontSize: "1.25rem" }}>
                    {user.name} ·{" "}
                    <span style={{ color: "#6b6b6b" }}>{user.role}</span>
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
