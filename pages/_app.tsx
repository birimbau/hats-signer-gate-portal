import { CacheProvider } from '@chakra-ui/next-js';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { getDefaultWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import '@rainbow-me/rainbowkit/styles.css';
import type { AppProps } from 'next/app';
import { Inter } from 'next/font/google';
import { configureChains, createConfig, WagmiConfig, Connector } from 'wagmi';
import { publicProvider } from 'wagmi/providers/public';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import Layout from '../components/Layout/Layout';
import { WalletConnectionProvider } from '../context/WalletConnectionContext';
import '../styles/globals.css';
import { SUPPORTED_NETWORKS } from '../utils/constants';

// import { SafeConnector } from 'wagmi/dist/connectors/safe';
// declare module '@wagmi/dist/connectors/safe';

// import { SafeConnector } from '@wagmi/connectors/safe';

const { chains, publicClient, webSocketPublicClient } = configureChains(
  SUPPORTED_NETWORKS,
  [
    // alchemyProvider({ apiKey: 'yourAlchemyApiKey' }), // TODO - ADD ALCHEMY TO PREVENT RATE LIMITING
    publicProvider(),
  ]
  // { stallTimeout: 5000 } // TODO - used to delay time between trying providers
);

// Every dApp that relies on WalletConnect now needs to obtain a projectId & Name from WalletConnect Cloud.
// They are for security only.
const { connectors } = getDefaultWallets({
  appName: process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_NAME || '',
  projectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID || '',
  chains,
});

// Add Safe Connector for safe-apps-sdk
let allConnectors: Connector[] = [
  ...connectors(),
  // new SafeConnector({
  //   chains,
  //   // options: {
  //   //   allowedDomains: [/gnosis-safe.io$/, /app.safe.global$/],
  //   //   debug: false,
  //   // },
  // }),
];

const wagmiConfig = createConfig({
  // autoConnect: true, // Removed for safe-apps-sdk
  connectors: allConnectors,
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
      fontFamily: 'inter',
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
