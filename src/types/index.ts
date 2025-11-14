export type Tier = 1 | 2 | 3;

export interface TierConfig {
  tier: Tier;
  amount: number;
  interestRate: number; // Percentage per week
}

export interface Student {
  id: string;
  name: string;
  tier: Tier;
  amount: number;
  weeklyInterest: number;
  totalWithdrawal: number;
  weeksActive: number;
  joinedDate: Date;
}

export interface SavingsGroupState {
  students: Student[];
  currentWeek: number;
  maxMembers: number;
}

export const TIER_CONFIGS: Record<Tier, TierConfig> = {
  1: {
    tier: 1,
    amount: 10000,
    interestRate: 5,
  },
  2: {
    tier: 2,
    amount: 20000,
    interestRate: 10,
  },
  3: {
    tier: 3,
    amount: 30000,
    interestRate: 20,
  },
};

