import { useAuth } from "../context/AuthContext";

export default function Dashboard() {
  const { user } = useAuth();

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@700;900&family=Rajdhani:wght@400;600&display=swap');
        
        :root {
          --cyber-bg: #0a0e27;
          --cyber-dark: #1a1f3a;
          --neon-blue: #00d4ff;
          --neon-pink: #ff006e;
          --neon-green: #00ff9f;
          --grid-color: rgba(0, 212, 255, 0.1);
        }
        
        .dashboard-container {
          min-height: 100vh;
          background: var(--cyber-bg);
          padding: 3rem;
          position: relative;
          overflow: hidden;
        }
        
        .grid-background {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-image: 
            linear-gradient(var(--grid-color) 1px, transparent 1px),
            linear-gradient(90deg, var(--grid-color) 1px, transparent 1px);
          background-size: 50px 50px;
          animation: gridScroll 20s linear infinite;
          perspective: 1000px;
          transform-style: preserve-3d;
        }
        
        @keyframes gridScroll {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(50px);
          }
        }
        
        .glow-line {
          position: absolute;
          height: 2px;
          background: linear-gradient(90deg, transparent, var(--neon-blue), transparent);
          box-shadow: 0 0 10px var(--neon-blue);
          animation: scanLine 4s linear infinite;
        }
        
        .glow-line:nth-child(1) {
          top: 20%;
          left: 0;
          right: 0;
        }
        
        .glow-line:nth-child(2) {
          top: 60%;
          left: 0;
          right: 0;
          animation-delay: 2s;
          background: linear-gradient(90deg, transparent, var(--neon-pink), transparent);
          box-shadow: 0 0 10px var(--neon-pink);
        }
        
        @keyframes scanLine {
          0% {
            transform: translateY(-100vh);
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
          100% {
            transform: translateY(100vh);
            opacity: 0;
          }
        }
        
        .dashboard-content {
          position: relative;
          z-index: 1;
          max-width: 1200px;
          margin: 0 auto;
        }
        
        .dashboard-header {
          margin-bottom: 3rem;
          animation: glitchIn 0.8s ease-out;
        }
        
        @keyframes glitchIn {
          0% {
            opacity: 0;
            transform: translateX(-20px);
            text-shadow: -5px 0 var(--neon-pink), 5px 0 var(--neon-blue);
          }
          100% {
            opacity: 1;
            transform: translateX(0);
            text-shadow: 0 0 20px var(--neon-blue);
          }
        }
        
        .dashboard-title {
          font-family: 'Orbitron', sans-serif;
          font-size: 4rem;
          font-weight: 900;
          color: var(--neon-blue);
          text-transform: uppercase;
          letter-spacing: 0.1em;
          text-shadow: 
            0 0 20px var(--neon-blue),
            0 0 40px var(--neon-blue),
            0 0 60px rgba(0, 212, 255, 0.5);
          margin-bottom: 0.5rem;
          position: relative;
        }
        
        .dashboard-title::before {
          content: 'DASHBOARD';
          position: absolute;
          left: 2px;
          top: 2px;
          color: var(--neon-pink);
          opacity: 0.5;
          z-index: -1;
          animation: glitchSkew 3s infinite;
        }
        
        @keyframes glitchSkew {
          0% {
            transform: skew(0deg);
          }
          10% {
            transform: skew(-2deg);
          }
          20% {
            transform: skew(2deg);
          }
          30% {
            transform: skew(0deg);
          }
          100% {
            transform: skew(0deg);
          }
        }
        
        .status-bar {
          font-family: 'Rajdhani', sans-serif;
          font-size: 0.875rem;
          color: var(--neon-green);
          text-transform: uppercase;
          letter-spacing: 0.2em;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        
        .status-indicator {
          width: 8px;
          height: 8px;
          background: var(--neon-green);
          border-radius: 50%;
          box-shadow: 
            0 0 10px var(--neon-green),
            0 0 20px var(--neon-green);
          animation: pulse-glow 2s ease-in-out infinite;
        }
        
        @keyframes pulse-glow {
          0%, 100% {
            opacity: 1;
            box-shadow: 
              0 0 10px var(--neon-green),
              0 0 20px var(--neon-green);
          }
          50% {
            opacity: 0.6;
            box-shadow: 
              0 0 5px var(--neon-green),
              0 0 10px var(--neon-green);
          }
        }
        
        .user-card {
          background: rgba(26, 31, 58, 0.6);
          backdrop-filter: blur(10px);
          border: 2px solid var(--neon-blue);
          border-radius: 0;
          padding: 2.5rem;
          max-width: 400px;
          position: relative;
          box-shadow: 
            0 0 30px rgba(0, 212, 255, 0.3),
            inset 0 0 30px rgba(0, 212, 255, 0.05);
          animation: slideInCard 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) 0.3s backwards;
        }
        
        @keyframes slideInCard {
          from {
            opacity: 0;
            transform: translateY(30px) rotateX(10deg);
          }
          to {
            opacity: 1;
            transform: translateY(0) rotateX(0);
          }
        }
        
        .user-card::before,
        .user-card::after {
          content: '';
          position: absolute;
          width: 20px;
          height: 20px;
          border: 2px solid var(--neon-pink);
        }
        
        .user-card::before {
          top: -2px;
          left: -2px;
          border-right: none;
          border-bottom: none;
        }
        
        .user-card::after {
          bottom: -2px;
          right: -2px;
          border-left: none;
          border-top: none;
        }
        
        .corner-accent {
          position: absolute;
          width: 20px;
          height: 20px;
          border: 2px solid var(--neon-pink);
        }
        
        .corner-top-right {
          top: -2px;
          right: -2px;
          border-left: none;
          border-bottom: none;
        }
        
        .corner-bottom-left {
          bottom: -2px;
          left: -2px;
          border-right: none;
          border-top: none;
        }
        
        .data-field {
          margin-bottom: 1.5rem;
          padding-bottom: 1.5rem;
          border-bottom: 1px solid rgba(0, 212, 255, 0.2);
          animation: fadeInData 0.6s ease-out backwards;
        }
        
        .data-field:last-child {
          border-bottom: none;
          margin-bottom: 0;
          padding-bottom: 0;
        }
        
        .data-field:nth-child(1) { animation-delay: 0.5s; }
        .data-field:nth-child(2) { animation-delay: 0.6s; }
        
        @keyframes fadeInData {
          from {
            opacity: 0;
            transform: translateX(-10px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        .data-label {
          font-family: 'Rajdhani', sans-serif;
          font-size: 0.75rem;
          color: var(--neon-green);
          text-transform: uppercase;
          letter-spacing: 0.15em;
          margin-bottom: 0.5rem;
          display: block;
        }
        
        .data-value {
          font-family: 'Orbitron', sans-serif;
          font-size: 1.5rem;
          font-weight: 700;
          color: white;
          text-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
        }
        
        .hologram-effect {
          position: absolute;
          top: 50%;
          right: -100px;
          width: 200px;
          height: 200px;
          background: radial-gradient(circle, var(--neon-blue) 0%, transparent 70%);
          opacity: 0.1;
          border-radius: 50%;
          filter: blur(40px);
          animation: float-hologram 6s ease-in-out infinite;
        }
        
        @keyframes float-hologram {
          0%, 100% {
            transform: translateY(-50%) translateX(0);
          }
          50% {
            transform: translateY(-50%) translateX(-20px);
          }
        }
      `}</style>
      
      <div className="dashboard-container">
        <div className="grid-background">
          <div className="glow-line"></div>
          <div className="glow-line"></div>
        </div>
        
        <div className="dashboard-content">
          <div className="dashboard-header">
            <h1 className="dashboard-title">Dashboard</h1>
            <div className="status-bar">
              <span className="status-indicator"></span>
              System Active
            </div>
          </div>

          <div className="user-card">
            <div className="corner-accent corner-top-right"></div>
            <div className="corner-accent corner-bottom-left"></div>
            <div className="hologram-effect"></div>
            
            <div className="data-field">
              <span className="data-label">User Identity</span>
              <p className="data-value">{user.name}</p>
            </div>
            
            <div className="data-field">
              <span className="data-label">Access Level</span>
              <p className="data-value">{user.role}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}