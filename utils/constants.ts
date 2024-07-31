import { Chain, Hex } from "viem";
import {
	optimism,
	mainnet,
	gnosis,
	sepolia,
	arbitrum,
	polygon,
	base,
} from "wagmi/chains";

export type ChainKeys = 1 | 10 | 100 | 137 | 8453 | 42161 | 11155111;

export const CONTRACTS: {
	hatsSignerGateFactory: {
		[chainId in ChainKeys]: Hex;
	};
	hatsSignerGate: {
		[chainId in ChainKeys]: Hex;
	};
	multiHatsSignerGate: {
		[chainId in ChainKeys]: Hex;
	};
	GnosisSafeL2: {
		contractAddress: Hex;
	};
} = {
	hatsSignerGateFactory: {
		1: "0x0F22eFC6EA47b1EFF42D1A2a6E69440929400F86",
		10: "0x39Ae0B5e81A69F7092EC4394b111b6a6411377e8",
		100: "0x0F22eFC6EA47b1EFF42D1A2a6E69440929400F86",
		137: "0xCF448cF035c4fF9C05a481796E5215AEb7D35C99",
		8453: "0x55E408657C06A812d78dC9169369F0f28A12cBA6",
		42161: "0x6FE52b46Af16F960E0eB1E15D2b27422ab158733",
		11155111: "0x5CB8a5B063B7E94cF39E8A8813A777f49B8DD050",
		// 42220: "0x55E408657C06A812d78dC9169369F0f28A12cBA6", // celo
	},
	hatsSignerGate: {
		1: "0x19932b8E9dab073C0123a5792B44a8966Bf9C6eF",
		10: "0x19932b8E9dab073C0123a5792B44a8966Bf9C6eF",
		100: "0x19932b8E9dab073C0123a5792B44a8966Bf9C6eF",
		137: "0x19932b8E9dab073C0123a5792B44a8966Bf9C6eF",
		8453: "0x19932b8E9dab073C0123a5792B44a8966Bf9C6eF",
		42161: "0x9B24db6ceB45F157B53d846f2e012C00956a67b6",
		11155111: "0x19932b8E9dab073C0123a5792B44a8966Bf9C6eF",
	},
	multiHatsSignerGate: {
		1: "0x51486A1Db10992302922c5ae563088e1443d3d69",
		10: "0x51486A1Db10992302922c5ae563088e1443d3d69",
		100: "0x51486A1Db10992302922c5ae563088e1443d3d69",
		137: "0x51486A1Db10992302922c5ae563088e1443d3d69",
		8453: "0x51486A1Db10992302922c5ae563088e1443d3d69",
		42161: "0xca2E8dC908Bb18ADaB496601f3FaEA3c69c19f6f",
		11155111: "0x51486A1Db10992302922c5ae563088e1443d3d69",
	},
	GnosisSafeL2: {
		contractAddress: "0x3e5c63644e683549055b9be8653de26e0b4cd36e",
	},
};

// TODO check the other URLs here
export const SAFE_API_URL: { [chainId in ChainKeys]: string } = {
	1: "https://safe-transaction-mainnet.safe.global",
	10: "https://safe-transaction-optimism.safe.global",
	100: "https://safe-transaction-gnosis-chain.safe.global",
	137: "https://safe-transaction-polygon.safe.global",
	8453: "https://safe-transaction-base.safe.global",
	42161: "https://safe-transaction-arbitrum.safe.global",
	11155111: "https://safe-transaction-sepolia.safe.global",
};

const customGnosis = {
	...gnosis,
	hasIcon: true,
	iconUrl: "/chains/gnosis.png",
	iconBackground: "none",
};

export const chainsList: { [key in number]: Chain } = {
	1: mainnet,
	10: optimism,
	100: customGnosis,
	137: polygon,
	8453: base,
	42161: arbitrum,

	// TESTNETS
	// 84532: baseSepolia,
	11155111: sepolia,
};


export enum DEPLOY_ACTIONS {
	DEPLOY_HSG = "hsg",
	DEPLOY_HSG_W_S = "hsgws",
	DEPLOY_MHSG = "mhsg",
	DEPLOY_MHSG_W_S = "mhsgws",
}

export enum HEADER_ACTIONS {
	DEPLOY = "deploy",
	MODIFY = "modify",
	CLAIM = "claim",
	RENOUNCE = "renounce",
	REMOVE = "remove",
	VIEW = "view",
}

export enum safe {
	UNSET = 1,
	INVALID_ADDRESS = 2,
	CANNOT_ATTACH = 3,
	CAN_ATTACH = 4,
	WRONG_ADDRESS = 5,
}

export const SAFE_URL = 'https://app.safe.global';

export const SAFE_CHAIN_MAP: { [key in number]: string } = {
	1: 'eth',
	10: 'oeth',
	100: 'gno',
	137: 'matic',
	8453: 'base',
	42161: 'arb1',
	42220: 'celo',
	11155111: 'sep',
};
