import { VStack, Text, Flex } from '@chakra-ui/react';
import Button from '../../../UI/CustomButton/CustomButton';
import { AbiTypeToPrimitiveType } from 'abitype';
import { useState, useRef, useEffect } from 'react';
import { useAccount, useContractWrite, useWaitForTransaction } from 'wagmi';
import { useDeployHSGwSafe } from '../../../../utils/hooks/HatsSignerGateFactory';
import Input from '../../../UI/CustomInput/CustomInput';
import { useDeployMultiHatSGwSafe } from '../../../../utils/hooks/HatsSignerGateFactory';
import { decodeEventLog } from 'viem';
import { HatsSignerGateFactoryAbi } from '../../../../utils/abi/HatsSignerGateFactory/HatsSignerGateFactory';
import { Formik, Form, FormikProps, useFormik } from 'formik';
import * as Yup from 'yup';
import {
  DeployConfigHSG_BigInt,
  DeployConfigHSG_String,
} from '../../../../pages/deploy/hsgws';

interface Props {
  setData: (data: any) => void;
  setTransactionData: (data: any) => void;
  formData: DeployConfigHSG_String;
}

export default function HsgOnSubmit(props: Props) {
  // Destructure Props for ease of use & visibility within this function
  const { setData, setTransactionData, formData } = props;

  // const [hash4, setHash] = useState<string>('');

  // I have left the values in string format to be used consistently,
  // then when we need them as BigInts, I have transformed them.
  const toBigint = (value: string): bigint => {
    if (value === '') {
      return BigInt(0);
    }
    return BigInt(value);
  };

  const transformFormDataToBigInt = (
    formData: DeployConfigHSG_String
  ): DeployConfigHSG_BigInt => {
    return {
      _ownerHatId: toBigint(formData._ownerHatId),
      _signerHatId: toBigint(formData._signerHatId),
      _minThreshold: toBigint(formData._minThreshold),
      _targetThreshold: toBigint(formData._targetThreshold),
      _maxSigners: toBigint(formData._maxSigners),
    };
  };

  // The args are passed into "usePrepareContractWrite" returning a "prepared configuration" to be sent through to useContractWrite.
  // args.current is passed in - IT USES CLOSURE, SO THE WRITE FUNCTION HOLDS THE REFERENCES TO args.current...
  // This means that "write()" onSubmit has access to args.current.
  const { config } = useDeployHSGwSafe(transformFormDataToBigInt(formData));
  const { data: contractData, write } = useContractWrite(config);
  // No need to spread config ^^, it's an object
  // IMPROVE

  // This only runs if "hash" is defined
  // Use this to detect isLoading/isError state in transaction
  const { data: transactionData, isLoading } = useWaitForTransaction({
    hash: contractData?.hash as AbiTypeToPrimitiveType<'address'>,
    onSuccess(data) {
      const response = decodeEventLog({
        abi: HatsSignerGateFactoryAbi,
        data: data.logs[8].data,
        topics: data.logs[8].topics,
      });

      setTransactionData(data);
      setData(response.args);
    },
  });

  write?.();
  console.log('inside HSGSUBmittinGGG');
  return null;

  // Why is this being used to re-render the app?
  // Improve - data to contractData
  // useEffect(() => {
  //   if (contractData) {
  //     setHash(contractData.hash);
  //   }
  // }, [contractData]);

  // TODO - Add Validation
  // Grey out button on submit.
}
