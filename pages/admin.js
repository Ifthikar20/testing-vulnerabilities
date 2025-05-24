import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

export default function AdminPanel() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [darkMode, setDarkMode] = useState(false);
  const [victory, setVictory] = useState(false);
  const router = useRouter();

  // Function to check if user is admin based on JWT
  const checkAdmin = () => {
    const token = localStorage.getItem('auth_token');
    if (!token) return false;
    
    try {
      // Vulnerability: Client-side JWT parsing without verification
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const payload = JSON.parse(window.atob(base64));
      return payload.role === 'admin';
    } catch (error) {
      return false;
    }
  };

  useEffect(() => {
    const isAdmin = checkAdmin();
    if (!isAdmin) {
      router.push('/dashboard');
      return;
    }

    // Check for passcode in URL
    const { query } = router;
    if (query.Passcode === '454hhfodg4') {
      setVictory(true);
    }

    // Check if we should add the complex query parameters
    if (!('Passcode' in query) || !('fechId+3r344343434Transfer3ffff343GOOGE343%%frrgrgrrgrrgrgr' in query)) {
      router.replace({
        pathname: '/admin',
        query: { 
          Passcode: '',
          'fechId+3r344343434Transfer3ffff343GOOGE343%%frrgrgrrgrrgrgr': ''
        }
      }, undefined, { shallow: true });
    }

    // This would normally be a server API call, but for simplicity, we'll mock it
    // Vulnerability: Directly passing token to API
    const token = localStorage.getItem('auth_token');
    
    // Simulate loading admin data
    setTimeout(() => {
      setUsers([
        { id: 1, username: 'admin', email: 'admin@testbank.com', role: 'admin' },
        { id: 2, username: 'user', email: 'user@testbank.com', role: 'user' },
        { id: 3, username: 'jane.doe', email: 'jane.doe@example.com', role: 'user' },
        { id: 4, username: 'john.smith', email: 'john.smith@example.com', role: 'user' }
      ]);
      setLoading(false);
    }, 1000);
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('auth_token');
    router.push('/');
  };

  if (loading) {
    return <div className="loading">Loading admin panel...</div>;
  }

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  // Victory screen with confetti
  if (victory) {
    return (
      <div className="victory-container">
        <div className="fireworks">
          <div className="firework"></div>
          <div className="firework"></div>
          <div className="firework"></div>
          <div className="firework"></div>
          <div className="firework"></div>
        </div>
        
        <div className="victory-content">
          <div className="trophy-container">
            <div className="trophy-glow"></div>
            <div className="trophy">🏆</div>
          </div>
          
          <h1 className="rainbow-text">CONGRATULATIONS!</h1>
          <h2 className="glow-text">You've Captured All The Flags!</h2>
          
          <div className="flags-container">
            <h3 className="blink-text">Captured Flags:</h3>
            <ul className="flags-list">
              <li className="flag-item flag-item-1">
                <div className="flag-icon">🚩</div>
                <span className="flag-label">Flag 1:</span> 
                <span className="flag-value">flag_no_1_8f4d2a1c</span> 
                <span className="flag-location">(HTML Comment)</span>
              </li>
              <li className="flag-item flag-item-2">
                <div className="flag-icon">🚩</div>
                <span className="flag-label">Flag 2:</span> 
                <span className="flag-value">flag_no_2_b7e9c123</span> 
                <span className="flag-location">(Hidden DOM Element)</span>
              </li>
              <li className="flag-item flag-item-3">
                <div className="flag-icon">🚩</div>
                <span className="flag-label">Flag 3:</span> 
                <span className="flag-value">flag_no_3_e5f8c314</span> 
                <span className="flag-location">(HTTP Header)</span>
              </li>
              <li className="flag-item flag-item-4">
                <div className="flag-icon">🚩</div>
                <span className="flag-label">Flag 4:</span> 
                <span className="flag-value">flag_no_4_d2c1e945</span> 
                <span className="flag-location">(Admin Account Data)</span>
              </li>
              <li className="flag-item flag-item-5">
                <div className="flag-icon">🚩</div>
                <span className="flag-label">Flag 5:</span> 
                <span className="flag-value">flag_no_5_a9f3b721</span> 
                <span className="flag-location">(Transfer Response)</span>
              </li>
              <li className="flag-item flag-item-6">
                <div className="flag-icon">🚩</div>
                <span className="flag-label">Flag 6:</span> 
                <span className="flag-value">flag_no_6_f7d4e298</span> 
                <span className="flag-location">(Admin Page URL)</span>
              </li>
            </ul>
          </div>
          
          <div className="success-banner">
            <p className="victory-message">You've successfully identified all vulnerabilities in the Test Bank application!</p>
            <div className="stars">
              <span className="star">⭐</span>
              <span className="star">⭐</span>
              <span className="star">⭐</span>
              <span className="star">⭐</span>
              <span className="star">⭐</span>
            </div>
            <p className="skill-message">Your web security skills are impressive. Great work!</p>
          </div>
          
          <button onClick={handleLogout} className="victory-btn">
            <span className="btn-text">Return to Login</span>
            <span className="btn-icon">🔐</span>
          </button>
        </div>
        
        <div className="confetti-container">
          {Array(150).fill().map((_, i) => (
            <div key={i} className={`confetti confetti-${i % 10}`} style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 5}s`
            }}></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={`admin-container ${darkMode ? 'dark-mode' : ''}`}>
      <div className="header">
        <h1>Test Bank Admin Panel</h1>
        <div className="header-controls">
          <div className="theme-toggle">
            <label className="switch">
              <input 
                type="checkbox" 
                checked={darkMode} 
                onChange={toggleTheme}
              />
              <span className="slider round"></span>
            </label>
            <span className="toggle-label">{darkMode ? 'Dark Mode' : 'Light Mode'}</span>
          </div>
          <button onClick={handleLogout} className="logout-btn">Logout</button>
        </div>
      </div>
      
      <div className="users-section">
        <h2>Manage Users</h2>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Username</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>
                  <button className="action-btn edit">Edit</button>
                  <button className="action-btn delete">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Hidden hint for passcode */}
      <div className="hidden-flag">feeling lucky with pass CODE 454hhfodg4</div>

      <style jsx>{`
        .victory-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 100vh;
          background: linear-gradient(135deg, #0b0033, #3a0088, #00025a);
          text-align: center;
          padding: 20px;
          position: relative;
          overflow: hidden;
          font-family: 'Arial', sans-serif;
          animation: bg-shift 15s infinite alternate;
        }
        @keyframes bg-shift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .victory-content {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          border-radius: 20px;
          padding: 40px;
          max-width: 850px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3), 0 0 20px rgba(255, 255, 255, 0.1);
          position: relative;
          z-index: 10;
          border: 2px solid rgba(255, 255, 255, 0.2);
          animation: content-glow 3s infinite alternate;
        }
        @keyframes content-glow {
          from { box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3), 0 0 20px rgba(255, 255, 255, 0.1); }
          to { box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3), 0 0 50px rgba(255, 140, 0, 0.5); }
        }
        .trophy-container {
          position: relative;
          width: 120px;
          height: 120px;
          margin: 0 auto 20px;
        }
        .trophy-glow {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 100px;
          height: 100px;
          background: radial-gradient(circle, rgba(255,215,0,0.8) 0%, rgba(255,215,0,0) 70%);
          border-radius: 50%;
          animation: glow-pulse 2s infinite alternate;
        }
        @keyframes glow-pulse {
          from { opacity: 0.5; transform: translate(-50%, -50%) scale(1); }
          to { opacity: 1; transform: translate(-50%, -50%) scale(1.5); }
        }
        .trophy {
          position: relative;
          font-size: 100px;
          animation: trophy-rotate 10s infinite linear, pulse 2s infinite alternate;
          z-index: 2;
        }
        @keyframes trophy-rotate {
          0% { transform: rotateY(0deg); }
          100% { transform: rotateY(360deg); }
        }
        @keyframes pulse {
          0% { transform: scale(1); text-shadow: 0 0 10px gold; }
          50% { transform: scale(1.1); text-shadow: 0 0 30px gold, 0 0 50px orange; }
          100% { transform: scale(1); text-shadow: 0 0 10px gold; }
        }
        
        .rainbow-text {
          font-size: 4rem;
          margin: 0 0 10px 0;
          background: linear-gradient(to right, 
            #ff0000, #ff7f00, #ffff00, #00ff00, #0000ff, #4b0082, #8b00ff);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          background-size: 600% 100%;
          animation: rainbow-shift 5s linear infinite;
          letter-spacing: 2px;
          font-weight: 900;
          text-transform: uppercase;
        }
        @keyframes rainbow-shift {
          0% { background-position: 0% 50%; }
          100% { background-position: 100% 50%; }
        }
        
        .glow-text {
          font-size: 2.3rem;
          margin: 0 0 30px 0;
          color: #fff;
          text-shadow: 0 0 10px #66ccff, 0 0 20px #33bbff, 0 0 30px #00aaff;
          font-weight: 600;
          animation: text-glow 3s infinite alternate;
        }
        @keyframes text-glow {
          from { text-shadow: 0 0 10px #66ccff, 0 0 20px #33bbff, 0 0 30px #00aaff; }
          to { text-shadow: 0 0 20px #66ccff, 0 0 40px #33bbff, 0 0 60px #00aaff; }
        }
        
        .blink-text {
          font-size: 1.8rem;
          margin: 0 0 20px 0;
          color: #ffd700;
          text-transform: uppercase;
          letter-spacing: 2px;
          animation: blink 2s ease-in-out infinite;
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        
        .flags-container {
          background: rgba(0, 20, 50, 0.6);
          border-radius: 15px;
          padding: 25px;
          margin-bottom: 30px;
          border: 2px solid rgba(255, 215, 0, 0.5);
          box-shadow: 0 0 15px rgba(255, 215, 0, 0.3);
        }
        
        .flags-list {
          list-style: none;
          padding: 0;
          text-align: left;
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
          gap: 15px;
        }
        
        .flag-item {
          display: flex;
          align-items: center;
          padding: 15px;
          border-radius: 10px;
          transition: all 0.4s;
          position: relative;
          overflow: hidden;
        }
        
        .flag-item-1 { background: linear-gradient(45deg, rgba(255, 105, 97, 0.3), rgba(255, 105, 97, 0.1)); }
        .flag-item-2 { background: linear-gradient(45deg, rgba(174, 198, 207, 0.3), rgba(174, 198, 207, 0.1)); }
        .flag-item-3 { background: linear-gradient(45deg, rgba(119, 221, 119, 0.3), rgba(119, 221, 119, 0.1)); }
        .flag-item-4 { background: linear-gradient(45deg, rgba(253, 253, 150, 0.3), rgba(253, 253, 150, 0.1)); }
        .flag-item-5 { background: linear-gradient(45deg, rgba(178, 159, 229, 0.3), rgba(178, 159, 229, 0.1)); }
        .flag-item-6 { background: linear-gradient(45deg, rgba(236, 155, 223, 0.3), rgba(236, 155, 223, 0.1)); }
        
        .flag-item:hover {
          transform: translateY(-5px) scale(1.02);
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
        }
        
        .flag-item::before {
          content: "";
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
          transition: 0.5s;
        }
        
        .flag-item:hover::before {
          left: 100%;
        }
        
        .flag-icon {
          font-size: 24px;
          margin-right: 15px;
          animation: wave-flag 1s ease-in-out infinite;
        }
        @keyframes wave-flag {
          0%, 100% { transform: rotate(-10deg); }
          50% { transform: rotate(10deg); }
        }
        
        .flag-label {
          color: #ffcc00;
          font-weight: bold;
          margin-right: 10px;
          font-size: 1.1rem;
        }
        
        .flag-value {
          color: #ffffff;
          font-family: 'Courier New', monospace;
          font-size: 1.1rem;
          background: rgba(0, 0, 0, 0.5);
          padding: 5px 10px;
          border-radius: 6px;
          border-left: 3px solid #ffcc00;
        }
        
        .flag-location {
          color: #bbddff;
          font-style: italic;
          font-size: 0.9rem;
          margin-left: 10px;
        }
        
        .success-banner {
          background: linear-gradient(45deg, rgba(50, 200, 100, 0.3), rgba(50, 150, 200, 0.3));
          padding: 20px;
          border-radius: 15px;
          border: 1px solid rgba(255, 255, 255, 0.3);
          margin-bottom: 30px;
        }
        
        .stars {
          display: flex;
          justify-content: center;
          margin: 15px 0;
        }
        
        .star {
          font-size: 30px;
          margin: 0 5px;
          animation: star-pulse 1s ease-in-out infinite;
          animation-delay: calc(var(--i) * 0.2s);
        }
        .star:nth-child(1) { --i: 1; }
        .star:nth-child(2) { --i: 2; }
        .star:nth-child(3) { --i: 3; }
        .star:nth-child(4) { --i: 4; }
        .star:nth-child(5) { --i: 5; }
        
        @keyframes star-pulse {
          0% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.3); opacity: 0.8; }
          100% { transform: scale(1); opacity: 1; }
        }
        
        .victory-message {
          font-size: 1.5rem;
          margin: 15px 0 10px;
          color: #fff;
          text-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
        }
        
        .skill-message {
          font-size: 1.3rem;
          margin: 10px 0;
          color: #ffcc00;
          font-weight: bold;
          text-shadow: 0 0 5px rgba(255, 204, 0, 0.5);
        }
        
        .victory-btn {
          background: linear-gradient(45deg, #ff9900, #ff5500);
          color: #fff;
          border: none;
          padding: 15px 40px;
          border-radius: 50px;
          font-size: 1.3rem;
          font-weight: bold;
          cursor: pointer;
          transition: all 0.3s;
          box-shadow: 0 5px 15px rgba(255, 100, 0, 0.4), 0 0 20px rgba(255, 150, 0, 0.2);
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          position: relative;
          overflow: hidden;
          z-index: 1;
        }
        
        .victory-btn:before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(45deg, #ffcc00, #ff3300);
          opacity: 0;
          transition: 0.5s;
          z-index: -1;
        }
        
        .victory-btn:hover:before {
          opacity: 1;
        }
        
        .victory-btn:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 25px rgba(255, 100, 0, 0.6), 0 0 30px rgba(255, 150, 0, 0.3);
        }
        
        .victory-btn:active {
          transform: translateY(2px);
        }
        
        .btn-icon {
          font-size: 1.4rem;
        }
        
        /* Fireworks effect */
        .fireworks {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 1;
          pointer-events: none;
        }
        
        .firework {
          position: absolute;
          width: 10px;
          height: 10px;
          border-radius: 50%;
          animation: firework 2s ease-out infinite;
        }
        
        .firework:nth-child(1) {
          left: 20%;
          top: 20%;
          animation-delay: 0s;
          background: radial-gradient(circle, #ff0000 0%, transparent 70%);
        }
        
        .firework:nth-child(2) {
          left: 80%;
          top: 30%;
          animation-delay: 0.5s;
          background: radial-gradient(circle, #00ff00 0%, transparent 70%);
        }
        
        .firework:nth-child(3) {
          left: 50%;
          top: 10%;
          animation-delay: 1s;
          background: radial-gradient(circle, #0000ff 0%, transparent 70%);
        }
        
        .firework:nth-child(4) {
          left: 25%;
          top: 60%;
          animation-delay: 1.5s;
          background: radial-gradient(circle, #ffff00 0%, transparent 70%);
        }
        
        .firework:nth-child(5) {
          left: 75%;
          top: 70%;
          animation-delay: 2s;
          background: radial-gradient(circle, #ff00ff 0%, transparent 70%);
        }
        
        @keyframes firework {
          0% {
            transform: scale(0);
            opacity: 1;
            box-shadow: 0 0 0 0 white;
          }
          50% {
            transform: scale(20);
            opacity: 0.8;
          }
          100% {
            transform: scale(40);
            opacity: 0;
          }
        }
        
        .confetti-container {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          overflow: hidden;
          z-index: 1;
          pointer-events: none;
        }
        
        .confetti {
          position: absolute;
          width: 12px;
          height: 12px;
          top: -15px;
          animation: fall linear forwards;
        }
        
        .confetti-0 { background: #ffd700; transform: rotate(0deg); }
        .confetti-1 { background: #ff4081; transform: rotate(36deg); }
        .confetti-2 { background: #00e676; transform: rotate(72deg); }
        .confetti-3 { background: #2979ff; transform: rotate(108deg); }
        .confetti-4 { background: #9c27b0; transform: rotate(144deg); }
        .confetti-5 { background: #ff9800; transform: rotate(180deg); }
        .confetti-6 { background: #03a9f4; transform: rotate(216deg); }
        .confetti-7 { background: #e91e63; transform: rotate(252deg); }
        .confetti-8 { background: #8bc34a; transform: rotate(288deg); }
        .confetti-9 { background: #ff5722; transform: rotate(324deg); }
        
        @keyframes fall {
          0% {
            top: -15px;
            transform: translateX(0) rotate(0deg);
          }
          100% {
            top: 100%;
            transform: translateX(100px) rotate(360deg);
          }
        }
        .admin-container {
          max-width: 900px;
          margin: 0 auto;
          padding: 20px;
          background-color: white;
          color: #333;
          transition: all 0.3s ease;
        }
        .dark-mode {
          background-color: #121212;
          color: #f5f5f5;
        }
        .dark-mode table {
          border-color: #444;
        }
        .dark-mode th, .dark-mode td {
          border-color: #444;
        }
        .dark-mode th {
          background-color: #333;
        }
        .header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 30px;
        }
        .header-controls {
          display: flex;
          align-items: center;
          gap: 20px;
        }
        .theme-toggle {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .switch {
          position: relative;
          display: inline-block;
          width: 60px;
          height: 34px;
        }
        .switch input {
          opacity: 0;
          width: 0;
          height: 0;
        }
        .slider {
          position: absolute;
          cursor: pointer;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: #ccc;
          transition: .4s;
        }
        .slider:before {
          position: absolute;
          content: "";
          height: 26px;
          width: 26px;
          left: 4px;
          bottom: 4px;
          background-color: white;
          transition: .4s;
        }
        input:checked + .slider {
          background-color: #2196F3;
        }
        input:checked + .slider:before {
          transform: translateX(26px);
        }
        .slider.round {
          border-radius: 34px;
        }
        .slider.round:before {
          border-radius: 50%;
        }
        .toggle-label {
          font-size: 14px;
        }
        .logout-btn {
          background: #f44336;
          color: white;
          border: none;
          padding: 8px 15px;
          border-radius: 5px;
          cursor: pointer;
        }
        .users-section {
          margin-top: 20px;
        }
        table {
          width: 100%;
          border-collapse: collapse;
        }
        th, td {
          border: 1px solid #ddd;
          padding: 10px;
          text-align: left;
        }
        th {
          background-color: #f2f2f2;
        }
        .action-btn {
          margin-right: 5px;
          padding: 5px 10px;
          border: none;
          border-radius: 3px;
          cursor: pointer;
        }
        .edit {
          background-color: #2196F3;
          color: white;
        }
        .delete {
          background-color: #f44336;
          color: white;
        }
        .loading {
          text-align: center;
          margin-top: 100px;
          font-size: 1.2rem;
        }
        .hidden-flag {
          color: white;
          background-color: white;
          text-align: center;
          font-size: 2rem;
          font-weight: bold;
          margin-top: 50px;
          padding: 20px;
          border-radius: 5px;
        }
        .dark-mode .hidden-flag {
          color: #f5f5f5;
          background-color: #121212;
        }
      `}</style>
    </div>
  );
}