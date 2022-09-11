import { useMemo } from 'react';
import { getPhantomProvider } from '../utils';
import { usePhantomConnection } from './usePhantomConnection';

/**
 * Provides access to Phantom, which injects its provider into the window
 */
export const usePhantom = () => {
  const provider = useMemo(getPhantomProvider, []);
  if (!provider) {
    throw new Error('Phantom provider is not available in the browser');
  }

  const connection = usePhantomConnection({ provider });

  return { ...connection };
};
