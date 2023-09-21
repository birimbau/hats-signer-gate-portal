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
import { EthereumAddress } from '../utils/ReadForm';
import { compareBigInts } from '../utils/validation';

// TODO - CHECK  if the hash needs to have "0x" at the front of it
// TODO - Discuss responsive designs / styling (errors/ entry field widths / mobile)
// TODO - Error handling, print the smart contract error to user display.
// TODO - Use `enabled: false` and `refetch()` from useContractRead to prevent unecessary calls

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

  const [hash, setHash] = useState<EthereumAddress | ''>('');

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
  // Define a standard hatIntSchema schema to reuse for multiple fields
  const hatIntSchema = Yup.string()
    .required('Required')
    .max(77, 'Must be 77 characters or less')
    .bigInt();

  const validationSchema = Yup.object().shape({
    _ownerHatId: hatIntSchema,
    _signerHatId: hatIntSchema,
    _minThreshold: hatIntSchema.test(
      'is-less-than-target',
      'Min Threshold must be less than or equal to Target Threshold',
      function (value) {
        const targetThreshold = this.parent._targetThreshold;
        return (
          compareBigInts(value, targetThreshold, (a, b) => a <= b) ||
          this.createError({ message: 'Invalid input type' })
        );
      }
    ),
    _targetThreshold: hatIntSchema.test(
      'is-between-min-and-max',
      'Target Threshold must be between Min Threshold and Max Signers',
      function (value) {
        const minThreshold = this.parent._minThreshold;
        const maxSigners = this.parent._maxSigners;
        return (
          (compareBigInts(value, minThreshold, (a, b) => a >= b) &&
            compareBigInts(value, maxSigners, (a, b) => a <= b)) ||
          this.createError({ message: 'Invalid input type' })
        );
      }
    ),
    _maxSigners: hatIntSchema.test(
      'is-greater-than-target',
      'Max Signers must be greater than or equal to Target Threshold',
      function (value) {
        const targetThreshold = this.parent._targetThreshold;
        return (
          compareBigInts(value, targetThreshold, (a, b) => a >= b) ||
          this.createError({ message: 'Invalid input type' })
        );
      }
    ),
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
    // Note: We have to use <Formik> wrapper for error handling
    // ** Be aware that <Field>, <FastField>, <ErrorMessage>, connect(),
    // and <FieldArray> will NOT work with useFormik() as they all require React Context **

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
