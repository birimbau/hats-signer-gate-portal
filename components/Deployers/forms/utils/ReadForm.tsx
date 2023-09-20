import { Flex, VStack } from '@chakra-ui/react';
import { AiOutlineRead } from 'react-icons/ai';
import Button from '../../../UI/CustomButton/CustomButton';
import { Formik, Form, Field } from 'formik';
import Input from '../../../UI/CustomInput/CustomInput';
import { useCanAttachMHSG2Safe } from '../../../../utils/hooks/HatsSignerGateFactory';
import { AbiTypeToPrimitiveType } from 'abitype';
import CustomInputWrapper from './CustomInputWrapper';

const ReadForm = () => {
  const initialValues = {
    _mhsg: '0x1195634e628aFD98d4A1A77acAB73657895E7a4C',
  };

  const { data, refetch } = useCanAttachMHSG2Safe(initialValues._mhsg);

  useEffect(() => {
    const he = data;
    debugger;
  }, [data]);

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values) => {
        refetch?.();
      }}
    >
      {({ handleChange, values }) => (
        <Form noValidate>
          <VStack width="100%" alignItems={'flex-start'} fontSize={14} gap={5}>
            <Flex flexDirection={'column'} gap={0} w={'100%'}>
              <CustomInputWrapper
                name="_ownerHatId"
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
};

export default ReadForm;
