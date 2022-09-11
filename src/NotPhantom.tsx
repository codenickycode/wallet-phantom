export const NotPhantom = () => {
  return (
    <>
      <h1>No Phantom Provider Detected</h1>
      <button onClick={() => window.open('https://phantom.app/', '_blank')}>
        Get Phantom
      </button>
    </>
  );
};
