import * as Phantom from './phantom.d';
export * from './phantom.d';

export interface ConnectOpts extends Phantom.ConnectOpts {
  onSuccess?: (args?: any) => void;
  onError?: (args?: any) => void;
}

export type Connect = (opts?: ConnectOpts) => void;
