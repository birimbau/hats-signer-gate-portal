import { goerli, optimism } from 'wagmi/chains';

export const CONTRACTS = {
  hatsSignerGateFactory: {
    contractAddress: '0xa1fb14b5f322651e20f06ee2f2681b8f380bbb0e',
  },
  hatsSignerGate: {
    contractAddress: '0x844b3c7781338d3308eb8d64727033893fce1432',
  },
  multiHatsSignerGate: {
    contractAddress: '0xca9d698adb4052ac7751019d69582950b1e42b43',
  },
  GnosisSafeL2: {
    contractAddress: '0x3e5c63644e683549055b9be8653de26e0b4cd36e',
  },
};

export const SUPPORTED_NETWORKS = [goerli, optimism];
