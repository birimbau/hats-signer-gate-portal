import { useContractWrite } from 'wagmi';
import Button from '../../../../components/UI/CustomButton/CustomButton';
import { useRemoveSigner } from '../../../../utils/hooks/HatsSignerGate';
import { useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { EthereumAddress } from '../../../../components/Deployers/forms/utils/ReadForm';
import { CgUserRemove } from 'react-icons/cg';
import * as Yup from 'yup';
import { Form, Formik } from 'formik';
import { VStack } from '@chakra-ui/react';
import CustomInputWrapper from '../../../../components/Deployers/forms/utils/CustomInputWrapper';
import { ethAddressSchema } from '../../../../components/Deployers/forms/utils/validation';

interface P {
  hsgAddress: EthereumAddress;
  onLoading: (value: boolean) => void;
  onTransationComplete: (transation: any) => void;
}

interface StateType {
  _signer: EthereumAddress;
}

const HSGRemoveForm: React.FC<P> = (p) => {
  const [formData, setFormData] = useState<StateType>({
    _signer: '0x',
  });
  const [submitCount, setSubmitCount] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [refetchNow, setRefetchNow] = useState(false);

  const value = useRef(submitCount);

  console.log('p.hsgAddress: ', p.hsgAddress);
  console.log('formData._signer: ', formData._signer);
  const { config, refetch } = useRemoveSigner(p.hsgAddress, formData._signer);

  const {
    data: transationData,
    isLoading,
    error,
    writeAsync,
  } = useContractWrite(config);

  const validationSchema = Yup.object().shape({
    _signer: ethAddressSchema,
  });

  // LOGIC FOR RUNNING CONTRACTS AFTER CLICKING FORMIK'S OnSubmit
  // This only runs once on user submit, avoiding unnecessary calls to hooks.
  useEffect(() => {
    if (isSubmitted) {
      if (refetchNow) {
        setRefetchNow(false);
        refetch();
      }

      if (writeAsync) {
        setIsSubmitted(false);
        writeAsync?.();
      }
    }
  }, [isSubmitted, refetchNow, refetch, writeAsync]);

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
        // refetch?.().then((data) => {
        //   if (data.status === 'error') {
        //     alert(data.error.message);
        //   } else {
        //     writeAsync?.().then((data) => {
        //       p.onTransationComplete(data.hash);
        //     });
        //   }
        // });
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

export default HSGRemoveForm;
