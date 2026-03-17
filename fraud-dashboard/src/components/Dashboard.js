import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import MLModelStatus from './MLModelStatus';
import ModelDetails from './ModelDetails';
import MLPerformanceChart from './MLPerformanceChart';
import DashboardView from './DashboardView';
import SimulationView from './SimulationView';
import DetectionView from './DetectionView';
import TransactionsView from './TransactionsView';
import SettingsView from './SettingsView';
import Chatbot from './Chatbot';
import axios from 'axios';

const Dashboard = ({ userEmail, onLogout }) => {
  const [activeSection, setActiveSection] = useState('Dashboard');
  const [transactions, setTransactions] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [backendStats, setBackendStats] = useState(null);
  const [highContrast, setHighContrast] = useState(false);

  const API_URL = "http://localhost:5000";

  // Fetch data from MySQL via Backend on mount and periodic refresh
  const fetchData = async () => {
    try {
      const statsRes = await axios.get(`${API_URL}/stats`);
      setBackendStats(statsRes.data);

      const txnRes = await axios.get(`${API_URL}/transactions`);
      const newTransactions = txnRes.data;
      
      // Update transactions state
      setTransactions(newTransactions);
      
      // NOTE: Alerts are now only triggered by user actions (Run Batch / Run Single)
      // to avoid re-alerting on old database records.
    } catch (err) {
      console.error("Error fetching from MySQL backend:", err);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 5000); // Refresh every 5s
    return () => clearInterval(interval);
  }, []);

  const handleNavigate = (section) => {
    setActiveSection(section);
  };

  const handleRunBatch = async (params) => {
    try {
      const res = await axios.post(`${API_URL}/mlBatchCheck`, { ...params, userEmail });
      const newTxns = res.data;
      
      // Trigger alerts for any fraud in this batch
      const newAlerts = newTxns.filter(t => t.status !== 'approved');
      if (newAlerts.length > 0) {
        setAlerts(prev => [...newAlerts, ...prev].slice(0, 20));
      }

      // Refresh data
      setTimeout(() => {
        fetchData();
        setActiveSection('Transactions');
      }, 500);
    } catch (err) {
      console.error("Batch Simulation Error:", err);
    }
  };

  const handleRunSingle = async (data) => {
    try {
      // Connect to REAL ML Backend API which saves to MySQL
      const payload = {
        amount: parseFloat(data.amount),
        is_night: data.isNight ? 1 : 0,
        location: data.location,
        merchant: data.merchant,
        location_risk: data.locationRisk ? 1 : 0, 
        merchant_risk: data.merchantRisk ? 1 : 0,
        velocity_flag: data.velocityRisk ? 1 : 0,
        userEmail: userEmail
      };

      const res = await axios.post(`${API_URL}/mlFraudCheck`, payload);
      const newTxn = res.data;

      // Trigger alert if fraud
      if (newTxn.status !== 'approved') {
        setAlerts(prev => [newTxn, ...prev].slice(0, 20));
      }
      
      // Wait a bit for DB to commit
      setTimeout(() => {
        fetchData();
        setActiveSection('Transactions');
      }, 500);
    } catch (err) {
      console.error("ML API Error:", err);
    }
  };

  const handleClearAlerts = () => {
    setAlerts([]);
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'Dashboard':
        return <DashboardView transactions={transactions} alerts={alerts} onClearAlerts={handleClearAlerts} stats={backendStats} highContrast={highContrast} />;
      case 'Simulation':
        return <SimulationView onRunBatch={handleRunBatch} onRunSingle={handleRunSingle} highContrast={highContrast} />;
      case 'Detection':
        return <DetectionView highContrast={highContrast} />;
      case 'Analytics':
        return (
          <div style={{ padding: '2rem' }}>
            <MLModelStatus stats={backendStats} highContrast={highContrast} />
            <ModelDetails stats={backendStats} highContrast={highContrast} />
            <MLPerformanceChart highContrast={highContrast} />
          </div>
        );
      case 'Transactions':
        return <TransactionsView transactions={transactions} highContrast={highContrast} />;
      case 'Settings':
        return <SettingsView highContrast={highContrast} />;
      default:
        return <DashboardView transactions={transactions} alerts={alerts} onClearAlerts={handleClearAlerts} stats={backendStats} highContrast={highContrast} />;
    }
  };

  const bgGradient = highContrast 
    ? 'black' 
    : 'radial-gradient(circle at top left, #2d0b3a, #0f172a 70%)';

  return (
    <div style={{ display: 'flex', height: '100vh', background: bgGradient, color: 'white', fontFamily: 'Inter, sans-serif', overflow: 'hidden' }}>
      <Sidebar activeSection={activeSection} onNavigate={handleNavigate} userEmail={userEmail} onLogout={onLogout} highContrast={highContrast} />
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column', height: '100vh', position: 'relative', zIndex: 1 }}>
        <Header activeSection={activeSection} alerts={alerts} onClearAlerts={handleClearAlerts} highContrast={highContrast} setHighContrast={setHighContrast} />
        <div style={{ flex: 1, overflowY: 'auto', paddingBottom: '2rem', position: 'relative', zIndex: 1 }}>
          {renderContent()}
        </div>
        <Chatbot highContrast={highContrast} onTriggerSimulation={handleRunBatch} />
      </main>
    </div>
  );
};

export default Dashboard;
