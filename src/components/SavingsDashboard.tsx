import { Student } from '../types';
import { calculateTotalSavings, calculateTotalInterest } from '../utils/calculations';
import './SavingsDashboard.css';

interface SavingsDashboardProps {
  students: Student[];
  currentWeek: number;
  onWithdraw: (studentId: string) => void;
}

export function SavingsDashboard({
  students,
  currentWeek,
  onWithdraw,
}: SavingsDashboardProps) {
  const totalSavings = calculateTotalSavings(students);
  const totalInterest = calculateTotalInterest(students);
  const totalWithdrawable = totalSavings + totalInterest;

  const handleWithdraw = (studentId: string, studentName: string) => {
    if (
      window.confirm(
        `Are you sure you want to withdraw ${studentName}'s funds? This will remove them from the group.`
      )
    ) {
      onWithdraw(studentId);
    }
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h2>Savings Dashboard</h2>
        <div className="week-indicator">Week {currentWeek}</div>
      </div>

      <div className="summary-cards">
        <div className="summary-card">
          <div className="card-label">Total Members</div>
          <div className="card-value">{students.length} / 12</div>
        </div>
        <div className="summary-card">
          <div className="card-label">Total Savings</div>
          <div className="card-value">
            {totalSavings.toLocaleString('en-NG', {
              style: 'currency',
              currency: 'NGN',
            })}
          </div>
        </div>
        <div className="summary-card">
          <div className="card-label">Total Interest</div>
          <div className="card-value interest">
            {totalInterest.toLocaleString('en-NG', {
              style: 'currency',
              currency: 'NGN',
            })}
          </div>
        </div>
        <div className="summary-card highlight">
          <div className="card-label">Total Withdrawable</div>
          <div className="card-value highlight-value">
            {totalWithdrawable.toLocaleString('en-NG', {
              style: 'currency',
              currency: 'NGN',
            })}
          </div>
        </div>
      </div>

      <div className="members-section">
        <h3>Member Details</h3>
        {students.length === 0 ? (
          <div className="empty-state">
            <p>No members registered yet. Register a student to get started.</p>
          </div>
        ) : (
          <div className="members-table">
            <div className="table-header">
              <div className="table-cell">Name</div>
              <div className="table-cell">Tier</div>
              <div className="table-cell">Amount</div>
              <div className="table-cell">Weekly Interest</div>
              <div className="table-cell">Weeks Active</div>
              <div className="table-cell">Accumulated Interest</div>
              <div className="table-cell">Total Withdrawal</div>
              <div className="table-cell">Action</div>
            </div>
            {students.map((student) => {
              const accumulatedInterest = student.weeklyInterest * student.weeksActive;
              return (
                <div key={student.id} className="table-row">
                  <div className="table-cell name-cell">
                    <strong>{student.name}</strong>
                  </div>
                  <div className="table-cell">
                    <span className={`tier-badge tier-${student.tier}`}>Tier {student.tier}</span>
                  </div>
                  <div className="table-cell">
                    {student.amount.toLocaleString('en-NG', {
                      style: 'currency',
                      currency: 'NGN',
                    })}
                  </div>
                  <div className="table-cell">
                    {student.weeklyInterest.toLocaleString('en-NG', {
                      style: 'currency',
                      currency: 'NGN',
                    })}
                  </div>
                  <div className="table-cell">{student.weeksActive}</div>
                  <div className="table-cell interest">
                    {accumulatedInterest.toLocaleString('en-NG', {
                      style: 'currency',
                      currency: 'NGN',
                    })}
                  </div>
                  <div className="table-cell total">
                    <strong>
                      {student.totalWithdrawal.toLocaleString('en-NG', {
                        style: 'currency',
                        currency: 'NGN',
                      })}
                    </strong>
                  </div>
                  <div className="table-cell">
                    <button
                      className="withdraw-button"
                      onClick={() => handleWithdraw(student.id, student.name)}
                    >
                      Withdraw
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

