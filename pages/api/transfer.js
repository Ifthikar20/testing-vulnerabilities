import jwt from 'jsonwebtoken';

const JWT_SECRET = 'insecure_jwt_secret_key';

export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  // Extract token from Authorization header
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Authentication required' });
  }

  const token = authHeader.split(' ')[1];

  try {
    // Verify token
    const decoded = jwt.verify(token, JWT_SECRET);
    
    const { accountNumber, amount } = req.body;
    
    // Vulnerability: No input validation
    if (!accountNumber || !amount) {
      return res.status(400).json({ message: 'Account number and amount are required' });
    }
    
    // Vulnerability: No additional authorization checks for transfers
    // Should check if the account belongs to the user

    // Vulnerability: XSS in response - directly reflecting user input
    // Flag embedded in response
    return res.status(200).json({ 
      message: `Transfer of $${amount} to account ${accountNumber} successful!`,
      transactionId: `TXN-${Math.random().toString(36).substr(2, 9)}`,
      // Special flag for completing a transfer
      flag: "flag_no_5_a9f3b721",
      note: `Transaction processed by: ${decoded.username}`
    });
  } catch (error) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
}