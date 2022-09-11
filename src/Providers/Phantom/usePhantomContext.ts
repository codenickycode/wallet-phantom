import { useContext } from 'react';
import { PhantomContext } from './PhantomProvider';

export function usePhantomContext() {
  const context = useContext(PhantomContext);

  if (!context) {
    throw new Error('usePhantomContext must be used within a PhantomProvider');
  }

  return context;
}
