import { useState } from 'react';
import { useSavingsGroupContext } from '../context/SavingsGroupContext';
import { StudentRegistration } from '../components/StudentRegistration';
import { WeekControls } from '../components/WeekControls';
import './Pages.css';

export function RegistrationPage() {
  const {
    students,
    currentWeek,
    maxMembers,
    addStudent,
    advanceWeek,
  } = useSavingsGroupContext();

  const [successMessage, setSuccessMessage] = useState('');

  const handleRegister = (name: string, tier: 1 | 2 | 3, amount: number) => {
    const result = addStudent(name, tier, amount);
    if (result.success) {
      setSuccessMessage('Student registered successfully!');
      setTimeout(() => setSuccessMessage(''), 3000);
    }
    return result;
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h1> Student Registration</h1>
        <p className="page-description color-white text-white!important">
          Register new students to join the savings group. Select a tier and enter the correct
          amount to get started.
        </p>
      </div>

      {successMessage && (
        <div className="notification success">{successMessage}</div>
      )}

      <StudentRegistration
        onRegister={handleRegister}
        isFull={students.length >= maxMembers}
      />

      <WeekControls
        currentWeek={currentWeek}
        onAdvanceWeek={advanceWeek}
        hasMembers={students.length > 0}
      />
    </div>
  );
}

