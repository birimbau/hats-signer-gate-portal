import { Flex, VStack, useToast } from '@chakra-ui/react';
import { useEffect } from 'react';
import { AiOutlineRead } from 'react-icons/ai';
import Button from '../../../UI/CustomButton/CustomButton';
import { Formik, Form } from 'formik';
import { AbiTypeToPrimitiveType } from 'abitype'; // Make sure you're using this import correctly.
import CustomInputWrapper from './CustomInputWrapper';

// ethers imports
import { Contract, Provider, constant } from 'ethers';

// Gnosis Safe ABI
import { SAFE_ABI } from '../../../../utils/contracts';

const ReadForm = () => {
  const toast = useToast();
  const alchemyProvider = new ethers.providers.AlchemyProvider(
    'mainnet',
    YOUR_ALCHEMY_API_KEY
  );
  const signer = provider.getSigner();
  const SENTINEL_MODULES = constants.AddressZero; // This value is usually the zero address, adjust if needed

  const initialValues = {
    _mhsg: '',
  };

  const checkIfCanAttachHSG = async (safeAddress: string) => {
    const safeContract = new Contract(safeAddress, SAFE_ABI, signer);
    const modules = await safeContract.getModulesPaginated(SENTINEL_MODULES, 1);

    if (modules.length > 0) {
      toast({
        title: 'HSG cannot be attached',
        description: 'HSG must be the sole module for a given Safe.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      return false;
    }
    return true;
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={async (values) => {
        const canAttach = await checkIfCanAttachHSG(values._mhsg);
        if (canAttach) {
          // Implement what should happen when HSG can be attached
        }
      }}
    >
      {() => (
        <Form noValidate>
          <VStack width="100%" alignItems={'flex-start'} fontSize={14} gap={5}>
            <Flex flexDirection={'column'} gap={0} w={'100%'}>
              <CustomInputWrapper
                name="_mhsg"
                label="Existing Safe (address)"
                placeholder="0xC8ac0000000000000000000000000000000047fe"
              />
            </Flex>

            <Button type="submit" leftIcon={<AiOutlineRead />}>
              Read
            </Button>
          </VStack>
        </Form>
      )}
    </Formik>
  );
};

export default ReadForm;
