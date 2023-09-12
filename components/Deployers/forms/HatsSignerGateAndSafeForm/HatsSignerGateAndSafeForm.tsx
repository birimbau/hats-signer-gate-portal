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
import HsgOnSubmit from './HsgOnSubmit';

// This type declaration is used to validate bigInt
declare module 'yup' {
  interface StringSchema {
    bigInt(message?: string): StringSchema;
  }
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

  const [hash, setHash] = useState<string>('');
  const [submitted, setSubmitted] = useState(false);

  // Used to prevent the user Deploying when not connected
  const { isConnected } = useAccount();

  function isBigInt(value?: string): boolean {
    if (!value) return false;

    try {
      BigInt(value);
      return true;
    } catch {
      return false;
    }
  }

  Yup.addMethod(
    Yup.string,
    'bigInt',
    function (errorMessage = 'Must be a valid BigInt!') {
      return this.test('isBigInt', errorMessage, (val) => isBigInt(val));
    }
  );

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

  const safeSetFormData = (data: DeployConfigHSG_String) => {
    const safeData: DeployConfigHSG_String = { ...data };
    for (let key in safeData) {
      const value = safeData[key as keyof DeployConfigHSG_String];
      if (!isBigInt(value)) {
        safeData[key as keyof DeployConfigHSG_String] = '';
      }
    }
    setFormData(safeData);
  };

  // Formik is going to automagically keeps the state of our Form for us
  // The desgin of this dashboard requires us to make the data available one layer above the scope of this function.
  // You will
  const formik = useFormik<DeployConfigHSG_String>({
    initialValues: formData,
    validationSchema,
    onSubmit: (values: DeployConfigHSG_String, actions) => {
      setFormData({
        _ownerHatId: values._ownerHatId,
        _signerHatId: values._signerHatId,
        _minThreshold: values._minThreshold,
        _targetThreshold: values._targetThreshold,
        _maxSigners: values._maxSigners,
      });
      setSubmitted(true);

      console.log('InsideFormikSubmit');
      // e.preventDefault(); - This line is now handled by Formik
      // write() has access to values passed in from props
    },
  });

  // TODO ADD FORMIK RED TEXT UNDER ALL

  // TODO LOOK AT RENDER KEY IN GPT, THIS WILL ALLOW THE HSGONSUBMIT TO RERENDER EACH TIME ONSUBMIT IS CLICKED.

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
                // safeSetFormData({
                //   ...formData,
                //   _ownerHatId: e.target.value,
                // }); // This updates state stored outside of this function. (index.tsx)
              }}
              name="_ownerHatId"
              value={formik.values._ownerHatId}
            />
            {formik.touched._ownerHatId && formik.errors._ownerHatId ? (
              <Text color="red">{formik.errors._ownerHatId}</Text>
            ) : null}
          </Flex>
          <Flex flexDirection={'column'} gap={0} w={'80%'}>
            <Input
              label="Signer Hat ID (integer)"
              placeholder="26960000000000000000000000003152..."
              onChange={(e) => {
                formik.handleChange(e); // This updates formik
                // safeSetFormData(
                //   { ...formData, _signerHatId: e.target.value } || ''
                // );
              }}
              name="_signerHatId"
              value={formik.values._signerHatId}
            />
          </Flex>
          <Flex flexDirection={'column'} gap={0} w={'60%'}>
            {' '}
            <Input
              label="Min Threshold (integer)"
              placeholder="3"
              onChange={(e) => {
                formik.handleChange(e); // This updates formik
                // safeSetFormData(
                //   { ...formData, _minThreshold: e.target.value } || ''
                // );
              }}
              name="_minThreshold"
              value={formik.values._minThreshold}
            />
          </Flex>
          <Flex flexDirection={'column'} gap={0} w={'60%'}>
            <Input
              label="Max Threshold (integer)"
              placeholder="5"
              onChange={(e) => {
                formik.handleChange(e); // This updates formik
                safeSetFormData({
                  ...formData,
                  _targetThreshold: e.target.value,
                });
              }}
              name="_targetThreshold"
              value={formik.values._targetThreshold}
            />
          </Flex>
          <Flex flexDirection={'column'} gap={0} w={'60%'}>
            <Input
              label="Max Signers (integer)"
              placeholder="9"
              onChange={(e) => {
                formik.handleChange(e); // This updates formik
                safeSetFormData({ ...formData, _maxSigners: e.target.value });
              }}
              name="_maxSigners"
              value={Number(formik.values._maxSigners)}
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
      {/* Separate the HSG to only run once user submits */}
      {submitted && (
        <HsgOnSubmit
          setData={setData}
          setTransactionData={setTransactionData}
          formData={formData}
        />
      )}
    </>
  );
}

// I have left the values in string format to be used consistently,
// then when we need them as BigInts, I have transformed them.
// const toBigint = (value: string): bigint => {
//   if (value === '') {
//     return BigInt(0);
//   }
//   return BigInt(value);
// };

// const transformFormDataToBigInt = (
//   formData: DeployConfigHSG_String
// ): DeployConfigHSG_BigInt => {
//   return {
//     _ownerHatId: toBigint(formData._ownerHatId),
//     _signerHatId: toBigint(formData._signerHatId),
//     _minThreshold: toBigint(formData._minThreshold),
//     _targetThreshold: toBigint(formData._targetThreshold),
//     _maxSigners: toBigint(formData._maxSigners),
//   };
// };

// The args are passed into "usePrepareContractWrite" returning a "prepared configuration" to be sent through to useContractWrite.
// args.current is passed in - IT USES CLOSURE, SO THE WRITE FUNCTION HOLDS THE REFERENCES TO args.current...
// This means that "write()" onSubmit has access to args.current.
// const { config } = useDeployHSGwSafe(formData);
// const { data: contractData, write } = useContractWrite(config);
// No need to spread config ^^, it's an object
// IMPROVE

// This only runs if "hash" is defined
// Use this to detect isLoading/isError state in transaction
// const { data: transactionData, isLoading } = useWaitForTransaction({
//   hash: hash as AbiTypeToPrimitiveType<'address'>,
//   onSuccess(data) {
//     const response = decodeEventLog({
//       abi: HatsSignerGateFactoryAbi,
//       data: data.logs[8].data,
//       topics: data.logs[8].topics,
//     });

//     setTransactionData(data);
//     setData(response.args);
//   },
// });

// Why is this being used to re-render the app?
// Improve - data to contractData
// useEffect(() => {
//   if (contractData) {
//     setHash(contractData.hash);
//   }
// }, [contractData]);

// Used for conditional rendering
// useEffect(() => {
//   setIsPending(isLoading && hash !== '');
// }, [isLoading, hash, setIsPending]);

// TODO - Add Validation
// Grey out button on submit.
