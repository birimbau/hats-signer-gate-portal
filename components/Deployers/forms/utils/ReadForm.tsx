import { Flex, VStack, useToast } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { AiOutlineRead } from 'react-icons/ai';
import Button from '../../../UI/CustomButton/CustomButton';
import { Formik, Form } from 'formik';
import CustomInputWrapper from './CustomInputWrapper';
import { useGetModulesPaginated } from '../../../../utils/hooks/GnosisSafeL2';

interface Props {
  canAttachSafe: (value: boolean, address: string) => void;
}

export type EthereumAddress = `0x${string}`;

function ReadForm(props: Props) {
  const { canAttachSafe } = props;
  const [formData, setFormData] = useState<{ contractId: EthereumAddress }>({
    contractId: '0x',
  });

  const { data, refetch, isLoading } = useGetModulesPaginated(
    {
      start: '0x0000000000000000000000000000000000000001',
      pageSize: BigInt(1),
    },
    formData.contractId
  );

  useEffect(() => {
    if (data) {
      canAttachSafe(data[0].length === 0, formData.start);
      console.log('DATA: ', data);
    }
  }, [data]);

  return (
    <Formik initialValues={{}} onSubmit={async (values) => {}}>
      {() => (
        <Form noValidate>
          <VStack width="100%" alignItems={'flex-start'} fontSize={14} gap={5}>
            <Flex flexDirection={'column'} gap={0} w={'100%'}>
              <CustomInputWrapper
                name="_mhsg"
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
