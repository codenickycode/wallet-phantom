import { PublicKey, Transaction, SendOptions } from '@solana/web3.js';

// These types were copied from the Phantom sandbox and are subject to change
// without notice!

type DisplayEncoding = 'utf8' | 'hex';

type PhantomEvent = 'connect' | 'disconnect' | 'accountChanged';

type PhantomRequestMethod =
  | 'connect'
  | 'disconnect'
  | 'signAndSendTransaction'
  | 'signTransaction'
  | 'signAllTransactions'
  | 'signMessage';

export interface ConnectOpts {
  /** pass `true` if the app is attempting to connect to see if it is already
   * trusted, `false` if called by a user action. */
  onlyIfTrusted?: boolean;
}

export interface IPhantomProvider {
  isPhantom: boolean | null;
  publicKey: PublicKey | null;
  isConnected: boolean | null;
  signAndSendTransaction: (
    transaction: Transaction,
    opts?: SendOptions
  ) => Promise<{ signature: string; publicKey: PublicKey }>;
  signTransaction: (transaction: Transaction) => Promise<Transaction>;
  signAllTransactions: (transactions: Transaction[]) => Promise<Transaction[]>;
  signMessage: (
    message: Uint8Array | string,
    display?: DisplayEncoding
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ) => Promise<any>;
  connect: (opts?: Partial<ConnectOpts>) => Promise<{ publicKey: PublicKey }>;
  disconnect: () => Promise<void>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  on: (event: PhantomEvent, handler: (args: any) => void) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  request: (method: PhantomRequestMethod, params: any) => Promise<unknown>;
}
