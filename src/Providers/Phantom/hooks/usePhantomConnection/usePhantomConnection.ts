import { useCallback, useState } from 'react';
import { Connect, ConnectOpts, IPhantomProvider } from '../../types';
import { useAddConnectionListeners } from './useAddConnectionListeners';
import { useAlignConnectionStatus } from './useAlignConnectionStatus';
import { useEagerlyConnectToWallet } from './useEagerlyConnectToWallet';

interface Props {
  provider: IPhantomProvider;
}

interface PhantomConnection {
  /** Attempts to connect to the user's current wallet. On success, will set the
   * new pub key. On error, will set pub key to `undefined`. */
  connect: Connect;
  /** Disconnects the user's wallet and un-sets the pub key */
  disconnect: () => void;
  /** Indicates the provider is connected and our app has a `pubKey` */
  isConnected: boolean;
  /** True while attempting to connect to the providers current wallet */
  isConnecting: boolean;
  /** The currently connected wallet's public key */
  pubKey: string | undefined;
  /** A handler for setting the `pubKey` */
  setPubKey: (newPubKey: string | undefined) => void;
}

/**
 * A hook to manage connection to the Phantom provider
 */
export const usePhantomConnection = ({
  provider,
}: Props): PhantomConnection => {
  const [isConnecting, setIsConnecting] = useState(false);
  const [pubKey, _setPubKey] = useState<string | undefined>();

  const setPubKey = (newPubKey: string | undefined) => {
    _setPubKey(newPubKey);
  };

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
