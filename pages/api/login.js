import jwt from 'jsonwebtoken';

// Insecure secret key - should be in env variables
const JWT_SECRET = 'insecure_jwt_secret_key';

export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { username, password } = req.body;

  // Vulnerability: Hardcoded credentials
  if (username === 'admin' && password === 'password123') {
    // Create JWT token
    const token = jwt.sign(
      { 
        userId: 1,
        username: username,
        role: 'admin',
        // Vulnerability: Sensitive data in JWT
        ssn: '123-45-6789'
      }, 
      JWT_SECRET,
      { expiresIn: '1h' }
    );

    // Vulnerability: Insecure headers
    res.setHeader('X-Flag', 'flag_no_3_e5f8c314');
    
    // Return token without secure cookie
    return res.status(200).json({ 
      message: 'Login successful',
      token: token
    });
  }
  
  // Basic users with SQL injection vulnerability
  if (username === 'user' && password === 'user123') {
    const token = jwt.sign({ userId: 2, username: username, role: 'user' }, JWT_SECRET, { expiresIn: '1h' });
    return res.status(200).json({ message: 'Login successful', token: token });
  }

  // Simple brute force vulnerability - no rate limiting
  return res.status(401).json({ message: 'Invalid credentials' });
}