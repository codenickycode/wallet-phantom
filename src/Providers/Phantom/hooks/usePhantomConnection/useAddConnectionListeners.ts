import { PublicKey } from '@solana/web3.js';
import { useEffect } from 'react';
import { Connect, IPhantomProvider } from '../../types';

interface Props {
  provider: IPhantomProvider;
  connect: Connect;
  disconnect: () => void;
  setPubKey: (newKey: string | undefined) => void;
}

/**
 * Adds connection listeners on initial mount.
 */
export const useAddConnectionListeners = (props: Props) => {
  const { provider, connect, disconnect, setPubKey } = props;

  useEffect(() => {
    provider.on('connect', (newPubKey) => {
      console.log(`connected to wallet with account ${newPubKey}`);
      setPubKey(newPubKey);
    });

    // NOTE: This is not firing on "Revoke"
    provider.on('disconnect', () => {
      console.log('wallet disconnected');
      setPubKey(undefined);
    });

    provider.on('accountChanged', (newPubKey: PublicKey | undefined) => {
      if (newPubKey) {
        const newPubKeyString = newPubKey.toString();
        console.log(`connection switched to account ${newPubKeyString}`);
        setPubKey(newPubKeyString);
      } else {
        // Something went wrong, attempt to reconnect to provider
        connect({ onlyIfTrusted: true, onError: disconnect });
      }
    });

    return () => {
      try {
        // @ts-expect-error we are not provided a method to cleanup events
        provider._events &&
          // @ts-expect-error but we should try :)
          Object.values(provider._events).forEach((event: Array<unknown>) => {
            event.length = 0;
          });
      } catch (e) {
        console.error('unable to cleanup events');
      }
    };
  }, [connect, disconnect, provider, setPubKey]);
};
