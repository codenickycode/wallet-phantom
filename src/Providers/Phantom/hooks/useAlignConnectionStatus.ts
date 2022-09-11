import { useEffect } from 'react';
import { getPhantomProvider } from '../getPhantomProvider';
import { Connect } from '../types';

interface Props {
  connect: Connect;
  disconnect: () => void;
  pubKey: string | undefined;
}

/**
 * A subscription to `provider.isConnected` and `pubKey`. If these do not align,
 * it will attempt to connect. If that is not successful it will call
 * `disconnect`.
 */
export function useAlignConnectionStatus(props: Props) {
  const { connect, disconnect, pubKey } = props;

  useEffect(() => {
    const provider = getPhantomProvider();
    if (!provider) return;

    if (
      (!provider.isConnected && pubKey) ||
      (provider.isConnected && !pubKey)
    ) {
      connect({ onlyIfTrusted: true, onError: disconnect });
    }
  }, [connect, disconnect, pubKey]);
}
