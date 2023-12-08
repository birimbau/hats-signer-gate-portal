import { useContractRead, usePrepareContractWrite } from "wagmi";
import { HatsSignerGateAbi } from "@/utils/abi/HatsSignerGate";
import { AbiTypeToPrimitiveType } from "abitype";
import { Hex } from "viem";
import _ from "lodash";

// not used
const useCheckAfterExecution = (
	address: Hex,
	args: {
		bytes32: AbiTypeToPrimitiveType<"bytes32">;
		bool: boolean;
	},
	chainId?: number,
) =>
	usePrepareContractWrite({
		chainId,
		abi: HatsSignerGateAbi,
		address,
		functionName: "checkAfterExecution",
		args: _.values(args),
	});

const useClaimSigner = (address?: Hex, chainId?: number) =>
	usePrepareContractWrite({
		chainId,
		abi: HatsSignerGateAbi,
		address,
		functionName: "claimSigner",
		enabled: !!address,
		onError: (error) => {
			console.log(error);
		},
	});

// not used
const useReconcileSignerCount = (address: Hex, chainId?: number) =>
	usePrepareContractWrite({
		chainId,
		abi: HatsSignerGateAbi,
		address,
		enabled: !!address,
		functionName: "reconcileSignerCount",
		onError: (error) => {
			console.log(error);
		},
	});

const useRemoveSigner = (
	address: AbiTypeToPrimitiveType<"address">,
	_signer?: AbiTypeToPrimitiveType<"address">,
	chainId?: number,
) => {
	const args = { _signer: _signer };
	return usePrepareContractWrite({
		chainId,
		abi: HatsSignerGateAbi,
		address,
		functionName: "removeSigner",
		args: _.values(args),
		enabled: !_.some(_.values(args), _.isUndefined),
		onError: (error) => {
			console.log(error);
		},
	});
};

const useSetMinThreshold = (
	args: {
		_minThreshold?: AbiTypeToPrimitiveType<"uint256">;
	},
	address?: Hex,
	isOwner?: boolean,
	chainId?: number,
) =>
	usePrepareContractWrite({
		chainId,
		abi: HatsSignerGateAbi,
		address,
		functionName: "setMinThreshold",
		args: _.values(args),
		enabled:
			!_.some(_.values(args), _.isUndefined) &&
			!!isOwner &&
			!!address &&
			!!chainId,
		onError: (error) => {
			console.log(error);
		},
	});

const useSetOwnerHat = (
	args: {
		_ownerHat: AbiTypeToPrimitiveType<"uint256">;
		_hatsContract: AbiTypeToPrimitiveType<"address">;
	},
	address?: Hex,
	isOwner?: boolean,
	chainId?: number,
) =>
	usePrepareContractWrite({
		chainId,
		abi: HatsSignerGateAbi,
		address,
		functionName: "setOwnerHat",
		args: _.values(args),
		enabled: !_.some(_.values(args), _.isUndefined) && !!isOwner,
		onError: (error) => {
			console.log(error);
		},
	});

const useSetTargetThreshold = (
	args: {
		_targetThreshold: AbiTypeToPrimitiveType<"uint256">;
	},
	address?: Hex,
	isOwner?: boolean,
	chainId?: number,
) =>
	usePrepareContractWrite({
		chainId,
		abi: HatsSignerGateAbi,
		address: address,
		functionName: "setTargetThreshold",
		args: _.values(args),
		enabled: !!_.some(_.values(args), _.isUndefined) && !!isOwner,
		onError: (error) => {
			console.log(error);
		},
	});

const useSetup = (
	address: Hex,
	args: {
		setUp?: AbiTypeToPrimitiveType<"uint256">;
		initializeParams?: AbiTypeToPrimitiveType<"bytes">;
	},
	isOwner?: boolean,
	chainId?: number,
) =>
	usePrepareContractWrite({
		chainId,
		abi: HatsSignerGateAbi,
		address,
		functionName: "setup",
		args: Array.from(Object.values(args)),
		enabled: !_.some(_.values(args), _.isUndefined) && isOwner,
		onError: (error) => {
			console.log(error);
		},
	});

// Hooks for read functions for the HatsSignerGate contract

const useCountValidSignatures = (
	address: Hex,
	args: {
		dataHash?: AbiTypeToPrimitiveType<"bytes32">;
		signature?: AbiTypeToPrimitiveType<"bytes">;
		sigCount?: AbiTypeToPrimitiveType<"uint256">;
	},
	chainId?: number,
) =>
	useContractRead({
		abi: HatsSignerGateAbi,
		address,
		chainId,
		functionName: "countValidSignatures",
		args: Array.from(Object.values(args)),
		enabled: !_.some(_.values(args), _.isUndefined),
		onError: (error) => {
			console.log(error);
		},
	});

// dupe
const useGetHatsContract = (
	address?: Hex,
	enabled: boolean = true,
	chainId?: number,
) => {
	return useContractRead({
		abi: HatsSignerGateAbi,
		address: address,
		chainId,
		functionName: "getHatsContract",
		enabled: !!address && enabled,
		onError: (error) => {
			console.log(error);
		},
	});
};

// dupe
const useIsValidSigner = (
	args: {
		_account: AbiTypeToPrimitiveType<"address"> | undefined;
	},
	address?: Hex,
	chainId?: number,
) => {
	return useContractRead({
		abi: HatsSignerGateAbi,
		address,
		chainId,
		functionName: "isValidSigner",
		args: _.values(args),
		enabled: !!address && !_.some(_.values(args), _.isUndefined),
		onError: (error) => {
			console.log(error);
		},
	});
};

const useMaxSigners = (address?: Hex, chainId?: number) =>
	useContractRead({
		abi: HatsSignerGateAbi,
		address: address,
		chainId,
		functionName: "maxSigners",
		enabled: !!address,
	});

const useMinThreshold = (address?: Hex, chainId?: number) =>
	useContractRead({
		abi: HatsSignerGateAbi,
		address,
		chainId,
		functionName: "minThreshold",
		enabled: !!address,
		onError: (error) => {
			console.log(error);
		},
	});

const useOwnerHat = (address?: Hex, chainId?: number) =>
	useContractRead({
		abi: HatsSignerGateAbi,
		address,
		chainId,
		functionName: "ownerHat",
		enabled: !!address,
		onError: (error) => {
			console.log(error);
		},
	});

const useSafe = (address?: Hex, chainId?: number) =>
	useContractRead({
		abi: HatsSignerGateAbi,
		address: address,
		chainId,
		functionName: "safe",
		enabled: !!address,
		onError: (error) => {
			console.log(error);
		},
	});

const useSignersHatId = (address?: Hex, chainId?: number) =>
	useContractRead({
		abi: HatsSignerGateAbi,
		address,
		chainId,
		functionName: "signersHatId",
		enabled: !!address,
		onError: (error) => {
			console.log(error);
		},
	});

const useSupportsInterface = (
	address: Hex,
	args: {
		interfaceId: AbiTypeToPrimitiveType<"bytes4">;
	},
	chainId?: number,
) =>
	useContractRead({
		abi: HatsSignerGateAbi,
		address,
		chainId,
		functionName: "supportsInterface",
		args: _.values(args),
		enabled: !_.some(_.values(args), _.isUndefined),
		onError: (error) => {
			console.log(error);
		},
	});

const useTargetThreshold = (address?: Hex, chainId?: number) =>
	useContractRead({
		abi: HatsSignerGateAbi,
		address,
		chainId,
		functionName: "targetThreshold",
		enabled: !!address,
		onError: (error) => {
			console.log(error);
		},
	});

// dupe
const useValidSignerCount = (address?: Hex, chainId?: number) =>
	useContractRead({
		abi: HatsSignerGateAbi,
		address,
		chainId,
		functionName: "validSignerCount",
		enabled: !!address,
		onError: (error) => {
			console.log(error);
		},
	});

// dupe
const useVersion = (address?: Hex, chainId?: number) =>
	useContractRead({
		abi: HatsSignerGateAbi,
		address,
		chainId,
		functionName: "version",
		enabled: !!address,
		onError: (error) => {
			console.log(error);
		},
	});

export {
	useCheckAfterExecution,
	useClaimSigner,
	useReconcileSignerCount,
	useRemoveSigner,
	useSetMinThreshold,
	useSetOwnerHat,
	useSetTargetThreshold,
	useSetup,
	useCountValidSignatures,
	useGetHatsContract,
	useIsValidSigner,
	useMaxSigners,
	useMinThreshold,
	useOwnerHat,
	useSafe,
	useSignersHatId,
	useSupportsInterface,
	useTargetThreshold,
	useValidSignerCount,
	useVersion,
};
