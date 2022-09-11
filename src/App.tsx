import { NotPhantom } from './NotPhantom';
import { Phantom } from './Phantom';
import { getPhantomProvider, PhantomProvider } from './Providers';

export function App() {
  const provider = getPhantomProvider();
  return provider ? (
    <PhantomProvider provider={provider}>
      {provider ? <Phantom /> : <NotPhantom />}
    </PhantomProvider>
  ) : (
    <NotPhantom />
  );
}
