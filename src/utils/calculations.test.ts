import { describe, it, expect } from 'vitest';
import {
  calculateWeeklyInterest,
  calculateTotalWithdrawal,
  calculateTotalSavings,
  calculateTotalInterest,
  validateTierAmount,
} from './calculations';
import { Student } from '../types';

describe('calculations', () => {
  describe('calculateWeeklyInterest', () => {
    it('should calculate correct interest for Tier 1 (5%)', () => {
      expect(calculateWeeklyInterest(10000, 1)).toBe(500);
    });

    it('should calculate correct interest for Tier 2 (10%)', () => {
      expect(calculateWeeklyInterest(20000, 2)).toBe(2000);
    });

    it('should calculate correct interest for Tier 3 (20%)', () => {
      expect(calculateWeeklyInterest(30000, 3)).toBe(6000);
    });
  });

  describe('calculateTotalWithdrawal', () => {
    it('should calculate total withdrawal correctly', () => {
      const amount = 10000;
      const weeklyInterest = 500;
      const weeksActive = 3;
      const expected = amount + weeklyInterest * weeksActive;
      expect(calculateTotalWithdrawal(amount, weeklyInterest, weeksActive)).toBe(expected);
    });

    it('should return original amount when weeksActive is 0', () => {
      expect(calculateTotalWithdrawal(10000, 500, 0)).toBe(10000);
    });
  });

  describe('calculateTotalSavings', () => {
    it('should calculate total savings from all students', () => {
      const students: Student[] = [
        {
          id: '1',
          name: 'John',
          tier: 1,
          amount: 10000,
          weeklyInterest: 500,
          totalWithdrawal: 10000,
          weeksActive: 0,
          joinedDate: new Date(),
        },
        {
          id: '2',
          name: 'Jane',
          tier: 2,
          amount: 20000,
          weeklyInterest: 2000,
          totalWithdrawal: 20000,
          weeksActive: 0,
          joinedDate: new Date(),
        },
      ];
      expect(calculateTotalSavings(students)).toBe(30000);
    });

    it('should return 0 for empty array', () => {
      expect(calculateTotalSavings([])).toBe(0);
    });
  });

  describe('calculateTotalInterest', () => {
    it('should calculate total interest from all students', () => {
      const students: Student[] = [
        {
          id: '1',
          name: 'John',
          tier: 1,
          amount: 10000,
          weeklyInterest: 500,
          totalWithdrawal: 11500,
          weeksActive: 3,
          joinedDate: new Date(),
        },
        {
          id: '2',
          name: 'Jane',
          tier: 2,
          amount: 20000,
          weeklyInterest: 2000,
          totalWithdrawal: 24000,
          weeksActive: 2,
          joinedDate: new Date(),
        },
      ];
      expect(calculateTotalInterest(students)).toBe(5500); // 500*3 + 2000*2
    });
  });

  describe('validateTierAmount', () => {
    it('should validate Tier 1 amount correctly', () => {
      expect(validateTierAmount(10000, 1)).toBe(true);
      expect(validateTierAmount(20000, 1)).toBe(false);
      expect(validateTierAmount(5000, 1)).toBe(false);
    });

    it('should validate Tier 2 amount correctly', () => {
      expect(validateTierAmount(20000, 2)).toBe(true);
      expect(validateTierAmount(10000, 2)).toBe(false);
      expect(validateTierAmount(30000, 2)).toBe(false);
    });

    it('should validate Tier 3 amount correctly', () => {
      expect(validateTierAmount(30000, 3)).toBe(true);
      expect(validateTierAmount(20000, 3)).toBe(false);
      expect(validateTierAmount(40000, 3)).toBe(false);
    });
  });
});

