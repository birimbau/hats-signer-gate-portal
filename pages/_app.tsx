import { CacheProvider } from '@chakra-ui/next-js';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { getDefaultWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import '@rainbow-me/rainbowkit/styles.css';
import type { AppProps } from 'next/app';
import { Inter } from 'next/font/google';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import { publicProvider } from 'wagmi/providers/public';
import Layout from '../components/Layout/Layout';
import { WalletConnectionProvider } from '../context/WalletConnectionContext';
import '../styles/globals.css';
import { SUPPORTED_NETWORKS } from '../utils/constants';

const { chains, publicClient, webSocketPublicClient } = configureChains(
  Object.values(SUPPORTED_NETWORKS),
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
    900: '#065666',
  },
  gray: {
    700: '#2D3748',
  },
  button: {
    disabled: '#B3B3B3',
    black: '#2D3748',
    gray: '#B3B3B3',
    white: '#FFFFFF',
  },
};

const styles = {
  global: {
    body: {
      fontFamily: "inter",
      fontWeight: 500,
    },
  },
};

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
});

const fonts = {
  inter: inter.style.fontFamily,
};

export const theme = extendTheme({ colors, styles, fonts });

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <CacheProvider>
      <ChakraProvider theme={theme}>
        <WagmiConfig config={wagmiConfig}>
          <RainbowKitProvider chains={chains}>
            <WalletConnectionProvider>
              <div className={inter.className}>
                <Layout>
                  <Component {...pageProps} />
                </Layout>
              </div>
            </WalletConnectionProvider>
          </RainbowKitProvider>
        </WagmiConfig>
      </ChakraProvider>
    </CacheProvider>
  );
}

export default MyApp;
