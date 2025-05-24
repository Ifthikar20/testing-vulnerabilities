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
      {/* HTML Comment with hidden flag */}
      {/* flag_no_1_8f4d2a1c */}
      <style jsx>{`
        .login-container {
          max-width: 400px;
          margin: 100px auto;
          padding: 20px;
          border: 1px solid #ddd;
          border-radius: 5px;
        }
        .error {
          color: red;
          margin-bottom: 10px;
        }
        label {
          display: block;
          margin-bottom: 5px;
        }
        input {
          width: 100%;
          padding: 8px;
          margin-bottom: 15px;
        }
        button {
          background: #0070f3;
          color: white;
          border: none;
          padding: 10px 15px;
          border-radius: 5px;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
}