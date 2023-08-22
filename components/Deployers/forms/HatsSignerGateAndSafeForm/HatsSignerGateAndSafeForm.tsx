import { VStack, Text, Flex } from '@chakra-ui/react';
import Button from '../../../UI/CustomButton/CustomButton';
import { AbiTypeToPrimitiveType } from 'abitype';
import { useState } from 'react';
import { useAccount, useContractWrite } from 'wagmi';
import { useDeployHSGwSafe } from '../../../../utils/hooks/HatsSignerGateFactory';
import Input from '../../../UI/CustomInput/CustomInput';

interface useDeployHSGwSargs {
  _ownerHatId: AbiTypeToPrimitiveType<'uint256'>;
  _signerHatId: AbiTypeToPrimitiveType<'uint256'>;
  _minThreshold: AbiTypeToPrimitiveType<'uint256'>;
  _targetThreshold: AbiTypeToPrimitiveType<'uint256'>;
  _maxSigners: AbiTypeToPrimitiveType<'uint256'>;
}

export default function HatsSignerGateAndSafeForm() {
  const { isConnected } = useAccount();

  const [args, SetArgs] = useState<useDeployHSGwSargs>(
    {} as useDeployHSGwSargs
  );

  const { config } = useDeployHSGwSafe(args);
  const { data, isLoading, isSuccess, isError, write } =
    useContractWrite(config);

  return (
    <VStack
      width='100%'
      alignItems={'flex-start'}
      fontSize={14}
      gap={5}
    >
      <Flex flexDirection={'column'} gap={0} w={'80%'}>
        {' '}
        <Input
          label='Owner Hat ID (integer)'
          placeholder='26950000000000000000000000004196...'
          onChange={(e) =>
            SetArgs({ ...args, _ownerHatId: BigInt(e.target.value) })
          }
        />
      </Flex>
      <Flex flexDirection={'column'} gap={0} w={'80%'}>
        {' '}
        <Input
          label='Signer Hat ID (integer)'
          placeholder='26960000000000000000000000003152...'
          onChange={(e) =>
            SetArgs({ ...args, _signerHatId: BigInt(e.target.value) })
          }
        />
      </Flex>
      <Flex flexDirection={'column'} gap={0} w={'60%'}>
        {' '}
        <Input
          label='Min Threshold (integer)'
          placeholder='3'
          onChange={(e) =>
            SetArgs({ ...args, _minThreshold: BigInt(e.target.value) })
          }
        />
      </Flex>
      <Flex flexDirection={'column'} gap={0} w={'60%'}>
        {' '}
        <Input
          label='Max Threshold (integer)'
          placeholder='5'
          onChange={(e) =>
            SetArgs({ ...args, _targetThreshold: BigInt(e.target.value) })
          }
        />
      </Flex>
      <Flex flexDirection={'column'} gap={0} w={'60%'}>
        {' '}
        <Input
          label='Max Signers (integer)'
          placeholder='9'
          onChange={(e) =>
            SetArgs({ ...args, _maxSigners: BigInt(e.target.value) })
          }
        />
      </Flex>
      <Button
        disabled={!isConnected || !write}
        onClick={() => write?.()}
        width={'140px'}
      >
        Deploy
      </Button>
    </VStack>
  );
}
