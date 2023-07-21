import Button from '../../../../../UI/CustomButton/CustomButton';
import { BsPen } from 'react-icons/bs';
import Input from '../../../../../UI/CustomInput/CustomInput';
import { useEffect, useState } from 'react';
import { VStack } from '@chakra-ui/react';
import { useDeployMultiHatSGwSafe } from '../../../../../../utils/hooks/HatsSignerGateFactory';
import { useContractWrite } from 'wagmi';

const DeployMHSG_W_S = () => {
  const [formData, setFormData] = useState({
    _ownerHatId: 0,
    _signersHatIds: [1],
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

  useEffect(() => {
    console.log('IS SUCCESS: ', isSuccess);
    console.log('IS DATA: ', data);
  }, [data, isSuccess]);
  useEffect(() => {
    console.log('IS ERROR: ', isError);
    console.log('ERROR: ', error);
  }, [error, isError]);

  return (
    <form onSubmit={onSubmit} noValidate>
      <VStack gap={'13px'} alignItems='flex-start'>
        <Input
          label='Owner Hat ID'
          type={'number'}
          placeholder='_ownerHatId (uint256)'
          name='_ownerHatId'
          value={formData._ownerHatId}
          onChange={setValue}
          isDisabled={isLoading}
        />
        {/* <Input
          label='Signer Hat IDs [Id1]'
          placeholder='_signersHatIds (uint256[])'
          name='_signersHatIds'
          value={formData._signersHatIds}
          onChange={setValue}
          isDisabled={isLoading}
        /> */}
        <Input
          label='Signers Minimum'
          placeholder='_minThreshold (uint256)'
          name='_minThreshold'
          type={'number'}
          value={formData._minThreshold}
          onChange={setValue}
          isDisabled={isLoading}
        />
        <Input
          label='Signers Target'
          placeholder='_targetThreshold (uint256)'
          name='_targetThreshold'
          type={'number'}
          value={formData._targetThreshold}
          onChange={setValue}
          isDisabled={isLoading}
        />
        <Input
          label='Signers Maximum'
          placeholder='_maxSigners (uint256)'
          name='_maxSigners'
          type={'number'}
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
