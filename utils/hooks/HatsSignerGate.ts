import { useContractRead, useContractWrite } from 'wagmi';
import { CONTRACTS } from '../constants';

// Hooks for write functions for the HatsSignerGate contract

const useCheckAfterExecution = (args: { bytes32: string; bool: boolean }) => {
  const { data, isLoading, isSuccess, isError, write } = useContractWrite({
    abi: CONTRACTS.hatsSignerGate.contractABI,
    address: CONTRACTS.hatsSignerGate.contractAddress as `0x${string}`,
    functionName: 'checkAfterExecution',
    args: Array.from(Object.values(args)),
  });
  return { data, isLoading, isSuccess, isError, write };
};

const useCheckTransaction = (args: {
  to: string;
  value: BigInt;
  data: string;
  operation: number;
  safeTxGas: BigInt;
  baseGas: BigInt;
  gasPrice: BigInt;
  gasToken: string;
  refundReceiver: string;
  signatures: string;
  address: string;
}) => {
  const { data, isLoading, isSuccess, isError, write } = useContractWrite({
    abi: CONTRACTS.hatsSignerGate.contractABI,
    address: CONTRACTS.hatsSignerGate.contractAddress as `0x${string}`,
    functionName: 'checkTransaction',
    args: Array.from(Object.values(args)),
  });
  return { data, isLoading, isSuccess, isError, write };
};

const useClaimSigner = () => {
  const { data, isLoading, isSuccess, isError, write } = useContractWrite({
    abi: CONTRACTS.hatsSignerGate.contractABI,
    address: CONTRACTS.hatsSignerGate.contractAddress as `0x${string}`,
    functionName: 'claimSigner',
    args: [],
  });
  return { data, isLoading, isSuccess, isError, write };
};

const useReconsileSignerCount = () => {
  const { data, isLoading, isSuccess, isError, write } = useContractWrite({
    abi: CONTRACTS.hatsSignerGate.contractABI,
    address: CONTRACTS.hatsSignerGate.contractAddress as `0x${string}`,
    functionName: 'reconsileSignerCount',
    args: [],
  });
  return { data, isLoading, isSuccess, isError, write };
};

const useRemoveSigner = (args: { _signer: string }) => {
  const { data, isLoading, isSuccess, isError, write } = useContractWrite({
    abi: CONTRACTS.hatsSignerGate.contractABI,
    address: CONTRACTS.hatsSignerGate.contractAddress as `0x${string}`,
    functionName: 'removeSigner',
    args: Array.from(Object.values(args)),
  });
  return { data, isLoading, isSuccess, isError, write };
};

const useSetMinThreshold = (args: { _minThreshold: number }) => {
  const { data, isLoading, isSuccess, isError, write } = useContractWrite({
    abi: CONTRACTS.hatsSignerGate.contractABI,
    address: CONTRACTS.hatsSignerGate.contractAddress as `0x${string}`,
    functionName: 'setMinThreshold',
    args: Array.from(Object.values(args)),
  });
  return { data, isLoading, isSuccess, isError, write };
};

const useSetOwnerHat = (args: { _ownerHat: BigInt; _hatsContract: string }) => {
  const { data, isLoading, isSuccess, isError, write } = useContractWrite({
    abi: CONTRACTS.hatsSignerGate.contractABI,
    address: CONTRACTS.hatsSignerGate.contractAddress as `0x${string}`,
    functionName: 'setOwnerHat',
    args: Array.from(Object.values(args)),
  });
  return { data, isLoading, isSuccess, isError, write };
};

const useSetTargetThreshold = (args: { _targetThreshold: BigInt }) => {
  const { data, isLoading, isSuccess, isError, write } = useContractWrite({
    abi: CONTRACTS.hatsSignerGate.contractABI,
    address: CONTRACTS.hatsSignerGate.contractAddress as `0x${string}`,
    functionName: 'setTargetThreshold',
    args: Array.from(Object.values(args)),
  });
  return { data, isLoading, isSuccess, isError, write };
};

const useSetup = (args: { setUp: BigInt; initializeParams: string }) => {
  const { data, isLoading, isSuccess, isError, write } = useContractWrite({
    abi: CONTRACTS.hatsSignerGate.contractABI,
    address: CONTRACTS.hatsSignerGate.contractAddress as `0x${string}`,
    functionName: 'setup',
    args: Array.from(Object.values(args)),
  });
  return { data, isLoading, isSuccess, isError, write };
};

// Hooks for read functions for the HatsSignerGate contract

const useCountValidSignatures = (args: {
  dataHash: string;
  signature: string;
  sigCount: BigInt;
}) => {
  const { data, isLoading, isSuccess, isError } = useContractRead({
    abi: CONTRACTS.hatsSignerGateFactory.contractABI,
    address: CONTRACTS.hatsSignerGateFactory.contractAddress as `0x${string}`,
    functionName: 'countValidSignatures',
    args: Array.from(Object.values(args)),
  });

  return { data, isLoading, isSuccess, isError };
};

const useGetHatsContract = () => {
  const { data, isLoading, isSuccess, isError } = useContractRead({
    abi: CONTRACTS.hatsSignerGate.contractABI,
    address: CONTRACTS.hatsSignerGate.contractAddress as `0x${string}`,
    functionName: 'getHatsContract',
    args: [],
  });

  return { data, isLoading, isSuccess, isError };
};

const useIsValidSigner = (args: { _account: string }) => {
  const { data, isLoading, isSuccess, isError } = useContractRead({
    abi: CONTRACTS.hatsSignerGate.contractABI,
    address: CONTRACTS.hatsSignerGate.contractAddress as `0x${string}`,
    functionName: 'isValidSigner',
    args: Array.from(Object.values(args)),
  });

  return { data, isLoading, isSuccess, isError };
};

const useMaxSigners = () => {
  const { data, isLoading, isSuccess, isError } = useContractRead({
    abi: CONTRACTS.hatsSignerGate.contractABI,
    address: CONTRACTS.hatsSignerGate.contractAddress as `0x${string}`,
    functionName: 'maxSigners',
    args: [],
  });

  return { data, isLoading, isSuccess, isError };
};

const useMinThreshold = () => {
  const { data, isLoading, isSuccess, isError } = useContractRead({
    abi: CONTRACTS.hatsSignerGate.contractABI,
    address: CONTRACTS.hatsSignerGate.contractAddress as `0x${string}`,
    functionName: 'minThreshold',
    args: [],
  });

  return { data, isLoading, isSuccess, isError };
};

const useOwnerHat = () => {
  const { data, isLoading, isSuccess, isError } = useContractRead({
    abi: CONTRACTS.hatsSignerGate.contractABI,
    address: CONTRACTS.hatsSignerGate.contractAddress as `0x${string}`,
    functionName: 'ownerHat',
    args: [],
  });

  return { data, isLoading, isSuccess, isError };
};

const useSafe = () => {
  const { data, isLoading, isSuccess, isError } = useContractRead({
    abi: CONTRACTS.hatsSignerGate.contractABI,
    address: CONTRACTS.hatsSignerGate.contractAddress as `0x${string}`,
    functionName: 'safe',
    args: [],
  });

  return { data, isLoading, isSuccess, isError };
};

const useSignersHatId = () => {
  const { data, isLoading, isSuccess, isError } = useContractRead({
    abi: CONTRACTS.hatsSignerGate.contractABI,
    address: CONTRACTS.hatsSignerGate.contractAddress as `0x${string}`,
    functionName: 'signersHatId',
    args: [],
  });

  return { data, isLoading, isSuccess, isError };
};

const useSupportsInterface = (args: { interfaceId: string }) => {
  const { data, isLoading, isSuccess, isError } = useContractRead({
    abi: CONTRACTS.hatsSignerGate.contractABI,
    address: CONTRACTS.hatsSignerGate.contractAddress as `0x${string}`,
    functionName: 'supportsInterface',
    args: Array.from(Object.values(args)),
  });

  return { data, isLoading, isSuccess, isError };
};

const useTargetThreshold = () => {
  const { data, isLoading, isSuccess, isError } = useContractRead({
    abi: CONTRACTS.hatsSignerGate.contractABI,
    address: CONTRACTS.hatsSignerGate.contractAddress as `0x${string}`,
    functionName: 'targetThreshold',
    args: [],
  });

  return { data, isLoading, isSuccess, isError };
};

const useValidSignerCount = () => {
  const { data, isLoading, isSuccess, isError } = useContractRead({
    abi: CONTRACTS.hatsSignerGateFactory.contractABI,
    address: CONTRACTS.hatsSignerGateFactory.contractAddress as `0x${string}`,
    functionName: 'validSignerCount',
    args: [],
  });

  return { data, isLoading, isSuccess, isError };
};

const useVersion = () => {
  const { data, isLoading, isSuccess, isError } = useContractRead({
    abi: CONTRACTS.hatsSignerGateFactory.contractABI,
    address: CONTRACTS.hatsSignerGateFactory.contractAddress as `0x${string}`,
    functionName: 'version',
    args: [],
  });

  return { data, isLoading, isSuccess, isError };
};

export {
  useCheckAfterExecution,
  useCheckTransaction,
  useClaimSigner,
  useReconsileSignerCount,
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
