import React, { useState } from 'react';

const TransactionsView = ({ transactions = [] }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const displayTransactions = transactions.length > 0 ? transactions : [
    { id: 'TXN-001', time: '08:23', merchant: 'ElectroMart Online', amount: '$2,340', location: 'New York, US', risk: 82, status: 'flagged' },
    { id: 'TXN-002', time: '08:19', merchant: 'Coffee House', amount: '$16', location: 'London, UK', risk: 8, status: 'approved' },
    { id: 'TXN-003', time: '08:15', merchant: 'Luxury Watches Co', amount: '$8,900', location: 'Dubai, AE', risk: 95, status: 'blocked' },
    { id: 'TXN-004', time: '08:10', merchant: 'FreshMart Grocery', amount: '$120', location: 'Berlin, DE', risk: 5, status: 'approved' },
    { id: 'TXN-005', time: '08:05', merchant: 'Wire Transfer', amount: '$4,500', location: 'Lagos, NG', risk: 73, status: 'flagged' },
    { id: 'TXN-006', time: '07:55', merchant: 'StreamFlix', amount: '$68', location: 'San Francisco, US', risk: 3, status: 'approved' },
    { id: 'TXN-007', time: '07:48', merchant: 'Crypto Exchange Pro', amount: '$12,500', location: 'Singapore, SG', risk: 91, status: 'blocked' },
    { id: 'TXN-008', time: '07:41', merchant: 'AirTravel Bookings', amount: '$350', location: 'Paris, FR', risk: 22, status: 'approved' },
    { id: 'TXN-009', time: '07:32', merchant: 'Unknown Vendor', amount: '$6,700', location: 'Moscow, RU', risk: 88, status: 'flagged' }
  ];

  const filteredTransactions = displayTransactions.filter(txn => 
    txn.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    txn.merchant.toLowerCase().includes(searchTerm.toLowerCase()) ||
    txn.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ padding: '2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>All Transactions</h2>
        <div style={{ position: 'relative' }}>
          <input 
            type="text" 
            placeholder="Search ID, merchant, location..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ 
              padding: '0.625rem 1rem 0.625rem 2.5rem', 
              backgroundColor: '#1e293b', 
              border: '1px solid #334155', 
              borderRadius: '0.5rem', 
              color: 'white',
              width: '300px',
              outline: 'none'
            }} 
          />
          <span style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: '#64748b' }}>🔍</span>
        </div>
      </div>

      <div style={{ backgroundColor: '#1e293b', borderRadius: '1rem', border: '1px solid #334155', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid #334155', backgroundColor: '#0f172a' }}>
              <th style={{ padding: '1rem', color: '#94a3b8', fontSize: '0.75rem', fontWeight: 'bold' }}>ID</th>
              <th style={{ padding: '1rem', color: '#94a3b8', fontSize: '0.75rem', fontWeight: 'bold' }}>TIME</th>
              <th style={{ padding: '1rem', color: '#94a3b8', fontSize: '0.75rem', fontWeight: 'bold' }}>MERCHANT</th>
              <th style={{ padding: '1rem', color: '#94a3b8', fontSize: '0.75rem', fontWeight: 'bold' }}>AMOUNT</th>
              <th style={{ padding: '1rem', color: '#94a3b8', fontSize: '0.75rem', fontWeight: 'bold' }}>LOCATION</th>
              <th style={{ padding: '1rem', color: '#94a3b8', fontSize: '0.75rem', fontWeight: 'bold' }}>RISK</th>
              <th style={{ padding: '1rem', color: '#94a3b8', fontSize: '0.75rem', fontWeight: 'bold' }}>STATUS</th>
            </tr>
          </thead>
          <tbody>
            {filteredTransactions.map((txn, i) => (
              <tr key={i} style={{ borderBottom: '1px solid #1e293b', transition: 'background-color 0.2s' }}>
                <td style={{ padding: '1rem', fontSize: '0.875rem', fontWeight: '500' }}>{txn.id}</td>
                <td style={{ padding: '1rem', fontSize: '0.875rem', color: '#94a3b8' }}>{txn.time}</td>
                <td style={{ padding: '1rem', fontSize: '0.875rem' }}>{txn.merchant}</td>
                <td style={{ padding: '1rem', fontSize: '0.875rem', fontWeight: 'bold' }}>{txn.amount}</td>
                <td style={{ padding: '1rem', fontSize: '0.875rem', color: '#94a3b8' }}>{txn.location}</td>
                <td style={{ padding: '1rem', fontSize: '0.875rem', color: txn.risk > 70 ? '#ef4444' : txn.risk > 30 ? '#f59e0b' : '#10b981', fontWeight: 'bold' }}>{txn.risk}</td>
                <td style={{ padding: '1rem' }}>
                  <span style={{ 
                    fontSize: '0.75rem', 
                    padding: '0.25rem 0.625rem', 
                    borderRadius: '1rem',
                    backgroundColor: txn.status === 'flagged' ? 'rgba(245, 158, 11, 0.1)' : txn.status === 'blocked' ? 'rgba(239, 68, 68, 0.1)' : 'rgba(16, 185, 129, 0.1)',
                    color: txn.status === 'flagged' ? '#f59e0b' : txn.status === 'blocked' ? '#ef4444' : '#10b981',
                    textTransform: 'capitalize'
                  }}>{txn.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredTransactions.length === 0 && (
          <div style={{ padding: '4rem', textAlign: 'center', color: '#64748b' }}>
            No transactions found matching your search.
          </div>
        )}
      </div>
    </div>
  );
};

export default TransactionsView;
