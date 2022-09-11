import { createContext, ReactNode } from 'react';
import { usePhantom } from './hooks';
import { IPhantomProvider } from './types';

export const PhantomContext = createContext<ReturnType<
  typeof usePhantom
> | null>(null);

interface PhantomProviderProps {
  provider: IPhantomProvider | undefined | null;
  children: ReactNode;
}

export const PhantomProvider = (props: PhantomProviderProps) => {
  if (!props.provider) {
    throw new Error('phantom provider not available in the browser');
  }
  const value = usePhantom(props.provider);

  return (
    <PhantomContext.Provider value={value}>
      {props.children}
    </PhantomContext.Provider>
  );
};
