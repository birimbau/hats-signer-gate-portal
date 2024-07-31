import { first, get, has, keys, reject } from "lodash";
import { Hex } from "viem";
import { SAFE_CHAIN_MAP, SAFE_URL, chainsList } from "./constants";

export * from "./constants";
export * from "./web3";

export const displayAddress = (address: Hex) => {
	if (address) {
		return address.slice(0, 6) + "..." + address.slice(-4);
	}
	return "";
};

// Finds the segment specified from an entire path.
export const findAction = (value: string | undefined, pos: number) => {
	if (typeof value === "string") {
		const segments = value.split("/");
		return segments[pos] || undefined;
	}
	return undefined;
};

export function getBlockExplorerUrl(networkId: number | undefined): string {
	if (!networkId) return "#";

	const explorersWithoutDefault = reject(keys(chainsList[networkId]?.blockExplorers), 'default')
	return chainsList[networkId]?.blockExplorers?.default?.url || get(first(explorersWithoutDefault), 'url') || "#";
}

export function getSafeAppUrlPrefix(networkId: number | undefined): string {
	if (!networkId || !has(SAFE_CHAIN_MAP, networkId)) return "#";

	return `${SAFE_URL}/home?safe=${SAFE_CHAIN_MAP[networkId]}:`;
}
