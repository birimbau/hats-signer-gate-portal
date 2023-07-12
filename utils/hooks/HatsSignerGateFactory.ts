import { useContractRead, usePrepareContractWrite, Address } from "wagmi";
import { CONTRACTS } from "../constants";
import { goerli } from "wagmi/chains";
import { HatsSignerGateFactoryAbi } from "../abi/HatsSignerGateFactory/HatsSignerGateFactory";
import { Abi } from "abitype";
import { AbiTypeToPrimitiveType } from "abitype";
const contract =
  (process.env.HATS_SIGNER_GATE_FACTORY_CONTRACT_ADDRESS as Address) ||
  "0x50dbb35b81c94b8d1a0ff0cb4aa218ff30166187";
const chainId = process.env.ENVIROMENT === "production" ? 1 : 5;

// Hooks for write functions for the HatsSignerGateFactory contract


const useDeployHSG = (args: {
  _ownerHatId: bigint;
  _signerHatId: bigint;
  _minThreshold: bigint;
  _targetThreshold: bigint;
  _safe: AbiTypeToPrimitiveType<"address">;
  _maxSigners: bigint;
}) =>
  usePrepareContractWrite({
    chainId,
    abi: HatsSignerGateFactoryAbi,
    address: contract,
    functionName: "deployHatsSignerGate",
    args: Array.from(Object.values(args)),
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.log(error);
    },
  });

const useDeployHSGwSafe = (args: {
  _ownerHatId: bigint;
  _signerHatId: bigint;
  _minThreshold: bigint;
  _targetThreshold: bigint;
  _maxSigners: bigint;
}) =>
  usePrepareContractWrite({
    chainId,
    abi: HatsSignerGateFactoryAbi,
    address: contract,
    functionName: "deployHatsSignerGateWithSafe",
    args: Array.from(Object.values(args)),
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.log(error);
    },
  });

const useDeployMultiHatSG = (args: {
  _ownerHatId: bigint;
  _signerHatId: bigint;
  _safe: bigint;
  _minThreshold: bigint;
  _targetThreshold: bigint;
  _maxSigners: bigint;
}) =>
  usePrepareContractWrite({
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

const useDeployMultiHatSGwSafe = (args: {
  _ownerHatId: bigint;
  _signerHatId: bigint;
  _minThreshold: bigint;
  _targetThreshold: bigint;
  _maxSigners: bigint;
}) =>
  usePrepareContractWrite({
    chainId,
    abi: HatsSignerGateFactoryAbi,
    address: contract,
    functionName: "deployMultiHatsSignerGateWithSafe",
    args: Array.from(Object.values(args)),
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.log(error);
    },
  });

// Hooks for read functions for the HatsSignerGateFactory contract

const useCanAttachHSG2Safe = (args: {
  _hsg: AbiTypeToPrimitiveType<"address">;
}) =>
  useContractRead({
    abi: HatsSignerGateFactoryAbi,
    address: contract,
    functionName: "canAttachHSGToSafe",
    args: Array.from(Object.values(args)),
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.log(error);
    },
  });

const useCanAttachMHSG2Safe = (args: { _mhsg: bigint }) =>
  useContractRead({
    abi: HatsSignerGateFactoryAbi,
    address: contract,
    functionName: "canAttachMHSGToSafe",
    args: Array.from(Object.values(args)),
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.log(error);
    },
  });

const useGnosisFallbackLibrary = () =>
  useContractRead({
    abi: HatsSignerGateFactoryAbi,
    address: contract,
    functionName: "gnosisFallbackLibrary",

    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.log(error);
    },
  });

const useGnosisMultiSendLibrary = () =>
  useContractRead({
    abi: HatsSignerGateFactoryAbi,
    address: contract,
    functionName: "gnosisMultiSendLibrary",

    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.log(error);
    },
  });

const useGnosisSafeProxyFactory = () => {
  return useContractRead({
    abi: HatsSignerGateFactoryAbi,
    address: contract,
    functionName: "gnosisSafeProxyFactory",

    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.log(error);
    },
  });
};

const useGnosisHasProxyFactory = () => {
  return useContractRead({
    abi: HatsSignerGateFactoryAbi,
    address: contract,
    functionName: "gnosisHasProxyFactory",

    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.log(error);
    },
  });
};

const useHatsAddresses = () =>
  useContractRead({
    abi: HatsSignerGateFactoryAbi,
    address: contract,
    functionName: "hatAddress",

    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.log(error);
    },
  });

const useHatsSignerGateSingleton = () =>
  useContractRead({
    abi: HatsSignerGateFactoryAbi,
    address: contract,
    functionName: "hatsSignerGateSingleton",

    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.log(error);
    },
  });

const useMultiHatsSignerGateSingleton = () =>
  useContractRead({
    abi: HatsSignerGateFactoryAbi,
    address: contract,
    functionName: "multiHatsSignerGateSingleton",

    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.log(error);
    },
  });

const useSafeSigleton = () =>
  useContractRead({
    abi: HatsSignerGateFactoryAbi,
    address: contract,
    functionName: "safe",

    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.log(error);
    },
  });

export {
  // All the write function hooks are below
  useDeployHSG,
  useDeployHSGwSafe,
  useDeployMultiHatSG,
  useDeployMultiHatSGwSafe,
  // All the read function hooks are below
  useCanAttachHSG2Safe,
  useCanAttachMHSG2Safe,
  useGnosisFallbackLibrary,
  useGnosisMultiSendLibrary,
  useGnosisSafeProxyFactory,
  useGnosisHasProxyFactory,
  useHatsAddresses,
  useHatsSignerGateSingleton,
  useMultiHatsSignerGateSingleton,
  useSafeSigleton,
};
