import { Link } from 'react-router-dom';
import './WelcomePage.css';

export function WelcomePage() {
  return (
    <div className="welcome-container">
      <div className="welcome-content">
        {/* <div className="welcome-icon">💰</div> */}
        <h1 className="welcome-title">Welcome to Savings Group</h1>
        <p className="welcome-subtitle">
          Web3Bridge Cohort XIV - Play-to-Earn Investment Platform
        </p>
        <p className="welcome-description">
          Join 12 students in a collaborative savings group designed to maximize your investment
          returns. Choose your tier, track your weekly interest, and watch your savings grow!
        </p>

        <div className="welcome-features">
          <div className="feature-card">
            <div className="feature-icon">📝</div>
            <h3>Easy Registration</h3>
            <p>Select your savings tier and register in minutes</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📊</div>
            <h3>Track Progress</h3>
            <p>Monitor your savings and accumulated interest</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">💸</div>
            <h3>Flexible Withdrawal</h3>
            <p>Withdraw your funds anytime with accumulated interest</p>
          </div>
        </div>

        <div className="welcome-tiers">
          <h3>Choose Your Savings Tier</h3>
          <div className="tiers-grid">
            <div className="tier-card">
              <div className="tier-number">Tier 1</div>
              <div className="tier-amount">₦10,000</div>
              <div className="tier-interest">5% per week</div>
            </div>
            <div className="tier-card">
              <div className="tier-number">Tier 2</div>
              <div className="tier-amount">₦20,000</div>
              <div className="tier-interest">10% per week</div>
            </div>
            <div className="tier-card">
              <div className="tier-number">Tier 3</div>
              <div className="tier-amount">₦30,000</div>
              <div className="tier-interest">20% per week</div>
            </div>
          </div>
        </div>

        <div className="welcome-actions">
          <Link to="/registration" className="welcome-button primary">
            Get Started
          </Link>
          <Link to="/dashboard" className="welcome-button secondary">
            View Dashboard
          </Link>
        </div>

        <p className="welcome-note">
          Maximum 12 members allowed. Join now to secure your spot!
        </p>
      </div>
    </div>
  );
}

