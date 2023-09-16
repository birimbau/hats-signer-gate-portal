import { VStack, Flex } from '@chakra-ui/react';
import Button from '../../../UI/CustomButton/CustomButton';
import { useState, useRef, useEffect } from 'react';
import { useAccount, useContractWrite, useWaitForTransaction } from 'wagmi';
import { Form, Formik } from 'formik';
import { useDeployHSGwSafe } from '../../../../utils/hooks/HatsSignerGateFactory';
import { AbiTypeToPrimitiveType } from 'abitype';
import { decodeEventLog } from 'viem';
import { HatsSignerGateFactoryAbi } from '../../../../utils/abi/HatsSignerGateFactory/HatsSignerGateFactory';
import { DeployConfigHSG_String } from '../types/forms';
import * as Yup from 'yup';
import '../utils/validation'; // for Yup Validation
import CustomInputWrapper from '../utils/CustomInputWrapper';

// TODO - CHECK  if the hash needs to have "0x" at the front of it
// TODO - Discuss responsive designs / styling (errors/ entry field widths / mobile)
// TODO - Validation Schema - do we want more than present?
interface Props {
  setIsPending: (isPending: boolean) => void;
  setData: (data: any) => void;
  setTransactionData: (data: any) => void;
  formData: DeployConfigHSG_String; // This now has it's own type and the initialised values are strings
  setFormData: (formData: any) => void;
  isPending: boolean;
}

export default function HatsSignerGateAndSafeForm(props: Props) {
  // Destructure Props for ease of use & visibility within this function
  const {
    setIsPending,
    setData,
    setTransactionData,
    formData,
    setFormData,
    isPending,
  } = props;

  const [hash, setHash] = useState<`0x${string}` | ''>('');

  // Used only for the useContractWrite, These do NOT update state (Their types would clash)
  const args = useRef({
    _ownerHatId: BigInt(0),
    _signerHatId: BigInt(0),
    _minThreshold: BigInt(0),
    _targetThreshold: BigInt(0),
    _maxSigners: BigInt(0),
  });

  // Used to prevent the user Deploying when not connected
  const { isConnected } = useAccount();

  const { config } = useDeployHSGwSafe(args.current);
  const { data: contractData, isLoading, write } = useContractWrite(config);

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

  // Yup Validation Schema is already used in this project.
  // It's usual to use Yup with Formik
  // These are subject to change if we know more info
  const validationSchema = Yup.object().shape({
    _ownerHatId: Yup.string()
      .required('Required')
      .max(77, 'Must be 77 characters or less')
      .bigInt(),
    _signerHatId: Yup.string()
      .required('Required')
      .max(77, 'Must be 77 characters or less')
      .bigInt(),
    _minThreshold: Yup.string()
      .required('Required')
      .max(77, 'Must be 77 characters or less')
      .bigInt(),
    _targetThreshold: Yup.string()
      .required('Required')
      .max(77, 'Must be 77 characters or less')
      .bigInt(),
    _maxSigners: Yup.string()
      .required('Required')
      .max(77, 'Must be 77 characters or less')
      .bigInt(),
  });

  // This is used to update the parent's display status
  useEffect(() => {
    setIsPending((isLoading || transationPending) && hash !== '');
  }, [isLoading, transationPending, setIsPending, hash]);

  // The hash changes when the user clicks submit.
  // This triggers the "Transaction is progress" status
  useEffect(() => {
    if (contractData) {
      setHash(contractData.hash);
    }
  }, [contractData]);
  return (
    // Note: Have to use <Formik> wrapper for error handling
    // You could also use formik's default wrapper: <Formik>
    // ** Be aware that <Field>, <FastField>, <ErrorMessage>, connect(), and <FieldArray> will NOT work with useFormik() as they all require React Context.    <>

    // Formik is going to automagically keep the state of our Form for us
    <Formik
      initialValues={formData}
      validationSchema={validationSchema}
      onSubmit={(values: DeployConfigHSG_String, actions) => {
        // e.preventDefault(); - This line is now handled by Formik

        // Update the data for use in the parent file -> index.jsx
        setFormData({
          _ownerHatId: values._ownerHatId,
          _signerHatId: values._signerHatId,
          _minThreshold: values._minThreshold,
          _targetThreshold: values._targetThreshold,
          _maxSigners: values._maxSigners,
        });

        args.current = {
          _ownerHatId: BigInt(values._ownerHatId),
          _signerHatId: BigInt(values._signerHatId),
          _minThreshold: BigInt(values._minThreshold),
          _targetThreshold: BigInt(values._targetThreshold),
          _maxSigners: BigInt(values._maxSigners),
        };

        // write has access to the args.current
        write?.();
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

            <Flex flexDirection={'column'} gap={0} w={'80%'}>
              <CustomInputWrapper
                name="_signerHatId"
                label="Signer Hat ID (integer)"
                placeholder="26960000000000000000000000003152..."
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
                !props.dirty || !isConnected || isPending || isSuccess
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
