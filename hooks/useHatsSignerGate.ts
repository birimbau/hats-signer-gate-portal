import { useContractRead, usePrepareContractWrite } from "wagmi";
import { HatsSignerGateAbi } from "@/utils/abi/HatsSignerGate";
import { AbiTypeToPrimitiveType } from "abitype";
import { CONTRACTS } from "@/utils";
import { Hex } from "viem";
import _ from "lodash";

// Hooks for write functions for the HatsSignerGate contract
const contract = (CONTRACTS.hatsSignerGate.contractAddress ||
	"0x844b3c7781338d3308eb8d64727033893fce1432") as AbiTypeToPrimitiveType<"address">;
// TODO handle more chains
const chainId = process.env.ENVIRONMENT === "production" ? 1 : 5;

const useCheckAfterExecution = (
	address: Hex,
	args: {
		bytes32: AbiTypeToPrimitiveType<"bytes32">;
		bool: boolean;
	},
) =>
	usePrepareContractWrite({
		chainId,
		abi: HatsSignerGateAbi,
		address: address || contract,
		functionName: "checkAfterExecution",
		args: _.values(args),
	});

const useClaimSigner = (address?: Hex) =>
	usePrepareContractWrite({
		chainId,
		abi: HatsSignerGateAbi,
		address: address || contract,
		functionName: "claimSigner",
		enabled: !!address,
		onError: (error) => {
			console.log(error);
		},
	});

const useReconcileSignerCount = (address: Hex) =>
	usePrepareContractWrite({
		chainId,
		abi: HatsSignerGateAbi,
		address: address || contract,
		enabled: !!address,
		functionName: "reconcileSignerCount",
		onError: (error) => {
			console.log(error);
		},
	});

const useRemoveSigner = (
	address: AbiTypeToPrimitiveType<"address">,
	_signer?: AbiTypeToPrimitiveType<"address">,
) => {
	const args = { _signer: _signer };
	return usePrepareContractWrite({
		chainId,
		abi: HatsSignerGateAbi,
		address: address || contract,
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
) =>
	usePrepareContractWrite({
		chainId,
		abi: HatsSignerGateAbi,
		address: address || contract,
		functionName: "setMinThreshold",
		args: _.values(args),
		enabled: !_.some(_.values(args), _.isUndefined) && !!isOwner,
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
) =>
	usePrepareContractWrite({
		chainId,
		abi: HatsSignerGateAbi,
		address: address || contract,
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
) =>
	usePrepareContractWrite({
		chainId,
		abi: HatsSignerGateAbi,
		address: address || contract,
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
) =>
	usePrepareContractWrite({
		chainId,
		abi: HatsSignerGateAbi,
		address: address || contract,
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
) =>
	useContractRead({
		abi: HatsSignerGateAbi,
		address: address || contract,
		functionName: "countValidSignatures",
		args: Array.from(Object.values(args)),
		enabled: !_.some(_.values(args), _.isUndefined),
		onError: (error) => {
			console.log(error);
		},
	});

const useGetHatsContract = (address?: Hex) => {
	return useContractRead({
		abi: HatsSignerGateAbi,
		address: address || contract,
		functionName: "getHatsContract",
		enabled: !!address,
		onError: (error) => {
			console.log(error);
		},
	});
};

const useIsValidSigner = (
	args: {
		_account: AbiTypeToPrimitiveType<"address"> | undefined;
	},
	address?: Hex,
) => {
	return useContractRead({
		abi: HatsSignerGateAbi,
		address: address || contract,
		functionName: "isValidSigner",
		args: _.values(args),
		enabled: !!address && !_.some(_.values(args), _.isUndefined),
		onError: (error) => {
			console.log(error);
		},
	});
};

const useMaxSigners = (address?: Hex) =>
	useContractRead({
		abi: HatsSignerGateAbi,
		address: address || contract,
		functionName: "maxSigners",
		enabled: !!address,
	});

const useMinThreshold = (address?: Hex) =>
	useContractRead({
		abi: HatsSignerGateAbi,
		address: address || contract,
		functionName: "minThreshold",
		enabled: !!address,
		onError: (error) => {
			console.log(error);
		},
	});

const useOwnerHat = (address?: Hex) =>
	useContractRead({
		abi: HatsSignerGateAbi,
		address: address || contract,
		functionName: "ownerHat",
		enabled: !!address,
		onError: (error) => {
			console.log(error);
		},
	});

const useSafe = (address?: Hex) =>
	useContractRead({
		abi: HatsSignerGateAbi,
		address: address || contract,
		functionName: "safe",
		enabled: !!address,
		onError: (error) => {
			console.log(error);
		},
	});

const useSignersHatId = (address?: Hex) =>
	useContractRead({
		abi: HatsSignerGateAbi,
		address: address || contract,
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
) =>
	useContractRead({
		abi: HatsSignerGateAbi,
		address: address || contract,
		functionName: "supportsInterface",
		args: _.values(args),
		enabled: !_.some(_.values(args), _.isUndefined),
		onError: (error) => {
			console.log(error);
		},
	});

const useTargetThreshold = (address?: Hex) =>
	useContractRead({
		abi: HatsSignerGateAbi,
		address: address || contract,
		functionName: "targetThreshold",
		enabled: !!address,
		onError: (error) => {
			console.log(error);
		},
	});

const useValidSignerCount = (address?: Hex) =>
	useContractRead({
		abi: HatsSignerGateAbi,
		address: address || contract,
		functionName: "validSignerCount",
		enabled: !!address,
		onError: (error) => {
			console.log(error);
		},
	});

const useVersion = (address?: Hex) =>
	useContractRead({
		abi: HatsSignerGateAbi,
		address: address || contract,
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
