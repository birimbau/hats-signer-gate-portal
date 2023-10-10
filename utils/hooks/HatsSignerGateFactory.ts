import { AbiTypeToPrimitiveType } from 'abitype';
import { useContractRead, usePrepareContractWrite } from 'wagmi';
import { HatsSignerGateFactoryAbi } from '../abi/HatsSignerGateFactory/HatsSignerGateFactory';
import { CONTRACTS } from '../constants';
import {
  DeployConfigHSG,
  DeployConfigHSGWF,
  DeployConfigMHSG,
  DeployConfigMHSGWF,
  HSGWS_Args,
  HSG_Args,
  MHSGWS_Args,
  MHSG_Args,
} from '../../components/Deployers/forms/types/forms';
import { EthereumAddress } from '../../components/Deployers/forms/utils/ReadForm';
const contract = CONTRACTS.hatsSignerGateFactory
  .contractAddress as `0x${string}`;
const chainId = process.env.ENVIROMENT === 'production' ? 1 : 5;

// Hooks for write functions for the HatsSignerGateFactory contract

const useDeployHSG = (formData: DeployConfigHSG) => {
  const args: HSG_Args = {
    _ownerHatId: BigInt(formData._ownerHatId),
    _signerHatId: BigInt(formData._signerHatId),
    _safe: formData._safe as EthereumAddress,
    _minThreshold: BigInt(formData._minThreshold),
    _targetThreshold: BigInt(formData._targetThreshold),
    _maxSigners: BigInt(formData._maxSigners),
  };

  return usePrepareContractWrite({
    enabled: false, // This means that the contract does not get called on every render until refetch is called.
    chainId,
    abi: HatsSignerGateFactoryAbi,
    address: contract,
    functionName: 'deployHatsSignerGate',
    args: Array.from(Object.values(args)),
    onSuccess: (data) => {
      console.log('prepare Contract: ', data);
    },
    onError: (error) => {
      console.log(error);
    },
  });
};

const useDeployHSGwSafe = (formData: DeployConfigHSGWF) => {
  const args: HSGWS_Args = {
    _ownerHatId: BigInt(formData._ownerHatId),
    _signerHatId: BigInt(formData._signerHatId),
    _minThreshold: BigInt(formData._minThreshold),
    _targetThreshold: BigInt(formData._targetThreshold),
    _maxSigners: BigInt(formData._maxSigners),
  };
  return usePrepareContractWrite({
    enabled: false, // This means that the contract does not get called on every render until refetch is called.
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
};

const useDeployMultiHatSG = (formData: DeployConfigMHSG) => {
  const args: MHSG_Args = {
    _ownerHatId: BigInt(formData._ownerHatId),
    _signersHatIds: formData._signersHatIds.map((v) => BigInt(Number(v))),
    _safe: formData._safe as EthereumAddress,
    _minThreshold: BigInt(formData._minThreshold),
    _targetThreshold: BigInt(formData._targetThreshold),
    _maxSigners: BigInt(formData._maxSigners),
  };
  return usePrepareContractWrite({
    enabled: false,
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
};

const useDeployMultiHatSGwSafe = (formData: DeployConfigMHSGWF) => {
  const args: MHSGWS_Args = {
    _ownerHatId: BigInt(formData._ownerHatId),
    _signersHatIds: formData._signersHatIds.map((v) => BigInt(Number(v))),
    _minThreshold: BigInt(formData._minThreshold),
    _targetThreshold: BigInt(formData._targetThreshold),
    _maxSigners: BigInt(formData._maxSigners),
  };
  return usePrepareContractWrite({
    enabled: false,
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
  _mhsg: AbiTypeToPrimitiveType<'address'>;
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
