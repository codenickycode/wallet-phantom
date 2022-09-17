import { IPhantomProvider } from '../types';
import { getPhantomProvider } from './getPhantomProvider';

type MaybePhantom = { solana?: Partial<IPhantomProvider> };

const originalWindow = window;

function setup(phantom?: MaybePhantom) {
  if (phantom)
    Object.defineProperty(window, 'phantom', {
      value: phantom,
      writable: true,
    });
}

function cleanup() {
  window = originalWindow;
}

function call(phantom?: MaybePhantom) {
  setup(phantom);
  return getPhantomProvider();
}

describe('getPhantomProvider', () => {
  afterEach(cleanup);
  describe('if phantom is not in window', () => {
    test('should return undefined', () => {
      expect(call()).toBeUndefined();
    });
  });

  describe('if solana is not in phantom', () => {
    test('should return undefined', () => {
      expect(call({})).toBeUndefined();
    });
  });

  describe('if isPhantom is false', () => {
    test('should return undefined', () => {
      const solana = { isPhantom: false, id: 'solanaProvider' };
      expect(call({ solana })).toBeUndefined();
    });
  });

  describe('if isPhantom is true', () => {
    test('should return solana provider', () => {
      const solana = { isPhantom: true, id: 'solanaProvider' };
      expect(call({ solana })).toEqual(solana);
    });
  });
});
