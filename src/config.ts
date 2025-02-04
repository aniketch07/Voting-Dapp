import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import {
  holesky
} from 'wagmi/chains';

export const config = getDefaultConfig({
  appName: 'RainbowKit demo',
  projectId: 'YOUR_PROJECT_ID',
  chains: [
    holesky
  ],
  ssr: true,
});
