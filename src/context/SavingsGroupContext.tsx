import { createContext, useContext, ReactNode } from 'react';
import { useSavingsGroup } from '../hooks/useSavingsGroup';

interface SavingsGroupContextType {
  students: ReturnType<typeof useSavingsGroup>['students'];
  currentWeek: ReturnType<typeof useSavingsGroup>['currentWeek'];
  maxMembers: ReturnType<typeof useSavingsGroup>['maxMembers'];
  addStudent: ReturnType<typeof useSavingsGroup>['addStudent'];
  removeStudent: ReturnType<typeof useSavingsGroup>['removeStudent'];
  advanceWeek: ReturnType<typeof useSavingsGroup>['advanceWeek'];
  withdrawStudent: ReturnType<typeof useSavingsGroup>['withdrawStudent'];
}

const SavingsGroupContext = createContext<SavingsGroupContextType | undefined>(undefined);

export function SavingsGroupProvider({ children }: { children: ReactNode }) {
  const savingsGroup = useSavingsGroup();

  return (
    <SavingsGroupContext.Provider value={savingsGroup}>
      {children}
    </SavingsGroupContext.Provider>
  );
}

export function useSavingsGroupContext() {
  const context = useContext(SavingsGroupContext);
  if (context === undefined) {
    throw new Error('useSavingsGroupContext must be used within a SavingsGroupProvider');
  }
  return context;
}

