import { Phantom, usePhantom } from './usePhantom';
import { renderHook } from '@testing-library/react';

import { IPhantomProvider } from '../types';
import { defaultProvider, defaultPublicKey } from '../test';

describe('when provider is undefined', () => {
  test('should throw error', () => {
    expect(() =>
      renderHook(usePhantom, { initialProps: undefined })
    ).toThrowError(
      new Error('Phantom provider is not available in the browser')
    );
  });
});

describe('when provider is defined', () => {
  let result: Phantom;
  beforeEach(() => {
    result = renderHook<Phantom, IPhantomProvider | undefined>(usePhantom, {
      initialProps: {
        ...defaultProvider,
        isConnected: true,
        publicKey: defaultPublicKey,
      },
    }).result.current;
  });
  test('connection should be defined', async () => {
    expect(result.connection).toBeDefined();
  });
});
