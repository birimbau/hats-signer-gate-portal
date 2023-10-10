import { VStack } from '@chakra-ui/react';
import { AbiTypeToPrimitiveType } from 'abitype';
import { Form, Formik } from 'formik';
import { useEffect, useState } from 'react';
import { useAccount, useContractWrite, useWaitForTransaction } from 'wagmi';
import { decodeEventLog } from 'viem';
import * as Yup from 'yup';
import '../utils/validation'; // for Yup Validation
import { useDeployMultiHatSG } from '../../../../utils/hooks/HatsSignerGateFactory';
import { HatsSignerGateFactoryAbi } from '../../../../utils/abi/HatsSignerGateFactory/HatsSignerGateFactory';
import {
  arrayOfHatStrings,
  ethAddressSchema,
  hatIntSchema,
  minThresholdValidation,
  targetThresholdValidation,
} from '../utils/validation';
import { useRefetchWrite } from '../../../../hooks/useRefetchWrite';
import Button from '../../../UI/CustomButton/CustomButton';
import MultiInput from '../../../UI/MultiInput/MultiInput';
import CustomInputWrapper from '../utils/CustomInputWrapper';
import { DeployConfigMHSG } from '../types/forms';
import { EthereumAddress } from '../utils/ReadForm';
import { AiOutlineDeploymentUnit } from 'react-icons/ai';
import { extractMhsgAddress } from '../utils/extractMhsgAddress';

interface Props {
  setIsPending: (isPending: boolean) => void;
  setData: (data: any) => void;
  formData: DeployConfigMHSG;
  setFormData: (formData: any) => void;
  isPending: boolean;
  setIsSuccessOne: (isSuccessOne: boolean) => void;
  setMhsgAddress: (hsgAddress: EthereumAddress | null) => void;
}

export default function MultiHatsSignerGateForm(props: Props) {
  // Destructure Props for ease of use & visibility within this function
  const {
    setIsPending,
    setData,
    formData,
    setFormData,
    isPending,
    setIsSuccessOne,
    setMhsgAddress,
  } = props;

  const [hash, setHash] = useState<EthereumAddress | ''>('');

  // Used to prevent the user Deploying when not connected
  const { isConnected } = useAccount();

  const {
    config,
    refetch,
    isSuccess: contractPrepared,
  } = useDeployMultiHatSG(formData);

  const {
    data: contractData,
    isLoading,
    write,
    isError,
  } = useContractWrite(config);

  console.log('contractData.hash', contractData?.hash);

  // This only runs if "hash" is defined
  // Use this to detect isLoading state in transaction
  const {
    isSuccess,
    isLoading: transationPending,
    data: transactionData,
  } = useWaitForTransaction({
    hash: contractData?.hash as AbiTypeToPrimitiveType<'address'>,
    onSuccess(data) {
      const response = decodeEventLog({
        abi: HatsSignerGateFactoryAbi,
        data: data.logs[3].data,
        topics: data.logs[3].topics,
      });

      setData(response.args);
      console.log('Transaction Success');
    },
  });

  // Get the HsgAddress from the HsgFactory response
  useEffect(() => {
    if (transactionData) {
      const MhsgContractAddress = extractMhsgAddress(transactionData);
      console.log('MhsgContractAddress: ', MhsgContractAddress);
      setMhsgAddress(MhsgContractAddress);
    }
  }, [transactionData]);
  console.log('inside hsgForm - render');

  const handleFormSubmit = useRefetchWrite({
    write,
    refetch,
    isError,
    contractPrepared,
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

  // After 'useWaitForTransaction' returns 'isSuccess', update the state above to render next stage
  useEffect(() => {
    setIsSuccessOne(isSuccess);
  }, [setIsSuccessOne, isSuccess]);

  // Custom Validations are in one file for maintainability "validation.tsx"
  const validationSchema = Yup.object().shape({
    _ownerHatId: hatIntSchema,
    _signersHatIds: arrayOfHatStrings,
    _safe: ethAddressSchema,
    _minThreshold: minThresholdValidation(hatIntSchema),
    _targetThreshold: targetThresholdValidation(hatIntSchema),
    _maxSigners: hatIntSchema.greaterThanTarget(),
  });

  return (
    <Formik
      initialValues={formData}
      validationSchema={validationSchema}
      onSubmit={(values: DeployConfigMHSG, actions) => {
        // The formData updates state in the parent file -> index.jsx
        setFormData({
          _ownerHatId: values._ownerHatId,
          _signersHatIds: values._signersHatIds,
          _safe: values._safe,
          _minThreshold: values._minThreshold,
          _targetThreshold: values._targetThreshold,
          _maxSigners: values._maxSigners,
        });
        handleFormSubmit();
      }}
    >
      {(props) => (
        <Form>
          <VStack width="100%" alignItems={'flex-start'} fontSize={14} gap={5}>
            <CustomInputWrapper
              name="_ownerHatId"
              label="Owner Hat ID (integer)"
              placeholder="26950000000000000000000000004196..."
            />
            <MultiInput
              values={formData._signersHatIds}
              width="372px"
              label="Signer Hat IDs"
              name="_signersHatIds"
              countLabel="Id"
              placeholder="26960000000000000000000000003152..."
            />
            <CustomInputWrapper
              name="_safe"
              label="Existing Safe (address)"
              placeholder="0xC8ac0000000000000000000000000000000047fe"
              isReadOnly={true}
            />
            <CustomInputWrapper
              name="_minThreshold"
              label="Min Threshold (integer)"
              placeholder="3"
              width={60}
            />

            <CustomInputWrapper
              name="_targetThreshold"
              label="Max Threshold (integer)"
              placeholder="5"
              width={60}
            />

            <CustomInputWrapper
              name="_maxSigners"
              label="Max Signers (integer)"
              placeholder="9"
              width={60}
            />

            <Button
              leftIcon={<AiOutlineDeploymentUnit />}
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
              paddingInline={'30px'}
            >
              Deploy
            </Button>
          </VStack>
        </Form>
      )}
    </Formik>
  );
}
