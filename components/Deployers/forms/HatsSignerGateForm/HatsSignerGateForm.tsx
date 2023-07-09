import {
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
} from '@chakra-ui/react';
import { useFormik } from 'formik';
import {
  useAccount,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from 'wagmi';
import { CONTRACTS } from '../../../../utils/constants';

const HatsSignerGateForm = () => {
  const { address, connector, isConnected } = useAccount();
  const formik = useFormik({
    initialValues: {
      ownerHatId: '1',
      signersHatId: '1',
      safe: address,
      minThreshold: '1',
      targetThreshold: '1',
      maxSigners: '1',
    },
    onSubmit: (values) => {
      write?.();
    },
  });

  const { contractAddress, contractABI } = CONTRACTS.hatsSignerGateFactory;
  const { config } = usePrepareContractWrite({
    address: contractAddress,
    abi: contractABI,
    functionName: 'deployHatsSignerGate',
    args: [
      parseInt(formik.values.ownerHatId || '0'),
      parseInt(formik.values.signersHatId || '0'),
      formik.values.safe,
      parseInt(formik.values.minThreshold || '0'),
      parseInt(formik.values.targetThreshold || '0'),
      parseInt(formik.values.maxSigners || '0'),
    ],
    enabled: false,
  });

  const { data, error, isError, write } = useContractWrite(config);
  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  });

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          write?.();
        }}
        className='w-full'
      >
        <VStack spacing={4} align='flex-start'>
          <FormControl>
            <FormLabel htmlFor='email'>Owner Hat Id</FormLabel>
            <Input
              id='ownerHatId'
              name='ownerHatId'
              type='text'
              variant='filled'
              onChange={formik.handleChange}
              value={formik.values.ownerHatId}
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor='email'>Signer Hat Id</FormLabel>
            <Input
              id='signersHatId'
              name='signersHatId'
              type='text'
              variant='filled'
              onChange={formik.handleChange}
              value={formik.values.signersHatId}
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor='email'>Safe</FormLabel>
            <Input
              id='safe'
              name='safe'
              type='text'
              variant='filled'
              onChange={formik.handleChange}
              value={formik.values.safe}
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor='email'>Min Threshold</FormLabel>
            <Input
              id='minThreshold'
              name='minThreshold'
              type='text'
              variant='filled'
              onChange={formik.handleChange}
              value={formik.values.minThreshold}
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor='email'>Target Threshold</FormLabel>
            <Input
              id='targetThreshold'
              name='targetThreshold'
              type='text'
              variant='filled'
              onChange={formik.handleChange}
              value={formik.values.targetThreshold}
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor='email'>Max Signers</FormLabel>
            <Input
              id='maxSigners'
              name='maxSigners'
              type='string'
              variant='filled'
              onChange={formik.handleChange}
              value={formik.values.maxSigners}
            />
          </FormControl>
          <Button type='submit' width='full' isDisabled={isLoading}>
            Deploy
          </Button>
        </VStack>
      </form>
    </>
  );
};

export default HatsSignerGateForm;
