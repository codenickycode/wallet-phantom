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
  const value = usePhantom();

  return (
    <PhantomContext.Provider value={value}>
      {props.children}
    </PhantomContext.Provider>
  );
};
