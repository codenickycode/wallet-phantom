import { useCallback, useMemo, useState } from 'react';
import { getPhantomProvider } from '../getPhantomProvider';
import { Connect, ConnectOpts } from '../types';
import { useAddConnectionListeners } from './useAddConnectionListeners';
import { useAlignConnectionStatus } from './useAlignConnectionStatus';
import { useEagerlyConnectToWallet } from './useEagerlyConnectToWallet';

/**
 * Provides access to Phantom, which injects its provider into the window
 */
export const usePhantom = () => {
  const provider = useMemo(getPhantomProvider, []);
  if (!provider) {
    throw new Error('Phantom provider is not available in the browser');
  }

  const [isConnecting, setIsConnecting] = useState(false);
  const [pubKey, _setPubKey] = useState<string | undefined>();

  const setPubKey = (newPubKey: string | undefined) => {
    _setPubKey(newPubKey);
  };

  /**
   * Attempts to connect to the user's current wallet. On success, will set the
   * new pub key. On error, will set pub key to `undefined`.
   */
  const connect: Connect = useCallback(
    (opts?: ConnectOpts) => {
      if (provider.isConnected && pubKey) {
        console.log('already connected to wallet');
        return;
      }

      setIsConnecting(true);
      provider
        .connect({ onlyIfTrusted: opts?.onlyIfTrusted })
        .then((res) => {
          const newPubKey = res.publicKey.toString();
          if (!newPubKey) {
            throw new Error('connect was successful but pub key was undefined');
          }
          setPubKey(newPubKey);
          opts?.onSuccess?.();
        })
        .catch((error) => {
          console.error(error);
          setPubKey(undefined);
          opts?.onError?.();
        })
        .finally(() => {
          setIsConnecting(false);
        });
    },
    [provider, pubKey]
  );

  /**
   * Disconnects the user's wallet and un-sets the pub key
   */
  const disconnect = useCallback(() => {
    if (!provider.isConnected && !pubKey) {
      console.log('already disconnected from wallet');
      return;
    }

    provider
      .disconnect()
      .then(() => {
        setPubKey(undefined);
      })
      .catch((e) => {
        console.error(e);
      });
  }, [provider, pubKey]);

  useAddConnectionListeners({ provider, connect, disconnect, setPubKey });
  useAlignConnectionStatus({ provider, connect, disconnect, pubKey });
  useEagerlyConnectToWallet({ connect });

  return {
    connect,
    disconnect,
    isConnected: Boolean(provider?.isConnected && pubKey),
    isConnecting,
    pubKey,
    setPubKey,
  };
};
