import { VStack, Text, Flex } from '@chakra-ui/react';
import Button from '../../../UI/CustomButton/CustomButton';
import { useState, useRef, useEffect } from 'react';
import { useAccount, useContractWrite, useWaitForTransaction } from 'wagmi';
import Input from '../../../UI/CustomInput/CustomInput';
import { useFormik } from 'formik';
import { useDeployHSGwSafe } from '../../../../utils/hooks/HatsSignerGateFactory';
import { AbiTypeToPrimitiveType } from 'abitype';
import { decodeEventLog } from 'viem';
import { HatsSignerGateFactoryAbi } from '../../../../utils/abi/HatsSignerGateFactory/HatsSignerGateFactory';
import { DeployConfigHSG_String } from '../types/forms';
import * as Yup from 'yup';

// TODO - Add grey out once submitted once... do not allow re-submission with the same values.
// TODO - Create new files for Form Error message
// TODO - Abstract away the validation into another file
// TODO - CHECK  if the hash needs to have "0x" at the front of it
// TODO - Investigate if we want to use isError for any special handling
// TODO - Discuss responsive designs / styling (errors/ entry field widths / mobile)

interface FormErrorMessageProps {
  touched: boolean | undefined;
  error?: string | null;
}

interface Props {
  setIsPending: (isPending: boolean) => void;
  setData: (data: any) => void;
  setTransactionData: (data: any) => void;
  formData: DeployConfigHSG_String; // This now has it's own type and the initialised values are in state
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
  const { isLoading: transationPending } = useWaitForTransaction({
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

  // Formik is going to automagically keep the state of our Form for us
  const formik = useFormik<DeployConfigHSG_String>({
    initialValues: formData,
    validationSchema,
    onSubmit: (values: DeployConfigHSG_String, actions) => {
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
    },
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

  const FormErrorMessage = ({ touched, error }: FormErrorMessageProps) => {
    if (!touched || !error) return null;

    return <Text color="red">{error}</Text>;
  };

  return (
    // You could also use formik's default wrapper: <Formik>
    <>
      <form onSubmit={formik.handleSubmit}>
        <VStack width="100%" alignItems={'flex-start'} fontSize={14} gap={5}>
          <Flex flexDirection={'column'} gap={0} w={'80%'}>
            <Input
              label="Owner Hat ID (integer)"
              placeholder="26950000000000000000000000004196..."
              onChange={(e) => {
                formik.handleChange(e); // This updates formik
              }}
              name="_ownerHatId"
              value={formik.values._ownerHatId}
            />
            <FormErrorMessage
              touched={formik.touched._ownerHatId}
              error={formik.errors._ownerHatId}
            />
          </Flex>
          <Flex flexDirection={'column'} gap={0} w={'80%'}>
            <Input
              label="Signer Hat ID (integer)"
              placeholder="26960000000000000000000000003152..."
              onChange={(e) => {
                formik.handleChange(e); // This updates formik
              }}
              name="_signerHatId"
              value={formik.values._signerHatId}
            />
            <FormErrorMessage
              touched={formik.touched._signerHatId}
              error={formik.errors._signerHatId}
            />
          </Flex>
          <Flex flexDirection={'column'} gap={0} w={'60%'}>
            <Input
              label="Min Threshold (integer)"
              placeholder="3"
              onChange={(e) => {
                formik.handleChange(e); // This updates formik
              }}
              name="_minThreshold"
              value={formik.values._minThreshold}
            />
            <FormErrorMessage
              touched={formik.touched._minThreshold}
              error={formik.errors._minThreshold}
            />
          </Flex>
          <Flex flexDirection={'column'} gap={0} w={'60%'}>
            <Input
              label="Max Threshold (integer)"
              placeholder="5"
              onChange={(e) => {
                formik.handleChange(e); // This updates formik
              }}
              name="_targetThreshold"
              value={formik.values._targetThreshold}
            />
            <FormErrorMessage
              touched={formik.touched._targetThreshold}
              error={formik.errors._targetThreshold}
            />
          </Flex>
          <Flex flexDirection={'column'} gap={0} w={'60%'}>
            <Input
              label="Max Signers (integer)"
              placeholder="9"
              onChange={(e) => {
                formik.handleChange(e); // This updates formik
              }}
              name="_maxSigners"
              value={formik.values._maxSigners}
            />
            <FormErrorMessage
              touched={formik.touched._maxSigners}
              error={formik.errors._maxSigners}
            />
          </Flex>
          <Button
            type="submit"
            disabled={!isConnected || isPending}
            width={'140px'}
          >
            Deploy
          </Button>
        </VStack>
      </form>
    </>
  );
}
