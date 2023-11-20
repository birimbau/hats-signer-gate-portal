import { useContractRead, usePrepareContractWrite } from "wagmi";
import { MultiHatsSignerGateAbi } from "@/utils/abi/MultiHatsSignerGate";
import { AbiTypeToPrimitiveType } from "abitype";
import { Hex } from "viem";

// Hooks for write functions for the HatsSignerGate contract

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

const useCheckAfterExecution = (
	args: {
		bytes32: AbiTypeToPrimitiveType<"bytes32">;
		bool: boolean;
	},
	address?: Hex,
	chainId?: number,
) =>
	usePrepareContractWrite({
		chainId,
		abi: MultiHatsSignerGateAbi,
		address,
		functionName: "checkAfterExecution",
		args: Array.from(Object.values(args)),
	});

const useClaimSigner = (
	args: { _hatId: AbiTypeToPrimitiveType<"uint256"> },
	address?: Hex,
	chainId?: number,
) =>
	usePrepareContractWrite({
		chainId,
		abi: MultiHatsSignerGateAbi,
		address,
		functionName: "claimSigner",
		args: Array.from(Object.values(args)),
	});

const useReconcileSignerCount = (address: Hex, chainId?: number) =>
	usePrepareContractWrite({
		chainId,
		abi: MultiHatsSignerGateAbi,
		address,
		functionName: "reconcileSignerCount",
	});

const useRemoveSigner = (
	MhsgContractAddress: AbiTypeToPrimitiveType<"address">,
	_signer?: AbiTypeToPrimitiveType<"address">,
	chainId?: number,
) => {
	const args = { _signer: _signer };
	return usePrepareContractWrite({
		enabled: false,
		chainId,
		abi: MultiHatsSignerGateAbi,
		address: MhsgContractAddress,
		functionName: "removeSigner",
		args: Array.from(Object.values(args)),
		onSuccess: (data) => {
			console.log(data);
		},
		onError: (error) => {
			console.log(error);
		},
	});
};

const useSetMinThreshold = (
	args: {
		_minThreshold: AbiTypeToPrimitiveType<"uint256">;
	},
	address?: Hex,
	chainId?: number,
) =>
	usePrepareContractWrite({
		chainId,
		abi: MultiHatsSignerGateAbi,
		address,
		functionName: "setMinThreshold",
		args: Array.from(Object.values(args)),
	});

const useSetOwnerHat = (
	args: {
		_ownerHat: AbiTypeToPrimitiveType<"uint256">;
		_hatsContract: AbiTypeToPrimitiveType<"address">;
	},
	address?: Hex,
	chainId?: number,
) =>
	usePrepareContractWrite({
		chainId,
		abi: MultiHatsSignerGateAbi,
		address,
		functionName: "setOwnerHat",
		args: Array.from(Object.values(args)),
	});

const useSetTargetThreshold = (
	args: {
		_targetThreshold: AbiTypeToPrimitiveType<"uint256">;
	},
	address?: Hex,
	chainId?: number,
) =>
	usePrepareContractWrite({
		chainId,
		abi: MultiHatsSignerGateAbi,
		address,
		functionName: "setTargetThreshold",
		args: Array.from(Object.values(args)),
	});

const useSetup = (
	args: {
		setup: AbiTypeToPrimitiveType<"uint256">;
		initializeParams: AbiTypeToPrimitiveType<"bytes">;
	},
	address: Hex,
	chainId?: number,
) =>
	usePrepareContractWrite({
		chainId,
		abi: MultiHatsSignerGateAbi,
		address,
		functionName: "setup",
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

const useCountValidSignatures = (
	args: {
		dataHash: AbiTypeToPrimitiveType<"bytes">;
		signatures: AbiTypeToPrimitiveType<"bytes">;
		sigCount: AbiTypeToPrimitiveType<"uint256">;
	},
	address: Hex,
	chainId?: number,
) =>
	useContractRead({
		abi: MultiHatsSignerGateAbi,
		address,
		chainId,
		functionName: "countValidSignatures",
		args: Array.from(Object.values(args)),
		onSuccess: (data) => {
			console.log(data);
		},
		onError: (error) => {
			console.log(error);
		},
	});

const useGetHatsContract = (address?: Hex, chainId?: number) =>
	useContractRead({
		abi: MultiHatsSignerGateAbi,
		address,
		chainId,
		functionName: "getHatsContract",
		enabled: false,
		onSuccess: (data) => {
			console.log(data);
		},
		onError: (error) => {
			console.log(error);
		},
	});

const useIsValidSigner = (
	args: {
		_account: AbiTypeToPrimitiveType<"address">;
	},
	address?: Hex,
	chainId?: number,
) =>
	useContractRead({
		abi: MultiHatsSignerGateAbi,
		address,
		chainId,
		functionName: "isValidSigner",
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

const useMaxSigners = (address?: Hex, chainId?: number) =>
	useContractRead({
		abi: MultiHatsSignerGateAbi,
		address,
		chainId,
		functionName: "maxSigners",
		onSuccess: (data) => {
			console.log(data);
		},
		onError: (error) => {
			console.log(error);
		},
	});

const useMinThreshold = (address?: Hex, chainId?: number) =>
	useContractRead({
		abi: MultiHatsSignerGateAbi,
		address,
		chainId,
		functionName: "minThreshold",
		onSuccess: (data) => {
			console.log(data);
		},
		onError: (error) => {
			console.log(error);
		},
	});

const useOwnerHat = (address?: Hex, chainId?: number) =>
	useContractRead({
		abi: MultiHatsSignerGateAbi,
		address,
		chainId,
		functionName: "ownerHat",
		onSuccess: (data) => {
			console.log(data);
		},
		onError: (error) => {
			console.log(error);
		},
	});

const useSafe = (address?: Hex, chainId?: number) =>
	useContractRead({
		abi: MultiHatsSignerGateAbi,
		address,
		chainId,
		functionName: "safe",
		onSuccess: (data) => {
			console.log(data);
		},
		onError: (error) => {
			console.log(error);
		},
	});

const useSupportsInterface = (
	args: {
		interfaceId: AbiTypeToPrimitiveType<"bytes4">;
	},
	address?: Hex,
	chainId?: number,
) =>
	useContractRead({
		abi: MultiHatsSignerGateAbi,
		address,
		chainId,
		functionName: "supportsInterface",
		args: Array.from(Object.values(args)),
		onSuccess: (data) => {
			console.log(data);
		},
		onError: (error) => {
			console.log(error);
		},
	});

const useTargetThreshold = (address?: Hex, chainId?: number) =>
	useContractRead({
		abi: MultiHatsSignerGateAbi,
		address,
		chainId,
		functionName: "targetThreshold",
		onSuccess: (data) => {
			console.log(data);
		},
		onError: (error) => {
			console.log(error);
		},
	});

const useValidSignerCount = (address?: Hex, chainId?: number) =>
	useContractRead({
		abi: MultiHatsSignerGateAbi,
		address,
		chainId,
		functionName: "validSignerCount",
		onSuccess: (data) => {
			console.log(data);
		},
		onError: (error) => {
			console.log(error);
		},
	});

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

const useVersion = (address?: Hex, chainId?: number) =>
	useContractRead({
		abi: MultiHatsSignerGateAbi,
		address,
		chainId,
		functionName: "version",
		onSuccess: (data) => {
			console.log(data);
		},
		onError: (error) => {
			console.log(error);
		},
	});

export {
	useAddSignerHats,
	useCheckAfterExecution,
	useClaimSigner,
	useReconcileSignerCount,
	useRemoveSigner,
	useSetMinThreshold,
	useSetOwnerHat,
	useSetTargetThreshold,
	useSetup,
	useClaimedSignerHats,
	useCountValidSignatures,
	useGetHatsContract,
	useIsValidSigner,
	useIsValidSignerHat,
	useMaxSigners,
	useMinThreshold,
	useOwnerHat,
	useSafe,
	useSupportsInterface,
	useTargetThreshold,
	useValidSignerCount,
	useValidSignerHats,
	useVersion,
};
