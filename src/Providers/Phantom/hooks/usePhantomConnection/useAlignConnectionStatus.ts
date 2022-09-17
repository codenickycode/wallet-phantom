import { useEffect } from 'react';
import { Connect, IPhantomProvider } from '../../types';

interface Props {
  provider: IPhantomProvider;
  connect: Connect;
  disconnect: () => void;
  pubKey: string | undefined;
}

/**
 * A subscription to `provider.isConnected` and `pubKey`. If these do not align,
 * it will attempt to connect. If that is not successful it will call
 * `disconnect`.
 */
export const useAlignConnectionStatus = (props: Props) => {
  const { provider, connect, disconnect, pubKey } = props;

  useEffect(() => {
    if (
      (!provider.isConnected && pubKey) ||
      (provider.isConnected && !pubKey)
    ) {
      connect({ onlyIfTrusted: true, onError: disconnect });
    }
  }, [provider, connect, disconnect, pubKey]);
};
