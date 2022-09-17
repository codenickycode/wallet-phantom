import { useEffect } from 'react';
import { Connect } from '../../types';

interface Props {
  connect: Connect;
}

/**
 * On initial mount, will eagerly attempt to connect to
 * the user's wallet if our app is already trusted.
 */
export const useEagerlyConnectToWallet = (props: Props) => {
  const { connect } = props;

  useEffect(() => {
    connect({ onlyIfTrusted: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};
