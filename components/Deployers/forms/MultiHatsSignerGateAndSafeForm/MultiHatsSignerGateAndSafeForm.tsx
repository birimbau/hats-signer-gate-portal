import { VStack } from '@chakra-ui/react';
import { AbiTypeToPrimitiveType } from 'abitype';
import { useEffect, useState } from 'react';
import { BsPen } from 'react-icons/bs';
import { useContractWrite, useWaitForTransaction } from 'wagmi';
import { useDeployMultiHatSGwSafe } from '../../../../utils/hooks/HatsSignerGateFactory';
import Button from '../../../UI/CustomButton/CustomButton';
import Input from '../../../UI/CustomInput/CustomInput';
import MultiInput from '../../../UI/MultiInput/MultiInput';
import { decodeEventLog, hexToString, parseTransaction } from 'viem';
import { HatsSignerGateFactoryAbi } from '../../../../utils/abi/HatsSignerGateFactory/HatsSignerGateFactory';

const decode = (hex = '') => {
  const result = [];
  for (let i = 0; i < hex.length; i += 2) {
    result.push(String.fromCharCode(parseInt(hex.substr(i, 2), 16)));
  }
  return result.join('');
};

interface useDeployMultiHatSGwSafeArgs {
  _ownerHatId: AbiTypeToPrimitiveType<'uint256'>;
  _signersHatIds: AbiTypeToPrimitiveType<'uint256'>[];
  _minThreshold: AbiTypeToPrimitiveType<'uint256'>;
  _targetThreshold: AbiTypeToPrimitiveType<'uint256'>;
  _maxSigners: AbiTypeToPrimitiveType<'uint256'>;
}

export default function MultiHatsSignerGateAndSafeForm() {
  const [hash, setHash] = useState<`0x${string}`>('');
  const { data: transactionData } = useWaitForTransaction({
    hash,
    onSuccess(data) {
      debugger;
      console.log('Success', data);
      const topics = decodeEventLog({
        abi: HatsSignerGateFactoryAbi,
        data: data.logs[8].data,
        topics: data.logs[8].topics,
      });
      debugger;
    },
  });
  const [formData, setFormData] = useState({
    _ownerHatId: '',
    _signersHatIds: [''],
    _minThreshold: '',
    _targetThreshold: '',
    _maxSigners: '',
  });

  const [args, SetArgs] = useState<useDeployMultiHatSGwSafeArgs>({
    _ownerHatId: BigInt(0),
    _signersHatIds: [BigInt(0)],
    _minThreshold: BigInt(0),
    _targetThreshold: BigInt(0),
    _maxSigners: BigInt(0),
  });

  const { config } = useDeployMultiHatSGwSafe(args);

  const { data, isLoading, isSuccess, isError, write, writeAsync, variables } =
    useContractWrite({
      ...config,
      onSuccess: (data, b, c, d, e) => {
        debugger;
      },
      onSettled: (data, b, c, d, e) => {
        debugger;
      },
    });

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    SetArgs({
      _ownerHatId: BigInt(formData._ownerHatId),
      _signersHatIds: formData._signersHatIds.map((v) => BigInt(v)),
      _minThreshold: BigInt(formData._minThreshold),
      _targetThreshold: BigInt(formData._targetThreshold),
      _maxSigners: BigInt(formData._maxSigners),
    });
    const vari = variables;
    const a = await write?.();
    debugger;
  };

  useEffect(() => {
    if (data) {
      debugger;
      setHash(data.hash);
    }
  }, [data]);

  useEffect(() => {
    if (transactionData) {
      const test = parseTransaction;
      debugger;
      const heuheu = decode(transactionData.logs[8].data);
      // const heuheu = hexToString(transactionData.logs[8].data);
      debugger;
    }
  }, [transactionData]);

  return (
    <VStack gap='8px' alignItems={'flex-start'}>
      <form onSubmit={onSubmit} noValidate>
        <VStack gap={'13px'} alignItems='flex-start' width='340px'>
          <Input
            label='Owner Hat ID'
            placeholder='_ownerHatId (uint256)'
            name='_ownerHatId'
            value={formData._ownerHatId}
            width='340px'
            onChange={(e) =>
              setFormData({ ...formData, _ownerHatId: e.target.value })
            }
            isDisabled={isLoading}
          />
          <MultiInput
            values={formData._signersHatIds}
            width='372px'
            label='Signer Hat IDs'
            name='_signersHatIds'
            countLabel='Id'
            placeholder='_signersHatIds (uint256)[]'
            isDisabled={isLoading}
            onChange={(_value, index, e) => {
              setFormData({
                ...formData,
                _signersHatIds: formData._signersHatIds.map((v, i) => {
                  return i === index ? e.target.value : v;
                }),
              });
            }}
            onClickAdd={(value, _index) => {
              setFormData({
                ...formData,
                _signersHatIds: [...formData._signersHatIds, ''],
              });
            }}
            onClickRemove={(_value, index) => {
              setFormData({
                ...formData,
                _signersHatIds: formData._signersHatIds.filter(
                  (v, i) => i !== index
                ),
              });
            }}
          />
          <Input
            label='Signers Minimum'
            width='340px'
            placeholder='_minThreshold (uint256)'
            name='_minThreshold'
            value={formData._minThreshold}
            onChange={(e) =>
              setFormData({ ...formData, _minThreshold: e.target.value })
            }
            isDisabled={isLoading}
          />
          <Input
            label='Signers Target'
            width='340px'
            placeholder='_targetThreshold (uint256)'
            name='_targetThreshold'
            value={formData._targetThreshold}
            onChange={(e) =>
              setFormData({ ...formData, _targetThreshold: e.target.value })
            }
            isDisabled={isLoading}
          />
          <Input
            label='Signers Maximum'
            width='340px'
            placeholder='_maxSigners (uint256)'
            name='_maxSigners'
            value={formData._maxSigners}
            onChange={(e) =>
              setFormData({ ...formData, _maxSigners: e.target.value })
            }
            isDisabled={isLoading}
          />
          <Button isDisabled={isLoading} type='submit' leftIcon={<BsPen />}>
            Write
          </Button>
        </VStack>
      </form>
      {transactionData && (
        <div>
          <h4>Results: </h4>
        </div>
      )}
    </VStack>
  );
}
