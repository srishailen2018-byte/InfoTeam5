import React, { useState } from 'react';

const SettingsView = () => {
  const [settings, setSettings] = useState({
    autoBlock: true,
    riskThreshold: 75,
    notifications: true,
    dataRetention: '90 Days',
    apiVersion: 'v2.1.0 (Stable)',
    modelMode: 'Active'
  });

  const handleToggle = (key) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>System Settings</h2>
      <p style={{ color: '#94a3b8', marginBottom: '2rem' }}>Configure global system parameters and security protocols</p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
        <div style={{ backgroundColor: '#1e293b', padding: '1.5rem', borderRadius: '1rem', border: '1px solid #334155' }}>
          <h3 style={{ fontSize: '1rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>Security & Automation</h3>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <p style={{ fontSize: '0.95rem', fontWeight: 'bold', margin: 0 }}>Automatic Blocking</p>
                <p style={{ fontSize: '0.8rem', color: '#94a3b8', margin: 0 }}>Automatically block transactions exceeding risk threshold</p>
              </div>
              <div onClick={() => handleToggle('autoBlock')} style={{ width: '44px', height: '24px', backgroundColor: settings.autoBlock ? '#10b981' : '#334155', borderRadius: '12px', cursor: 'pointer', position: 'relative' }}>
                <div style={{ width: '18px', height: '18px', backgroundColor: 'white', borderRadius: '50%', position: 'absolute', top: '3px', left: settings.autoBlock ? '23px' : '3px', transition: 'left 0.2s' }}></div>
              </div>
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <p style={{ fontSize: '0.95rem', fontWeight: 'bold' }}>Risk Threshold</p>
                <p style={{ fontSize: '0.95rem', color: '#10b981', fontWeight: 'bold' }}>{settings.riskThreshold}%</p>
              </div>
              <input type="range" min="50" max="100" value={settings.riskThreshold} onChange={(e) => setSettings({...settings, riskThreshold: e.target.value})} style={{ width: '100%', accentColor: '#10b981' }} />
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <p style={{ fontSize: '0.95rem', fontWeight: 'bold', margin: 0 }}>System Notifications</p>
                <p style={{ fontSize: '0.8rem', color: '#94a3b8', margin: 0 }}>Receive real-time alerts for high-risk events</p>
              </div>
              <div onClick={() => handleToggle('notifications')} style={{ width: '44px', height: '24px', backgroundColor: settings.notifications ? '#10b981' : '#334155', borderRadius: '12px', cursor: 'pointer', position: 'relative' }}>
                <div style={{ width: '18px', height: '18px', backgroundColor: 'white', borderRadius: '50%', position: 'absolute', top: '3px', left: settings.notifications ? '23px' : '3px', transition: 'left 0.2s' }}></div>
              </div>
            </div>
          </div>
        </div>

        <div style={{ backgroundColor: '#1e293b', padding: '1.5rem', borderRadius: '1rem', border: '1px solid #334155' }}>
          <h3 style={{ fontSize: '1rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>System Information</h3>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #334155', paddingBottom: '0.75rem' }}>
              <p style={{ color: '#94a3b8', margin: 0 }}>API Gateway</p>
              <p style={{ fontWeight: 'bold', margin: 0 }}>{settings.apiVersion}</p>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #334155', paddingBottom: '0.75rem' }}>
              <p style={{ color: '#94a3b8', margin: 0 }}>ML Model Mode</p>
              <span style={{ color: '#10b981', fontWeight: 'bold' }}>{settings.modelMode}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #334155', paddingBottom: '0.75rem' }}>
              <p style={{ color: '#94a3b8', margin: 0 }}>Data Retention</p>
              <p style={{ fontWeight: 'bold', margin: 0 }}>{settings.dataRetention}</p>
            </div>
            <button style={{ width: '100%', padding: '0.75rem', backgroundColor: '#ef4444', color: 'white', border: 'none', borderRadius: '0.5rem', fontWeight: 'bold', cursor: 'pointer', marginTop: '1rem' }}>
              Reset System Cache
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsView;
