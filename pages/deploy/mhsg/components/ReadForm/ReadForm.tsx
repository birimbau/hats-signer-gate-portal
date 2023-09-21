import { VStack } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { AiOutlineRead } from 'react-icons/ai';
import Button from '../../../../../components/UI/CustomButton/CustomButton';
import Input from '../../../../../components/UI/CustomInput/CustomInput';
import { useGetModulesPaginated } from '../../../../../utils/hooks/GnosisSafeL2';

interface P {
  canAttachSafe: (value: boolean, address: string) => void;
}

const ReadForm: React.FC<P> = (p) => {
  const [formData, setFormData] = useState({
    contractId: '',
  });

  const { data, refetch, isLoading } = useGetModulesPaginated(
    {
      start: '0x0000000000000000000000000000000000000001',
      pageSize: 1,
    },
    formData.contractId
  );

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    refetch?.();
  };

  useEffect(() => {
    if (data) {
      p.canAttachSafe(data[0].length === 0, formData.start);
    }
  }, [data]);

  return (
    <>
      <form onSubmit={onSubmit} noValidate>
        <VStack width="100%" alignItems={'flex-start'} fontSize={14} gap={5}>
          <Input
            label="Existing Safe (address)"
            placeholder="0xC8ac0000000000000000000000000000000047fe"
            name="_address"
            value={formData.contractId}
            width="340px"
            onChange={(e) =>
              setFormData({
                ...formData,
                contractId: e.target.value.toLowerCase(),
              })
            }
          />

          <Button
            type="submit"
            isDisabled={isLoading}
            leftIcon={<AiOutlineRead />}
          >
            Read
          </Button>
        </VStack>
      </form>
    </>
  );
};

export default ReadForm;
