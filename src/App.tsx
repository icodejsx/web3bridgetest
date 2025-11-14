import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { SavingsGroupProvider } from './context/SavingsGroupContext';
import { Navigation } from './components/Navigation';
import { WelcomePage } from './pages/WelcomePage';
import { RegistrationPage } from './pages/RegistrationPage';
import { DashboardPage } from './pages/DashboardPage';
import './App.css';

function App() {
  return (
    <SavingsGroupProvider>
      <BrowserRouter>
        <div className="app">
          <header className="app-header">
            <div className="header-content">
              <h1>💰 Savings Group</h1>
              <p className="subtitle">Web3Bridge Cohort XIV - Play-to-Earn Investment Platform</p>
            </div>
          </header>

          <Navigation />

          <main className="app-main">
            <Routes>
              <Route path="/" element={<WelcomePage />} />
              <Route path="/registration" element={<RegistrationPage />} />
              <Route path="/dashboard" element={<DashboardPage />} />
            </Routes>
            
          </main>

          <footer className="app-footer">
            <p>
              Built for Web3Bridge Cohort XIV Pre-Qualification Exercise | Max 12 Members | 20% ROI
              per Gameplay
            </p>
          </footer>
        </div>
      </BrowserRouter>
    </SavingsGroupProvider>
  );
}

export default App;

