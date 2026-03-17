import React from 'react';

const Sidebar = ({ activeSection, onNavigate, userEmail, onLogout, highContrast }) => {
  const menuItems = [
    { name: 'Dashboard', icon: '📊' },
    { name: 'Simulation', icon: '⚡' },
    { name: 'Detection', icon: '🛡️' },
    { name: 'Analytics', icon: '📈' },
    { name: 'Transactions', icon: '💸' },
    { name: 'Settings', icon: '⚙️' }
  ];

  return (
    <aside style={{ 
      width: '260px', 
      backgroundColor: highContrast ? 'black' : 'transparent', 
      padding: '1.5rem', 
      display: 'flex', 
      flexDirection: 'column',
      borderRight: highContrast ? '2px solid white' : '1px solid #1e293b'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2.5rem', paddingLeft: '0.5rem' }}>
        <div style={{ width: '32px', height: '32px', backgroundColor: '#10b981', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 'bold' }}>F</div>
        <h1 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: 'white', margin: 0 }}>FraudShield</h1>
      </div>
      
      <nav style={{ flex: 1 }}>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          {menuItems.map(item => (
            <li key={item.name} style={{ marginBottom: '0.5rem' }}>
              <button 
                onClick={() => onNavigate(item.name)}
                style={{ 
                  width: '100%',
                  textAlign: 'left',
                  border: highContrast && activeSection === item.name ? '2px solid white' : 'none',
                  cursor: 'pointer',
                  color: activeSection === item.name ? '#10b981' : (highContrast ? 'white' : '#94a3b8'), 
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  padding: '0.75rem 1rem', 
                  borderRadius: '0.75rem', 
                  backgroundColor: activeSection === item.name ? 'rgba(16, 185, 129, 0.1)' : 'transparent',
                  transition: 'all 0.2s',
                  fontSize: '0.95rem',
                  fontWeight: activeSection === item.name ? '600' : '400'
                }}
              >
                <span className="icon-glow" style={{ fontSize: '1.1rem' }}>{item.icon}</span>
                {item.name}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div style={{ padding: '1rem', backgroundColor: highContrast ? 'black' : '#1e293b', border: highContrast ? '1px solid white' : 'none', borderRadius: '0.75rem' }}>
          <p style={{ fontSize: '0.75rem', color: highContrast ? 'white' : '#64748b', marginBottom: '0.25rem' }}>Logged in as</p>
          <p style={{ fontSize: '0.875rem', color: 'white', fontWeight: 'bold', overflow: 'hidden', textOverflow: 'ellipsis' }}>{userEmail}</p>
        </div>
        
        <button 
          onClick={onLogout}
          style={{
            width: '100%',
            padding: '0.75rem',
            backgroundColor: highContrast ? 'white' : 'rgba(239, 68, 68, 0.1)',
            color: highContrast ? 'black' : '#ef4444',
            border: highContrast ? 'none' : '1px solid rgba(239, 68, 68, 0.2)',
            borderRadius: '0.75rem',
            cursor: 'pointer',
            fontWeight: 'bold',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem'
          }}
        >
          <span>🚪</span> Logout
        </button>

        <div style={{ padding: '1rem', backgroundColor: highContrast ? 'black' : '#1e293b', border: highContrast ? '1px solid white' : 'none', borderRadius: '0.75rem' }}>
          <p style={{ fontSize: '0.75rem', color: highContrast ? 'white' : '#64748b', marginBottom: '0.25rem' }}>Model Status</p>
          <p style={{ fontSize: '0.875rem', color: '#10b981', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#10b981' }}></span>
            Operational
          </p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
