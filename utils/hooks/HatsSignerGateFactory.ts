import { AbiTypeToPrimitiveType } from 'abitype';
import { useContractRead, usePrepareContractWrite } from 'wagmi';
import { HatsSignerGateFactoryAbi } from '../abi/HatsSignerGateFactory/HatsSignerGateFactory';
import { CONTRACTS } from '../constants';
const contract = (CONTRACTS.hatsSignerGateFactory.contractAddress ||
  '0x50dbb35b81c94b8d1a0ff0cb4aa218ff30166187') as AbiTypeToPrimitiveType<'address'>;
const chainId = process.env.ENVIROMENT === 'production' ? 1 : 5;

// Hooks for write functions for the HatsSignerGateFactory contract

const useDeployHSG = (args: {
  _ownerHatId: AbiTypeToPrimitiveType<'uint256'>;
  _signerHatId: AbiTypeToPrimitiveType<'uint256'>;
  _minThreshold: AbiTypeToPrimitiveType<'uint256'>;
  _targetThreshold: AbiTypeToPrimitiveType<'uint256'>;
  _safe: AbiTypeToPrimitiveType<'address'>;
  _maxSigners: AbiTypeToPrimitiveType<'uint256'>;
}) =>
  usePrepareContractWrite({
    chainId,
    abi: HatsSignerGateFactoryAbi,
    address: contract,
    functionName: 'deployHatsSignerGate',
    args: Array.from(Object.values(args)),
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.log(error);
    },
  });

const useDeployHSGwSafe = (args: {
  _ownerHatId: AbiTypeToPrimitiveType<'uint256'>;
  _signerHatId: AbiTypeToPrimitiveType<'uint256'>;
  _minThreshold: AbiTypeToPrimitiveType<'uint256'>;
  _targetThreshold: AbiTypeToPrimitiveType<'uint256'>;
  _maxSigners: AbiTypeToPrimitiveType<'uint256'>;
}) =>
  usePrepareContractWrite({
    chainId,
    abi: HatsSignerGateFactoryAbi,
    address: contract,
    functionName: 'deployHatsSignerGateAndSafe',
    args: Array.from(Object.values(args)),
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.log(error);
    },
  });

const useDeployMultiHatSG = (args: {
  _ownerHatId: AbiTypeToPrimitiveType<'uint256'>;
  _signersHatIds: AbiTypeToPrimitiveType<'uint256'>[];
  _safe: AbiTypeToPrimitiveType<'address'>;
  _minThreshold: AbiTypeToPrimitiveType<'uint256'>;
  _targetThreshold: AbiTypeToPrimitiveType<'uint256'>;
  _maxSigners: AbiTypeToPrimitiveType<'uint256'>;
}) =>
  usePrepareContractWrite({
    chainId,
    abi: HatsSignerGateFactoryAbi,
    address: contract,
    functionName: 'deployMultiHatsSignerGate',
    args: Array.from(Object.values(args)),
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.log(error);
    },
  });

const useDeployMultiHatSGwSafe = (args: {
  _ownerHatId: AbiTypeToPrimitiveType<'uint256'>;
  _signersHatIds: AbiTypeToPrimitiveType<'uint256'>[];
  _minThreshold: AbiTypeToPrimitiveType<'uint256'>;
  _targetThreshold: AbiTypeToPrimitiveType<'uint256'>;
  _maxSigners: AbiTypeToPrimitiveType<'uint256'>;
}) => {
  return usePrepareContractWrite({
    chainId,
    abi: HatsSignerGateFactoryAbi,
    address: contract,
    functionName: 'deployMultiHatsSignerGateAndSafe',
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

const useCanAttachHSG2Safe = (args: {
  _hsg: AbiTypeToPrimitiveType<'address'>;
}) =>
  useContractRead({
    abi: HatsSignerGateFactoryAbi,
    address: contract,
    functionName: 'canAttachHSGToSafe',
    args: Array.from(Object.values(args)),
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.log(error);
    },
  });

const useCanAttachMHSG2Safe = (args: {
  _mhsg: AbiTypeToPrimitiveType<'uint256'>;
}) =>
  useContractRead({
    abi: HatsSignerGateFactoryAbi,
    address: contract,
    functionName: 'canAttachMHSGToSafe',
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
    functionName: 'gnosisFallbackLibrary',

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
    functionName: 'gnosisMultiSendLibrary',

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
    functionName: 'gnosisSafeProxyFactory',

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
    functionName: 'gnosisHasProxyFactory',

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
    functionName: 'hatAddress',

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
    functionName: 'hatsSignerGateSingleton',

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
    functionName: 'multiHatsSignerGateSingleton',

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
    functionName: 'safe',

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
  useSafeSigleton,
};
