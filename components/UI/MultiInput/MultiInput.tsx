import { HStack, IconButton, VStack } from '@chakra-ui/react';
import Input from '../CustomInput/CustomInput';
import { HiMinusSmall } from 'react-icons/hi';
import { BsPlusLg } from 'react-icons/bs';

interface P {
  values: any[];
  setValues: (v: any[]) => void;
  label: string;
  placeholder: string;
  name: string;
  type?: string;
}

const MultiInput: React.FC<P> = (p) => {
  return (
    <VStack gap={'13px'}>
      {p.values.map((v, i) => {
        return (
          <Input
            key={i}
            type={p.type || 'text'}
            value={v}
            extra={
              <>
                <HStack gap='8px'>
                  <IconButton aria-label='add value' icon={<HiMinusSmall />} />
                  <IconButton aria-label='remove value' icon={<BsPlusLg />} />
                </HStack>
              </>
            }
          />
        );
      })}
    </VStack>
  );
};

export default MultiInput;
