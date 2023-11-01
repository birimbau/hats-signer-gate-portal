import { useContractRead, usePrepareContractWrite } from "wagmi";
import { MultiHatsSignerGateAbi } from "../abi/MultiHatsSignerGate/MultiHatsSignerGate";
import { AbiTypeToPrimitiveType } from "abitype";
import { CONTRACTS } from "../constants";
import { EthereumAddress } from "../../components/Deployers/forms/utils/ReadForm";

// Hooks for write functions for the HatsSignerGate contract
const contract = CONTRACTS.multiHatsSignerGate
	.contractAddress as AbiTypeToPrimitiveType<"address">;
const chainId = process.env.ENVIROMENT === "production" ? 1 : 5;

const useAddSignerHats = (
	args: {
		_newSignerHats: AbiTypeToPrimitiveType<"uint256">[];
	},
	address?: EthereumAddress,
) =>
	usePrepareContractWrite({
		chainId,
		abi: MultiHatsSignerGateAbi,
		address: address || contract,
		functionName: "addSignerHats",
		args: Array.from(Object.values(args)),
	});

const useCheckAfterExecution = (args: {
	bytes32: AbiTypeToPrimitiveType<"bytes32">;
	bool: boolean;
}) =>
	usePrepareContractWrite({
		chainId,
		abi: MultiHatsSignerGateAbi,
		address: contract,
		functionName: "checkAfterExecution",
		args: Array.from(Object.values(args)),
	});

const useCheckTransaction = (args: {
	to: AbiTypeToPrimitiveType<"address">;
	data: AbiTypeToPrimitiveType<"bytes">;
	operation: AbiTypeToPrimitiveType<"uint8">;
	safeTxGas: AbiTypeToPrimitiveType<"uint256">;
	baseGas: AbiTypeToPrimitiveType<"uint256">;
	gasPrice: AbiTypeToPrimitiveType<"uint256">;
	gasToken: AbiTypeToPrimitiveType<"address">;
	refundReceiver: AbiTypeToPrimitiveType<"address">;
	signatures: AbiTypeToPrimitiveType<"bytes">;
	address: AbiTypeToPrimitiveType<"address">;
}) =>
	usePrepareContractWrite({
		chainId,
		abi: MultiHatsSignerGateAbi,
		address: contract,
		functionName: "checkAfterExecution",
		args: Array.from(Object.values(args)),
	});

const useClaimSigner = (
	args: { _hatId: AbiTypeToPrimitiveType<"uint256"> },
	address?: `0x${string}`,
) =>
	usePrepareContractWrite({
		chainId,
		abi: MultiHatsSignerGateAbi,
		address: address || contract,
		functionName: "claimSigner",
		args: Array.from(Object.values(args)),
	});

const useReconcileSignerCount = () =>
	usePrepareContractWrite({
		chainId,
		abi: MultiHatsSignerGateAbi,
		address: contract,
		functionName: "reconcileSignerCount",
	});

const useRemoveSigner = (
	MhsgContractAddress: AbiTypeToPrimitiveType<"address">,
	_signer?: AbiTypeToPrimitiveType<"address">,
) => {
	const args = { _signer: _signer };
	return usePrepareContractWrite({
		enabled: false,
		chainId,
		abi: MultiHatsSignerGateAbi,
		address: MhsgContractAddress || contract,
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
	address?: EthereumAddress,
) =>
	usePrepareContractWrite({
		chainId,
		abi: MultiHatsSignerGateAbi,
		address: address || contract,
		functionName: "setMinThreshold",
		args: Array.from(Object.values(args)),
	});

const useSetOwnerHat = (
	args: {
		_ownerHat: AbiTypeToPrimitiveType<"uint256">;
		_hatsContract: AbiTypeToPrimitiveType<"address">;
	},
	address?: EthereumAddress,
) =>
	usePrepareContractWrite({
		chainId,
		abi: MultiHatsSignerGateAbi,
		address: address || contract,
		functionName: "setOwnerHat",
		args: Array.from(Object.values(args)),
	});

const useSetTargetThreshold = (
	args: {
		_targetThreshold: AbiTypeToPrimitiveType<"uint256">;
	},
	address?: EthereumAddress,
) =>
	usePrepareContractWrite({
		chainId,
		abi: MultiHatsSignerGateAbi,
		address: address || contract,
		functionName: "setTargetThreshold",
		args: Array.from(Object.values(args)),
	});

const useSetup = (args: {
	setup: AbiTypeToPrimitiveType<"uint256">;
	initializeParams: AbiTypeToPrimitiveType<"bytes">;
}) =>
	usePrepareContractWrite({
		chainId,
		abi: MultiHatsSignerGateAbi,
		address: contract,
		functionName: "setup",
		args: Array.from(Object.values(args)),
	});

// Hooks for read functions for the HatsSignerGate contract

const useClaimedSignerHats = (args: {
	input: AbiTypeToPrimitiveType<"address">;
}) =>
	useContractRead({
		abi: MultiHatsSignerGateAbi,
		address: contract,
		functionName: "claimedSignerHats",
		args: Array.from(Object.values(args)),
		onSuccess: (data) => {
			console.log(data);
		},
		onError: (error) => {
			console.log(error);
		},
	});

const useCountValidSignatures = (args: {
	dataHash: AbiTypeToPrimitiveType<"bytes">;
	signatures: AbiTypeToPrimitiveType<"bytes">;
	sigCount: AbiTypeToPrimitiveType<"uint256">;
}) =>
	useContractRead({
		abi: MultiHatsSignerGateAbi,
		address: contract,
		functionName: "countValidSignatures",
		args: Array.from(Object.values(args)),
		onSuccess: (data) => {
			console.log(data);
		},
		onError: (error) => {
			console.log(error);
		},
	});

const useGetHatsContract = (address?: `0x${string}`) =>
	useContractRead({
		abi: MultiHatsSignerGateAbi,
		address: address || contract,
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
	address?: `0x${string}`,
) =>
	useContractRead({
		abi: MultiHatsSignerGateAbi,
		address: address || contract,
		functionName: "isValidSigner",
		args: Array.from(Object.values(args)),
		onSuccess: (data) => {
			console.log(data);
		},
		onError: (error) => {
			console.log(error);
		},
	});

const useIsValidSignerHat = (args: {
	_hatId: AbiTypeToPrimitiveType<"uint256">;
}) =>
	useContractRead({
		abi: MultiHatsSignerGateAbi,
		address: contract,
		functionName: "isValidSignerHat",
		args: Array.from(Object.values(args)),
		onSuccess: (data) => {
			console.log(data);
		},
		onError: (error) => {
			console.log(error);
		},
	});

const useMaxSigners = (address?: `0x${string}`) =>
	useContractRead({
		abi: MultiHatsSignerGateAbi,
		address: address || contract,
		functionName: "maxSigners",
		onSuccess: (data) => {
			console.log(data);
		},
		onError: (error) => {
			console.log(error);
		},
	});

const useMinThreshold = (address?: `0x${string}`) =>
	useContractRead({
		abi: MultiHatsSignerGateAbi,
		address: address || contract,
		functionName: "minThreshold",
		onSuccess: (data) => {
			console.log(data);
		},
		onError: (error) => {
			console.log(error);
		},
	});

const useOwnerHat = (address?: `0x${string}`) =>
	useContractRead({
		abi: MultiHatsSignerGateAbi,
		address: address || contract,
		functionName: "ownerHat",
		onSuccess: (data) => {
			console.log(data);
		},
		onError: (error) => {
			console.log(error);
		},
	});

const useSafe = (address?: `0x${string}`) =>
	useContractRead({
		abi: MultiHatsSignerGateAbi,
		address: address || contract,
		functionName: "safe",
		onSuccess: (data) => {
			console.log(data);
		},
		onError: (error) => {
			console.log(error);
		},
	});

const useSupportsInterface = (args: {
	interfaceId: AbiTypeToPrimitiveType<"bytes4">;
}) =>
	useContractRead({
		abi: MultiHatsSignerGateAbi,
		address: contract,
		functionName: "supportsInterface",
		args: Array.from(Object.values(args)),
		onSuccess: (data) => {
			console.log(data);
		},
		onError: (error) => {
			console.log(error);
		},
	});
const useTargetThreshold = (address?: `0x${string}`) =>
	useContractRead({
		abi: MultiHatsSignerGateAbi,
		address: address || contract,
		functionName: "targetThreshold",
		onSuccess: (data) => {
			console.log(data);
		},
		onError: (error) => {
			console.log(error);
		},
	});

const useValidSignerCount = (address?: `0x${string}`) =>
	useContractRead({
		abi: MultiHatsSignerGateAbi,
		address: address || contract,
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
	address?: `0x${string}`,
) => {
	console.log("useValidSignerHats");
	return useContractRead({
		abi: MultiHatsSignerGateAbi,
		address: address || contract,
		functionName: "validSignerHats",
		args: Array.from(Object.values(args)),
		enabled: false,
		onSuccess: (data) => {
			console.log(data);
		},
		onError: (error) => {
			console.log(error);
		},
	});
};

const useVersion = () =>
	useContractRead({
		abi: MultiHatsSignerGateAbi,
		address: contract,
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
	useCheckTransaction,
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
