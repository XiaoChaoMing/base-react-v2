import { ReactNode } from 'react';
import { QueryProvider } from './QueryProvider';
import { AuthProvider } from './AuthProvider';

interface AppProviderProps {
  children: ReactNode;
}

/**
 * AppProvider combines all application providers in the correct order.
 * Order matters: QueryProvider should wrap AuthProvider since auth might use queries.
 */
export const AppProvider = ({ children }: AppProviderProps) => {
  return (
    <QueryProvider>
      <AuthProvider>
        {children}
      </AuthProvider>
    </QueryProvider>
  );
};