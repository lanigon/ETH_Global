import '@rainbow-me/rainbowkit/styles.css';
import {
  getDefaultConfig,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { createConfig, WagmiProvider } from 'wagmi';
import { mainnet, sepolia, flowTestnet,flowMainnet } from 'wagmi/chains'
import {
  QueryClientProvider,
  QueryClient,
} from "@tanstack/react-query";
import { injected } from 'wagmi/connectors';

export const config = createConfig({
  appName: 'My RainbowKit App',
  projectId: 'YOUR_PROJECT_ID',
  
  chains: [flowTestnet],
  ssr: true, // If your dApp uses server side rendering (SSR)
});