import { useState } from 'react';
import { useSavingsGroupContext } from '../context/SavingsGroupContext';
import { SavingsDashboard } from '../components/SavingsDashboard';
import './Pages.css';

export function DashboardPage() {
  const {
    students,
    currentWeek,
    withdrawStudent,
  } = useSavingsGroupContext();

  const [withdrawalMessage, setWithdrawalMessage] = useState<{
    type: 'success' | 'error';
    message: string;
  } | null>(null);

  const handleWithdraw = (studentId: string) => {
    const result = withdrawStudent(studentId);
    if (result.success && result.withdrawalAmount !== undefined) {
      setWithdrawalMessage({
        type: 'success',
        message: `Successfully withdrew ${result.withdrawalAmount.toLocaleString('en-NG', {
          style: 'currency',
          currency: 'NGN',
        })}. The student has been removed from the group.`,
      });
      setTimeout(() => setWithdrawalMessage(null), 5000);
    } else {
      setWithdrawalMessage({
        type: 'error',
        message: 'Withdrawal failed. Please try again.',
      });
      setTimeout(() => setWithdrawalMessage(null), 5000);
    }
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>📊 Savings Dashboard</h1>
        <p className="page-description">
          View total savings, member contributions, accumulated interests, and manage withdrawals.
        </p>
      </div>

      {withdrawalMessage && (
        <div
          className={`notification ${
            withdrawalMessage.type === 'success' ? 'success' : 'error'
          }`}
        >
          {withdrawalMessage.message}
        </div>
      )}

      <SavingsDashboard
        students={students}
        currentWeek={currentWeek}
        onWithdraw={handleWithdraw}
      />
    </div>
  );
}

