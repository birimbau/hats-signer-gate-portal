import { goerli, optimism } from "wagmi/chains";

export const CONTRACTS = {
	hatsSignerGateFactory: {
		contractAddress: "0xa1fb14b5f322651e20f06ee2f2681b8f380bbb0e",
	},
	hatsSignerGate: {
		contractAddress: "0x9B24db6ceB45F157B53d846f2e012C00956a67b6",
	},
	multiHatsSignerGate: {
		contractAddress: "0xca2E8dC908Bb18ADaB496601f3FaEA3c69c19f6f",
	},
	GnosisSafeL2: {
		contractAddress: "0x3e5c63644e683549055b9be8653de26e0b4cd36e",
	},
};

export const SUPPORTED_NETWORKS = [goerli, optimism];

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
