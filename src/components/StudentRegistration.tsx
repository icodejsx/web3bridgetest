import { useState, FormEvent } from 'react';
import { Tier, TIER_CONFIGS } from '../types';
import { calculateWeeklyInterest, calculateTotalWithdrawal } from '../utils/calculations';
import './StudentRegistration.css';

interface StudentRegistrationProps {
  onRegister: (name: string, tier: Tier, amount: number) => { success: boolean; error?: string };
  isFull: boolean;
}

export function StudentRegistration({ onRegister, isFull }: StudentRegistrationProps) {
  const [name, setName] = useState('');
  const [tier, setTier] = useState<Tier>(1);
  const [amount, setAmount] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const selectedTierConfig = TIER_CONFIGS[tier];
  const weeklyInterest = amount
    ? calculateWeeklyInterest(Number(amount), tier)
    : selectedTierConfig.amount * (selectedTierConfig.interestRate / 100);
  const totalWithdrawal = amount
    ? calculateTotalWithdrawal(Number(amount), weeklyInterest, 1)
    : selectedTierConfig.amount + weeklyInterest;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const amountNum = Number(amount);
    if (isNaN(amountNum) || amountNum <= 0) {
      setError('Please enter a valid amount');
      return;
    }

    const result = onRegister(name, tier, amountNum);
    if (result.success) {
      setSuccess('Student registered successfully!');
      setName('');
      setTier(1);
      setAmount('');
      setTimeout(() => setSuccess(''), 3000);
    } else {
      setError(result.error || 'Registration failed');
    }
  };

  const handleTierChange = (newTier: Tier) => {
    setTier(newTier);
    setAmount(TIER_CONFIGS[newTier].amount.toString());
    setError('');
  };

  return (
    <div className="registration-container">
      <h2>Student Registration</h2>
      {isFull && (
        <div className="warning-message">
          ⚠️ The savings group is full. A student must withdraw before a new member can join.
        </div>
      )}
      <form onSubmit={handleSubmit} className="registration-form">
        <div className="form-group">
          <label htmlFor="name">Student Name *</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              setError('');
            }}
            placeholder="Enter student name"
            required
            disabled={isFull}
          />
        </div>

        <div className="form-group">
          <label htmlFor="tier">Savings Tier *</label>
          <div className="tier-selector">
            {([1, 2, 3] as Tier[]).map((t) => (
              <button
                key={t}
                type="button"
                className={`tier-button ${tier === t ? 'active' : ''}`}
                onClick={() => handleTierChange(t)}
                disabled={isFull}
              >
                <div className="tier-label">Tier {t}</div>
                <div className="tier-amount">
                  {TIER_CONFIGS[t].amount.toLocaleString()} NGN
                </div>
                <div className="tier-interest">{TIER_CONFIGS[t].interestRate}% / week</div>
              </button>
            ))}
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="amount">Amount (Naira) *</label>
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={(e) => {
              setAmount(e.target.value);
              setError('');
            }}
            placeholder={`Enter ${selectedTierConfig.amount.toLocaleString()} Naira`}
            required
            disabled={isFull}
            min={0}
            step={1000}
          />
          <small className="hint">
            Tier {tier} requires exactly {selectedTierConfig.amount.toLocaleString()} Naira
          </small>
        </div>

        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">{success}</div>}

        <div className="preview-section">
          <h3>Weekly Preview</h3>
          <div className="preview-grid">
            <div className="preview-item">
              <span className="preview-label">Weekly Interest:</span>
              <span className="preview-value">
                {weeklyInterest.toLocaleString('en-NG', {
                  style: 'currency',
                  currency: 'NGN',
                })}
              </span>
            </div>
            <div className="preview-item">
              <span className="preview-label">Total After 1 Week:</span>
              <span className="preview-value">
                {totalWithdrawal.toLocaleString('en-NG', {
                  style: 'currency',
                  currency: 'NGN',
                })}
              </span>
            </div>
          </div>
        </div>

        <button type="submit" className="submit-button" disabled={isFull}>
          {isFull ? 'Group Full' : 'Register Student'}
        </button>
      </form>
    </div>
  );
}

