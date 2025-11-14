import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useSavingsGroup } from './useSavingsGroup';

describe('useSavingsGroup', () => {
  it('should initialize with empty students array', () => {
    const { result } = renderHook(() => useSavingsGroup());
    expect(result.current.students).toEqual([]);
    expect(result.current.currentWeek).toBe(1);
    expect(result.current.maxMembers).toBe(12);
  });

  it('should add a student successfully', () => {
    const { result } = renderHook(() => useSavingsGroup());

    act(() => {
      const response = result.current.addStudent('John Doe', 1, 10000);
      expect(response.success).toBe(true);
    });

    expect(result.current.students).toHaveLength(1);
    expect(result.current.students[0].name).toBe('John Doe');
    expect(result.current.students[0].tier).toBe(1);
    expect(result.current.students[0].amount).toBe(10000);
  });

  it('should reject student with invalid tier amount', () => {
    const { result } = renderHook(() => useSavingsGroup());

    act(() => {
      const response = result.current.addStudent('John Doe', 1, 20000);
      expect(response.success).toBe(false);
      expect(response.error).toContain('Tier 1 requires exactly');
    });

    expect(result.current.students).toHaveLength(0);
  });

  it('should reject student when group is full', () => {
    const { result } = renderHook(() => useSavingsGroup());

    // Add 12 students
    act(() => {
      for (let i = 0; i < 12; i++) {
        result.current.addStudent(`Student ${i}`, 1, 10000);
      }
    });

    expect(result.current.students).toHaveLength(12);

    // Try to add 13th student
    act(() => {
      const response = result.current.addStudent('Extra Student', 1, 10000);
      expect(response.success).toBe(false);
      expect(response.error).toContain('full');
    });

    expect(result.current.students).toHaveLength(12);
  });

  it('should advance week and update student interests', () => {
    const { result } = renderHook(() => useSavingsGroup());

    act(() => {
      result.current.addStudent('John Doe', 1, 10000);
    });

    const initialTotal = result.current.students[0].totalWithdrawal;

    act(() => {
      result.current.advanceWeek();
    });

    expect(result.current.currentWeek).toBe(2);
    expect(result.current.students[0].weeksActive).toBe(1);
    expect(result.current.students[0].totalWithdrawal).toBeGreaterThan(initialTotal);
  });

  it('should withdraw student and remove from group', () => {
    const { result } = renderHook(() => useSavingsGroup());

    act(() => {
      result.current.addStudent('John Doe', 1, 10000);
    });

    const studentId = result.current.students[0].id;

    act(() => {
      const response = result.current.withdrawStudent(studentId);
      expect(response.success).toBe(true);
      expect(response.withdrawalAmount).toBeDefined();
    });

    expect(result.current.students).toHaveLength(0);
  });
});

