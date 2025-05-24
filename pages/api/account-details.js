import jwt from 'jsonwebtoken';

const JWT_SECRET = 'insecure_jwt_secret_key';

export default function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  // Vulnerability: Token in URL parameter instead of Authorization header
  const { token } = req.query;

  if (!token) {
    return res.status(401).json({ message: 'Authentication required' });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, JWT_SECRET);
    
    // Different data based on user role
    let userData;
    
    if (decoded.role === 'admin') {
      userData = {
        balance: 100000.00,
        accounts: [
          { id: 1, number: '1234567890', type: 'Checking', balance: 50000.00 },
          { id: 2, number: '0987654321', type: 'Savings', balance: 50000.00 },
          // Hidden admin account with flag
          { id: 3, number: 'ADMIN_SPECIAL', type: 'Secret', balance: 9999999.00, note: 'flag_no_4_d2c1e945' }
        ]
      };
    } else {
      userData = {
        balance: 5000.00,
        accounts: [
          { id: 1, number: '2345678901', type: 'Checking', balance: 3000.00 },
          { id: 2, number: '3456789012', type: 'Savings', balance: 2000.00 }
        ]
      };
    }

    // Vulnerability: no Content-Security-Policy headers
    return res.status(200).json(userData);
  } catch (error) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
}