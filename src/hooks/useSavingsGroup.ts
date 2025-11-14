import { useState, useCallback } from 'react';
import { Student, Tier, SavingsGroupState } from '../types';
import {
  calculateWeeklyInterest,
  calculateTotalWithdrawal,
  validateTierAmount,
  generateStudentId,
} from '../utils/calculations';

const MAX_MEMBERS = 12;
const INITIAL_WEEK = 1;

export function useSavingsGroup() {
  const [state, setState] = useState<SavingsGroupState>({
    students: [],
    currentWeek: INITIAL_WEEK,
    maxMembers: MAX_MEMBERS,
  });

  const addStudent = useCallback(
    (name: string, tier: Tier, amount: number): { success: boolean; error?: string } => {
      // Validate name
      if (!name.trim()) {
        return { success: false, error: 'Name is required' };
      }

      // Check if group is full
      if (state.students.length >= state.maxMembers) {
        return { success: false, error: 'Savings group is full (12 members maximum)' };
      }

      // Validate tier amount
      if (!validateTierAmount(amount, tier)) {
        const expectedAmount = tier === 1 ? 10000 : tier === 2 ? 20000 : 30000;
        return {
          success: false,
          error: `Tier ${tier} requires exactly ${expectedAmount.toLocaleString()} Naira`,
        };
      }

      // Check if name already exists
      if (state.students.some((s) => s.name.toLowerCase() === name.toLowerCase().trim())) {
        return { success: false, error: 'A student with this name already exists' };
      }

      const weeklyInterest = calculateWeeklyInterest(amount, tier);
      const totalWithdrawal = calculateTotalWithdrawal(amount, weeklyInterest, 0);

      const newStudent: Student = {
        id: generateStudentId(),
        name: name.trim(),
        tier,
        amount,
        weeklyInterest,
        totalWithdrawal,
        weeksActive: 0,
        joinedDate: new Date(),
      };

      setState((prev) => ({
        ...prev,
        students: [...prev.students, newStudent],
      }));

      return { success: true };
    },
    [state.students.length, state.maxMembers]
  );

  const removeStudent = useCallback((studentId: string) => {
    setState((prev) => ({
      ...prev,
      students: prev.students.filter((s) => s.id !== studentId),
    }));
  }, []);

  const advanceWeek = useCallback(() => {
    setState((prev) => {
      const updatedStudents = prev.students.map((student) => {
        const newWeeksActive = student.weeksActive + 1;
        const newTotalWithdrawal = calculateTotalWithdrawal(
          student.amount,
          student.weeklyInterest,
          newWeeksActive
        );

        return {
          ...student,
          weeksActive: newWeeksActive,
          totalWithdrawal: newTotalWithdrawal,
        };
      });

      return {
        ...prev,
        students: updatedStudents,
        currentWeek: prev.currentWeek + 1,
      };
    });
  }, []);

  const withdrawStudent = useCallback(
    (studentId: string): { success: boolean; withdrawalAmount?: number } => {
      const student = state.students.find((s) => s.id === studentId);
      if (!student) {
        return { success: false };
      }

      const withdrawalAmount = student.totalWithdrawal;
      removeStudent(studentId);

      return { success: true, withdrawalAmount };
    },
    [state.students, removeStudent]
  );

  return {
    students: state.students,
    currentWeek: state.currentWeek,
    maxMembers: state.maxMembers,
    addStudent,
    removeStudent,
    advanceWeek,
    withdrawStudent,
  };
}

