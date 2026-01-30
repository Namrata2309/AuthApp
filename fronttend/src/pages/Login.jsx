import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate("/dashboard");
    } catch {
      alert("Login failed");
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Courier+Prime:wght@400;700&display=swap');
        
        :root {
          --brutalist-black: #0a0a0a;
          --brutalist-white: #fafafa;
          --brutalist-red: #ff3366;
          --brutalist-yellow: #ffcc00;
        }
        
        .login-container {
          min-height: 100vh;
          background: linear-gradient(135deg, var(--brutalist-black) 0%, #1a1a1a 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem;
          position: relative;
          overflow: hidden;
        }
        
        .login-container::before {
          content: '';
          position: absolute;
          top: -50%;
          right: -50%;
          width: 100%;
          height: 100%;
          background: radial-gradient(circle, var(--brutalist-red) 0%, transparent 70%);
          opacity: 0.15;
          animation: pulse 8s ease-in-out infinite;
        }
        
        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 0.15; }
          50% { transform: scale(1.2); opacity: 0.25; }
        }
        
        .login-form {
          background: var(--brutalist-white);
          padding: 3rem;
          width: 100%;
          max-width: 480px;
          position: relative;
          box-shadow: 
            12px 12px 0 var(--brutalist-red),
            12px 12px 0 2px var(--brutalist-black);
          animation: slideIn 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        
        @keyframes slideIn {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .login-title {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 4rem;
          line-height: 0.9;
          margin-bottom: 0.5rem;
          color: var(--brutalist-black);
          text-transform: uppercase;
        }
        
        .login-subtitle {
          font-family: 'Courier Prime', monospace;
          font-size: 0.875rem;
          color: #666;
          margin-bottom: 2.5rem;
          text-transform: uppercase;
          letter-spacing: 0.1em;
        }
        
        .input-group {
          margin-bottom: 1.5rem;
        }
        
        .input-label {
          font-family: 'Courier Prime', monospace;
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: var(--brutalist-black);
          margin-bottom: 0.5rem;
          display: block;
          font-weight: 700;
        }
        
        .login-input {
          width: 100%;
          padding: 1rem;
          border: 3px solid var(--brutalist-black);
          background: var(--brutalist-white);
          font-family: 'Courier Prime', monospace;
          font-size: 1rem;
        }
        
        .login-button {
          width: 100%;
          padding: 1.25rem;
          background: var(--brutalist-black);
          color: var(--brutalist-white);
          border: 3px solid var(--brutalist-black);
          font-family: 'Bebas Neue', sans-serif;
          font-size: 1.5rem;
          text-transform: uppercase;
          cursor: pointer;
          margin-top: 1rem;
        }

        .register-link {
          margin-top: 1.5rem;
          text-align: center;
          font-family: 'Courier Prime', monospace;
          font-size: 0.85rem;
        }

        .register-link span {
          color: var(--brutalist-red);
          cursor: pointer;
          font-weight: 700;
        }
      `}</style>
      
      <div className="login-container">
        <form onSubmit={handleLogin} className="login-form">
          <h2 className="login-title">Login</h2>
          <p className="login-subtitle">Access Required</p>

          <div className="input-group">
            <label className="input-label">Email Address</label>
            <input
              className="login-input"
              type="email"
              placeholder="your@email.com"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="input-group">
            <label className="input-label">Password</label>
            <input
              type="password"
              className="login-input"
              placeholder="••••••••"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button className="login-button" type="submit">
            Enter System
          </button>

          <div className="register-link">
            New here?{" "}
            <span onClick={() => navigate("/register")}>
              Create an account
            </span>
          </div>
        </form>
      </div>
    </>
  );
}
