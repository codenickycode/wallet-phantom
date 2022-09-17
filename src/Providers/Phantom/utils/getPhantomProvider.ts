import { IPhantomProvider } from '../types';

/**
 * Retrieves the Phantom provider from the window object
 * @returns a Phantom provider if one exists in the window
 */
export const getPhantomProvider = (): IPhantomProvider | undefined => {
  if (!('phantom' in window)) {
    return;
  }

  // @ts-expect-error phantom is in window
  const provider = window.phantom?.solana;

  if (!provider || !provider.isPhantom) {
    return;
  }

  return provider as IPhantomProvider;
};
