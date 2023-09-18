import { AbiTypeToPrimitiveType } from 'abitype';
import { useContractRead, usePrepareContractWrite } from 'wagmi';
import { GnosisSafeL2Abi } from '../abi/GnosisSafeL2/GnosisSafeL2';
import { CONTRACTS } from '../constants';
const contract = CONTRACTS.GnosisSafeL2.contractAddress;
const chainId = process.env.ENVIROMENT === 'production' ? 1 : 5;

const useGetModulesPaginated = (args: {
    start: AbiTypeToPrimitiveType<"address">;
    pageSize: AbiTypeToPrimitiveType<"uint256">;
  }, contractId?: string) =>
    useContractRead({
      abi: GnosisSafeL2Abi,
      address: contractId || contract,
      functionName: "getModulesPaginated",
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

    export {
        useGetModulesPaginated,
      };