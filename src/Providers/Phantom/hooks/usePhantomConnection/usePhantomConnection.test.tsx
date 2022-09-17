import {
  fireEvent,
  render,
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/react';

import { IPhantomProvider } from '../../types';
import { defaultProvider, defaultPublicKey } from '../../test';
import { usePhantomConnection } from './usePhantomConnection';

interface TestProps {
  providerOverride: IPhantomProvider;
}

function TestComponent({ providerOverride }: TestProps) {
  const { isConnected, isConnecting, pubKey, connect, disconnect } =
    usePhantomConnection({
      provider: providerOverride,
    });
  return (
    <>
      {isConnected && <p data-testid='isConnected' />}
      {isConnecting && <p data-testid='isConnecting' />}
      {pubKey && <p data-testid='pubKey'>{pubKey}</p>}
      <button onClick={() => connect()}>connect</button>
      <button onClick={() => disconnect()}>disconnect</button>
    </>
  );
}

function getButton(label: 'connect' | 'disconnect') {
  return screen.getByRole('button', {
    name: label,
  });
}

function setup(providerOverride: IPhantomProvider) {
  render(<TestComponent providerOverride={providerOverride} />);
}

describe('provider.isConnected is true and provider.publicKey is defined', () => {
  beforeEach(async () => {
    setup({
      ...defaultProvider,
      isConnected: true,
      publicKey: defaultPublicKey,
    });
    await screen.findByTestId('isConnected');
  });
  test('isConnected should be true', async () => {
    expect(screen.getByTestId('isConnected')).toBeInTheDocument();
  });
  test('pubKey should be the key from provider', () => {
    expect(screen.getByTestId('pubKey')).toHaveTextContent(
      defaultPublicKey.toString()
    );
  });

  describe('and when user clicks "disconnect"', () => {
    beforeEach(() => {
      fireEvent.click(getButton('disconnect'));
    });
    test('isConnected should be false', async () => {
      await waitForElementToBeRemoved(screen.getByTestId('isConnected'));
    });
    test('pubKey should be undefined', async () => {
      await waitForElementToBeRemoved(screen.getByTestId('pubKey'));
    });

    describe('and when user clicks "connect"', () => {
      beforeEach(async () => {
        fireEvent.click(getButton('connect'));
        await screen.findByTestId('isConnecting');
        await waitForElementToBeRemoved(screen.getByTestId('isConnecting'));
      });
      test('isConnected should be true', async () => {
        expect(screen.getByTestId('isConnected')).toBeInTheDocument();
      });
      test('pubKey should be the key from provider', () => {
        expect(screen.getByTestId('pubKey')).toHaveTextContent(
          defaultPublicKey.toString()
        );
      });
    });
  });
});

describe('provider.isConnected is true and provider.publicKey is null', () => {
  beforeEach(async () => {
    setup({
      ...defaultProvider,
      isConnected: true,
      publicKey: null,
    });
  });
  test('isConnected should be false', () => {
    expect(screen.queryByTestId('isConnected')).not.toBeInTheDocument();
  });
  test('pubKey should be undefined', () => {
    expect(screen.queryByTestId('pubKey')).not.toBeInTheDocument();
  });
});

describe('provider.publicKey is defined and provider.isConnected is false ', () => {
  test('isConnected should be false', async () => {
    setup({
      ...defaultProvider,
      isConnected: false,
      publicKey: defaultPublicKey,
    });
    expect(screen.queryByTestId('isConnected')).not.toBeInTheDocument();
  });
});

test('should attach "connect" listener', () => {
  setup(defaultProvider);
  expect(defaultProvider.on).toHaveBeenCalledWith('connect', expect.anything());
});
test('should attach "disconnect" listener', () => {
  setup(defaultProvider);
  expect(defaultProvider.on).toHaveBeenCalledWith(
    'disconnect',
    expect.anything()
  );
});
test('should attach "accountChanged" listener', () => {
  setup(defaultProvider);
  expect(defaultProvider.on).toHaveBeenCalledWith(
    'accountChanged',
    expect.anything()
  );
});
