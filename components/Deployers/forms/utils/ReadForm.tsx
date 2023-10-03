import { Flex, VStack } from '@chakra-ui/react';
import { useEffect } from 'react';
import { AiOutlineRead } from 'react-icons/ai';
import Button from '../../../UI/CustomButton/CustomButton';
import { Formik, Form } from 'formik';
import CustomInputWrapper from './CustomInputWrapper';
import { useGetModulesPaginated } from '../../../../utils/hooks/GnosisSafeL2';
import * as Yup from 'yup';
import '../utils/validation'; // for Yup Validation
import { useSubmitRefetch } from '../../../../hooks/useSubmitRefetch';
import { DeployConfigHSG, DeployConfigMHSG_String } from '../types/forms';

interface Props {
  setCanAttachSafe: (value: boolean) => void;
  formData: DeployConfigMHSG_String | DeployConfigHSG;
  setFormData: (formData: any) => void;
}

export type EthereumAddress = `0x${string}`;

function ReadForm(props: Props) {
  const { setCanAttachSafe, formData, setFormData } = props;

  // This passes the safe address and check's if it's valid for connection
  const { data, refetch, isLoading, isError } = useGetModulesPaginated(
    formData._safe as EthereumAddress
  );

  // This is used to manage unnecessary re-renders. onSubmit only one re-render occurs
  const triggerRefetch = useSubmitRefetch(refetch, isError);

  // On re-render update the status to display relevant user message.
  useEffect(() => {
    if (data) {
      setCanAttachSafe(data[0].length === 0);
      console.log('DATA: ', data);
    }
  }, [data, setCanAttachSafe, refetch]);

  const validationSchema = Yup.object().shape({
    _SafeAddress: Yup.string().required('Required').ethereumAddress(),
  });

  return (
    // This system of 'refetch' and 'enable:false' allows the hook to be more
    // efficient and only run once, onSubmit -> for more info see 'useSubmitRefetch'
    <Formik
      initialValues={{ _SafeAddress: '' }}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        setFormData({
          ...formData,
          _safe: values._SafeAddress,
        });
        triggerRefetch();
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
