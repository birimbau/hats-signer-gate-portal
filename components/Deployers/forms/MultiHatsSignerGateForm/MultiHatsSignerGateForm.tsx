import { Flex, VStack } from '@chakra-ui/react';
import { AbiTypeToPrimitiveType } from 'abitype';
import { useEffect, useState } from 'react';
import { useAccount, useContractWrite, useWaitForTransaction } from 'wagmi';
import { useDeployMultiHatSG } from '../../../../utils/hooks/HatsSignerGateFactory';
import Button from '../../../UI/CustomButton/CustomButton';
import MultiInput from '../../../UI/MultiInput/MultiInput';
import { DeployConfigMHSG_String } from '../types/forms';
import { EthereumAddress } from '../utils/ReadForm';
import {
  arrayOfHatStrings,
  ethAddressSchema,
  hatIntSchema,
  minThresholdValidation,
  targetThresholdValidation,
} from '../utils/validation';
import * as Yup from 'yup';
import '../utils/validation'; // for Yup Validation
import { decodeEventLog } from 'viem';
import { HatsSignerGateFactoryAbi } from '../../../../utils/abi/HatsSignerGateFactory/HatsSignerGateFactory';
import { Form, Formik } from 'formik';
import CustomInputWrapper from '../utils/CustomInputWrapper';

// TODO - create a custom component that can be used by all 4 components.

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

  const { config, refetch } = useDeployMultiHatSG(formData);

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

  // Custom Validations are in one file for maintainability "validation.tsx"
  const validationSchema = Yup.object().shape({
    _ownerHatId: hatIntSchema,
    _signersHatIds: arrayOfHatStrings,
    _safe: ethAddressSchema,
    _minThreshold: minThresholdValidation(hatIntSchema),
    _targetThreshold: targetThresholdValidation(hatIntSchema),
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
          _safe: values._safe,
          _minThreshold: values._minThreshold,
          _targetThreshold: values._targetThreshold,
          _maxSigners: values._maxSigners,
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
                isReadOnly={true}
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
