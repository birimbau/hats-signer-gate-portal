import { VStack } from '@chakra-ui/react';
import { AbiTypeToPrimitiveType } from 'abitype';
import { useState } from 'react';
import { BsPen } from 'react-icons/bs';
import { useContractWrite } from 'wagmi';
import { useDeployMultiHatSG } from '../../../../utils/hooks/HatsSignerGateFactory';
import Button from '../../../UI/CustomButton/CustomButton';
import Input from '../../../UI/CustomInput/CustomInput';
import MultiInput from '../../../UI/MultiInput/MultiInput';

interface useDeployMHSGargs {
  _ownerHatId: AbiTypeToPrimitiveType<'uint256'>;
  _signersHatIds: AbiTypeToPrimitiveType<'uint256'>[];
  _safe: AbiTypeToPrimitiveType<'address'>;
  _minThreshold: AbiTypeToPrimitiveType<'uint256'>;
  _targetThreshold: AbiTypeToPrimitiveType<'uint256'>;
  _maxSigners: AbiTypeToPrimitiveType<'uint256'>;
}

export default function MultiHatsSignerGateForm() {
  const [formData, setFormData] = useState({
    _ownerHatId: '',
    _signersHatIds: [''],
    _safe: '',
    _minThreshold: '',
    _targetThreshold: '',
    _maxSigners: '',
  });
  const [args, SetArgs] = useState<useDeployMHSGargs>({
    _ownerHatId: BigInt(0),
    _signersHatIds: [BigInt(0)],
    _minThreshold: BigInt(0),
    _targetThreshold: BigInt(0),
    _maxSigners: BigInt(0),
    _safe: '0x',
  });

  const { config } = useDeployMultiHatSG(args);
  const { data, isLoading, isSuccess, isError, write } =
    useContractWrite(config);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    SetArgs({
      _ownerHatId: BigInt(formData._ownerHatId),
      _signersHatIds: formData._signersHatIds.map((v) => BigInt(v)),
      _minThreshold: BigInt(formData._minThreshold),
      _targetThreshold: BigInt(formData._targetThreshold),
      _maxSigners: BigInt(formData._maxSigners),
      _safe: formData._safe as AbiTypeToPrimitiveType<'address'>,
    });
    write?.();
  };

  return (
    <form onSubmit={onSubmit} noValidate>
      <VStack 
        width='100%'
        alignItems={'flex-start'}
        fontSize={14}
        gap={5}
      >
        <Input
          label='Owner Hat ID (integer)'
          placeholder='26950000000000000000000000004196...'
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
          placeholder='26960000000000000000000000003152...'
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
          label='Existing Safe (address)'
          placeholder='0xC8ac0000000000000000000000000000000047fe'
          name='_safe'
          value={formData._safe}
          width='340px'
          onChange={(e) => setFormData({ ...formData, _safe: e.target.value })}
          isDisabled={isLoading}
        />
        <Input
          label='Min Threshold (integer)'
          width='340px'
          placeholder='3'
          name='_minThreshold'
          value={formData._minThreshold}
          onChange={(e) =>
            setFormData({ ...formData, _minThreshold: e.target.value })
          }
          isDisabled={isLoading}
        />
        <Input
          label='Max Threshold (integer)'
          width='340px'
          placeholder='5'
          name='_targetThreshold'
          value={formData._targetThreshold}
          onChange={(e) =>
            setFormData({ ...formData, _targetThreshold: e.target.value })
          }
          isDisabled={isLoading}
        />
        <Input
          label='Max Signers (integer)'
          width='340px'
          placeholder='9'
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
  );
}
