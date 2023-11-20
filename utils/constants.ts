import { Hex } from "viem";
import {
	goerli,
	optimism,
	mainnet,
	gnosis,
	sepolia,
	arbitrum,
} from "wagmi/chains";

export type ChainKeys = [1, 5, 10, 100, 137, 42161];

export const CONTRACTS: {
	hatsSignerGateFactory: {
		[chainId in ChainKeys[number]]: Hex;
	};
	hatsSignerGate: {
		[chainId in ChainKeys[number]]: Hex;
	};
	multiHatsSignerGate: {
		[chainId in ChainKeys[number]]: Hex;
	};
	GnosisSafeL2: {
		contractAddress: Hex;
	};
} = {
	hatsSignerGateFactory: {
		1: "0x0F22eFC6EA47b1EFF42D1A2a6E69440929400F86",
		5: "0xa1fb14b5f322651e20f06ee2f2681b8f380bbb0e",
		10: "0x39Ae0B5e81A69F7092EC4394b111b6a6411377e8",
		100: "0x0F22eFC6EA47b1EFF42D1A2a6E69440929400F86",
		137: "0x0F22eFC6EA47b1EFF42D1A2a6E69440929400F86",
		42161: "0x",
	},
	hatsSignerGate: {
		1: "0x19932b8E9dab073C0123a5792B44a8966Bf9C6eF",
		5: "0x9B24db6ceB45F157B53d846f2e012C00956a67b6",
		10: "0x19932b8E9dab073C0123a5792B44a8966Bf9C6eF",
		100: "0x19932b8E9dab073C0123a5792B44a8966Bf9C6eF",
		137: "0x19932b8E9dab073C0123a5792B44a8966Bf9C6eF",
		42161: "0x",
	},
	multiHatsSignerGate: {
		1: "0x51486A1Db10992302922c5ae563088e1443d3d69",
		5: "0xca2E8dC908Bb18ADaB496601f3FaEA3c69c19f6f",
		10: "0x51486A1Db10992302922c5ae563088e1443d3d69",
		100: "0x51486A1Db10992302922c5ae563088e1443d3d69",
		137: "0x51486A1Db10992302922c5ae563088e1443d3d69",
		42161: "0x",
	},
	GnosisSafeL2: {
		contractAddress: "0x3e5c63644e683549055b9be8653de26e0b4cd36e",
	},
};

export const SUPPORTED_NETWORKS = [
	mainnet,
	goerli,
	optimism,
	gnosis,
	sepolia,
	arbitrum,
];

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
