import "@rainbow-me/rainbowkit/styles.css";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import type { AppProps } from "next/app";
import { WagmiConfig } from "wagmi";
import { CacheProvider } from "@chakra-ui/next-js";
import { ChakraProvider } from "@chakra-ui/react";
import { WalletConnectionProvider } from "@/context/WalletConnectionContext";
import Layout from "@/components/Layout";
import { theme } from "@/theme";
import { wagmiConfig, chains } from "@/utils/web3";

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<CacheProvider>
			<ChakraProvider theme={theme}>
				<WagmiConfig config={wagmiConfig}>
					<RainbowKitProvider chains={chains}>
						<WalletConnectionProvider>
							<Layout>
								<Component {...pageProps} />
							</Layout>
						</WalletConnectionProvider>
					</RainbowKitProvider>
				</WagmiConfig>
			</ChakraProvider>
		</CacheProvider>
	);
}

export default MyApp;
