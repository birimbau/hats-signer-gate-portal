import { VStack } from '@chakra-ui/react';
import { AbiTypeToPrimitiveType } from 'abitype';
import { useEffect, useRef, useState } from 'react';
import { BsPen } from 'react-icons/bs';
import { useContractWrite, useWaitForTransaction } from 'wagmi';
import { useDeployMultiHatSGwSafe } from '../../../../utils/hooks/HatsSignerGateFactory';
import Button from '../../../UI/CustomButton/CustomButton';
import Input from '../../../UI/CustomInput/CustomInput';
import MultiInput from '../../../UI/MultiInput/MultiInput';
import { decodeEventLog } from 'viem';
import { HatsSignerGateFactoryAbi } from '../../../../utils/abi/HatsSignerGateFactory/HatsSignerGateFactory';
interface P {
  setData: (data: any) => void;
  setTransactionData: (data: any) => void;
  setFormData: (data: any) => void;
  formData: any;
  setIsPending: (isPending: boolean) => void;
}

const MultiHatsSignerGateAndSafeForm: React.FC<P> = (p) => {
  const [hash, setHash] = useState<`0x${string}` | ''>('');

  const args = useRef({
    _ownerHatId: BigInt(0),
    _signersHatIds: [BigInt(0)],
    _minThreshold: BigInt(0),
    _targetThreshold: BigInt(0),
    _maxSigners: BigInt(0),
  });

  const { config } = useDeployMultiHatSGwSafe(args.current);

  const { data, isLoading, write } = useContractWrite({
    ...config,
  });

  const { data: transactionData, isLoading: transationPending } =
    useWaitForTransaction({
      hash: hash as AbiTypeToPrimitiveType<'address'>,
      onSuccess(data) {
        const response = decodeEventLog({
          abi: HatsSignerGateFactoryAbi,
          data: data.logs[8].data,
          topics: data.logs[8].topics,
        });

        p.setTransactionData(data);
        p.setData(response.args);
        console.log('inside Success');
      },
    });

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    args.current = {
      _ownerHatId: BigInt(p.formData._ownerHatId),
      _signersHatIds: p.formData._signersHatIds.map((v: string) => BigInt(v)),
      _minThreshold: BigInt(p.formData._minThreshold),
      _targetThreshold: BigInt(p.formData._targetThreshold),
      _maxSigners: BigInt(p.formData._maxSigners),
    };

    write?.();
  };

  useEffect(() => {
    if (data) {
      setHash(data.hash);
    }
  }, [data]);

  useEffect(() => {
    p.setIsPending((isLoading || transationPending) && hash !== '');
  }, [isLoading, transationPending, hash, p]);

  return (
    <form onSubmit={onSubmit} noValidate>
      <VStack width="100%" alignItems={'flex-start'} fontSize={14} gap={5}>
        <Input
          label="Owner Hat ID (integer)"
          placeholder="26950000000000000000000000004196..."
          name="_ownerHatId"
          value={p.formData._ownerHatId}
          width="340px"
          onChange={(e) =>
            p.setFormData({ ...p.formData, _ownerHatId: e.target.value })
          }
          isDisabled={isLoading}
        />
        <MultiInput
          values={p.formData._signersHatIds}
          width="372px"
          label="Signer Hat IDs"
          name="_signersHatIds"
          countLabel="Id"
          placeholder="26960000000000000000000000003152..."
          onChange={(_value, index, e) => {
            p.setFormData({
              ...p.formData,
              _signersHatIds: p.formData._signersHatIds.map(
                (v: string, i: number) => {
                  return i === index ? e.target.value : v;
                }
              ),
            });
          }}
          onClickAdd={(value, _index) => {
            p.setFormData({
              ...p.formData,
              _signersHatIds: [...p.formData._signersHatIds, ''],
            });
          }}
          onClickRemove={(_value, index) => {
            p.setFormData({
              ...p.formData,
              _signersHatIds: p.formData._signersHatIds.filter(
                (_v: string, i: number) => i !== index
              ),
            });
          }}
        />
        <Input
          label="Min Threshold (integer)"
          width="340px"
          placeholder="3"
          name="_minThreshold"
          value={p.formData._minThreshold}
          onChange={(e) =>
            p.setFormData({ ...p.formData, _minThreshold: e.target.value })
          }
          isDisabled={isLoading}
        />
        <Input
          label="Max Threshold (integer)"
          width="340px"
          placeholder="5"
          name="_targetThreshold"
          value={p.formData._targetThreshold}
          onChange={(e) =>
            p.setFormData({ ...p.formData, _targetThreshold: e.target.value })
          }
          isDisabled={isLoading}
        />
        <Input
          label="Max Signers (integer)"
          width="340px"
          placeholder="9"
          name="_maxSigners"
          value={p.formData._maxSigners}
          onChange={(e) =>
            p.setFormData({ ...p.formData, _maxSigners: e.target.value })
          }
          isDisabled={isLoading}
        />
        <Button isDisabled={isLoading} type="submit" leftIcon={<BsPen />}>
          Write
        </Button>
      </VStack>
    </form>
  );
};

export default MultiHatsSignerGateAndSafeForm;
