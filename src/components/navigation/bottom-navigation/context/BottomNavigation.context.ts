import { createContext } from 'react'

export type BottomNavigationContextValue = {
  value: string | undefined;
  onValueChange: (value: string) => void;
};

export const BottomNavigationContext =
  createContext<BottomNavigationContextValue | null>(null)
