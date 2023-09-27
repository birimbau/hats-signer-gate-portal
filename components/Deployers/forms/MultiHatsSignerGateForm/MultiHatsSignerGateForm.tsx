import { Flex, VStack } from '@chakra-ui/react';
import { AbiTypeToPrimitiveType } from 'abitype';
import { useEffect, useState } from 'react';
import {
  useAccount,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from 'wagmi';
import { useDeployMultiHatSG } from '../../../../utils/hooks/HatsSignerGateFactory';
import Button from '../../../UI/CustomButton/CustomButton';
import MultiInput from '../../../UI/MultiInput/MultiInput';
import { DeployConfigMHSG_String } from '../types/forms';
import { EthereumAddress } from '../utils/ReadForm';
import {
  arrayOfHatStrings,
  ethAdressSchema,
  hatIntSchema,
} from '../utils/validation';
import * as Yup from 'yup';
import '../utils/validation'; // for Yup Validation
import { decodeEventLog } from 'viem';
import { HatsSignerGateFactoryAbi } from '../../../../utils/abi/HatsSignerGateFactory/HatsSignerGateFactory';
import { Form, Formik } from 'formik';
import CustomInputWrapper from '../utils/CustomInputWrapper';
import { ethers } from 'ethers';

import { CONTRACTS } from '../../../../utils/constants';
const contract = CONTRACTS.hatsSignerGateFactory
  .contractAddress as `0x${string}`;
const chainId = process.env.ENVIROMENT === 'production' ? 1 : 5;

interface Props {
  setIsPending: (isPending: boolean) => void;
  setData: (data: any) => void;
  setTransactionData: (data: any) => void;
  formData: DeployConfigMHSG_String;
  setFormData: (formData: any) => void;
  isPending: boolean;
}

export default function MultiHatsSignerGateForm(props: Props) {
  // Destructure Props for ease of use & visibility within this function
  const {
    setIsPending,
    setData,
    setTransactionData,
    formData,
    setFormData,
    isPending,
  } = props;

  const [hash, setHash] = useState<EthereumAddress | ''>('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [refetchNow, setRefetchNow] = useState(false);

  // Used to prevent the user Deploying when not connected
  const { isConnected } = useAccount();

  const prepareContractArguments = (formData: any) => {
    const _ownerHatId = BigInt(formData._ownerHatId);
    const _signersHatIds = formData._signersHatIds.map((v: string) =>
      BigInt(Number(v))
    );
    const _safe = formData._safe as EthereumAddress;
    const _minThreshold = BigInt(formData._minThreshold);
    const _targetThreshold = BigInt(formData._targetThreshold);
    const _maxSigners = BigInt(formData._maxSigners);

    return [
      _ownerHatId,
      _signersHatIds,
      _safe,
      _minThreshold,
      _targetThreshold,
      _maxSigners,
    ];
  };

  const args = prepareContractArguments(formData);

  console.log('args', args);

  // const { config, refetch } = useDeployMultiHatSG({
  //   _ownerHatId: BigInt(formData._ownerHatId),
  //   _signersHatIds: formData._signersHatIds.map((v) => BigInt(Number(v))),
  //   _safe: formData._safe as EthereumAddress,
  //   _minThreshold: BigInt(formData._minThreshold),
  //   _targetThreshold: BigInt(formData._targetThreshold),
  //   _maxSigners: BigInt(formData._maxSigners),
  // });
  // const { config, refetch } = useDeployMultiHatSG({
  //   _ownerHatId: BigInt(formData._ownerHatId),
  //   _signersHatIds: formData._signersHatIds.map((v) => BigInt(Number(v))),
  //   _safe: formData._safe as EthereumAddress,
  //   _minThreshold: BigInt(formData._minThreshold),
  //   _targetThreshold: BigInt(formData._targetThreshold),
  //   _maxSigners: BigInt(formData._maxSigners),
  // });

  const { config, refetch } = usePrepareContractWrite({
    enabled: false,
    chainId,
    abi: HatsSignerGateFactoryAbi,
    address: contract,
    functionName: 'deployMultiHatsSignerGate',
    args: args,
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const {
    data: contractData,
    isLoading,
    write,
    isError,
  } = useContractWrite(config);

  // This only runs if "hash" is defined
  // Use this to detect isLoading state in transaction
  const { isSuccess, isLoading: transationPending } = useWaitForTransaction({
    hash: contractData?.hash as AbiTypeToPrimitiveType<'address'>,
    onSuccess(data) {
      const response = decodeEventLog({
        abi: HatsSignerGateFactoryAbi,
        data: data.logs[8].data,
        topics: data.logs[8].topics,
      });

      setTransactionData(data);
      setData(response.args);
      console.log('Transaction Success');
    },
  });

  ethers.isAddress('0x8ba1f109551bd432803012645ac136ddd64dba72');

  // Custom Validations are in one file for maintainability "validation.tsx"
  const validationSchema = Yup.object().shape({
    _ownerHatId: hatIntSchema,
    _signersHatIds: arrayOfHatStrings,
    _safe: ethAdressSchema,
    _minThreshold: hatIntSchema.when('_targetThreshold', {
      is: (value: any) => Boolean(value && value !== ''), // Checks if _targetThreshold has a value
      then: (hatIntSchema) => hatIntSchema.lessThanTarget(),
      otherwise: (hatIntSchema) => hatIntSchema, // Fallback to the default schema if _targetThreshold doesn't have a value
    }),
    _targetThreshold: hatIntSchema.when('_maxSigners', {
      is: (value: any) => Boolean(value && value !== ''), // Checks if _maxSigners has a value
      then: (hatIntSchema) => hatIntSchema.betweenMinAndMax(),
      otherwise: (hatIntSchema) => hatIntSchema, // Fallback to the default schema if _maxSigners doesn't have a value
    }),
    _maxSigners: hatIntSchema.greaterThanTarget(),
  });

  // This is used to update the parent's display status
  useEffect(() => {
    setIsPending((isLoading || transationPending) && hash !== '');
  }, [isLoading, transationPending, setIsPending, hash]);

  // The hash changes when the user clicks submit.
  // This triggers the "useWaitForTransaction"
  useEffect(() => {
    if (contractData) {
      setHash(contractData.hash);
    }
  }, [contractData]);

  // LOGIC FOR RUNNING CONTRACTS AFTER CLICKING FORMIK'S OnSubmit
  // This only runs once on user submit, avoiding unnecessary calls to hooks.
  useEffect(() => {
    if (isSubmitted) {
      console.log('inUseEffect');

      if (refetchNow) {
        setRefetchNow(false);
        refetch();
        console.log('refetch');
      }

      if (write) {
        setIsSubmitted(false);
        write?.();
        console.log('write');
      }
    }
  }, [isSubmitted, refetchNow, refetch, write]);

  // If user aborts transaction, reset status
  useEffect(() => {
    setIsSubmitted(false);
  }, [isError]);

  return (
    <Formik
      initialValues={formData}
      validationSchema={validationSchema}
      onSubmit={(values: DeployConfigMHSG_String, actions) => {
        //    The formData is updates state in the parent file -> index.jsx,

        setFormData({
          _ownerHatId: values._ownerHatId,
          _signersHatIds: values._signersHatIds,
          _minThreshold: values._minThreshold,
          _targetThreshold: values._targetThreshold,
          _maxSigners: values._maxSigners,
          _safe: values._safe,
        });
        console.log('submit');
        // This ensures that write() and refetch behave as expected.
        setIsSubmitted(true);
        setRefetchNow(true);
      }}
    >
      {(props) => (
        <Form>
          <VStack width="100%" alignItems={'flex-start'} fontSize={14} gap={5}>
            <Flex flexDirection={'column'} gap={0} w={'80%'}>
              <CustomInputWrapper
                name="_ownerHatId"
                label="Owner Hat ID (integer)"
                placeholder="26950000000000000000000000004196..."
              />
            </Flex>

            {/* <Flex flexDirection={'column'} gap={0} w={'80%'}> */}
            <MultiInput
              values={formData._signersHatIds}
              width="372px"
              label="Signer Hat IDs"
              name="_signersHatIds"
              countLabel="Id"
              placeholder="26960000000000000000000000003152..."
            />
            {/* </Flex> */}
            <Flex flexDirection={'column'} gap={0} w={'80%'}>
              <CustomInputWrapper
                name="_safe"
                label="Existing Safe (address)"
                placeholder="0xC8ac0000000000000000000000000000000047fe"
              />
            </Flex>
            <Flex flexDirection={'column'} gap={0} w={'80%'}>
              <CustomInputWrapper
                name="_minThreshold"
                label="Min Threshold (integer)"
                placeholder="3"
              />
            </Flex>

            <Flex flexDirection={'column'} gap={0} w={'60%'}>
              <CustomInputWrapper
                name="_targetThreshold"
                label="Max Threshold (integer)"
                placeholder="5"
              />
            </Flex>

            <Flex flexDirection={'column'} gap={0} w={'60%'}>
              <CustomInputWrapper
                name="_maxSigners"
                label="Max Signers (integer)"
                placeholder="9"
              />
            </Flex>

            <Button
              type="submit"
              // Will be grey during submit and after success
              // props.dirty comes from formik and makes the button clickable once values are inputted
              isDisabled={
                !props.isValid ||
                !props.dirty ||
                !isConnected ||
                isPending ||
                isSuccess
              }
              width={'140px'}
            >
              Deploy
            </Button>
          </VStack>
        </Form>
      )}
    </Formik>
  );
}
// return
// <form onSubmit={onSubmit} noValidate>
//   <VStack width="100%" alignItems={'flex-start'} fontSize={14} gap={5}>
//     <Input
//       label="Owner Hat ID (integer)"
//       placeholder="26950000000000000000000000004196..."
//       name="_ownerHatId"
//       value={formData._ownerHatId}
//       width="340px"
//       onChange={(e) =>
//         setFormData({ ...formData, _ownerHatId: e.target.value })
//       }
//       isDisabled={isLoading}
//     />
//     <MultiInput
//       values={formData._signersHatIds}
//       width="372px"
//       label="Signer Hat IDs"
//       name="_signersHatIds"
//       countLabel="Id"
//       placeholder="26960000000000000000000000003152..."
//       onChange={(_value, index, e) => {
//         setFormData({
//           ...formData,
//           _signersHatIds: formData._signersHatIds.map((v, i) => {
//             return i === index ? e.target.value : v;
//           }),
//         });
//       }}
//       onClickAdd={(value, _index) => {
//         setFormData({
//           ...formData,
//           _signersHatIds: [...formData._signersHatIds, ''],
//         });
//       }}
//       onClickRemove={(_value, index) => {
//         setFormData({
//           ...formData,
//           _signersHatIds: formData._signersHatIds.filter(
//             (v, i) => i !== index
//           ),
//         });
//       }}
//     />
//     <Input
//       label="Existing Safe (address)"
//       placeholder="0xC8ac0000000000000000000000000000000047fe"
//       name="_safe"
//       value={formData._safe}
//       width="340px"
//       onChange={(e) => setFormData({ ...formData, _safe: e.target.value })}
//       isDisabled={isLoading}
//     />
//     <Input
//       label="Min Threshold (integer)"
//       width="340px"
//       placeholder="3"
//       name="_minThreshold"
//       value={formData._minThreshold}
//       onChange={(e) =>
//         setFormData({ ...formData, _minThreshold: e.target.value })
//       }
//       isDisabled={isLoading}
//     />
//     <Input
//       label="Max Threshold (integer)"
//       width="340px"
//       placeholder="5"
//       name="_targetThreshold"
//       value={formData._targetThreshold}
//       onChange={(e) =>
//         setFormData({ ...formData, _targetThreshold: e.target.value })
//       }
//       isDisabled={isLoading}
//     />
//     <Input
//       label="Max Signers (integer)"
//       width="340px"
//       placeholder="9"
//       name="_maxSigners"
//       value={formData._maxSigners}
//       onChange={(e) =>
//         setFormData({ ...formData, _maxSigners: e.target.value })
//       }
//       isDisabled={isLoading}
//     />
//     <Button isDisabled={isLoading} type="submit" leftIcon={<BsPen />}>
//       Write
//     </Button>
//   </VStack>
// </form>
// );
