import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

export default function Home() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/login', { username, password });
      // Vulnerability: JWT token stored in localStorage (should use httpOnly cookies)
      localStorage.setItem('auth_token', response.data.token);
      
      // Flag in HTTP response header
      console.log('Login successful');
      router.push('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="login-container">
      <h1>Test Bank Login</h1>
      <form onSubmit={handleLogin}>
        {error && <div className="error">{error}</div>}
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
      <div className="hint-link">
        <a href="/treasure-hunt.html" target="_blank">Security Challenge Hints</a>
      </div>
      {/* HTML Comment with hidden flag */}
      {/* flag_no_1_8f4d2a1c */}
      <style jsx>{`
        .login-container {
          max-width: 420px;
          margin: 80px auto;
          padding: 35px;
          border: none;
          border-radius: 12px;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.12);
          background: linear-gradient(to bottom right, #ffffff, #f9f9ff);
          position: relative;
          overflow: hidden;
        }
        .login-container::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 6px;
          background: linear-gradient(to right, #4776E6, #8E54E9);
        }
        h1 {
          color: #2d3748;
          text-align: center;
          margin-bottom: 30px;
          font-size: 32px;
          font-weight: 700;
          letter-spacing: -0.5px;
          position: relative;
        }
        h1::after {
          content: '';
          display: block;
          width: 60px;
          height: 4px;
          background: linear-gradient(to right, #4776E6, #8E54E9);
          margin: 12px auto 0;
          border-radius: 2px;
        }
        .error {
          color: #e53935;
          margin-bottom: 20px;
          padding: 12px;
          background-color: rgba(229, 57, 53, 0.08);
          border-left: 4px solid #e53935;
          border-radius: 4px;
          text-align: left;
          font-weight: 500;
          font-size: 14px;
        }
        label {
          display: block;
          margin-bottom: 8px;
          color: #4a5568;
          font-weight: 600;
          font-size: 15px;
        }
        input {
          width: 100%;
          padding: 14px 16px;
          margin-bottom: 22px;
          border: 1px solid #e2e8f0;
          border-radius: 6px;
          font-size: 16px;
          background-color: #f8fafc;
          transition: all 0.3s;
          color: #2d3748;
        }
        input:focus {
          border-color: #8E54E9;
          outline: none;
          box-shadow: 0 0 0 3px rgba(142, 84, 233, 0.15);
          background-color: #fff;
        }
        button {
          width: 100%;
          background: linear-gradient(to right, #4776E6, #8E54E9);
          color: white;
          border: none;
          padding: 16px;
          border-radius: 6px;
          cursor: pointer;
          font-size: 16px;
          font-weight: 600;
          letter-spacing: 0.5px;
          transition: all 0.3s;
          box-shadow: 0 4px 10px rgba(71, 118, 230, 0.25);
        }
        button:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 15px rgba(71, 118, 230, 0.3);
        }
        button:active {
          transform: translateY(0);
        }
        .hint-link {
          text-align: center;
          margin-top: 20px;
        }
        .hint-link a {
          color: #8E54E9;
          text-decoration: none;
          font-size: 14px;
          transition: all 0.3s;
        }
        .hint-link a:hover {
          text-decoration: underline;
          color: #4776E6;
        }
      `}</style>
    </div>
  );
}