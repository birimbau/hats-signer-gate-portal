import { useContractWrite, useWaitForTransaction } from 'wagmi';
import { useRemoveSigner } from '../../../../utils/hooks/MultiHatsSignerGate';
import { useEffect, useRef, useState } from 'react';
import { Form, Formik } from 'formik';
import CustomInputWrapper from '../../../../components/Deployers/forms/utils/CustomInputWrapper';
import Button from '../../../../components/UI/CustomButton/CustomButton';
import { VStack } from '@chakra-ui/react';
import * as Yup from 'yup';
import { EthereumAddress } from '../../../../components/Deployers/forms/utils/ReadForm';
import { CgUserRemove } from 'react-icons/cg';
import { AbiTypeToPrimitiveType } from 'abitype';
import { ethAddressSchema } from '../../../../components/Deployers/forms/utils/validation';

interface P {
  mhsgAddress: EthereumAddress;
  onLoading: (value: boolean) => void;
  onTransationComplete: (transation: any) => void;
  setIsErrorOne: (value: boolean) => void;
  setIsErrorTwo: (value: boolean) => void;
  setIsPending: (isPending: boolean) => void;
}
interface StateType {
  _signer: EthereumAddress;
}

const MHSGRemoveForm: React.FC<P> = (p) => {
  const { setIsErrorOne, setIsErrorTwo, setIsPending, onTransationComplete } =
    p;

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [refetchNow, setRefetchNow] = useState(false);
  const [formData, setFormData] = useState<StateType>({
    _signer: '' as EthereumAddress,
  });

  console.log('p.mhsgAddress: ', p.mhsgAddress);
  console.log('formData._signer: ', formData._signer);

  const { config, refetch, error } = useRemoveSigner(
    p.mhsgAddress,
    formData._signer
  );
  const {
    data: contractData,
    isLoading,
    isError: isWriteError,
    error: writeError,
    writeAsync,
  } = useContractWrite(config);

  // This only runs if "hash" is defined
  // Use this to detect isLoading state in transaction and update user interface
  const { isLoading: transationPending } = useWaitForTransaction({
    hash: contractData?.hash as AbiTypeToPrimitiveType<'address'>,
  });

  const validationSchema = Yup.object().shape({
    _signer: ethAddressSchema,
  });

  // LOGIC FOR RUNNING CONTRACTS AFTER CLICKING FORMIK'S OnSubmit
  // useEffect for handling refetch
  useEffect(() => {
    if (isSubmitted && refetchNow) {
      setRefetchNow(false);
      refetch();
    }
  }, [isSubmitted, refetchNow, refetch]);

  // useEffect for handling writeAsync
  useEffect(() => {
    if (isSubmitted && writeAsync) {
      setIsSubmitted(false);
      writeAsync?.()
        .then((data) => {
          onTransationComplete(data.hash);
        })
        .catch((err) => {
          // This catch is for a rejection of the transaction or other errors.
          // if the user rejects, do nothing.
          // if there is another error, alert user

          if (err.message.includes('User rejected the request')) {
          } else alert(err.message);
        });
    }
  }, [isSubmitted, writeAsync, onTransationComplete]);

  // useEffect for handling errors
  useEffect(() => {
    if (isSubmitted && error) {
      // Handle the error from useRemoveSigner
      if (error) {
        console.error('Error from useContractWrite:', error);

        // Reset error states to their default
        setIsErrorOne(false);
        setIsErrorTwo(false);

        if (error.message.includes('StillWearsSignerHat')) {
          setIsErrorOne(true);
        } else if (error.message.includes('FailedExecRemoveSigner')) {
          setIsErrorTwo(true);
        }
      }
    }
  }, [isSubmitted, error, setIsErrorOne, setIsErrorTwo]);

  // If user aborts transaction, reset status
  useEffect(() => {
    setIsSubmitted(false);
  }, [isWriteError]);

  // This is used to update the parent's display status
  useEffect(() => {
    setIsPending(isLoading || transationPending);
  }, [isLoading, transationPending, setIsPending]);

  useEffect(() => {
    if (isWriteError && writeError) {
      if (writeError.message.includes('User rejected the request')) {
        console.log('Transaction was rejected by the user.');
      } else {
        console.error('An error occurred:', writeError.message);
      }
    }
  }, [isWriteError, writeError]); // Monitor changes in isError and error properties

  return (
    <Formik
      initialValues={formData}
      validationSchema={validationSchema}
      onSubmit={(values, _actions) => {
        console.log('submit');
        setFormData(values);

        // This ensures that write() and refetch behave as expected.
        setIsSubmitted(true);
        setRefetchNow(true);
      }}
    >
      {(props) => (
        <Form>
          <VStack width="100%" alignItems={'flex-start'} fontSize={14} gap={5}>
            <CustomInputWrapper
              label="Signer Wallet (address)"
              placeholder="0xC8ac0000000000000000000000000000000047fe"
              name="_signer"
            />

            <Button
              leftIcon={<CgUserRemove />}
              type="submit"
              disabled={!props.dirty || isLoading}
            >
              Remove
            </Button>
          </VStack>
        </Form>
      )}
    </Formik>
  );
};

export default MHSGRemoveForm;
