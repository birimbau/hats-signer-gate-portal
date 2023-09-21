import { Flex, VStack, useToast } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { AiOutlineRead } from 'react-icons/ai';
import Button from '../../../UI/CustomButton/CustomButton';
import { Formik, Form } from 'formik';
import CustomInputWrapper from './CustomInputWrapper';
import { useGetModulesPaginated } from '../../../../utils/hooks/GnosisSafeL2';
import * as Yup from 'yup';
import '../utils/validation'; // for Yup Validation

interface Props {
  setCanAttachSafe: (value: boolean) => void;
  setSafeAddress: (value: EthereumAddress) => void;
  safeAddress: EthereumAddress;
}

export type EthereumAddress = `0x${string}`;

function ReadForm(props: Props) {
  const { setCanAttachSafe, setSafeAddress, safeAddress } = props;

  const { data, refetch, isLoading } = useGetModulesPaginated({
    start: safeAddress,
    pageSize: BigInt(1),
  });

  useEffect(() => {
    console.log('inUseEffect: ', data);

    if (data) {
      setCanAttachSafe(data[0].length === 0);
      console.log('DATA: ', data);
    }
  }, [data, setCanAttachSafe, refetch]);

  const validationSchema = Yup.object().shape({
    _SafeAddress: Yup.string().required('Required').ethereumAddress(),
  });

  return (
    // This system of refetch and enable:false allows the hook to be more
    // efficient and only run once, onSubmit
    <Formik
      initialValues={{ _SafeAddress: '' }}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        setSafeAddress(values._SafeAddress as EthereumAddress);
        refetch;
      }}
    >
      {() => (
        <Form noValidate>
          <VStack width="100%" alignItems={'flex-start'} fontSize={14} gap={5}>
            <Flex flexDirection={'column'} gap={0} w={'100%'}>
              <CustomInputWrapper
                name="_SafeAddress"
                label="Existing Safe (address)"
                placeholder="0xC8ac0000000000000000000000000000000047fe"
              />
            </Flex>

            <Button type="submit" leftIcon={<AiOutlineRead />}>
              Read
            </Button>
          </VStack>
        </Form>
      )}
    </Formik>
  );
}

export default ReadForm;
