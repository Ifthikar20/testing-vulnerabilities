import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

export default function Dashboard() {
  const [balance, setBalance] = useState(0);
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [accountNumber, setAccountNumber] = useState('');
  const [transferAmount, setTransferAmount] = useState('');
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('auth_token');
    if (!token) {
      router.push('/');
      return;
    }

    // Vulnerability: Token sent in URL parameter
    axios.get(`/api/account-details?token=${token}`)
      .then(response => {
        setBalance(response.data.balance);
        setAccounts(response.data.accounts);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to load account details:', err);
        localStorage.removeItem('auth_token');
        router.push('/');
      });
  }, [router]);

  const handleTransfer = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('auth_token');
    
    try {
      // Vulnerability: No CSRF protection
      const response = await axios.post('/api/transfer', {
        accountNumber,
        amount: transferAmount
      }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      alert(response.data.message);
      setBalance(prevBalance => prevBalance - parseFloat(transferAmount));
      setAccountNumber('');
      setTransferAmount('');
    } catch (err) {
      alert(err.response?.data?.message || 'Transfer failed');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('auth_token');
    router.push('/');
  };

  if (loading) {
    return <div className="loading">Loading account details...</div>;
  }

  return (
    <div className="dashboard-container">
      <div className="header">
        <h1>Test Bank Dashboard</h1>
        <button onClick={handleLogout} className="logout-btn">Logout</button>
      </div>
      
      <div className="balance-section">
        <h2>Your Balance</h2>
        <div className="balance">${balance.toFixed(2)}</div>
      </div>

      <div className="transfer-section">
        <h2>Transfer Money</h2>
        <form onSubmit={handleTransfer}>
          <div>
            <label>Account Number:</label>
            <input
              type="text"
              value={accountNumber}
              onChange={(e) => setAccountNumber(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Amount:</label>
            <input
              type="number"
              step="0.01"
              min="0.01"
              value={transferAmount}
              onChange={(e) => setTransferAmount(e.target.value)}
              required
            />
          </div>
          <button type="submit">Transfer</button>
        </form>
      </div>

      <div className="accounts-section">
        <h2>Your Accounts</h2>
        <table>
          <thead>
            <tr>
              <th>Account Number</th>
              <th>Type</th>
              <th>Balance</th>
            </tr>
          </thead>
          <tbody>
            {accounts.map(account => (
              <tr key={account.id}>
                <td>{account.number}</td>
                <td>{account.type}</td>
                <td>${account.balance.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Hidden div with flag */}
      <div style={{ display: 'none' }} data-flag="flag_no_2_b7e9c123"></div>

      <style jsx>{`
        .dashboard-container {
          max-width: 800px;
          margin: 0 auto;
          padding: 20px;
        }
        .header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 30px;
        }
        .logout-btn {
          background: #f44336;
          color: white;
          border: none;
          padding: 8px 15px;
          border-radius: 5px;
          cursor: pointer;
        }
        .balance-section {
          background: #f0f8ff;
          padding: 20px;
          border-radius: 5px;
          margin-bottom: 30px;
        }
        .balance {
          font-size: 2rem;
          font-weight: bold;
          color: #0070f3;
        }
        .transfer-section {
          margin-bottom: 30px;
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
        .loading {
          text-align: center;
          margin-top: 100px;
          font-size: 1.2rem;
        }
      `}</style>
    </div>
  );
}