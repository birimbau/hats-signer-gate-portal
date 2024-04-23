import { AbiTypeToPrimitiveType } from "abitype";
import { useContractRead, usePrepareContractWrite } from "wagmi";
import { HatsSignerGateFactoryAbi } from "@/utils/abi/HatsSignerGateFactory";
import { CONTRACTS, ChainKeys } from "@/utils";
import {
	DeployConfigHSG,
	DeployConfigHSGWS,
	DeployConfigMHSG,
	DeployConfigMHSGWS,
	HSGWS_Args,
	HSG_Args,
	MHSGWS_Args,
	MHSG_Args,
} from "@/types/forms";
import { Hex } from "viem";
import _ from "lodash";

// Hooks for write functions for the HatsSignerGateFactory contract

const useDeployHSG = (formData: DeployConfigHSG, chainId?: number) => {
	const args: HSG_Args = {
		_ownerHatId: BigInt(formData._ownerHatId),
		_signerHatId: BigInt(formData._signerHatId),
		_safe: formData._safe as Hex,
		_minThreshold: BigInt(formData._minThreshold),
		_targetThreshold: BigInt(formData._targetThreshold),
		_maxSigners: BigInt(formData._maxSigners),
	};

	const contract = CONTRACTS.hatsSignerGateFactory[chainId as ChainKeys];

	return usePrepareContractWrite({
		enabled: false, // This means that the contract does not get called on every render until refetch is called.
		chainId,
		abi: HatsSignerGateFactoryAbi,
		address: contract,
		functionName: "deployHatsSignerGate",
		args: Array.from(Object.values(args)),
		onSuccess: (data) => {
			console.log("prepare Contract: ", data);
		},
		onError: (error) => {
			console.log(error);
		},
	});
};

const useDeployHSGwSafe = (formData: DeployConfigHSGWS, chainId?: number) => {
	const args: HSGWS_Args = {
		_ownerHatId: BigInt(formData._ownerHatId),
		_signerHatId: BigInt(formData._signerHatId),
		_minThreshold: BigInt(formData._minThreshold),
		_targetThreshold: BigInt(formData._targetThreshold),
		_maxSigners: BigInt(formData._maxSigners),
	};

	const contract = CONTRACTS.hatsSignerGateFactory[chainId as ChainKeys];

	return usePrepareContractWrite({
		enabled: false, // This means that the contract does not get called on every render until refetch is called.
		chainId,
		abi: HatsSignerGateFactoryAbi,
		address: contract,
		functionName: "deployHatsSignerGateAndSafe",
		args: Array.from(Object.values(args)),
		onSuccess: (data) => {
			console.log(data);
		},
		onError: (error) => {
			console.log(error);
		},
	});
};

const useDeployMultiHatSG = (formData: DeployConfigMHSG, chainId?: number) => {
	const args: MHSG_Args = {
		_ownerHatId: BigInt(formData._ownerHatId),
		_signersHatIds: formData._signersHatIds.map((v) => BigInt(Number(v))),
		_safe: formData._safe as Hex,
		_minThreshold: BigInt(formData._minThreshold),
		_targetThreshold: BigInt(formData._targetThreshold),
		_maxSigners: BigInt(formData._maxSigners),
	};

	const contract = CONTRACTS.hatsSignerGateFactory[chainId as ChainKeys];

	return usePrepareContractWrite({
		enabled: false,
		chainId,
		abi: HatsSignerGateFactoryAbi,
		address: contract,
		functionName: "deployMultiHatsSignerGate",
		args: Array.from(Object.values(args)),
		onSuccess: (data) => {
			console.log(data);
		},
		onError: (error) => {
			console.log(error);
		},
	});
};

const useDeployMultiHatSGwSafe = (
	formData: DeployConfigMHSGWS,
	chainId?: number,
) => {
	const args: MHSGWS_Args = {
		_ownerHatId: BigInt(formData._ownerHatId),
		_signersHatIds: formData._signersHatIds.map((v) => BigInt(Number(v))),
		_minThreshold: BigInt(formData._minThreshold),
		_targetThreshold: BigInt(formData._targetThreshold),
		_maxSigners: BigInt(formData._maxSigners),
	};

	const contract = CONTRACTS.hatsSignerGateFactory[chainId as ChainKeys];

	return usePrepareContractWrite({
		enabled: !!chainId && _.every(Object.values(formData), (v) => !!v),
		chainId,
		abi: HatsSignerGateFactoryAbi,
		address: contract,
		functionName: "deployMultiHatsSignerGateAndSafe",
		args: Array.from(Object.values(args)),
		onSuccess: (data) => {
			return data;
		},
		onError: (error) => {
			console.log(error);
			return error;
		},
	});
};

// Hooks for read functions for the HatsSignerGateFactory contract

const useCanAttachHSG2Safe = (
	args: {
		_hsg: AbiTypeToPrimitiveType<"address">;
	},
	address: Hex,
	chainId?: number,
) =>
	useContractRead({
		abi: HatsSignerGateFactoryAbi,
		address,
		chainId,
		functionName: "canAttachHSGToSafe",
		args: Array.from(Object.values(args)),
		enabled: !!address,
		onSuccess: (data) => {
			console.log(data);
		},
		onError: (error) => {
			console.log(error);
		},
	});

const useCanAttachMHSG2Safe = (
	args: {
		_mhsg: AbiTypeToPrimitiveType<"address">;
	},
	address: Hex,
	chainId?: number,
) =>
	useContractRead({
		abi: HatsSignerGateFactoryAbi,
		address,
		chainId,
		functionName: "canAttachMHSGToSafe",
		args: Array.from(Object.values(args)),
		onSuccess: (data) => {
			console.log(data);
		},
		onError: (error) => {
			console.log(error);
		},
	});

const useGnosisFallbackLibrary = (address: Hex) =>
	useContractRead({
		abi: HatsSignerGateFactoryAbi,
		address,
		functionName: "gnosisFallbackLibrary",

		onSuccess: (data) => {
			console.log(data);
		},
		onError: (error) => {
			console.log(error);
		},
	});

const useGnosisMultiSendLibrary = (address: Hex) =>
	useContractRead({
		abi: HatsSignerGateFactoryAbi,
		address,
		functionName: "gnosisMultiSendLibrary",
		onSuccess: (data) => {
			console.log(data);
		},
		onError: (error) => {
			console.log(error);
		},
	});

const useGnosisSafeProxyFactory = (address: Hex) => {
	return useContractRead({
		abi: HatsSignerGateFactoryAbi,
		address,
		functionName: "gnosisSafeProxyFactory",
		onSuccess: (data) => {
			console.log(data);
		},
		onError: (error) => {
			console.log(error);
		},
	});
};

const useGnosisHasProxyFactory = (address: Hex) => {
	return useContractRead({
		abi: HatsSignerGateFactoryAbi,
		address,
		functionName: "gnosisHasProxyFactory",

		onSuccess: (data) => {
			console.log(data);
		},
		onError: (error) => {
			console.log(error);
		},
	});
};

const useHatsAddresses = (address: Hex) =>
	useContractRead({
		abi: HatsSignerGateFactoryAbi,
		address,
		functionName: "hatAddress",

		onSuccess: (data) => {
			console.log(data);
		},
		onError: (error) => {
			console.log(error);
		},
	});

const useHatsSignerGateSingleton = (address: Hex) =>
	useContractRead({
		abi: HatsSignerGateFactoryAbi,
		address,
		functionName: "hatsSignerGateSingleton",

		onSuccess: (data) => {
			console.log(data);
		},
		onError: (error) => {
			console.log(error);
		},
	});

const useMultiHatsSignerGateSingleton = (address: Hex) =>
	useContractRead({
		abi: HatsSignerGateFactoryAbi,
		address,
		functionName: "multiHatsSignerGateSingleton",

		onSuccess: (data) => {
			console.log(data);
		},
		onError: (error) => {
			console.log(error);
		},
	});

const useSafeSingleton = (address: Hex) =>
	useContractRead({
		abi: HatsSignerGateFactoryAbi,
		address,
		functionName: "safe",

		onSuccess: (data) => {
			console.log(data);
		},
		onError: (error) => {
			console.log(error);
		},
	});

export {
	// All the read function hooks are below
	useCanAttachHSG2Safe,
	useCanAttachMHSG2Safe,
	// All the write function hooks are below
	useDeployHSG,
	useDeployHSGwSafe,
	useDeployMultiHatSG,
	useDeployMultiHatSGwSafe,
	useGnosisFallbackLibrary,
	useGnosisHasProxyFactory,
	useGnosisMultiSendLibrary,
	useGnosisSafeProxyFactory,
	useHatsAddresses,
	useHatsSignerGateSingleton,
	useMultiHatsSignerGateSingleton,
	useSafeSingleton,
};
