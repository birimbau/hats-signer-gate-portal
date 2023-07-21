import '../styles/globals.css';
import '@rainbow-me/rainbowkit/styles.css';
import { getDefaultWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import type { AppProps } from 'next/app';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import { goerli, optimism } from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';
import { CacheProvider } from '@chakra-ui/next-js';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { SelectedActionProvider } from '../context/SelectedActionContext';
import { DeployProvider } from '../context/DeployContext';

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [
    goerli,
    optimism,
    ...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === 'true' ? [goerli] : []),
  ],
  [publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_NAME || '',
  projectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID || '',
  chains,
});

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
  webSocketPublicClient,
});

const colors = {
  cyan: {
    100: '#C4F1F9',
    700: '#0987A0',
  },
  gray: {
    700: '#2D3748',
  },
  button: {
    disabled: '#B3B3B3',
    black: '#2D3748',
    gray: '#B3B3B3',
  },
};

const styles = {};

export const theme = extendTheme({ colors, styles });

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <CacheProvider>
      <ChakraProvider theme={theme}>
        <WagmiConfig config={wagmiConfig}>
          <RainbowKitProvider chains={chains}>
            <SelectedActionProvider>
              <DeployProvider>
                <Component {...pageProps} />
              </DeployProvider>
            </SelectedActionProvider>
          </RainbowKitProvider>
        </WagmiConfig>
      </ChakraProvider>
    </CacheProvider>
  );
}

export default MyApp;
