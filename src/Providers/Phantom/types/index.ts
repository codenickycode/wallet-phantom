import * as Phantom from './phantom.d';
export * from './phantom.d';

export interface ConnectOpts extends Phantom.ConnectOpts {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSuccess?: (args?: any) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onError?: (args?: any) => void;
}

export type Connect = (opts?: ConnectOpts) => void;
