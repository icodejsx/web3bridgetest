import './WeekControls.css';

interface WeekControlsProps {
  currentWeek: number;
  onAdvanceWeek: () => void;
  hasMembers: boolean;
}

export function WeekControls({ currentWeek, onAdvanceWeek, hasMembers }: WeekControlsProps) {
  return (
    <div className="week-controls-container">
      <div className="week-info">
        <h3>Weekly Progress</h3>
        <p className="week-description">
          Advance the week to simulate interest accumulation for all members. Each member's
          accumulated interest and total withdrawal amount will be updated.
        </p>
      </div>
      <div className="week-controls">
        <div className="current-week-display">
          <span className="week-label">Current Week:</span>
          <span className="week-number">{currentWeek}</span>
        </div>
        <button
          className="advance-button"
          onClick={onAdvanceWeek}
          disabled={!hasMembers}
          title={!hasMembers ? 'Add at least one member to advance weeks' : ''}
        >
          Advance to Week {currentWeek + 1}
        </button>
      </div>
    </div>
  );
}

