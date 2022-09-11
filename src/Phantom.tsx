import { usePhantomContext } from './Providers/Phantom';

export const Phantom = () => {
  const { connect, disconnect, isConnected, isConnecting, pubKey } =
    usePhantomContext();

  return (
    <>
      <h1>Provider</h1>
      {isConnecting && <p>Connecting...</p>}
      <p>{isConnected ? 'Connected' : 'Not Connected'}</p>
      <p>Pub key: {pubKey}</p>
      <button onClick={() => connect()}>Connect</button>
      <button onClick={disconnect}>Disconnect</button>
    </>
  );
};
