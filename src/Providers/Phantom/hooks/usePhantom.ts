import { useMemo } from 'react';
import { IPhantomProvider } from '../types';
import { getPhantomProvider } from '../utils';
import { usePhantomConnection } from './usePhantomConnection';

export interface Phantom {
  connection: ReturnType<typeof usePhantomConnection>;
}

/**
 * Provides access to Phantom, which injects its provider into the window
 */
export const usePhantom = (providerOverride?: IPhantomProvider): Phantom => {
  const provider = useMemo(
    () => providerOverride || getPhantomProvider(),
    [providerOverride]
  );

  if (!provider) {
    throw new Error('Phantom provider is not available in the browser');
  }

  const connection = usePhantomConnection({ provider });

  return { connection };
};
