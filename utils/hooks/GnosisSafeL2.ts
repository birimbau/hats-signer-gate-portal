import { AbiTypeToPrimitiveType } from 'abitype';
import { useContractRead, usePrepareContractWrite } from 'wagmi';
import { GnosisSafeL2Abi } from '../abi/GnosisSafeL2/GnosisSafeL2';
import { CONTRACTS } from '../constants';
import { EthereumAddress } from '../../components/Deployers/forms/utils/ReadForm';
import { start } from 'repl';

const contract = CONTRACTS.GnosisSafeL2.contractAddress as EthereumAddress;
const chainId = process.env.ENVIROMENT === 'production' ? 1 : 5;

// The expected response shape based on the GnosisScan response
interface ContractResponse {
  0: any[];
  1: string;
  array: any[];
  next: string;
}

const useGetModulesPaginated = (safeAddress: EthereumAddress) => {
  const args = {
    start:
      '0x0000000000000000000000000000000000000001' as AbiTypeToPrimitiveType<'address'>, // SENTINAL_ADDRESS - DO NOT CHANGE
    pageSize: BigInt(1) as AbiTypeToPrimitiveType<'uint256'>,
  };

  // useContractRead<TAbi, TFunctionName, TSelectData> - Generic types
  // ContractResponse is the generic which is passed in
  return useContractRead<
    typeof GnosisSafeL2Abi,
    'getModulesPaginated',
    ContractResponse
  >({
    abi: GnosisSafeL2Abi,
    address: safeAddress || contract,
    functionName: 'getModulesPaginated',
    args: Array.from(Object.values(args)),
    enabled: false,
    chainId,
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.log(error);
    },
  });
};

export { useGetModulesPaginated };
