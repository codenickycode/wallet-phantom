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
  const phantom = window.phantom;

  const provider = phantom?.solana.isPhantom && phantom.solana;

  if (!provider) {
    return;
  }

  return provider as IPhantomProvider;
};
