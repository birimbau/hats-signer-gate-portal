import { Flex, VStack } from '@chakra-ui/react';
import { AbiTypeToPrimitiveType } from 'abitype';
import { Form, Formik } from 'formik';
import { useEffect, useRef, useState } from 'react';
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

// TODO - Implement blue button selection corrections - get the right state sorted out.
// TODO - finalise connecting "attach MHSG TO SAFE" - READ DOCS!

interface Props {
  setIsPending: (isPending: boolean) => void;
  setData: (data: any) => void;
  setTransactionData: (data: any) => void;
  formData: DeployConfigMHSG;
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

  const handleFormSubmit = useRefetchWrite({ write, refetch, isError });

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
