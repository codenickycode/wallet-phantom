import { PublicKey } from '@solana/web3.js';
import { IPhantomProvider } from '../types';

export const defaultPublicKey = new PublicKey(
  'GpttPUFXc1xiEhcq4qGCXtR678MSf3N4UVGz9rUMT7UJ'
);

export const defaultProvider: IPhantomProvider = {
  isPhantom: true,
  isConnected: true,
  publicKey: defaultPublicKey,
  on: jest.fn(),
  connect: jest
    .fn()
    .mockReturnValue(Promise.resolve({ publicKey: defaultPublicKey })),
  disconnect: jest.fn().mockReturnValue(Promise.resolve(undefined)),
  signAndSendTransaction: jest.fn(),
  signTransaction: jest.fn(),
  signAllTransactions: jest.fn(),
  signMessage: jest.fn(),
  request: jest.fn(),
};
