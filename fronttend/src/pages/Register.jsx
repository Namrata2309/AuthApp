import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    age: "",
    password: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/api/auth/register", form);
      alert("Registered successfully");
      navigate("/dashboard");
    } catch (err) {
      alert(err.response?.data?.message || "Error");
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Karla:wght@400;600&display=swap');

        :root {
          --peach: #ffb4a2;
          --coral: #ff6b6b;
          --cream: #fffcf2;
          --sage: #b5e8cf;
          --teal: #4ecdc4;
          --deep-teal: #2a9d8f;
          --soft-shadow: rgba(255, 107, 107, 0.15);
        }

        .register-container {
          min-height: 100vh;
          background:
            radial-gradient(circle at 20% 80%, var(--peach) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, var(--sage) 0%, transparent 50%),
            radial-gradient(circle at 40% 40%, var(--teal) 0%, transparent 40%),
            linear-gradient(135deg, #fff5f5 0%, var(--cream) 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem;
          position: relative;
          overflow: hidden;
        }

        .floating-orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(60px);
          opacity: 0.3;
          animation: float 20s ease-in-out infinite;
        }

        .orb-1 {
          width: 300px;
          height: 300px;
          background: var(--coral);
          top: 10%;
          left: 15%;
        }

        .orb-2 {
          width: 250px;
          height: 250px;
          background: var(--teal);
          bottom: 15%;
          right: 20%;
          animation-delay: 7s;
        }

        .orb-3 {
          width: 200px;
          height: 200px;
          background: var(--sage);
          top: 50%;
          right: 10%;
          animation-delay: 14s;
        }

        @keyframes float {
          0%, 100% { transform: translate(0,0) scale(1); }
          33% { transform: translate(30px,-30px) scale(1.1); }
          66% { transform: translate(-20px,20px) scale(0.9); }
        }

        .register-form {
          background: rgba(255,255,255,0.85);
          backdrop-filter: blur(20px);
          padding: 3.5rem 3rem;
          border-radius: 48px;
          width: 100%;
          max-width: 480px;
          position: relative;
          box-shadow:
            0 20px 60px var(--soft-shadow),
            inset 0 1px 0 rgba(255,255,255,0.8);
          animation: floatIn 0.8s cubic-bezier(0.34,1.56,0.64,1);
        }

        @keyframes floatIn {
          from { opacity:0; transform:translateY(40px) scale(0.95); }
          to { opacity:1; transform:translateY(0) scale(1); }
        }

        .register-title {
          font-family: 'DM Serif Display', serif;
          font-size: 3.5rem;
          font-style: italic;
          margin-bottom: 0.5rem;
          background: linear-gradient(135deg,var(--coral),var(--deep-teal));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .register-subtitle {
          font-family: 'Karla', sans-serif;
          color: #666;
          margin-bottom: 2.5rem;
        }

        .form-field {
          margin-bottom: 1.5rem;
          animation: slideInField 0.6s ease-out backwards;
        }

        @keyframes slideInField {
          from { opacity:0; transform:translateX(-20px); }
          to { opacity:1; transform:translateX(0); }
        }

        .register-input {
          width: 100%;
          padding: 1rem 1.5rem;
          border-radius: 24px;
          border: 2px solid transparent;
          background: rgba(255,255,255,0.7);
          font-family: 'Karla', sans-serif;
          transition: 0.3s;
        }

        .register-input:focus {
          outline: none;
          border-color: var(--teal);
          background: #fff;
          box-shadow: 0 0 0 4px rgba(78,205,196,0.15);
        }

        .register-button {
          width: 100%;
          padding: 1.25rem;
          border-radius: 28px;
          border: none;
          background: linear-gradient(135deg,var(--coral),var(--deep-teal));
          color: #fff;
          font-size: 1.1rem;
          font-weight: 600;
          cursor: pointer;
          margin-top: 1rem;
          transition: 0.3s;
        }

        .register-button:hover {
          transform: translateY(-3px);
          box-shadow: 0 12px 32px rgba(255,107,107,0.4);
        }

        .accent-blob {
          position: absolute;
          width: 120px;
          height: 120px;
          background: linear-gradient(135deg,var(--peach),var(--coral));
          top: -40px;
          right: -40px;
          opacity: 0.1;
          border-radius: 50%;
        }
      `}</style>

      <div className="register-container">
        <div className="floating-orb orb-1"></div>
        <div className="floating-orb orb-2"></div>
        <div className="floating-orb orb-3"></div>

        <form onSubmit={handleSubmit} className="register-form">
          <div className="accent-blob"></div>

          <h2 className="register-title">Join us</h2>
          <p className="register-subtitle">
            Create your account to get started
          </p>

          <div className="form-field">
            <input
              className="register-input"
              name="name"
              placeholder="Full name"
              onChange={handleChange}
            />
          </div>

          <div className="form-field">
            <input
              className="register-input"
              name="email"
              type="email"
              placeholder="Email address"
              onChange={handleChange}
            />
          </div>

          <div className="form-field">
            <input
              className="register-input"
              name="age"
              type="number"
              placeholder="Age"
              onChange={handleChange}
            />
          </div>

          <div className="form-field">
            <input
              className="register-input"
              type="password"
              name="password"
              placeholder="Create password"
              onChange={handleChange}
            />
          </div>

          <button className="register-button" type="submit">
            Create Account
          </button>
        </form>
      </div>
    </>
  );
}
