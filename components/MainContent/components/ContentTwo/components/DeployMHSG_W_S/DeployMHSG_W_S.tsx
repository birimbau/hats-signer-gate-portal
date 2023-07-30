import Button from '../../../../../UI/CustomButton/CustomButton';
import { BsPen } from 'react-icons/bs';
import Input from '../../../../../UI/CustomInput/CustomInput';
import { useState } from 'react';
import { VStack } from '@chakra-ui/react';
import { useDeployMultiHatSGwSafe } from '../../../../../../utils/hooks/HatsSignerGateFactory';
import { useContractWrite } from 'wagmi';
import MultiInput from '../../../../../UI/MultiInput/MultiInput';

const DeployMHSG_W_S = () => {
  const [formData, setFormData] = useState({
    _ownerHatId: 0,
    _signersHatIds: [],
    _minThreshold: 0,
    _targetThreshold: 0,
    _maxSigners: 0,
  });

  const { config } = useDeployMultiHatSGwSafe(formData);
  const { data, isLoading, isSuccess, isError, error, write } =
    useContractWrite(config);

  const onSubmit = (e) => {
    e.preventDefault();
    write?.();
  };

  const setValue = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <form onSubmit={onSubmit} noValidate>
      <VStack gap={'13px'} alignItems='flex-start'>
        <Input
          label='Owner Hat ID'
          placeholder='_ownerHatId (uint256)'
          name='_ownerHatId'
          value={formData._ownerHatId}
          onChange={setValue}
          isDisabled={isLoading}
        />
        <MultiInput
          values={formData._signersHatIds}
          label='Signer Hat IDs'
          name='_signersHatIds'
          countLabel='Id'
          setValues={() => {}}
          placeholder='_signersHatIds (uint256)'
          onChange={(value, index, e) => {
            setFormData({
              ...formData,
              _signersHatIds: formData._signersHatIds.map((v, i) =>
                i === index ? e.target.value : v
              ),
            });
          }}
          onClickAdd={(value, _index) => {
            setFormData({
              ...formData,
              _signersHatIds: [...formData._signersHatIds, value],
            });
          }}
          onClickRemove={(value, index) => {
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
          placeholder='_minThreshold (uint256)'
          name='_minThreshold'
          value={formData._minThreshold}
          onChange={setValue}
          isDisabled={isLoading}
        />
        <Input
          label='Signers Target'
          placeholder='_targetThreshold (uint256)'
          name='_targetThreshold'
          value={formData._targetThreshold}
          onChange={setValue}
          isDisabled={isLoading}
        />
        <Input
          label='Signers Maximum'
          placeholder='_maxSigners (uint256)'
          name='_maxSigners'
          value={formData._maxSigners}
          onChange={setValue}
          isDisabled={isLoading}
        />
        <Button isDisabled={isLoading} type='submit' leftIcon={<BsPen />}>
          Write
        </Button>
      </VStack>
    </form>
  );
};

export default DeployMHSG_W_S;
