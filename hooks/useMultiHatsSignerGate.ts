import { useContractRead, usePrepareContractWrite } from "wagmi";
import { MultiHatsSignerGateAbi } from "@/utils/abi/MultiHatsSignerGate";
import { AbiTypeToPrimitiveType } from "abitype";
import { Hex } from "viem";

// Hooks for write functions for the HatsSignerGate contract

// modify
const useAddSignerHats = (
	args: {
		_newSignerHats: AbiTypeToPrimitiveType<"uint256">[];
	},
	address?: Hex,
	chainId?: number,
) =>
	usePrepareContractWrite({
		chainId,
		abi: MultiHatsSignerGateAbi,
		address,
		functionName: "addSignerHats",
		args: Array.from(Object.values(args)),
	});

// Hooks for read functions for the HatsSignerGate contract

const useClaimedSignerHats = (
	args: {
		input: AbiTypeToPrimitiveType<"address">;
	},
	address: Hex,
	chainId?: number,
) =>
	useContractRead({
		abi: MultiHatsSignerGateAbi,
		address,
		chainId,
		functionName: "claimedSignerHats",
		args: Array.from(Object.values(args)),
		onSuccess: (data) => {
			console.log(data);
		},
		onError: (error) => {
			console.log(error);
		},
	});

const useIsValidSignerHat = (
	args: {
		_hatId: AbiTypeToPrimitiveType<"uint256">;
	},
	address?: Hex,
	chainId?: number,
) =>
	useContractRead({
		abi: MultiHatsSignerGateAbi,
		address,
		chainId,
		functionName: "isValidSignerHat",
		args: Array.from(Object.values(args)),
		onSuccess: (data) => {
			console.log(data);
		},
		onError: (error) => {
			console.log(error);
		},
	});

// check signers
const useValidSignerHats = (
	args: {
		input: AbiTypeToPrimitiveType<"uint256">;
	},
	address?: Hex,
	chainId?: number,
) => {
	return useContractRead({
		abi: MultiHatsSignerGateAbi,
		address,
		chainId,
		functionName: "validSignerHats",
		args: Array.from(Object.values(args)),
		enabled: !!address,
		onError: (error) => {
			console.log(error);
		},
	});
};

export {
	useAddSignerHats,
	useClaimedSignerHats,
	useIsValidSignerHat,
	useValidSignerHats,
};
