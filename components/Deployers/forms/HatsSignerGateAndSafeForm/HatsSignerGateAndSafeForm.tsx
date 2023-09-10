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
import { Contract } from 'ethers';

interface useDeployHSGwSargs {
  _ownerHatId: AbiTypeToPrimitiveType<'uint256'>;
  _signerHatId: AbiTypeToPrimitiveType<'uint256'>;
  _minThreshold: AbiTypeToPrimitiveType<'uint256'>;
  _targetThreshold: AbiTypeToPrimitiveType<'uint256'>;
  _maxSigners: AbiTypeToPrimitiveType<'uint256'>;
}

interface Props {
  setIsPending: (isPending: boolean) => void;
  setData: (data: any) => void;
  setTransactionData: (data: any) => void;
  formData: any; // Assuming formData is an object with initial values
  setFormData: (formData: any) => void;
}

export default function HatsSignerGateAndSafeForm(props: Props) {
  // Destructure Props for ease of use & visibility within this function
  const { setIsPending, setData, setTransactionData, formData, setFormData } =
    props;

  const [hash, setHash] = useState<string | ''>('');

  // Used to prevent the user Deploying
  const { isConnected } = useAccount();

  // useRef - to store values until user writes to the contract
  const args = useRef({
    _ownerHatId: BigInt(0),
    _signerHatId: BigInt(0),
    _minThreshold: BigInt(0),
    _targetThreshold: BigInt(0),
    _maxSigners: BigInt(0),
  });

  // The args are passed into "usePrepareContractWrite" returning a "prepared configuration" to be sent through to useContractWrite.
  // args.current is passed in - IT USES CLOSURE, SO THE WRITE FUNCTION HOLDS THE REFERENCES TO args.current...
  // This means that "write()" onSubmit has access to args.current.
  const { config } = useDeployHSGwSafe(args.current);
  const { data: contractData, write } = useContractWrite(config);
  // No need to spread config ^^, it's an object
  // IMPROVE

  // This only runs if "hash" is defined
  // Use this to detect isLoading/isError state in transaction
  const { data: transactionData, isLoading } = useWaitForTransaction({
    hash: hash as AbiTypeToPrimitiveType<'address'>,
    onSuccess(data) {
      const response = decodeEventLog({
        abi: HatsSignerGateFactoryAbi,
        data: data.logs[8].data,
        topics: data.logs[8].topics,
      });

      setTransactionData(data);
      setData(response.args);
    },
  });

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    args.current = {
      _ownerHatId: BigInt(formData._ownerHatId),
      _signerHatId: BigInt(formData._signerHatId),
      _minThreshold: BigInt(formData._minThreshold),
      _targetThreshold: BigInt(formData._targetThreshold),
      _maxSigners: BigInt(formData._maxSigners),
    };

    // write has access to args.current, so the updated values take effect
    write?.();
  };

  // Why is this being used to re-render the app?
  // Improve - data to contractData
  useEffect(() => {
    if (contractData) {
      setHash(contractData.hash);
    }
  }, [contractData]);

  // Used for conditional rendering
  useEffect(() => {
    setIsPending(isLoading && hash !== '');
  }, [isLoading, hash, setIsPending]);

  // TODO - Test Connection
  // TODO - Add Validation

  return (
    <VStack width="100%" alignItems={'flex-start'} fontSize={14} gap={5}>
      <Flex flexDirection={'column'} gap={0} w={'80%'}>
        <Input
          label="Owner Hat ID (integer)"
          placeholder="26950000000000000000000000004196..."
          onChange={(e) =>
            setFormData({
              ...formData,
              _ownerHatId: e.target.value,
            })
          }
        />
      </Flex>
      <Flex flexDirection={'column'} gap={0} w={'80%'}>
        <Input
          label="Signer Hat ID (integer)"
          placeholder="26960000000000000000000000003152..."
          onChange={(e) =>
            setFormData({ ...formData, _signerHatId: e.target.value })
          }
        />
      </Flex>
      <Flex flexDirection={'column'} gap={0} w={'60%'}>
        {' '}
        <Input
          label="Min Threshold (integer)"
          placeholder="3"
          onChange={(e) =>
            setFormData({ ...formData, _minThreshold: e.target.value })
          }
        />
      </Flex>
      <Flex flexDirection={'column'} gap={0} w={'60%'}>
        <Input
          label="Max Threshold (integer)"
          placeholder="5"
          onChange={(e) =>
            setFormData({
              ...formData,
              _targetThreshold: e.target.value,
            })
          }
        />
      </Flex>
      <Flex flexDirection={'column'} gap={0} w={'60%'}>
        <Input
          label="Max Signers (integer)"
          placeholder="9"
          onChange={(e) =>
            setFormData({ ...formData, _maxSigners: e.target.value })
          }
        />
      </Flex>
      <Button
        disabled={!isConnected || isLoading}
        onClick={onSubmit}
        width={'140px'}
      >
        Deploy
      </Button>
    </VStack>
  );
}
