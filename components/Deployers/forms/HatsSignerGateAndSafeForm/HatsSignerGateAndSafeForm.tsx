import { Button, Input, VStack } from '@chakra-ui/react';
import { AbiTypeToPrimitiveType } from 'abitype';
import { useState } from 'react';
import { useAccount, useContractWrite } from 'wagmi';
import { useDeployHSGwSafe } from '../../../../utils/hooks/HatsSignerGateFactory';

interface useDeployHSGwSargs {
  _ownerHatId: bigint;
  _signerHatId: bigint;
  _minThreshold: bigint;
  _targetThreshold: bigint;
  _maxSigners: bigint;
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
    <VStack width='100%'>
      <Input
        placeholder='Owner Hat ID'
        onChange={(e) =>
          SetArgs({ ...args, _ownerHatId: BigInt(e.target.value) })
        }
      />
      <Input
        placeholder='Signer Hat ID'
        onChange={(e) =>
          SetArgs({ ...args, _signerHatId: BigInt(e.target.value) })
        }
      />
      <Input
        placeholder='Minimum Threshold'
        onChange={(e) =>
          SetArgs({ ...args, _minThreshold: BigInt(e.target.value) })
        }
      />
      <Input
        placeholder='Target Threshold'
        onChange={(e) =>
          SetArgs({ ...args, _targetThreshold: BigInt(e.target.value) })
        }
      />
      <Input
        placeholder='Maximum Signers'
        onChange={(e) =>
          SetArgs({ ...args, _maxSigners: BigInt(e.target.value) })
        }
      />
      <Button
        disabled={!isConnected || !write}
        onClick={() => write?.()}
        width={'100%'}
        variant={'solid'}
      >
        Deploy
      </Button>
    </VStack>
  );
}
