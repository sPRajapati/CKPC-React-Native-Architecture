import type { ReactNode } from 'react';
import { Screen } from './Screen';

export const MainTemplate = ({ children }: { children: ReactNode }) => (
  <Screen>{children}</Screen>
);
