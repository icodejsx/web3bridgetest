import { Student, Tier, TIER_CONFIGS } from '../types';

export function calculateWeeklyInterest(amount: number, tier: Tier): number {
  const config = TIER_CONFIGS[tier];
  return (amount * config.interestRate) / 100;
}

export function calculateTotalWithdrawal(
  amount: number,
  weeklyInterest: number,
  weeksActive: number
): number {
  return amount + weeklyInterest * weeksActive;
}

export function calculateTotalSavings(students: Student[]): number {
  return students.reduce((total, student) => total + student.amount, 0);
}

export function calculateTotalInterest(students: Student[]): number {
  return students.reduce(
    (total, student) => total + student.weeklyInterest * student.weeksActive,
    0
  );
}

export function validateTierAmount(amount: number, tier: Tier): boolean {
  const config = TIER_CONFIGS[tier];
  return amount === config.amount;
}

export function generateStudentId(): string {
  return `STU-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

