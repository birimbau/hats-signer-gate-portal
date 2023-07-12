import { Address, useContractRead, usePrepareContractWrite } from "wagmi";
import { CONTRACTS } from "../constants";
import { goerli } from "wagmi/chains";
import { HatsSignerGateAbi } from "../abi/HatsSignerGate/HatsSignerGate";
// Hooks for write functions for the HatsSignerGate contract
const contract = process.env.HATS_SIGNER_GATE_CONTRACT_ADDRESS as Address || '0x844b3c7781338d3308eb8d64727033893fce1432';
const chainId = process.env.ENVIROMENT === 'production' ? 1 : 5;


const useCheckAfterExecution = (args: { bytes32: string; bool: boolean }) =>
  usePrepareContractWrite({
    chainId,
    abi: HatsSignerGateAbi,
    address: contract,
    functionName: "checkAfterExecution",
    args: Array.from(Object.values(args)),
  });

const useCheckTransaction = (args: {
  to: string;
  value: bigint;
  data: string;
  operation: bigint;
  safeTxGas: bigint;
  baseGas: bigint;
  gasPrice: bigint;
  gasToken: string;
  refundReceiver: string;
  signatures: string;
  address: string;
}) =>
  usePrepareContractWrite({
    chainId,
    abi: HatsSignerGateAbi,
    address: contract,
    functionName: "checkTransaction",
    args: Array.from(Object.values(args)),
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.log(error);
    },
  });

const useClaimSigner = () =>
  usePrepareContractWrite({
    chainId,
    abi: HatsSignerGateAbi,
    address: contract,
    functionName: "claimSigner",
    
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.log(error);
    },
  });

const useReconsileSignerCount = () =>
  usePrepareContractWrite({
    chainId,
    abi: HatsSignerGateAbi,
    address: contract,
    functionName: "reconsileSignerCount",
    
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.log(error);
    },
  });

const useRemoveSigner = (args: { _signer: string }) =>
  usePrepareContractWrite({
    chainId,
    abi: HatsSignerGateAbi,
    address: contract,
    functionName: "removeSigner",
    args: Array.from(Object.values(args)),
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.log(error);
    },
  });

const useSetMinThreshold = (args: { _minThreshold: bigint }) =>
  usePrepareContractWrite({
    chainId,
    abi: HatsSignerGateAbi,
    address: contract,
    functionName: "setMinThreshold",
    args: Array.from(Object.values(args)),
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.log(error);
    },
  });

const useSetOwnerHat = (args: { _ownerHat: bigint; _hatsContract: string }) =>
  usePrepareContractWrite({
    chainId,
    abi: HatsSignerGateAbi,
    address: contract,
    functionName: "setOwnerHat",
    args: Array.from(Object.values(args)),
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.log(error);
    },
  });

const useSetTargetThreshold = (args: { _targetThreshold: bigint }) =>
  usePrepareContractWrite({
    chainId,
    abi: HatsSignerGateAbi,
    address: contract,
    functionName: "setTargetThreshold",
    args: Array.from(Object.values(args)),
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.log(error);
    },
  });

const useSetup = (args: { setUp: bigint; initializeParams: string }) =>
  usePrepareContractWrite({
    chainId,
    abi: HatsSignerGateAbi,
    address: contract,
    functionName: "setup",
    args: Array.from(Object.values(args)),
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.log(error);
    },
  });

// Hooks for read functions for the HatsSignerGate contract

const useCountValidSignatures = (args: {
  dataHash: string;
  signature: string;
  sigCount: bigint;
}) =>
  useContractRead({
    abi: HatsSignerGateAbi,
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

const useGetHatsContract = () =>
  useContractRead({
    abi: HatsSignerGateAbi,
    address: contract,
    functionName: "getHatsContract",
    
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.log(error);
    },
  });

const useIsValidSigner = (args: { _account: string }) =>
  useContractRead({
    abi: HatsSignerGateAbi,
    address: contract,
    functionName: "isValidSigner",
    args: Array.from(Object.values(args)),
  });

const useMaxSigners = () =>
  useContractRead({
    abi: HatsSignerGateAbi,
    address: contract,
    functionName: "maxSigners",
    
  });

const useMinThreshold = () =>
  useContractRead({
    abi: HatsSignerGateAbi,
    address: contract,
    functionName: "minThreshold",
    
  });

const useOwnerHat = () =>
  useContractRead({
    abi: HatsSignerGateAbi,
    address: contract,
    functionName: "ownerHat",
    
  });

const useSafe = () =>
  useContractRead({
    abi: HatsSignerGateAbi,
    address: contract,
    functionName: "safe",
    
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.log(error);
    },
  });

const useSignersHatId = () =>
  useContractRead({
    abi: HatsSignerGateAbi,
    address: contract,
    functionName: "signersHatId",
    
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.log(error);
    },
  });

const useSupportsInterface = (args: { interfaceId: string }) =>
  useContractRead({
    abi: HatsSignerGateAbi,
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

const useTargetThreshold = () =>
  useContractRead({
    abi: HatsSignerGateAbi,
    address: contract,
    functionName: "targetThreshold",
    
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.log(error);
    },
  });

const useValidSignerCount = () =>
  useContractRead({
    abi: HatsSignerGateAbi,
    address: contract,
    functionName: "validSignerCount",
    
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.log(error);
    },
  });

const useVersion = () =>
  useContractRead({
    abi: HatsSignerGateAbi,
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
