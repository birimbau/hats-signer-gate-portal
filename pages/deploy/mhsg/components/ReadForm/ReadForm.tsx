import { VStack } from '@chakra-ui/react';
import { useEffect, useRef, useState } from 'react';
import { AiOutlineRead } from 'react-icons/ai';
import Button from '../../../../../components/UI/CustomButton/CustomButton';
import Input from '../../../../../components/UI/CustomInput/CustomInput';
import {
  useCanAttachMHSG2Safe,
  useDeployMultiHatSGwSafe,
} from '../../../../../utils/hooks/HatsSignerGateFactory';
import {
  useContractRead,
  useContractWrite,
  useWaitForTransaction,
} from 'wagmi';
import { AbiTypeToPrimitiveType } from 'abitype';

const ReadForm = () => {
  const [formData, setFormData] = useState({});

  const args = useRef({
    _mhsg: '0x1195634e628aFD98d4A1A77acAB73657895E7a4C',
  });

  const { data, refetch } = useCanAttachMHSG2Safe(formData);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    refetch?.();
  };

  useEffect(() => {
    const he = data;
    debugger;
  }, [data]);

  return (
    <>
      <form onSubmit={onSubmit} noValidate>
        <VStack width='100%' alignItems={'flex-start'} fontSize={14} gap={5}>
          <Input
            label='Existing Safe (address)'
            placeholder='0xC8ac0000000000000000000000000000000047fe'
            name='_address'
            value={formData._mhsg}
            width='340px'
            onChange={(e) =>
              setFormData({ ...formData, _mhsg: e.target.value.toLowerCase() })
            }
          />

          <Button type='submit' leftIcon={<AiOutlineRead />}>
            Read
          </Button>
        </VStack>
      </form>
    </>
  );
};

export default ReadForm;
